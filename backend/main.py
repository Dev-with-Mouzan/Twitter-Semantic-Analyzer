import re
from pathlib import Path

import joblib
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

BASE = Path(__file__).resolve().parent
vectorizer = joblib.load(BASE / "models" / "vectorizer.pkl")
model = joblib.load(BASE / "models" / "sentimental_analysis.pkl")
FRONTEND_DIR = BASE.parent / "frontend" / "dist"


def clean_text(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"<.*?>", "", text)
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


app = FastAPI()


class PredictRequest(BaseModel):
    text: str

    model_config = {
        "json_schema_extra": {
            "examples": [{"text": "this is genuinely fantastic"}]
        }
    }


@app.get("/health")
def health():
    if model is None or vectorizer is None:
        return {"status": "error", "detail": "model not loaded"}
    return {"status": "ok"}


@app.post("/predict")
def predict(req: PredictRequest):
    text = req.text.strip()
    if not text:
        raise HTTPException(400, "Text cannot be empty.")
    cleaned = clean_text(text)
    vec = vectorizer.transform([cleaned])
    pred = model.predict(vec)[0]
    proba = model.predict_proba(vec)[0]
    classes = [str(c) for c in model.classes_]
    return {
        "label": "positive" if pred == 1 else "negative",
        "confidence": float(max(proba)),
        "probabilities": dict(zip(classes, [float(p) for p in proba])),
        "text": text,
    }


if FRONTEND_DIR.is_dir():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
