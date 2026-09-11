from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pdf_processor import extract_text_from_pdf
from ai_engine import generate_course

app = FastAPI()

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI LMS Backend is running!"
    }


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    text = extract_text_from_pdf(file.file)

    return {
        "filename": file.filename,
        "text": text
    }


@app.post("/generate-course")
async def create_course(file: UploadFile = File(...)):

    try:
        text = extract_text_from_pdf(file.file)

        course = generate_course(text)

        return course

    except Exception as e:
        return {
            "error": str(e)
        }