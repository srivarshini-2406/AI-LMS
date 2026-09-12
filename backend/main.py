from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pdf_processor import extract_text_from_pdf
from ai_engine import generate_course

app = FastAPI()

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174","http://localhost:5173"],
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

    # Check whether the uploaded file is a PDF
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    try:
        text = extract_text_from_pdf(file.file)

        return {
            "filename": file.filename,
            "text": text
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing PDF: {str(e)}"
        )


@app.post("/generate-course")
async def create_course(file: UploadFile = File(...)):

    # Check whether the uploaded file is a PDF
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    try:
        text = extract_text_from_pdf(file.file)

        course = generate_course(text)

        return course

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating course: {str(e)}"
        )