# AI-Powered Learning Management System

An AI-assisted Learning Management System that converts PDF learning material into a structured, interactive course.

## 🚀 Features

- 📄 PDF upload and text extraction
- 📚 Automatic topic and module generation
- 🎯 Learning objectives
- 📝 Interactive quizzes
- 🃏 Flashcards
- 📊 Progress tracking
- ⚠️ Weak-topic detection
- 💡 Personalized recommendations
- 🔄 Revision support
- 🤖 Document-based study assistant

## 🔄 How It Works

```text
PDF
 ↓
Text Extraction
 ↓
Course Generation
 ↓
Topics & Modules
 ↓
Quiz / Flashcards
 ↓
Score Analysis
 ↓
Recommendations
🛠️ Tech Stack
Layer	Technology
Frontend	React, Vite, CSS
Backend	Python, FastAPI
PDF Processing	pypdf
Communication	REST API
Tools	VS Code, Git, GitHub
📁 Project Structure
AI_LMS/
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── backend/
│   ├── main.py
│   ├── ai_engine.py
│   ├── pdf_processor.py
│   └── requirements.txt
│
├── design.md
├── skills.md
├── changelog.md
├── updates.md
├── TESTING.md
└── claude.md
🏗️ Architecture
React Frontend
      ↓
FastAPI Backend
      ↓
PDF Processor
      ↓
Course Generation Engine
      ↓
Structured Course JSON
      ↓
React Learning Interface
▶️ Run Locally
Backend
cd backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
Frontend
cd frontend
npm install
npm run dev

Frontend: http://localhost:5173

Backend: http://127.0.0.1:8000

API Docs: http://127.0.0.1:8000/docs

🔐 Security

API keys and environment files are kept out of the repository using .gitignore.

📌 Project Status

Functional MVP

The current version uses a local/rule-based course generation approach and provides the foundation for future LLM integration, database storage, authentication, and advanced adaptive learning.

📖 Documentation
design.md — System architecture
skills.md — Technologies used
TESTING.md — Testing guide
changelog.md — Project history
updates.md — Current updates
claude.md — Development notes
🔗 Repository

GitHub: https://github.com/srivarshini-2406/AI-LMS