import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [completed, setCompleted] = useState(false);

  const generateCourse = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    setLoading(true);
    setScore(null);
    setRecommendation("");
    setAnswers({});
    setCompleted(false);

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

      if (data.error) {
        alert(data.error);
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
    let total = 0;

    course.quiz.forEach((question, index) => {
      if (answers[index] === question.answer) {
        total++;
      }
    });

    setScore(total);

    const percentage =
      (total / course.quiz.length) * 100;

    if (percentage === 100) {
      setRecommendation(
        "Excellent! You have mastered the course. Try moving to advanced topics."
      );
    } else if (percentage >= 50) {
      setRecommendation(
        "Good progress! Revise the topics you missed and attempt the quiz again."
      );
    } else {
      setRecommendation(
        "You need more practice. Review the course modules and retake the quiz."
      );
    }

    setCompleted(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          margin: "auto",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <h1
            style={{
              fontSize: "38px",
              marginBottom: "10px",
            }}
          >
            🤖 AI Learning Management System
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "17px",
            }}
          >
            Transform your PDF learning material into an
            interactive course
          </p>
        </div>


        {/* UPLOAD CARD */}

        <div
          style={{
            background: "rgba(30, 41, 59, 0.9)",
            padding: "30px",
            borderRadius: "18px",
            marginBottom: "30px",
            border: "1px solid #475569",
          }}
        >
          <h2>📄 Upload Learning Material</h2>

          <p style={{ color: "#cbd5e1" }}>
            Upload a PDF and automatically generate a
            structured learning course.
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#0f172a",
              color: "#fff",
              borderRadius: "8px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />

          {file && (
            <p style={{ color: "#a5b4fc" }}>
              📎 Selected: {file.name}
            </p>
          )}

          <button
            onClick={generateCourse}
            style={{
              marginTop: "15px",
              padding: "13px 25px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "10px",
              border: "none",
              background: "#6366f1",
              color: "white",
            }}
          >
            {loading
              ? "🤖 Generating Course..."
              : "🚀 Generate Course"}
          </button>
        </div>


        {/* COURSE */}

        {course && (
          <div>

            {/* COURSE PROGRESS */}

            <div
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "25px",
                border: "1px solid #475569",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <strong>📈 Course Progress</strong>

                <span>
                  {completed ? "100%" : "50%"}
                </span>
              </div>

              <div
                style={{
                  height: "10px",
                  background: "#0f172a",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: completed
                      ? "100%"
                      : "50%",
                    height: "100%",
                    background: "#8b5cf6",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: "0",
                }}
              >
                {completed
                  ? "Course completed! 🎉"
                  : "Course generated. Complete the quiz to finish."}
              </p>
            </div>


            {/* COURSE HEADER */}

            <div
              style={{
                background:
                  "linear-gradient(135deg, #4338ca, #7c3aed)",
                padding: "30px",
                borderRadius: "18px",
                marginBottom: "25px",
              }}
            >
              <p
                style={{
                  color: "#ddd6fe",
                  marginBottom: "5px",
                }}
              >
                AI GENERATED COURSE
              </p>

              <h1 style={{ marginTop: "5px" }}>
                {course.course_title}
              </h1>

              <p style={{ color: "#ede9fe" }}>
                {course.description}
              </p>
            </div>


            {/* OBJECTIVES */}

            <div
              style={{
                background: "#1e293b",
                padding: "25px",
                borderRadius: "15px",
                marginBottom: "25px",
                border: "1px solid #475569",
              }}
            >
              <h2>🎯 Learning Objectives</h2>

              <ul style={{ lineHeight: "1.9" }}>
                {course.learning_objectives?.map(
                  (objective, index) => (
                    <li key={index}>
                      {objective}
                    </li>
                  )
                )}
              </ul>
            </div>


            {/* MODULES */}

            <h2>📚 Course Modules</h2>

            {course.modules?.map(
              (module, index) => (
                <div
                  key={index}
                  style={{
                    background: "#1e293b",
                    padding: "25px",
                    marginBottom: "20px",
                    borderRadius: "15px",
                    border: "1px solid #475569",
                  }}
                >
                  <h3
                    style={{
                      color: "#a5b4fc",
                      fontSize: "22px",
                    }}
                  >
                    {module.title}
                  </h3>

                  {module.topics?.map(
                    (topic, topicIndex) => (
                      <div
                        key={topicIndex}
                        style={{
                          background: "#0f172a",
                          padding: "18px",
                          marginTop: "15px",
                          borderRadius: "10px",
                        }}
                      >
                        <h4>
                          {topic.title}
                        </h4>

                        <p
                          style={{
                            color: "#cbd5e1",
                            lineHeight: "1.7",
                          }}
                        >
                          {topic.summary}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )
            )}


            {/* QUIZ */}

            <h2 style={{ marginTop: "35px" }}>
              📝 Knowledge Assessment
            </h2>

            {course.quiz?.map(
              (question, index) => (
                <div
                  key={index}
                  style={{
                    background: "#1e293b",
                    padding: "25px",
                    marginBottom: "20px",
                    borderRadius: "15px",
                    border: "1px solid #475569",
                  }}
                >
                  <h3>
                    {index + 1}.{" "}
                    {question.question}
                  </h3>

                  {question.options?.map(
                    (option, optionIndex) => (
                      <label
                        key={optionIndex}
                        style={{
                          display: "block",
                          background:
                            answers[index] ===
                            option
                              ? "#3730a3"
                              : "#0f172a",
                          padding: "12px",
                          marginTop: "8px",
                          borderRadius: "8px",
                          cursor: "pointer",
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

                        {" "}
                        {option}
                      </label>
                    )
                  )}
                </div>
              )
            )}


            {/* SUBMIT BUTTON */}

            <button
              onClick={submitQuiz}
              style={{
                padding: "14px 30px",
                fontSize: "17px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "10px",
                border: "none",
                background: "#8b5cf6",
                color: "white",
              }}
            >
              📊 Submit Quiz
            </button>


            {/* RESULT */}

            {score !== null && (
              <div
                style={{
                  marginTop: "30px",
                  background:
                    "linear-gradient(135deg, #172554, #312e81)",
                  padding: "30px",
                  borderRadius: "18px",
                  border: "1px solid #6366f1",
                }}
              >
                <h2>
                  📊 Your Learning Result
                </h2>

                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    margin: "20px 0",
                  }}
                >
                  {score} / {course.quiz.length}
                </div>

                <p
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {score ===
                  course.quiz.length
                    ? "🎉 Excellent! You have mastered this quiz."
                    : score >=
                      course.quiz.length / 2
                    ? "👍 Good job! You are making good progress."
                    : "📖 More practice is recommended."}
                </p>


                {/* RECOMMENDATION */}

                <div
                  style={{
                    marginTop: "25px",
                    padding: "20px",
                    background: "#0f172a",
                    borderRadius: "12px",
                  }}
                >
                  <h3>
                    🎯 Personalized Recommendation
                  </h3>

                  <p
                    style={{
                      color: "#cbd5e1",
                      lineHeight: "1.7",
                    }}
                  >
                    {recommendation}
                  </p>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;