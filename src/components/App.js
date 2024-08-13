import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionArray, setQuestionArray] = useState([])
  // console.log(questionArray)

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

  function handleUpdate(updatedQuestion, newCorrectIndex){
    // console.log(updatedQuestion.id, newCorrectIndex)
    const bodyObj ={
      ...updatedQuestion,
      "correctIndex": Number(newCorrectIndex)
    }
    // console.log("BO", bodyObj)
    fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(bodyObj)
    })
    .then(response => response.json())
    .then(updatedQuestionData => updateArray(updatedQuestionData))
    
  }

  function updateArray(newQuestionData){
    // console.log(newQuestionData.id)

    const updatedQuestionAnswer = questionArray.map((question) => {
      if (question.id === newQuestionData.id) {
        return newQuestionData;
      } else {
        return question;
      }
    })
    setQuestionArray(updatedQuestionAnswer)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addNewQuestion={addNewQuestion} /> : <QuestionList handleUpdate={handleUpdate} handleDelete={handleDelete} questions={questionArray} />}
    </main>
  );
}

export default App;
