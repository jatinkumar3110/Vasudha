# vasudha_app.py

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import uvicorn
import whisper
import os
import sqlite3
import torch
import cv2
import numpy as np
from transformers import pipeline

app = FastAPI()

# === VOICE MODULE ===
whisper_model = whisper.load_model("base")

def transcribe_audio(file_path):
    result = whisper_model.transcribe(file_path)
    return result["text"]

# === NLP ADVISOR MODULE ===
qa_pipeline = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")

def get_crop_advice(question, context):
    result = qa_pipeline(question=question, context=context)
    return result["answer"]

# === LAND MATCHING MODULE ===
def detect_fallow_land(image_path):
    image = cv2.imread(image_path, 0)
    if image is None:
        return "Image not found or unreadable"
    _, thresh = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)
    fallow_percentage = np.sum(thresh == 255) / thresh.size
    return round(fallow_percentage * 100, 2)

# === TRUST SCORING MODULE ===
def compute_trust_score(data: dict):
    score = 0.5 + 0.1 * float(data.get("group_participation", 0)) + 0.2 * float(data.get("repayment_history", 0))
    return round(min(score, 1.0), 2)

# === SQLITE DATABASE SETUP ===
def setup_db():
    conn = sqlite3.connect("farmers.db")
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS farmers
                 (id INTEGER PRIMARY KEY, name TEXT, voice_query TEXT, crop_advice TEXT)''')
    conn.commit()
    conn.close()

setup_db()

def save_to_db(name, voice_query, crop_advice):
    conn = sqlite3.connect("farmers.db")
    c = conn.cursor()
    c.execute("INSERT INTO farmers (name, voice_query, crop_advice) VALUES (?, ?, ?)", (name, voice_query, crop_advice))
    conn.commit()
    conn.close()

# === ROUTES ===
@app.get("/")
def welcome():
    return {"message": "🌾 Welcome to Vasudha – Smart Farming for All"}

@app.post("/transcribe/")
async def transcribe_voice(file: UploadFile = File(...), name: str = Form("Farmer")):
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())
    try:
        transcription = transcribe_audio(file_path)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    os.remove(file_path)
    return {"name": name, "transcription": transcription}

@app.post("/advice/")
async def get_advice(question: str = Form(...), context: str = Form(...), name: str = Form("Farmer")):
    try:
        advice = get_crop_advice(question, context)
        save_to_db(name, question, advice)
        return {"name": name, "advice": advice}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/land-match/")
async def land_match(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())
    try:
        percent = detect_fallow_land(file_path)
    except Exception as e:
        os.remove(file_path)
        return JSONResponse(status_code=500, content={"error": str(e)})
    os.remove(file_path)
    return {"fallow_land_percent": percent}

@app.post("/trust-score/")
async def trust_score(group_participation: float = Form(...), repayment_history: float = Form(...)):
    score = compute_trust_score({
        "group_participation": group_participation,
        "repayment_history": repayment_history
    })
    return {"trust_score": score}

# === MAIN RUN ===
if __name__ == "__main__":
    uvicorn.run("vasudha_app:app", host="0.0.0.0", port=8000, reload=True)
