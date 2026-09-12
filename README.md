🎓 AI LMS — AI-Powered Learning Management System & Course Builder

Turn your study material into a structured, interactive learning experience.

AI LMS helps learners convert their existing PDF study material into a structured course — complete with modules, topics, learning objectives, an interactive quiz, automatic scoring, and personalized recommendations.

Instead of manually reading a long PDF and creating your own notes and questions, you upload the material and the system does the heavy lifting of organizing it into something you can actually study from.

📖 About the Project

This project is an AI-powered Learning Management System that helps learners turn their existing study materials into a structured and interactive course.

Instead of manually going through a large PDF and creating notes or questions, the user can upload a learning material PDF. The system extracts the content and converts it into course modules, topics, learning objectives, and a quiz.

After completing the quiz, the system evaluates the learner's performance and provides a personalized recommendation based on the score.

The main idea behind this project is to make self-learning more organized, interactive, and personalized.

❓ Problem We Are Trying to Solve

Students often have learning materials in the form of long PDFs or textbooks, but they may not know:

Where to start studying
Which topics are important
How to divide the material into smaller sections
Whether they have understood the material
Which topics they need to revise

Our system tries to solve this by converting the learning material into a simple, guided learning flow.

🔄 How It Works
PDF Learning Material
        │
        ▼
   Text Extraction
        │
        ▼
  Course Generation
        │
        ▼
  Modules & Topics
        │
        ▼
 Learning Objectives
        │
        ▼
  Interactive Quiz
        │
        ▼
  Score Evaluation
        │
        ▼
Personalized Recommendation
Upload — The learner selects a PDF containing study material.
Extract — The FastAPI backend extracts readable text from the PDF using pypdf.
Generate — The course-generation engine organizes the content into a title, description, objectives, modules, and topics.
Practice — The learner takes an automatically generated quiz.
Evaluate — The system calculates the score and checks performance.
Recommend — Based on the score, the learner receives a personalized recommendation.
Track — Course progress is shown, and the course is marked complete after the assessment.
✨ Main Features
Feature	Description
📄 PDF Upload	Upload a PDF containing study material directly through the interface
📑 Text Extraction	Extracts readable text from the uploaded PDF using Python
🧠 Course Generation	Organizes extracted content into a course title, description, learning objectives, modules, and topics
🎯 Learning Objectives	Objectives are generated for each module/topic
📝 Interactive Quiz	Learners answer quiz questions directly from the interface
📊 Automatic Score Evaluation	The score is calculated automatically after quiz submission
💡 Personalized Recommendations	Feedback is tailored to performance (see below)
📈 Course Progress	Shows progress and marks the course as completed after the assessment
How recommendations work
High score → Suggests moving on to advanced topics
Medium score → Suggests revising the topics that were missed
Low score → Suggests reviewing the modules again and retaking the quiz
🛠️ Technology Stack
Layer	Technology
Frontend	React
Frontend Build Tool	Vite
Frontend Languages	JavaScript, HTML, CSS
Backend	Python
API Framework	FastAPI
Server	Uvicorn
PDF Processing	pypdf
Course Generation	Python-based course generation engine
Communication	REST API (JSON)
📂 Project Structure
AI-LMS/
│
├── backend/
│   ├── ai_engine.py          # Course generation engine
│   ├── main.py                # FastAPI application entry point
│   ├── pdf_processor.py       # PDF text extraction
│   ├── requirements.txt
│   └── .env
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
│   │   ├── App.jsx           # Main application UI and logic
│   │   ├── App.css           # App-specific styling
│   │   ├── index.css         # Global styling
│   │   └── main.jsx          # React entry point
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
🧩 Component Responsibilities

backend/main.py The FastAPI entry point. Handles API routing, CORS configuration, receiving PDF uploads, and returning structured JSON responses.

backend/pdf_processor.py Extracts text from uploaded PDF files using pypdf, which is then passed on to the course generation engine.

backend/ai_engine.py Transforms extracted text into a structured course: title, description, learning objectives, modules, topics, and quiz questions.

frontend/src/App.jsx The main React application — handles PDF selection, API requests, course display, quiz interaction, scoring, recommendations, and progress tracking.

⚡ Quick Start
Requirements
Python 3.x
Node.js
npm
Git
1. Clone the repository
bash
git clone https://github.com/srivarshini-2406/AI-LMS.git
cd AI-LMS
2. Start the backend
bash
cd backend
python -m venv venv

Activate the virtual environment:

bash
# Windows PowerShell
.\venv\Scripts\Activate.ps1

# macOS / Linux
source venv/bin/activate

Install dependencies and start the server:

bash
pip install -r requirements.txt
uvicorn main:app --reload
Backend: http://127.0.0.1:8000
Interactive API docs: http://127.0.0.1:8000/docs
3. Start the frontend

Open a new terminal:

bash
cd frontend
npm install
npm run dev
Frontend: http://localhost:5173
4. Use the application

Open the frontend in your browser → upload a PDF → generate a course → explore the modules and objectives → take the quiz → view your score → get a personalized recommendation → track your progress.

🔌 API Overview

FastAPI automatically generates interactive documentation, available at /docs once the backend is running.

GET / Health check to confirm the backend is running.

POST /upload-pdf Uploads a PDF and returns the extracted text.

POST /generate-course Uploads a PDF and returns a structured course as JSON, including the title, description, learning objectives, modules, topics, and quiz.

🔐 Security

Sensitive information (API keys, credentials, environment variables) should never be committed to the repository. Typical entries in .gitignore include:

.env
venv/
__pycache__/
*.pyc
node_modules/
dist/
⚠️ Current Limitations

This repository represents a functional MVP rather than a production LMS:

Course generation currently runs on a local, rule-based engine rather than a full LLM.
Progress and quiz results are session-based and not persisted in a database.
User authentication is not yet implemented.
The project is set up for local development; cloud deployment is not yet included.

These are intentional MVP boundaries, not oversights, and outline clear directions for future work.

🗺️ Roadmap
 LLM-based course generation and question generation
 Semantic topic detection and retrieval-augmented study assistant
 Persistent progress and quiz history (database-backed)
 User authentication and student profiles
 Adaptive quiz difficulty based on performance
 Cloud deployment
📚 Documentation

Additional project documentation is maintained alongside this README:

File	Purpose
design.md	System architecture and design decisions
skills.md	Technologies and development skills used
changelog.md	Project version history
updates.md	Current status and planned improvements
TESTING.md	Testing and verification guide
claude.md	Development and maintenance notes
📄 License

This project is currently developed as an academic/community MVP. A formal open-source license can be added when the project is prepared for public distribution.

🔗 Repository

github.com/srivarshini-2406/AI-LMS

AI LMS — Upload. Learn. Practice. Improve. Your learning material becomes your learning system.