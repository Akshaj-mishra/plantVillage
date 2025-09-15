from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import google.generativeai as genai
import os
from dotenv import load_dotenv


load_dotenv()


app = FastAPI()


origins = [
    "http://localhost:5173",  # React dev server
    "https://your-frontend-vercel-url.vercel.app",  # Vercel
    "https://your-frontend-firebase-url.web.app",    # Firebase
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # only allow these URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CNN model
try:
    cnn_model = tf.keras.models.load_model("models/plant_disease_model.keras")
    print("✅ CNN model loaded successfully")
except Exception as e:
    print(f"❌ Error loading CNN model: {e}")
    cnn_model = None

# Configure Gemini API
api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("HF_GOOGLE_API_KEY")
print(f"🔑 API Key present: {bool(api_key)}")
if api_key:
    print(f"🔑 API Key (partial): {api_key[:10]}...")

try:
    genai.configure(api_key=api_key)
    gemini_model = genai.GenerativeModel("gemini-1.5-flash")
    print("✅ Gemini AI configured successfully")
except Exception as e:
    print(f"❌ Error configuring Gemini AI: {e}")
    gemini_model = None


class_names = [
    'Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_Late_blight',
    'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot',
    'Tomato_Spider_mites_Two_spotted_spider_mite', 'Tomato__Target_Spot',
    'Tomato__Tomato_YellowLeaf__Curl_Virus', 'Tomato__Tomato_mosaic_virus',
    'Tomato_healthy'
]


def preprocess_image(image: Image.Image):
    image = image.resize((128, 128))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image


@app.get("/")
def root():
    return {"message": "🚀 FastAPI backend is running and CORS is enabled!"}


@app.post("/analyze-plant")
async def analyze_plant(file: UploadFile = File(...), question: str = Form("")):
    try:
        if cnn_model is None:
            raise HTTPException(status_code=500, detail="CNN model not loaded")

        if gemini_model is None:
            raise HTTPException(status_code=500, detail="Gemini AI not configured")

        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        
        image = Image.open(file.file).convert("RGB")
        processed = preprocess_image(image)

        
        predictions = cnn_model.predict(processed, verbose=0)
        class_idx = np.argmax(predictions[0])
        disease = class_names[class_idx]
        confidence = float(np.max(predictions[0]))

        base_prompt = ""
        
        
        if question.strip():
            base_prompt += f"\n\nThe user also asks: {question}"
        
        base_prompt += (
            
            f"This plant is diagnosed with **{disease}** "
            f"(confidence {confidence:.2f}). Suggest how to treat and prevent it in simple steps."
        )
  
        response = gemini_model.generate_content(base_prompt)

        return {
            "disease": disease,
            "confidence": confidence,
            "solution": response.text,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")