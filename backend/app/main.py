# app/main.py
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.request import PredictRequest
from app.services.predictor import predict_and_get_recipes


app = FastAPI()

# Middleware CORS supaya bisa diakses dari client manapun
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(request: PredictRequest):
    try:
        user_features = {
            "calories": request.calories,
            "fat_content": request.fat_content,
            "saturated_fat_content": request.saturated_fat_content,
            "cholesterol_content": request.cholesterol_content,
            "sodium_content": request.sodium_content,
            "carbohydrate_content": request.carbohydrate_content,
            "fiber_content": request.fiber_content,
            "sugar_content": request.sugar_content,
            "protein_content": request.protein_content,
        }
        result = predict_and_get_recipes(request.category, user_features)

        if "error" in result:
            logging.error(f"Prediction error: {result['error']}")
            raise HTTPException(status_code=404, detail=result["error"])

        return result

    except Exception as e:
        logging.exception("Unhandled exception in /predict")
        raise HTTPException(status_code=500, detail=str(e))