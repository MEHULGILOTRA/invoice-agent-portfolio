# 🚀 Invoice Agent Portfolio

![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-success)
![LangChain](https://img.shields.io/badge/LangChain-Agent-orange)
![CI](https://github.com/YOUR_USERNAME/invoice-agent-portfolio/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/License-MIT-green)

---

> 📂 Local-first **Invoice Processing Agent** using **LangChain, LangGraph concepts, Hugging Face Transformers, and Tesseract OCR**.  
> ⚡ Runs 100% locally — no Docker, no paid API keys.  
> 🎯 Portfolio-ready showcase project with FastAPI + minimal frontend.  

---

## ✨ Features

- 🖼 OCR with **Tesseract** → Extracts text from invoice images/PDFs  
- 🤖 Parsing with **LangChain + Hugging Face LLM (distilgpt2)**  
- 📑 Outputs **structured JSON** (vendor, invoice number, totals, etc.)  
- 🌐 Minimal **Frontend (HTML/JS)** → Upload & review parsed invoices  
- 📂 Saves results to `output/invoice.json`  
- 🧪 Includes **tests (pytest)** + **CI/CD (GitHub Actions)**  

---

## 📥 Installation & Setup

```bash
git clone https://github.com/YOUR_USERNAME/invoice-agent-portfolio.git
cd invoice-agent-portfolio

python3 -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt
