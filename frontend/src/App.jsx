import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [weakTopics, setWeakTopics] = useState([]);
  const [completed, setCompleted] = useState(false);

  const [activeTab, setActiveTab] = useState("course");
  const [difficulty, setDifficulty] = useState("All");
  const [search, setSearch] = useState("");

  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [assistantQuestion, setAssistantQuestion] = useState("");
  const [assistantAnswer, setAssistantAnswer] = useState("");

  const generateCourse = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    setLoading(true);
    setCourse(null);
    setAnswers({});
    setScore(null);
    setRecommendation("");
    setWeakTopics([]);
    setCompleted(false);
    setCurrentFlashcard(0);
    setShowAnswer(false);
    setAssistantAnswer("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-course",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Failed to generate course");
      } else {
        setCourse(data);
      }
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong. Make sure the backend is running."
      );
    }

    setLoading(false);
  };

  const selectAnswer = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  const submitQuiz = () => {
    if (!course?.quiz?.length) {
      return;
    }

    let total = 0;
    const weak = [];

    course.quiz.forEach((question, index) => {
      if (answers[index] === question.answer) {
        total++;
      } else {
        weak.push(
          question.topic || "General Concepts"
        );
      }
    });

    setScore(total);
    setWeakTopics(weak);
    setCompleted(true);

    const percentage =
      (total / course.quiz.length) * 100;

    if (percentage === 100) {
      setRecommendation(
        "Excellent! You have mastered the course. You can move to advanced topics."
      );
    } else if (percentage >= 70) {
      setRecommendation(
        "Very good performance! Revise the few topics you missed."
      );
    } else if (percentage >= 50) {
      setRecommendation(
        "Good progress! Focus on your weak topics and attempt the revision quiz."
      );
    } else {
      setRecommendation(
        "More practice is recommended. Review the modules and retry the assessment."
      );
    }

    setActiveTab("dashboard");
  };

  const matchesSearch = (text) => {
    if (!search.trim()) {
      return true;
    }

    return text
      .toLowerCase()
      .includes(search.toLowerCase());
  };

  const matchesDifficulty = (value) => {
    if (difficulty === "All") {
      return true;
    }

    return value === difficulty;
  };

  const getUniqueWeakTopics = () => {
    return [...new Set(weakTopics)];
  };

  const revisionQuestions =
    course?.quiz?.filter((question) => {
      if (weakTopics.length === 0) {
        return false;
      }

      return weakTopics.includes(
        question.topic || "General Concepts"
      );
    }) || [];

  const askAssistant = () => {
    if (!assistantQuestion.trim()) {
      return;
    }

    const question =
      assistantQuestion.toLowerCase();

    let answer =
      "Review the course modules and focus on the concepts related to your question.";

    if (
      question.includes("summary") ||
      question.includes("summarize")
    ) {
      answer =
        course?.description ||
        "Review the module summaries for the main ideas.";
    } else if (
      question.includes("weak") ||
      question.includes("improve")
    ) {
      answer =
        weakTopics.length > 0
          ? `Your weak topics are: ${getUniqueWeakTopics().join(
              ", "
            )}. Revise these topics and retry the assessment.`
          : "Complete the quiz first so weak topics can be detected.";
    } else if (
      question.includes("topic") ||
      question.includes("topics")
    ) {
      answer =
        course?.detected_topics?.length > 0
          ? `The detected topics are: ${course.detected_topics.join(
              ", "
            )}.`
          : "No specific topics were detected.";
    } else if (question.includes("module")) {
      answer = `Your course contains ${
        course?.modules?.length || 0
      } learning modules.`;
    } else if (question.includes("quiz")) {
      answer = `Your course contains ${
        course?.quiz?.length || 0
      } assessment questions.`;
    } else if (
      question.includes("flashcard")
    ) {
      answer = `There are ${
        course?.flashcards?.length || 0
      } flashcards available for revision.`;
    } else if (
      question.includes("objective") ||
      question.includes("goal")
    ) {
      answer =
        course?.learning_objectives?.join(
          " "
        ) ||
        "The course objectives are shown in the Learning Objectives section.";
    }

    setAssistantAnswer(answer);
  };

  const nextFlashcard = () => {
    if (!course?.flashcards?.length) {
      return;
    }

    setCurrentFlashcard(
      (currentFlashcard + 1) %
        course.flashcards.length
    );

    setShowAnswer(false);
  };

  const previousFlashcard = () => {
    if (!course?.flashcards?.length) {
      return;
    }

    setCurrentFlashcard(
      currentFlashcard === 0
        ? course.flashcards.length - 1
        : currentFlashcard - 1
    );

    setShowAnswer(false);
  };

  const resetQuiz = () => {
    setAnswers({});
    setScore(null);
    setRecommendation("");
    setWeakTopics([]);
    setCompleted(false);
    setActiveTab("quiz");
  };

  const quizAnsweredCount =
    course?.quiz
      ? Object.keys(answers).length
      : 0;

  const quizProgress =
    course?.quiz?.length
      ? Math.round(
          (quizAnsweredCount /
            course.quiz.length) *
            100
        )
      : 0;

  return (
    <div style={pageStyle}>

      {/* HEADER */}

      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>
            🤖 AI Learning Management System
          </h1>

          <p style={subtitleStyle}>
            Transform your PDF learning material into an
            interactive personalized course
          </p>
        </div>

        {course && (
          <div style={statusBadge}>
            ✓ Course Ready
          </div>
        )}
      </header>

      <main style={containerStyle}>

        {/* UPLOAD */}

        {!course && (
          <section style={uploadCard}>
            <div style={uploadIcon}>
              📚
            </div>

            <h2>
              Upload Learning Material
            </h2>

            <p style={mutedText}>
              Upload a PDF and automatically generate
              modules, topics, quizzes and revision
              material.
            </p>

            <label style={fileLabel}>
              <input
                type="file"
                accept=".pdf,application/pdf"
                style={{
                  display: "none",
                }}
                onChange={(event) =>
                  setFile(
                    event.target.files[0]
                  )
                }
              />

              📎 Choose PDF
            </label>

            {file && (
              <div style={selectedFile}>
                <strong>
                  Selected:
                </strong>{" "}
                {file.name}
              </div>
            )}

            <button
              style={{
                ...mainButton,
                opacity: loading ? 0.6 : 1,
              }}
              onClick={generateCourse}
              disabled={loading}
            >
              {loading
                ? "Generating Course..."
                : "🚀 Generate Course"}
            </button>

            {loading && (
              <div style={loadingBox}>
                <div style={spinner}>
                  ⏳
                </div>

                <p>
                  Extracting PDF content and creating
                  your personalized course...
                </p>
              </div>
            )}
          </section>
        )}

        {/* NAVIGATION */}

        {course && (
          <>
            <nav style={navContainer}>

              <button
                style={navButton(
                  activeTab === "course"
                )}
                onClick={() =>
                  setActiveTab("course")
                }
              >
                📖 Course
              </button>

              <button
                style={navButton(
                  activeTab === "quiz"
                )}
                onClick={() =>
                  setActiveTab("quiz")
                }
              >
                📝 Quiz
              </button>

              <button
                style={navButton(
                  activeTab === "flashcards"
                )}
                onClick={() =>
                  setActiveTab("flashcards")
                }
              >
                🃏 Flashcards
              </button>

              <button
                style={navButton(
                  activeTab === "dashboard"
                )}
                onClick={() =>
                  setActiveTab("dashboard")
                }
              >
                📊 Dashboard
              </button>

              <button
                style={navButton(
                  activeTab === "revision"
                )}
                onClick={() =>
                  setActiveTab("revision")
                }
              >
                🔄 Revision
              </button>

              <button
                style={navButton(
                  activeTab === "assistant"
                )}
                onClick={() =>
                  setActiveTab("assistant")
                }
              >
                🤖 Assistant
              </button>

            </nav>

            {/* COURSE TAB */}

            {activeTab === "course" && (
              <>
                <section style={heroCard}>
                  <span style={smallBadge}>
                    AI GENERATED COURSE
                  </span>

                  <h2>
                    {course.course_title}
                  </h2>

                  <p style={heroDescription}>
                    {course.description}
                  </p>

                  <div style={heroStats}>

                    <HeroStat
                      icon="📚"
                      value={
                        course.modules?.length || 0
                      }
                      label="Modules"
                    />

                    <HeroStat
                      icon="🧠"
                      value={
                        course.detected_topics
                          ?.length || 0
                      }
                      label="Topics"
                    />

                    <HeroStat
                      icon="📝"
                      value={
                        course.quiz?.length || 0
                      }
                      label="Questions"
                    />

                    <HeroStat
                      icon="🃏"
                      value={
                        course.flashcards
                          ?.length || 0
                      }
                      label="Flashcards"
                    />

                  </div>
                </section>

                {/* DETECTED TOPICS */}

                <section style={cardStyle}>
                  <h2>
                    🔍 Automatically Detected Topics
                  </h2>

                  <p style={mutedText}>
                    Important topics were identified
                    from the uploaded learning material.
                  </p>

                  <div style={topicTagContainer}>
                    {course.detected_topics?.map(
                      (topic, index) => (
                        <span
                          key={index}
                          style={topicTag}
                        >
                          {topic}
                        </span>
                      )
                    )}
                  </div>
                </section>

                {/* FEATURES */}

                <section style={featureGrid}>

                  <FeatureCard
                    icon="🧠"
                    title="Adaptive Learning"
                    text="Learning content and assessments are organized according to topic difficulty."
                  />

                  <FeatureCard
                    icon="🎯"
                    title="Weak Topic Detection"
                    text="Incorrect answers are linked to topics that need revision."
                  />

                  <FeatureCard
                    icon="🃏"
                    title="Smart Flashcards"
                    text="Quick revision cards are generated from course topics."
                  />

                  <FeatureCard
                    icon="📈"
                    title="Progress Dashboard"
                    text="Monitor quiz performance and course completion."
                  />

                </section>

                {/* OBJECTIVES */}

                <section style={cardStyle}>
                  <h2>
                    🎯 Learning Objectives
                  </h2>

                  {course.learning_objectives?.map(
                    (objective, index) => (
                      <div
                        key={index}
                        style={objectiveStyle}
                      >
                        <span style={checkIcon}>
                          ✓
                        </span>

                        <span>
                          {objective}
                        </span>
                      </div>
                    )
                  )}
                </section>

                {/* FILTER */}

                <section style={filterCard}>

                  <div style={filterGroup}>
                    <label>
                      🔍 Search Topics
                    </label>

                    <input
                      value={search}
                      onChange={(event) =>
                        setSearch(
                          event.target.value
                        )
                      }
                      placeholder="Search modules or topics..."
                      style={inputStyle}
                    />
                  </div>

                  <div style={filterGroup}>
                    <label>
                      🎚 Difficulty
                    </label>

                    <select
                      value={difficulty}
                      onChange={(event) =>
                        setDifficulty(
                          event.target.value
                        )
                      }
                      style={inputStyle}
                    >
                      <option value="All">
                        All Difficulties
                      </option>

                      <option value="Easy">
                        Easy
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="Hard">
                        Hard
                      </option>
                    </select>
                  </div>

                </section>

                {/* MODULES */}

                {course.modules?.map(
                  (module, moduleIndex) => {

                    if (
                      !matchesDifficulty(
                        module.difficulty
                      )
                    ) {
                      return null;
                    }

                    const visibleTopics =
                      module.topics?.filter(
                        (topic) =>
                          matchesSearch(
                            module.title
                          ) ||
                          matchesSearch(
                            topic.title
                          ) ||
                          matchesSearch(
                            topic.summary
                          )
                      );

                    if (
                      search.trim() &&
                      visibleTopics.length === 0
                    ) {
                      return null;
                    }

                    return (
                      <section
                        key={moduleIndex}
                        style={moduleCard}
                      >

                        <div style={moduleHeader}>

                          <div>
                            <span
                              style={badgeStyle(
                                module.difficulty
                              )}
                            >
                              {module.difficulty}
                            </span>

                            <h2>
                              {module.title}
                            </h2>
                          </div>

                          <div
                            style={moduleNumber}
                          >
                            {moduleIndex + 1}
                          </div>

                        </div>

                        {visibleTopics?.map(
                          (topic, topicIndex) => (
                            <article
                              key={topicIndex}
                              style={topicCard}
                            >

                              <div
                                style={
                                  topicHeader
                                }
                              >
                                <h3>
                                  {topic.title}
                                </h3>

                                <span
                                  style={badgeStyle(
                                    topic.difficulty
                                  )}
                                >
                                  {
                                    topic.difficulty
                                  }
                                </span>
                              </div>

                              <p
                                style={
                                  topicSummary
                                }
                              >
                                {topic.summary}
                              </p>

                            </article>
                          )
                        )}

                      </section>
                    );
                  }
                )}

                <button
                  style={mainButton}
                  onClick={() =>
                    setActiveTab("quiz")
                  }
                >
                  📝 Start Assessment →
                </button>
              </>
            )}

            {/* QUIZ TAB */}

            {activeTab === "quiz" && (
              <section style={cardStyle}>

                <div style={sectionHeader}>
                  <div>
                    <span style={smallBadge}>
                      KNOWLEDGE ASSESSMENT
                    </span>

                    <h2>
                      📝 Test Your Knowledge
                    </h2>
                  </div>

                  <div style={quizCount}>
                    {quizAnsweredCount}/
                    {course.quiz?.length || 0}
                  </div>
                </div>

                <div style={progressOuter}>
                  <div
                    style={{
                      ...progressInner,
                      width: `${quizProgress}%`,
                    }}
                  />
                </div>

                <p style={progressText}>
                  {quizProgress}% completed
                </p>

                {course.quiz?.map(
                  (question, index) => (
                    <article
                      key={index}
                      style={questionCard}
                    >

                      <div style={questionTop}>

                        <span
                          style={questionNumber}
                        >
                          Q{index + 1}
                        </span>

                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={topicMiniTag}
                          >
                            {question.topic}
                          </span>

                          <span
                            style={badgeStyle(
                              question.difficulty
                            )}
                          >
                            {
                              question.difficulty
                            }
                          </span>
                        </div>

                      </div>

                      <h3>
                        {question.question}
                      </h3>

                      {question.options?.map(
                        (
                          option,
                          optionIndex
                        ) => (
                          <label
                            key={optionIndex}
                            style={{
                              ...optionStyle,
                              background:
                                answers[index] ===
                                option
                                  ? "#3730a3"
                                  : "#0f172a",
                              border:
                                answers[index] ===
                                option
                                  ? "1px solid #818cf8"
                                  : "1px solid #334155",
                            }}
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              checked={
                                answers[index] ===
                                option
                              }
                              onChange={() =>
                                selectAnswer(
                                  index,
                                  option
                                )
                              }
                            />

                            <span>
                              {option}
                            </span>
                          </label>
                        )
                      )}

                    </article>
                  )
                )}

                <button
                  style={mainButton}
                  onClick={submitQuiz}
                >
                  📊 Submit Quiz
                </button>

              </section>
            )}

            {/* FLASHCARDS */}

            {activeTab === "flashcards" && (
              <section style={cardStyle}>

                <span style={smallBadge}>
                  QUICK REVISION
                </span>

                <h2>
                  🃏 Interactive Flashcards
                </h2>

                <p style={mutedText}>
                  Use the flashcards to quickly revise
                  important concepts from your course.
                </p>

                {course.flashcards?.length > 0 ? (
                  <>
                    <div style={flashcardContainer}>

                      <div style={flashcardTopic}>
                        Topic:{" "}
                        {
                          course.flashcards[
                            currentFlashcard
                          ].topic
                        }
                      </div>

                      <div style={flashcardFront}>
                        <span style={flashcardLabel}>
                          QUESTION
                        </span>

                        <h2>
                          {
                            course.flashcards[
                              currentFlashcard
                            ].front
                          }
                        </h2>
                      </div>

                      {showAnswer && (
                        <div
                          style={
                            flashcardAnswer
                          }
                        >
                          <span
                            style={
                              flashcardLabel
                            }
                          >
                            ANSWER
                          </span>

                          <p>
                            {
                              course.flashcards[
                                currentFlashcard
                              ].back
                            }
                          </p>
                        </div>
                      )}

                    </div>

                    <div style={flashcardControls}>

                      <button
                        style={secondaryButton}
                        onClick={
                          previousFlashcard
                        }
                      >
                        ← Previous
                      </button>

                      <button
                        style={mainButton}
                        onClick={() =>
                          setShowAnswer(
                            !showAnswer
                          )
                        }
                      >
                        {showAnswer
                          ? "Hide Answer"
                          : "Show Answer"}
                      </button>

                      <button
                        style={secondaryButton}
                        onClick={
                          nextFlashcard
                        }
                      >
                        Next →
                      </button>

                    </div>

                    <p style={flashcardCounter}>
                      Card{" "}
                      {currentFlashcard + 1} of{" "}
                      {course.flashcards.length}
                    </p>
                  </>
                ) : (
                  <div style={emptyState}>
                    No flashcards were generated for
                    this document.
                  </div>
                )}

              </section>
            )}

            {/* DASHBOARD */}

            {activeTab === "dashboard" && (
              <>
                <section style={dashboardHeader}>

                  <span style={smallBadge}>
                    LEARNING DASHBOARD
                  </span>

                  <h2>
                    📊 Your Learning Analytics
                  </h2>

                  <p style={mutedText}>
                    Track your course progress,
                    assessment performance and areas
                    requiring attention.
                  </p>

                </section>

                <section style={statsGrid}>

                  <StatCard
                    title="Modules"
                    value={
                      course.modules?.length || 0
                    }
                    icon="📚"
                  />

                  <StatCard
                    title="Topics"
                    value={
                      course.detected_topics
                        ?.length || 0
                    }
                    icon="🔍"
                  />

                  <StatCard
                    title="Questions"
                    value={
                      course.quiz?.length || 0
                    }
                    icon="📝"
                  />

                  <StatCard
                    title="Flashcards"
                    value={
                      course.flashcards
                        ?.length || 0
                    }
                    icon="🃏"
                  />

                </section>

                <section style={cardStyle}>

                  <h2>
                    📈 Overall Progress
                  </h2>

                  <div
                    style={progressOuter}
                  >
                    <div
                      style={{
                        ...progressInner,
                        width: completed
                          ? "100%"
                          : "50%",
                      }}
                    />
                  </div>

                  <div
                    style={
                      progressLabels
                    }
                  >
                    <span>
                      Course Progress
                    </span>

                    <strong>
                      {completed
                        ? "100%"
                        : "50%"}
                    </strong>
                  </div>

                </section>

                {score !== null && (
                  <section style={resultCard}>

                    <div
                      style={resultIcon}
                    >
                      {score ===
                      course.quiz.length
                        ? "🏆"
                        : score >=
                          course.quiz.length / 2
                        ? "🎯"
                        : "📚"}
                    </div>

                    <h2>
                      Your Assessment Result
                    </h2>

                    <div style={scoreText}>
                      {score} /{" "}
                      {course.quiz.length}
                    </div>

                    <p style={percentageText}>
                      {Math.round(
                        (score /
                          course.quiz.length) *
                          100
                      )}
                      %
                    </p>

                    <div
                      style={
                        recommendationBox
                      }
                    >
                      <h3>
                        🎯 Personalized Recommendation
                      </h3>

                      <p>
                        {recommendation}
                      </p>
                    </div>

                    {weakTopics.length > 0 && (
                      <div
                        style={
                          weakTopicBox
                        }
                      >
                        <h3>
                          ⚠️ Weak Topics Detected
                        </h3>

                        <p
                          style={mutedText}
                        >
                          These topics need additional
                          revision:
                        </p>

                        <div
                          style={
                            weakTopicList
                          }
                        >
                          {getUniqueWeakTopics().map(
                            (
                              topic,
                              index
                            ) => (
                              <span
                                key={index}
                                style={
                                  weakTopicTag
                                }
                              >
                                {topic}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <div
                      style={buttonRow}
                    >
                      <button
                        style={mainButton}
                        onClick={() =>
                          setActiveTab(
                            "revision"
                          )
                        }
                      >
                        🔄 Start Revision
                      </button>

                      <button
                        style={
                          secondaryButton
                        }
                        onClick={
                          resetQuiz
                        }
                      >
                        Retake Quiz
                      </button>
                    </div>

                  </section>
                )}

                {score === null && (
                  <section style={emptyDashboard}>
                    <div
                      style={emptyIcon}
                    >
                      📝
                    </div>

                    <h3>
                      Complete the quiz to unlock
                      performance analytics
                    </h3>

                    <button
                      style={mainButton}
                      onClick={() =>
                        setActiveTab(
                          "quiz"
                        )
                      }
                    >
                      Take Quiz
                    </button>
                  </section>
                )}
              </>
            )}

            {/* REVISION */}

            {activeTab === "revision" && (
              <section style={cardStyle}>

                <span style={smallBadge}>
                  PERSONALIZED REVISION
                </span>

                <h2>
                  🔄 Focused Revision
                </h2>

                <p style={mutedText}>
                  The system uses your quiz mistakes to
                  identify topics that require additional
                  practice.
                </p>

                {weakTopics.length === 0 ? (
                  <div style={emptyState}>

                    <div
                      style={emptyIcon}
                    >
                      🎯
                    </div>

                    <h3>
                      No weak topics available
                    </h3>

                    <p>
                      Complete the assessment first.
                      The system will identify your weak
                      areas automatically.
                    </p>

                    <button
                      style={mainButton}
                      onClick={() =>
                        setActiveTab(
                          "quiz"
                        )
                      }
                    >
                      Take Assessment
                    </button>

                  </div>
                ) : (
                  <>

                    <div
                      style={
                        weakTopicBox
                      }
                    >
                      <h3>
                        📌 Your Focus Areas
                      </h3>

                      <div
                        style={
                          weakTopicList
                        }
                      >
                        {getUniqueWeakTopics().map(
                          (
                            topic,
                            index
                          ) => (
                            <span
                              key={index}
                              style={
                                weakTopicTag
                              }
                            >
                              {topic}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <h3
                      style={{
                        marginTop: "30px",
                      }}
                    >
                      📖 Recommended Questions
                    </h3>

                    {revisionQuestions.map(
                      (
                        question,
                        index
                      ) => (
                        <article
                          key={index}
                          style={
                            questionCard
                          }
                        >

                          <div
                            style={
                              questionTop
                            }
                          >
                            <span
                              style={
                                questionNumber
                              }
                            >
                              Q{index + 1}
                            </span>

                            <span
                              style={
                                topicMiniTag
                              }
                            >
                              {
                                question.topic
                              }
                            </span>
                          </div>

                          <h3>
                            {
                              question.question
                            }
                          </h3>

                          <p
                            style={
                              mutedText
                            }
                          >
                            Review the related module
                            before attempting this
                            question again.
                          </p>

                        </article>
                      )
                    )}

                  </>
                )}

              </section>
            )}

            {/* ASSISTANT */}

            {activeTab === "assistant" && (
              <section style={cardStyle}>

                <div
                  style={assistantHero}
                >

                  <div
                    style={assistantIcon}
                  >
                    🤖
                  </div>

                  <div>
                    <span
                      style={smallBadge}
                    >
                      DOCUMENT STUDY ASSISTANT
                    </span>

                    <h2>
                      Ask Your Learning Assistant
                    </h2>

                    <p
                      style={mutedText}
                    >
                      Ask about modules, topics, quizzes,
                      flashcards, objectives or weak areas.
                    </p>
                  </div>

                </div>

                <div
                  style={
                    assistantInputArea
                  }
                >

                  <input
                    value={
                      assistantQuestion
                    }
                    onChange={(event) =>
                      setAssistantQuestion(
                        event.target.value
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key ===
                        "Enter"
                      ) {
                        askAssistant();
                      }
                    }}
                    placeholder="Ask something about your course..."
                    style={{
                      ...inputStyle,
                      flex: 1,
                    }}
                  />

                  <button
                    style={mainButton}
                    onClick={
                      askAssistant
                    }
                  >
                    Ask 🤖
                  </button>

                </div>

                <div
                  style={
                    suggestionArea
                  }
                >
                  <span>
                    Quick questions:
                  </span>

                  <button
                    style={
                      suggestionButton
                    }
                    onClick={() =>
                      setAssistantQuestion(
                        "Give me a summary"
                      )
                    }
                  >
                    Summary
                  </button>

                  <button
                    style={
                      suggestionButton
                    }
                    onClick={() =>
                      setAssistantQuestion(
                        "What are my weak topics?"
                      )
                    }
                  >
                    Weak topics
                  </button>

                  <button
                    style={
                      suggestionButton
                    }
                    onClick={() =>
                      setAssistantQuestion(
                        "What topics were detected?"
                      )
                    }
                  >
                    Detected topics
                  </button>

                  <button
                    style={
                      suggestionButton
                    }
                    onClick={() =>
                      setAssistantQuestion(
                        "How many flashcards are there?"
                      )
                    }
                  >
                    Flashcards
                  </button>

                </div>

                {assistantAnswer && (
                  <div
                    style={
                      assistantAnswerBox
                    }
                  >

                    <div
                      style={
                        assistantAnswerIcon
                      }
                    >
                      🤖
                    </div>

                    <div>
                      <strong>
                        Learning Assistant
                      </strong>

                      <p>
                        {assistantAnswer}
                      </p>
                    </div>

                  </div>
                )}

              </section>
            )}

            {/* COMPLETION */}

            {completed && (
              <section
                style={
                  completionCard
                }
              >

                <div
                  style={
                    completionIcon
                  }
                >
                  🎉
                </div>

                <h2>
                  Assessment Completed!
                </h2>

                <p>
                  Your performance has been analyzed
                  and personalized revision areas have
                  been identified.
                </p>

                <button
                  style={mainButton}
                  onClick={() =>
                    setActiveTab(
                      "dashboard"
                    )
                  }
                >
                  📊 View Dashboard
                </button>

              </section>
            )}
          </>
        )}

      </main>

      <footer style={footerStyle}>
        <p>
          AI LMS • Intelligent Learning • Personalized
          Education
        </p>
      </footer>

    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function FeatureCard({
  icon,
  title,
  text,
}) {
  return (
    <div style={featureCard}>
      <div style={featureIcon}>
        {icon}
      </div>

      <h3>{title}</h3>

      <p style={featureText}>
        {text}
      </p>
    </div>
  );
}

function HeroStat({
  icon,
  value,
  label,
}) {
  return (
    <div style={heroStat}>
      <div style={heroStatIcon}>
        {icon}
      </div>

      <strong>
        {value}
      </strong>

      <span>
        {label}
      </span>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div style={statCard}>
      <div style={statIcon}>
        {icon}
      </div>

      <p style={statTitle}>
        {title}
      </p>

      <h2 style={statValue}>
        {value}
      </h2>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const pageStyle = {
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
  color: "#f8fafc",
  fontFamily:
    "Arial, Helvetica, sans-serif",
  padding: "30px 20px",
};

const headerStyle = {
  maxWidth: "1200px",
  margin: "0 auto 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const titleStyle = {
  margin: 0,
  fontSize: "32px",
};

const subtitleStyle = {
  color: "#cbd5e1",
  marginTop: "8px",
};

const statusBadge = {
  background: "#166534",
  color: "#dcfce7",
  padding: "10px 15px",
  borderRadius: "20px",
  fontWeight: "bold",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const uploadCard = {
  background: "#1e293b",
  border: "1px solid #475569",
  borderRadius: "20px",
  padding: "50px 30px",
  textAlign: "center",
  maxWidth: "750px",
  margin: "60px auto",
};

const uploadIcon = {
  fontSize: "60px",
};

const mutedText = {
  color: "#94a3b8",
  lineHeight: "1.7",
};

const fileLabel = {
  display: "inline-block",
  margin: "20px 0",
  padding: "13px 20px",
  border: "1px solid #6366f1",
  borderRadius: "10px",
  cursor: "pointer",
  background: "#312e81",
};

const selectedFile = {
  background: "#0f172a",
  border: "1px solid #334155",
  padding: "12px",
  borderRadius: "8px",
  margin: "10px auto 20px",
  maxWidth: "550px",
};

const mainButton = {
  padding: "14px 25px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "10px",
  border: "none",
  background: "#6366f1",
  color: "white",
};

const secondaryButton = {
  padding: "14px 25px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "10px",
  border: "1px solid #6366f1",
  background: "transparent",
  color: "white",
};

const loadingBox = {
  marginTop: "25px",
  color: "#c7d2fe",
};

const spinner = {
  fontSize: "25px",
};

const navContainer = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "25px",
};

const navButton = (active) => ({
  padding: "11px 17px",
  borderRadius: "10px",
  border: "1px solid #6366f1",
  background: active
    ? "#6366f1"
    : "#1e293b",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
});

const heroCard = {
  background:
    "linear-gradient(135deg, #312e81, #4338ca)",
  padding: "35px",
  borderRadius: "20px",
  marginBottom: "25px",
  border: "1px solid #6366f1",
};

const heroDescription = {
  color: "#e0e7ff",
  lineHeight: "1.7",
};

const smallBadge = {
  display: "inline-block",
  background: "#4338ca",
  color: "#c7d2fe",
  padding: "5px 10px",
  borderRadius: "15px",
  fontSize: "11px",
  fontWeight: "bold",
};

const heroStats = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(130px, 1fr))",
  gap: "12px",
  marginTop: "25px",
};

const heroStat = {
  background: "#1e1b4b",
  padding: "15px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const heroStatIcon = {
  fontSize: "22px",
};

const cardStyle = {
  background: "#1e293b",
  padding: "28px",
  borderRadius: "18px",
  marginBottom: "25px",
  border: "1px solid #475569",
};

const featureGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "15px",
  marginBottom: "25px",
};

const featureCard = {
  background: "#1e293b",
  border: "1px solid #475569",
  padding: "20px",
  borderRadius: "15px",
};

const featureIcon = {
  fontSize: "30px",
};

const featureText = {
  color: "#94a3b8",
  fontSize: "14px",
  lineHeight: "1.6",
};

const objectiveStyle = {
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
  padding: "12px 0",
  borderBottom:
    "1px solid #334155",
  color: "#e2e8f0",
};

const checkIcon = {
  background: "#166534",
  color: "#dcfce7",
  width: "23px",
  height: "23px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const topicTagContainer = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "20px",
};

const topicTag = {
  background: "#312e81",
  border: "1px solid #6366f1",
  color: "#c7d2fe",
  padding: "9px 14px",
  borderRadius: "20px",
  fontSize: "13px",
};

const filterCard = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid #475569",
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "25px",
};

const filterGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  flex: 1,
  minWidth: "230px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#0f172a",
  color: "white",
  fontSize: "15px",
};

const moduleCard = {
  background: "#1e293b",
  padding: "28px",
  borderRadius: "18px",
  marginBottom: "25px",
  border: "1px solid #475569",
};

const moduleHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const moduleNumber = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  background: "#4338ca",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "20px",
};

const topicCard = {
  background: "#0f172a",
  border: "1px solid #334155",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "15px",
};

const topicHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const topicSummary = {
  color: "#cbd5e1",
  lineHeight: "1.7",
};

const badgeStyle = (difficulty) => ({
  padding: "5px 10px",
  borderRadius: "15px",
  background:
    difficulty === "Easy"
      ? "#166534"
      : difficulty === "Medium"
      ? "#854d0e"
      : "#991b1b",
  color: "white",
  fontSize: "12px",
  fontWeight: "bold",
});

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "15px",
};

const quizCount = {
  background: "#312e81",
  padding: "10px 15px",
  borderRadius: "20px",
};

const progressOuter = {
  width: "100%",
  height: "14px",
  background: "#0f172a",
  borderRadius: "20px",
  overflow: "hidden",
  marginTop: "15px",
};

const progressInner = {
  height: "100%",
  background:
    "linear-gradient(90deg, #6366f1, #8b5cf6)",
  borderRadius: "20px",
  transition: "width 0.4s ease",
};

const progressText = {
  color: "#94a3b8",
  fontSize: "13px",
};

const questionCard = {
  background: "#0f172a",
  border: "1px solid #334155",
  padding: "25px",
  borderRadius: "15px",
  marginTop: "20px",
  marginBottom: "20px",
};

const questionTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const questionNumber = {
  background: "#4338ca",
  padding: "6px 12px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const topicMiniTag = {
  background: "#334155",
  color: "#cbd5e1",
  padding: "5px 9px",
  borderRadius: "12px",
  fontSize: "11px",
};

const optionStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
  padding: "14px",
  borderRadius: "9px",
  marginBottom: "10px",
  cursor: "pointer",
  color: "#e2e8f0",
  lineHeight: "1.5",
};

const flashcardContainer = {
  maxWidth: "800px",
  margin: "30px auto",
};

const flashcardTopic = {
  textAlign: "center",
  color: "#a5b4fc",
  marginBottom: "15px",
};

const flashcardFront = {
  minHeight: "220px",
  background:
    "linear-gradient(135deg, #312e81, #4338ca)",
  borderRadius: "18px",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  border: "1px solid #6366f1",
};

const flashcardAnswer = {
  background: "#0f172a",
  border: "1px solid #6366f1",
  borderRadius: "15px",
  padding: "25px",
  marginTop: "15px",
  lineHeight: "1.7",
};

const flashcardLabel = {
  fontSize: "11px",
  color: "#a5b4fc",
  fontWeight: "bold",
  letterSpacing: "1px",
};

const flashcardControls = {
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const flashcardCounter = {
  textAlign: "center",
  color: "#94a3b8",
};

const dashboardHeader = {
  background: "#1e293b",
  padding: "28px",
  borderRadius: "18px",
  marginBottom: "25px",
  border: "1px solid #475569",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "15px",
  marginBottom: "25px",
};

const statCard = {
  background: "#1e293b",
  padding: "22px",
  borderRadius: "15px",
  border: "1px solid #475569",
};

const statIcon = {
  fontSize: "30px",
};

const statTitle = {
  color: "#94a3b8",
  marginBottom: "5px",
};

const statValue = {
  margin: 0,
};

const progressLabels = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
  color: "#cbd5e1",
};

const resultCard = {
  background:
    "linear-gradient(135deg, #1e293b, #312e81)",
  padding: "35px",
  borderRadius: "18px",
  border: "1px solid #6366f1",
  marginBottom: "25px",
};

const resultIcon = {
  fontSize: "50px",
};

const scoreText = {
  fontSize: "45px",
  fontWeight: "bold",
};

const percentageText = {
  fontSize: "24px",
  color: "#a5b4fc",
};

const recommendationBox = {
  background: "#0f172a",
  border: "1px solid #475569",
  padding: "20px",
  borderRadius: "12px",
};

const weakTopicBox = {
  background: "#172033",
  border: "1px solid #475569",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "20px",
};

const weakTopicList = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const weakTopicTag = {
  background: "#7f1d1d",
  color: "#fecaca",
  padding: "7px 12px",
  borderRadius: "20px",
  fontSize: "13px",
};

const buttonRow = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "20px",
};

const emptyDashboard = {
  background: "#1e293b",
  border: "1px solid #475569",
  padding: "45px",
  borderRadius: "18px",
  textAlign: "center",
};

const emptyState = {
  textAlign: "center",
  padding: "50px 20px",
  color: "#94a3b8",
};

const emptyIcon = {
  fontSize: "50px",
};

const assistantHero = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "30px",
};

const assistantIcon = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: "#4338ca",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "35px",
  flexShrink: 0,
};

const assistantInputArea = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const suggestionArea = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  alignItems: "center",
  marginTop: "15px",
  color: "#94a3b8",
};

const suggestionButton = {
  background: "#0f172a",
  border: "1px solid #475569",
  color: "#cbd5e1",
  padding: "8px 12px",
  borderRadius: "20px",
  cursor: "pointer",
};

const assistantAnswerBox = {
  display: "flex",
  gap: "15px",
  background: "#0f172a",
  border: "1px solid #6366f1",
  padding: "20px",
  borderRadius: "14px",
  marginTop: "25px",
};

const assistantAnswerIcon = {
  fontSize: "30px",
};

const completionCard = {
  background:
    "linear-gradient(135deg, #166534, #14532d)",
  padding: "35px",
  borderRadius: "18px",
  textAlign: "center",
  marginTop: "25px",
  border: "1px solid #22c55e",
};

const completionIcon = {
  fontSize: "55px",
};

const footerStyle = {
  textAlign: "center",
  color: "#64748b",
  padding: "40px 0 10px",
  fontSize: "13px",
};

export default App;