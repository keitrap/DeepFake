from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="IplusDeepfake API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisResponse(BaseModel):
    filename: str
    is_deepfake: bool
    confidence: float
    artifacts: dict

@app.get("/")
def read_root():
    return {"status": "online", "system": "IplusDeepfake Forensic Engine"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_media(file: UploadFile = File(...)):
    # Mock analysis logic for now
    # In a real scenario, this would call the ML models
    
    import random
    is_fake = random.choice([True, False])
    confidence = random.uniform(85.0, 99.9) if is_fake else random.uniform(90.0, 99.9)
    
    return {
        "filename": file.filename,
        "is_deepfake": is_fake,
        "confidence": round(confidence, 2),
        "artifacts": {
            "gan_noise": "detected" if is_fake else "clean",
            "face_warping": "possible" if is_fake else "none",
            "rppg_signal": "irregular" if is_fake else "normal"
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
