import os
import json
from fastapi import FastAPI, UploadFile, HTTPException
import pytesseract
from PIL import Image
from langchain import PromptTemplate, LLMChain
from langchain_community.llms import HuggingFacePipeline
from transformers import pipeline
from pdf2image import convert_from_bytes  # NEW: to handle PDFs
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load LLM
generator = pipeline("text-generation", model="distilgpt2")
llm = HuggingFacePipeline(pipeline=generator)

prompt_template = """You are an invoice parsing assistant. Extract JSON with fields:
vendor, invoice_number, invoice_date, due_date, currency, line_items, subtotal, tax_total, total.

OCR_TEXT:
{ocr_text}
"""

@app.post("/process-invoice/")
async def process_invoice(file: UploadFile):
    filename = file.filename.lower()

    if filename.endswith((".png", ".jpg", ".jpeg")):
        image = Image.open(file.file)
        ocr_text = pytesseract.image_to_string(image)
    elif filename.endswith(".pdf"):
        pdf_bytes = await file.read()
        images = convert_from_bytes(pdf_bytes)
        ocr_text = ""
        for img in images:
            ocr_text += pytesseract.image_to_string(img) + "\n"
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    # Run through LLM
    chain = LLMChain(prompt=PromptTemplate.from_template(prompt_template), llm=llm)
    result = chain.run(ocr_text=ocr_text)

    try:
        data = json.loads(result)
    except:
        data = {"raw": result}

    os.makedirs("output", exist_ok=True)
    with open("output/invoice.json", "w") as f:
        json.dump(data, f, indent=2)

    return {"parsed_invoice": data}
