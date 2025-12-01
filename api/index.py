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
    suspicious_frames: list = []

@app.get("/")
def read_root():
    return {"status": "online", "system": "IplusDeepfake Forensic Engine"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_media(file: UploadFile = File(...)):
    # Advanced Simulation Logic
    import random
    import time
    
    # Simulate processing delay for realism
    time.sleep(2)
    
    # Deterministic "random" based on filename length to keep results consistent for same file
    seed = len(file.filename)
    random.seed(seed)
    
    is_fake = random.choice([True, False])
    confidence = random.uniform(88.0, 99.9) if is_fake else random.uniform(92.0, 99.9)
    
    # Generate fake timeline data
    suspicious_frames = []
    if is_fake:
        for i in range(random.randint(3, 8)):
            suspicious_frames.append({
                "timestamp": round(random.uniform(0.5, 15.0), 2),
                "score": round(random.uniform(0.8, 0.99), 2)
            })
            
    return {
        "filename": file.filename,
        "is_deepfake": is_fake,
        "confidence": round(confidence, 2),
        "artifacts": {
            "gan_noise": "detected" if is_fake else "clean",
            "face_warping": "high_variance" if is_fake else "none",
            "rppg_signal": "irregular_heartbeat" if is_fake else "normal_sinus_rhythm",
            "metadata_integrity": "modified" if is_fake else "verified"
        },
        "suspicious_frames": sorted(suspicious_frames, key=lambda x: x['timestamp'])
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
