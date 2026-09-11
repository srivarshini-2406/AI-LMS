import re


def clean_text(text):
    text = text.replace("\n", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def get_sentences(text):
    sentences = re.split(r"(?<=[.!?])\s+", text)
    return [s.strip() for s in sentences if len(s.strip()) > 30]


def generate_course(text):

    text = clean_text(text)
    sentences = get_sentences(text)

    # Use meaningful parts of the document
    if len(sentences) >= 6:
        intro = " ".join(sentences[:3])
        concepts = " ".join(sentences[3:6])
        advanced = " ".join(sentences[6:9])
    else:
        intro = text[:500]
        concepts = text[500:1000]
        advanced = text[1000:1500]

    course = {
        "course_title": "AI Generated Learning Course",

        "description": (
            "This course was automatically created from "
            "the uploaded learning material."
        ),

        "learning_objectives": [
            "Understand the fundamental concepts covered in the material",
            "Identify and explain important topics from the document",
            "Apply the learned concepts through assessment",
            "Review weak areas using personalized recommendations"
        ],

        "modules": [

            {
                "title": "Module 1: Introduction",
                "topics": [
                    {
                        "title": "Overview",
                        "summary": intro
                    },
                    {
                        "title": "Learning Foundations",
                        "summary": (
                            "This section introduces the learner "
                            "to the important ideas and background "
                            "presented in the uploaded material."
                        )
                    }
                ]
            },

            {
                "title": "Module 2: Key Concepts",
                "topics": [
                    {
                        "title": "Core Concepts",
                        "summary": concepts
                    },
                    {
                        "title": "Important Information",
                        "summary": (
                            "Learners should focus on the important "
                            "definitions, concepts and explanations "
                            "present in this section."
                        )
                    }
                ]
            },

            {
                "title": "Module 3: Advanced Learning",
                "topics": [
                    {
                        "title": "Further Study",
                        "summary": advanced
                    },
                    {
                        "title": "Revision",
                        "summary": (
                            "Review the important concepts from "
                            "the previous modules before attempting "
                            "the assessment."
                        )
                    }
                ]
            }
        ],

        "quiz": [
            {
                "question": "What is the main purpose of this course?",
                "options": [
                    "To understand the uploaded learning material",
                    "To play games",
                    "To edit photos",
                    "None of the above"
                ],
                "answer": "To understand the uploaded learning material"
            },

            {
                "question": "What is the course generated from?",
                "options": [
                    "Uploaded PDF content",
                    "A calculator",
                    "A video game",
                    "None of the above"
                ],
                "answer": "Uploaded PDF content"
            },

            {
                "question": "What should a learner do after studying the modules?",
                "options": [
                    "Attempt the assessment",
                    "Close the application",
                    "Delete the course",
                    "None of the above"
                ],
                "answer": "Attempt the assessment"
            }
        ]
    }

    return course