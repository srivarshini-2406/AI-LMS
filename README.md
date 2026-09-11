# AI-Powered Learning Management System & Course Builder

## About the Project

This project is an AI-powered Learning Management System that helps learners turn their existing study materials into a structured and interactive course.

Instead of manually going through a large PDF and creating notes or questions, the user can upload a learning material PDF. The system extracts the content and converts it into course modules, topics, learning objectives, and a quiz.

After completing the quiz, the system evaluates the learner's performance and provides a personalized recommendation based on the score.

The main idea behind this project is to make self-learning more organized, interactive, and personalized.

---

## Problem We Are Trying to Solve

Students often have learning materials in the form of long PDFs or textbooks, but they may not know:

- Where to start studying
- Which topics are important
- How to divide the material into smaller sections
- Whether they have understood the material
- Which topics they need to revise

Our system tries to solve this by converting the learning material into a simple learning flow.

---

## How It Works

The system follows this process:

PDF Learning Material  
↓  
Text Extraction  
↓  
Course Generation  
↓  
Modules & Topics  
↓  
Learning Objectives  
↓  
Interactive Quiz  
↓  
Score Evaluation  
↓  
Personalized Recommendation

---

## Main Features

### 1. PDF Upload

The learner can upload a PDF containing study material.

### 2. Text Extraction

The backend extracts readable text from the uploaded PDF using Python.

### 3. Course Generation

The extracted content is organized into:

- Course title
- Course description
- Learning objectives
- Modules
- Topics
- Topic summaries

### 4. Interactive Quiz

A quiz is generated as part of the course.

Learners can select their answers directly from the interface.

### 5. Automatic Score Evaluation

After submitting the quiz, the system calculates the learner's score automatically.

### 6. Personalized Recommendations

The system gives feedback based on the learner's performance.

For example:

- High score → Suggests moving to advanced topics
- Medium score → Suggests revising missed topics
- Low score → Suggests reviewing the modules and attempting the quiz again

### 7. Course Progress

The interface shows the learner's course progress and marks the course as completed after the assessment.

---

## Technology Used

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Python
- FastAPI
- Uvicorn

### PDF Processing

- pypdf

### Course Generation

- Python-based course generation engine

### Communication

- REST API
- JSON

---

## Project Structure

```text
AI-LMS/
│
├── backend/
│   ├── ai_engine.py
│   ├── main.py
│   └── pdf_processor.py
│
├── frontend/
│   └── frontend_new/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   ├── index.css
│       │   └── main.jsx
│       │
│       ├── package.json
│       └── vite.config.js
│
├── .gitignore
└── README.md
