from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store (simple)
PASTES = {}

class Paste(BaseModel):
    content: str

@app.post("/api/pastes")
def create_paste(paste: Paste):
    paste_id = str(uuid.uuid4())[:8]
    PASTES[paste_id] = paste.content
    return {"id": paste_id}

@app.get("/api/pastes/{paste_id}")
def get_paste(paste_id: str):
    if paste_id not in PASTES:
        return {"error": "Not found"}
    return {"content": PASTES[paste_id]}
