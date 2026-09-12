# 🎓 AI LMS — AI-Powered Learning Management System & Course Builder

> **Turn your study material into a structured, interactive learning experience.**

AI LMS helps learners convert their existing PDF study material into a structured course — complete with **modules, topics, learning objectives, interactive quizzes, automatic scoring, and personalized recommendations**.

Instead of manually reading a long PDF and creating your own notes and questions, you upload the material and the system organizes it into something you can actually study from.

---

## 📖 About the Project

AI LMS is an AI-powered Learning Management System designed to make self-learning more **organized, interactive, and personalized**.

The learner uploads a PDF containing study material. The system:

1. Extracts the text from the PDF
2. Identifies relevant topics
3. Organizes the content into modules
4. Generates learning objectives
5. Creates an interactive quiz
6. Evaluates the learner's performance
7. Provides personalized recommendations
8. Tracks course progress

The project demonstrates how learning material can be transformed from a static document into an interactive learning experience.

---

## ❓ Problem We Are Trying to Solve

Students often have learning materials in the form of long PDFs or textbooks, but they may not know:

- Where to start studying
- Which topics are important
- How to divide the material into smaller sections
- Whether they have understood the material
- Which topics they need to revise

### Our Approach

AI LMS converts learning material into a simple, guided learning flow:

```text
📄 PDF
   ↓
📑 Text Extraction
   ↓
🧠 Course Generation
   ↓
📚 Modules & Topics
   ↓
🎯 Learning Objectives
   ↓
📝 Interactive Quiz
   ↓
📊 Score Evaluation
   ↓
💡 Personalized Recommendation
   ↓
📈 Progress Tracking
```

---

# ✨ Main Features

| Feature | Description |
|---|---|
| 📄 **PDF Upload** | Upload a PDF containing study material directly through the interface |
| 📑 **Text Extraction** | Extract readable text from uploaded PDFs using Python and pypdf |
| 🧠 **Course Generation** | Organize extracted content into a structured course |
| 🔍 **Topic Detection** | Identify relevant topics from the learning material |
| 📚 **Module Generation** | Organize detected topics into learning modules |
| 🎯 **Learning Objectives** | Generate objectives for modules and topics |
| 📝 **Interactive Quiz** | Allow learners to answer questions directly from the interface |
| 📊 **Automatic Scoring** | Calculate quiz performance automatically |
| ⚠️ **Weak Topic Detection** | Identify topics where the learner needs more revision |
| 💡 **Personalized Recommendations** | Provide learning suggestions based on quiz performance |
| 🃏 **Flashcards** | Support quick revision through generated flashcards |
| 🔄 **Revision** | Provide revision content for weaker areas |
| 🤖 **Study Assistant** | Provide document/topic-based assistance |
| 🔎 **Topic Search** | Search generated course content |
| 📈 **Progress Tracking** | Display course progress and completion status |

---

# 🔄 How It Works

### 1. Upload

The learner selects a PDF containing study material.

### 2. Extract

The FastAPI backend extracts readable text from the PDF using `pypdf`.

### 3. Generate

The course-generation engine processes the extracted content and creates:

- Course title
- Description
- Learning objectives
- Modules
- Topics
- Quiz questions
- Flashcards

### 4. Practice

The learner takes the generated interactive quiz.

### 5. Evaluate

The system calculates the learner's score and analyzes performance.

### 6. Recommend

Based on performance, the system provides a recommendation.

### 7. Revise

The learner can use weak-topic revision, flashcards, and the study assistant.

### 8. Track

The application displays learning progress and completion status.

---

# 💡 How Recommendations Work

The current MVP provides recommendations based on quiz performance.

| Performance | Recommendation |
|---|---|
| 🟢 High Score | Move on to more advanced topics |
| 🟡 Medium Score | Revise the topics where mistakes were made |
| 🔴 Low Score | Review the modules and retake the quiz |

Example:

```text
Quiz Score: 60%

Recommendation:

Revise:
- Machine Learning
- Neural Networks

Then attempt the quiz again.
```

---

# 🧠 Course Generation

The course-generation engine converts extracted PDF content into structured learning information.

```text
PDF Content
    ↓
Text Cleaning
    ↓
Topic Detection
    ↓
Topic Organization
    ↓
Module Creation
    ↓
Learning Objectives
    ↓
Quiz Generation
    ↓
Flashcards
```

The current MVP uses a **Python-based local/rule-based course-generation engine**.

This allows the complete learning workflow to work without requiring a paid external LLM API.

---

# 📝 Interactive Quiz

The quiz allows learners to test their understanding of the uploaded material.

The workflow is:

```text
Question
   ↓
Select Answer
   ↓
Next Question
   ↓
Submit Quiz
   ↓
Calculate Score
   ↓
Identify Weak Topics
   ↓
Generate Recommendation
```

The system displays the learner's score after completing the assessment.

---

# 🃏 Flashcards

AI LMS includes flashcards for quick revision.

Learners can:

- View a question
- Reveal the answer
- Move to the next card
- Move to the previous card

Flashcards are intended for quick revision sessions.

---

# ⚠️ Weak Topic Detection

After the quiz, the system checks incorrect responses and identifies areas that require additional revision.

Example:

```text
Quiz Result
────────────

Score: 6 / 10

Topics to Revise:
• Supervised Learning
• Neural Networks
```

This helps learners focus on specific areas instead of reviewing the entire document again.

---

# 🤖 Study Assistant

The project includes a lightweight document-based study assistant.

The assistant can respond to questions related to topics found in the uploaded learning material.

Example:

```text
User:
What is supervised learning?

Assistant:
Supervised learning is a type of machine learning
where a model learns from labelled training data.
```

The current implementation uses local topic/content matching.

### Future AI Architecture

A future version can use semantic retrieval and an LLM:

```text
PDF
 ↓
Text Chunking
 ↓
Embeddings
 ↓
Vector Database
 ↓
Semantic Retrieval
 ↓
LLM
 ↓
Context-Aware Answer
```

---

# 📈 Progress Tracking

The application provides a simple progress view containing:

- Course progress
- Quiz score
- Completion status
- Weak topics
- Recommendations

The current MVP uses session-based progress tracking.

---

# 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React |
| **Build Tool** | Vite |
| **Languages** | JavaScript, HTML, CSS |
| **Backend** | Python |
| **API Framework** | FastAPI |
| **Server** | Uvicorn |
| **PDF Processing** | pypdf |
| **Course Generation** | Python-based course generation engine |
| **Communication** | REST API / JSON |
| **Environment Configuration** | python-dotenv |
| **Version Control** | Git |
| **Repository** | GitHub |

---

# 📂 Project Structure

```text
AI-LMS/
│
├── backend/
│   ├── ai_engine.py
│   ├── main.py
│   ├── pdf_processor.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── README.md
├── design.md
├── skills.md
├── changelog.md
├── updates.md
├── TESTING.md
├── claude.md
└── .gitignore
```

> **Note:** `.env`, virtual environments, `node_modules`, and other local files are intentionally excluded from the Git repository through `.gitignore`.

---

# 🧩 Component Responsibilities

## Backend

### `backend/main.py`

The FastAPI application entry point.

Responsible for:

- API routing
- CORS configuration
- Receiving PDF uploads
- Calling the PDF processor
- Calling the course-generation engine
- Returning structured JSON responses

---

### `backend/pdf_processor.py`

Responsible for extracting text from uploaded PDF files using `pypdf`.

```text
PDF
 ↓
pypdf
 ↓
Extracted Text
```

The extracted text is then passed to the course-generation engine.

---

### `backend/ai_engine.py`

The main course-generation module.

It transforms extracted text into structured learning content:

- Course title
- Description
- Topics
- Modules
- Learning objectives
- Quiz questions
- Flashcards
- Recommendations

---

# 🎨 Frontend Responsibilities

### `frontend/src/App.jsx`

The main React application.

Handles:

- PDF selection
- API requests
- Course display
- Topic navigation
- Search
- Quiz interaction
- Quiz scoring
- Recommendations
- Flashcards
- Revision
- Progress tracking
- Study assistant

### `frontend/src/App.css`

Contains application-specific styling and layout.

### `frontend/src/index.css`

Contains global styles.

### `frontend/src/main.jsx`

The entry point for the React application.

---

# 🏗️ System Architecture

AI LMS follows a separated frontend-backend architecture.

```text
                    USER
                     │
                     ▼
          ┌─────────────────────┐
          │   React Frontend    │
          │                     │
          │ Course / Quiz       │
          │ Flashcards          │
          │ Dashboard           │
          │ Revision            │
          │ Assistant           │
          └──────────┬──────────┘
                     │
                 REST API
                     │
                     ▼
          ┌─────────────────────┐
          │   FastAPI Backend   │
          │     main.py         │
          └──────────┬──────────┘
                     │
              ┌──────┴──────┐
              ▼             ▼
     ┌──────────────┐ ┌───────────────┐
     │ PDF Processor│ │ Course Engine │
     │              │ │               │
     │   pypdf      │ │ ai_engine.py  │
     └──────────────┘ └───────────────┘
```

---

# 🔌 API Overview

FastAPI automatically generates interactive API documentation.

Once the backend is running:

```text
http://127.0.0.1:8000/docs
```

## `GET /`

Health check to confirm that the backend is running.

Example response:

```json
{
  "message": "AI LMS Backend is running!"
}
```

---

## `POST /upload-pdf`

Uploads a PDF and extracts its text.

### Input

```text
multipart/form-data
file = PDF
```

### Output

Returns the uploaded filename and extracted text.

---

## `POST /generate-course`

Uploads a PDF and generates a structured course.

### Input

```text
multipart/form-data
file = PDF
```

### Output

Returns structured JSON containing information such as:

```json
{
  "course_title": "AI Generated Learning Course",
  "description": "...",
  "learning_objectives": [],
  "detected_topics": [],
  "modules": [],
  "quiz": [],
  "flashcards": []
}
```

---

# ⚡ Quick Start

## Requirements

Make sure the following are installed:

- Python 3.x
- Node.js
- npm
- Git
- Visual Studio Code

---

## 1. Clone the Repository

```bash
git clone https://github.com/srivarshini-2406/AI-LMS.git
cd AI-LMS
```

---

## 2. Start the Backend

Open a terminal:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 3. Start the Frontend

Open a **new terminal**.

Move to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 4. Use the Application

Open the frontend in your browser.

```text
Upload PDF
    ↓
Generate Course
    ↓
Explore Modules
    ↓
Study Topics
    ↓
Take Quiz
    ↓
View Score
    ↓
Check Weak Topics
    ↓
Follow Recommendation
    ↓
Revise
    ↓
Track Progress
```

---

# 🔐 Security

Sensitive information should never be committed to the repository.

Typical entries in `.gitignore` include:

```text
.env
venv/
__pycache__/
*.pyc
node_modules/
dist/
```

API keys, credentials, and environment-specific configuration should remain outside the public repository.

---

# ⚠️ Current Limitations

This repository represents a **functional MVP**, rather than a production LMS.

Current limitations include:

- Course generation currently uses a local, rule-based engine rather than a full LLM.
- Topic detection is currently based on predefined topic patterns.
- Quiz generation is not yet powered by a full language model.
- Adaptive quiz behaviour is currently lightweight rather than a full adaptive-learning algorithm.
- Progress and quiz results are session-based and are not persisted in a database.
- User authentication is not implemented.
- Cloud deployment is not currently included.
- The study assistant currently uses local topic/content matching rather than semantic retrieval.

These are intentional MVP boundaries and provide clear directions for future development.

---

# 🗺️ Roadmap

## Phase 1 — MVP ✅

- [x] React frontend
- [x] FastAPI backend
- [x] PDF upload
- [x] PDF text extraction
- [x] Course generation
- [x] Topic detection
- [x] Module generation
- [x] Learning objectives
- [x] Interactive quiz
- [x] Quiz scoring
- [x] Weak-topic detection
- [x] Personalized recommendations
- [x] Flashcards
- [x] Revision
- [x] Study assistant
- [x] Progress tracking

---

## Phase 2 — Advanced AI

- [ ] LLM-based course generation
- [ ] LLM-based question generation
- [ ] Semantic topic detection
- [ ] Improved difficulty classification
- [ ] Genuine adaptive quiz selection
- [ ] More advanced personalized recommendations

---

## Phase 3 — Intelligent Retrieval

```text
PDF
 ↓
Document Chunking
 ↓
Embeddings
 ↓
Vector Database
 ↓
Semantic Retrieval
 ↓
LLM
 ↓
Context-Aware Study Assistant
```

Potential improvements:

- Semantic document search
- Multi-document learning
- Context-aware answers
- Source-aware responses
- Retrieval-augmented generation

---

## Phase 4 — Student Platform

Future features may include:

- User authentication
- Student profiles
- Persistent learning progress
- Course history
- Multiple courses
- Learning streaks
- Performance analytics
- Teacher/admin dashboard

---

## Phase 5 — Deployment

Future deployment architecture:

```text
                 Internet
                    │
                    ▼
          ┌──────────────────┐
          │ React Frontend   │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ FastAPI Backend  │
          └────────┬─────────┘
                   │
             ┌─────┴─────┐
             ▼           ▼
        Database     AI Services
```

---

# 🧪 Testing

Testing instructions are available in:

```text
TESTING.md
```

The testing guide covers:

- Backend health check
- API documentation
- PDF upload
- Invalid file handling
- Course generation
- Quiz functionality
- Flashcards
- Dashboard
- Revision
- Study assistant

---

# 📚 Documentation

Additional project documentation is maintained alongside the README.

| File | Purpose |
|---|---|
| `README.md` | Project overview, architecture and setup |
| `design.md` | System architecture and design decisions |
| `skills.md` | Technologies and development skills |
| `changelog.md` | Project version history |
| `updates.md` | Current status and future improvements |
| `TESTING.md` | Testing and verification guide |
| `claude.md` | Development and maintenance notes |

---

# 🧠 Design Philosophy

The project follows a modular architecture so that individual components can be changed independently.

```text
Frontend
   │
   └── User Interface

Backend
   │
   └── API Layer

PDF Processor
   │
   └── Document Extraction

Course Engine
   │
   └── Learning Content Generation
```

For example:

| If you want to change... | Main file |
|---|---|
| User interface | `frontend/src/App.jsx` |
| Styling | `frontend/src/App.css` |
| API behaviour | `backend/main.py` |
| PDF extraction | `backend/pdf_processor.py` |
| Course generation | `backend/ai_engine.py` |

This separation makes the system easier to debug, maintain, and extend.

---

# 📌 Project Status

**Status: Functional MVP**

The current version demonstrates the complete core learning workflow:

```text
📄 PDF
 ↓
📑 Text Extraction
 ↓
🧠 Course Generation
 ↓
📚 Topics & Modules
 ↓
🎯 Learning Objectives
 ↓
📝 Quiz
 ↓
📊 Score Evaluation
 ↓
⚠️ Weak Topics
 ↓
💡 Recommendations
 ↓
🔄 Revision
 ↓
📈 Progress
```

The architecture provides a foundation for future integration of stronger AI models, semantic retrieval, persistent databases, authentication, and cloud deployment.

---

# 🌱 Future Vision

The long-term goal of AI LMS is to move beyond simply generating a course.

The system can eventually understand:

```text
What the learner studies
          ↓
What the learner understands
          ↓
Where the learner struggles
          ↓
What the learner should study next
```

This can evolve into a personalized learning platform that continuously adapts the learning experience to the learner.

---

# 🎓 Example Learning Scenario

A student uploads:

```text
Machine_Learning_Notes.pdf
```

The system can transform the material into:

```text
AI Generated Learning Course
│
├── Module 1
│   ├── Artificial Intelligence
│   └── AI Applications
│
├── Module 2
│   ├── Machine Learning
│   ├── Supervised Learning
│   └── Unsupervised Learning
│
└── Module 3
    └── Neural Networks
```

The learner can then:

```text
Study
  ↓
Take Quiz
  ↓
Score: 60%
  ↓
Identify Weak Topics
  ↓
Revision
  ↓
Flashcards
  ↓
Practice Again
```

The central idea is:

> **Learning material should not just be stored. It should be transformed into an actionable learning experience.**

---

# 📄 License

This project is currently developed as an **academic/community technology-team MVP**.

A formal open-source license can be added when the project is prepared for public distribution.

---

# 🔗 Repository

**GitHub:**  
https://github.com/srivarshini-2406/AI-LMS

---

# 🚀 AI LMS

### Upload. Learn. Practice. Improve.

> **Your learning material becomes your learning system.**