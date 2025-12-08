# plantVillage

Here is the **README fully in Markdown format**, ready to paste as `README.md`:

---

# 🌱 PlantVillage Disease Detection System

### **AI-powered plant disease diagnosis using CNN, FastAPI, Gemini API, and React.js**

---

## 🚀 Overview

PlantVillage Disease Detection System is an end-to-end AI application that identifies plant diseases from leaf images.
It uses a **CNN model trained on the PlantVillage dataset**, a **FastAPI backend** for inference, **Google Gemini API** for explanation generation, and a modern **React.js frontend** for seamless user interaction.

The entire project is fully deployed using **Firebase Hosting**.

---

## 🧠 Features

* ✔️ **CNN-based plant disease classifier** (trained on PlantVillage dataset)
* ✔️ **FastAPI backend** for ML inference
* ✔️ **Google Gemini API** to generate disease descriptions & remedies
* ✔️ **React.js frontend** for real-time prediction UI
* ✔️ **Firebase deployment** for scalable hosting
* ✔️ Clean separation of frontend, backend, and ML model
* ✔️ Easy to extend with new crops, models, or APIs

---

## 🏗️ Architecture

```
                   ┌────────────────────────────┐
                   │        React Frontend       │
                   │  (Image Upload + Results)   │
                   └───────────────▲────────────┘
                                   │
                                   ▼
                     ┌────────────────────────┐
                     │      FastAPI Backend   │
                     │  - Model Inference     │
                     │  - Gemini Integration  │
                     └─────────────▲──────────┘
                                   │
                                   ▼
                   ┌────────────────────────────┐
                   │        CNN Model           │
                   │  (PlantVillage Dataset)    │
                   └────────────────────────────┘
```

---

## 📂 Project Structure

```
plantVillage/
│
├── backend/
│   ├── main.py               # FastAPI server
│   ├── model/
│   │   └── plant_cnn.h5      # Trained CNN model
│   ├── utils/
│   │   └── preprocessing.py  # Image preprocessing helpers
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js            # React entry point
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🧩 Tech Stack

### **Machine Learning**

* Convolutional Neural Network (CNN)
* PlantVillage dataset
* TensorFlow / Keras

### **Backend**

* FastAPI
* Python
* Google Gemini API

### **Frontend**

* React.js
* Axios
* TailwindCSS / CSS

### **Deployment**

* Firebase Hosting

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/Akshaj-mishra/plantVillage
cd plantVillage
```

---

## 🌐 Backend Setup (FastAPI)

### **Install dependencies**

```bash
cd backend
pip install -r requirements.txt
```

### **Start server**

```bash
uvicorn main:app --reload
```

Backend URL:

```
http://localhost:8000
```

---

## 💻 Frontend Setup (React.js)

```bash
cd frontend
npm install
npm start
```

Frontend URL:

```
http://localhost:3000
```

---

## 🔑 Environment Variables

### **Backend `.env`**

```
GEMINI_API_KEY=your_key_here
```

### **Frontend `.env`**

```
REACT_APP_BACKEND_URL=http://localhost:8000
```

---

## 🚀 Deployment (Firebase)

### Build frontend:

```bash
npm run build
```

### Deploy:

```bash
firebase deploy
```

---

## 📊 Dataset

The CNN model is trained on the **PlantVillage Dataset** containing:

* 54,000+ labeled plant leaf images
* 38 disease classes
* 14 crop varieties

Dataset reference:
**PlantVillage: A Dataset for Plant Disease Classification**

---

## 📦 API Endpoints

### `POST /predict`

Predicts plant disease from uploaded image.

**Body:**

* `image`: file (leaf image)

**Response:**

```json
{
  "prediction": "Tomato Early Blight",
  "confidence": 0.94,
  "explanation": "Gemini-generated disease description and cure"
}
```

---

## 🤖 How It Works

1. User uploads a leaf image
2. React sends the file to FastAPI
3. CNN model predicts disease
4. Gemini API generates explanation & treatment
5. Results displayed in UI

---

## 🛡️ Future Improvements

* Add more datasets and crops
* Replace CNN with EfficientNet or MobileNet
* Add offline mode using TensorFlow.js
* Mobile app version
* Fertilizer / pesticide recommendation engine

---

## ⭐ Contributing

Contributions are welcome!
Feel free to open an issue or submit a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.

---
