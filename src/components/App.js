import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionArray, setQuestionArray] = useState([])
  console.log(questionArray)

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then((questions) => setQuestionArray(questions))

  }, [])

  function addNewQuestion(newQuestion) {
    setQuestionArray([...questionArray, newQuestion])
  }

  function handleDelete(deletedQuestion) {
    console.log(deletedQuestion.id)
    const updatedQuestionArray = questionArray.filter((question) => {
      return question.id !== deletedQuestion.id;
    })
    setQuestionArray(updatedQuestionArray)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addNewQuestion={addNewQuestion} /> : <QuestionList handleDelete={handleDelete} questions={questionArray} />}
    </main>
  );
}

export default App;
