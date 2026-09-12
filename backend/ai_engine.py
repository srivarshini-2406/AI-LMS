import re
import random


def clean_text(text):
    text = text.replace("\x00", " ")
    text = text.replace("\n", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def get_sentences(text):
    sentences = re.split(r"(?<=[.!?])\s+", text)

    return [
        sentence.strip()
        for sentence in sentences
        if len(sentence.strip()) > 35
    ]


def find_topics(text):
    """
    Detects common educational topics from the document.
    """

    topic_keywords = {
        "Artificial Intelligence": [
            "artificial intelligence",
            "intelligent systems",
            "AI"
        ],

        "Machine Learning": [
            "machine learning",
            "machine learning model",
            "ML"
        ],

        "Supervised Learning": [
            "supervised learning",
            "classification",
            "regression",
            "labelled data",
            "labeled data"
        ],

        "Unsupervised Learning": [
            "unsupervised learning",
            "clustering",
            "unlabelled data",
            "unlabeled data"
        ],

        "Reinforcement Learning": [
            "reinforcement learning",
            "reward",
            "penalty",
            "environment",
            "agent"
        ],

        "Neural Networks": [
            "neural network",
            "neurons",
            "input layer",
            "hidden layer",
            "output layer"
        ],

        "AI Applications": [
            "applications of AI",
            "education",
            "healthcare",
            "finance",
            "transportation",
            "customer service"
        ]
    }

    detected_topics = []

    lower_text = text.lower()

    for topic, keywords in topic_keywords.items():

        for keyword in keywords:

            if keyword.lower() in lower_text:
                detected_topics.append(topic)
                break

    return detected_topics


def get_topic_sentences(sentences, topic):
    """
    Finds sentences related to a detected topic.
    """

    keywords = topic.lower().split()

    related = []

    for sentence in sentences:

        sentence_lower = sentence.lower()

        matches = 0

        for keyword in keywords:

            if keyword in sentence_lower:
                matches += 1

        if matches > 0:
            related.append(sentence)

    return related


def create_topic_summary(sentences, topic):

    related = get_topic_sentences(
        sentences,
        topic
    )

    if not related:

        return (
            f"This topic covers important concepts "
            f"related to {topic}."
        )

    summary = " ".join(related[:4])

    return summary[:700]


def create_modules(sentences, topics):

    modules = []

    if not topics:

        topics = [
            "Introduction",
            "Core Concepts",
            "Advanced Concepts"
        ]

    for index, topic in enumerate(topics):

        if index == 0:
            difficulty = "Easy"

        elif index < 4:
            difficulty = "Medium"

        else:
            difficulty = "Hard"

        summary = create_topic_summary(
            sentences,
            topic
        )

        modules.append({

            "title": f"Module {index + 1}: {topic}",

            "difficulty": difficulty,

            "topics": [

                {
                    "title": topic,
                    "summary": summary,
                    "difficulty": difficulty
                },

                {
                    "title": f"{topic} - Key Points",
                    "summary": (
                        f"Important ideas to remember about "
                        f"{topic}. Review the definitions, "
                        f"concepts and applications related "
                        f"to this topic."
                    ),
                    "difficulty": difficulty
                }

            ]
        })

    return modules


def create_learning_objectives(topics):

    objectives = [
        "Understand the major concepts covered in the learning material",
        "Identify important topics and their key characteristics",
        "Explain important concepts using appropriate terminology",
        "Apply the learned concepts to basic problems",
        "Evaluate understanding using quizzes and revision activities"
    ]

    if topics:

        objectives.append(
            "Review and compare the major topics: "
            + ", ".join(topics[:5])
        )

    return objectives


def generate_questions(sentences, topics):

    questions = []

    # Question 1
    questions.append({
        "question": "What is the main purpose of this learning material?",
        "options": [
            "To understand the concepts presented in the material",
            "To design a video game",
            "To edit photographs",
            "To manage financial accounts"
        ],
        "answer": "To understand the concepts presented in the material",
        "topic": "Introduction",
        "difficulty": "Easy"
    })

    # Question 2
    questions.append({
        "question": "Which activity best helps a learner after completing a module?",
        "options": [
            "Review the topic and attempt an assessment",
            "Delete the learning material",
            "Skip all revision",
            "Close the application immediately"
        ],
        "answer": "Review the topic and attempt an assessment",
        "topic": "Revision",
        "difficulty": "Easy"
    })

    # Question 3 - document based
    if len(sentences) > 0:

        sentence = sentences[0]

        correct = sentence[:180]

        questions.append({
            "question": "Which statement is supported by the uploaded learning material?",
            "options": [
                correct,
                "The material focuses entirely on cooking.",
                "The material contains only sports information.",
                "The material contains no educational information."
            ],
            "answer": correct,
            "topic": topics[0] if topics else "Core Concepts",
            "difficulty": "Easy"
        })

    # Generate topic-based questions
    for topic in topics:

        related = get_topic_sentences(
            sentences,
            topic
        )

        if not related:
            continue

        sentence = related[0]

        question = f"What is an important idea related to {topic}?"

        correct = sentence[:180]

        options = [
            correct,
            "It is unrelated to the learning material.",
            "It is used only for entertainment.",
            "It does not involve any useful concepts."
        ]

        questions.append({
            "question": question,
            "options": options,
            "answer": correct,
            "topic": topic,
            "difficulty": "Medium"
        })

        if len(related) > 1:

            second = related[1][:180]

            questions.append({
                "question": (
                    f"Which statement is associated with "
                    f"{topic}?"
                ),
                "options": [
                    second,
                    "It is completely unrelated to the topic.",
                    "It is only used for drawing pictures.",
                    "It cannot be studied or analyzed."
                ],
                "answer": second,
                "topic": topic,
                "difficulty": "Hard"
            })

    return questions[:10]


def create_flashcards(sentences, topics):

    flashcards = []

    for topic in topics:

        related = get_topic_sentences(
            sentences,
            topic
        )

        if related:

            flashcards.append({
                "front": f"What is {topic}?",
                "back": related[0][:400],
                "topic": topic
            })

    return flashcards[:8]


def generate_course(text):

    text = clean_text(text)

    sentences = get_sentences(text)

    if not sentences:

        sentences = [
            text[:500]
            if text
            else
            "No readable text was found in the uploaded PDF."
        ]

    topics = find_topics(text)

    modules = create_modules(
        sentences,
        topics
    )

    objectives = create_learning_objectives(
        topics
    )

    quiz = generate_questions(
        sentences,
        topics
    )

    flashcards = create_flashcards(
        sentences,
        topics
    )

    course = {

        "course_title":
            "AI Generated Learning Course",

        "description": (
            "A personalized learning course generated "
            "from the uploaded PDF. The system extracts "
            "important concepts, organizes them into "
            "learning modules and generates assessments."
        ),

        "learning_objectives":
            objectives,

        "detected_topics":
            topics,

        "modules":
            modules,

        "quiz":
            quiz,

        "flashcards":
            flashcards,

        "features": [

            "Automatic Topic Detection",

            "Document-Based Course Generation",

            "Difficulty Classification",

            "Adaptive Quiz",

            "Weak Topic Detection",

            "Personalized Recommendations",

            "Revision Quiz",

            "Flashcards",

            "Progress Dashboard",

            "Topic Search",

            "Document-Based Study Assistant"

        ],

        "study_assistant": {

            "enabled": True,

            "message": (
                "The study assistant can answer questions "
                "using the generated course content."
            )

        }

    }

    return course