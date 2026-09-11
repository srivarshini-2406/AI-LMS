import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateCourse = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    setLoading(true);

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

      setCourse(data);
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      
      <h1>AI Learning Management System</h1>

      <p>Upload a PDF and generate a course.</p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={generateCourse}>
        {loading ? "Generating..." : "Generate Course"}
      </button>

      {course && (
        <div style={{ marginTop: "40px" }}>

          <h1>{course.course_title}</h1>

          <p>{course.description}</p>

          <h2>Learning Objectives</h2>

          <ul>
            {course.learning_objectives?.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>

          <h2>Modules</h2>

          {course.modules?.map((module, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>{module.title}</h3>

              {module.topics?.map((topic, topicIndex) => (
                <div key={topicIndex}>
                  <h4>{topic.title}</h4>
                  <p>{topic.summary}</p>
                </div>
              ))}
            </div>
          ))}

          <h2>Quiz</h2>

          {course.quiz?.map((question, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "15px",
              }}
            >
              <h3>
                {index + 1}. {question.question}
              </h3>

              {question.options?.map((option, optionIndex) => (
                <p key={optionIndex}>
                  <input type="radio" name={`question-${index}`} />
                  {" "}{option}
                </p>
              ))}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default App;