import os
from fastapi import FastAPI, UploadFile, Form
import pytesseract
from PIL import Image
from langchain import PromptTemplate, LLMChain
from langchain.llms import HuggingFacePipeline
from transformers import pipeline
import json

app = FastAPI()

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
    image = Image.open(file.file)
    ocr_text = pytesseract.image_to_string(image)

    chain = LLMChain(prompt=PromptTemplate.from_template(prompt_template), llm=llm)
    result = chain.run(ocr_text=ocr_text)

    try:
        data = json.loads(result)
    except:
        data = {"raw": result}

    with open("output/invoice.json", "w") as f:
        json.dump(data, f, indent=2)

    return {"parsed_invoice": data}
