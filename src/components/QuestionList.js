import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, handleDelete }) {
  console.log(questions)
  const questionListElements = questions.map((question) => {
    // console.log(question.id)
    return <QuestionItem handleDelete={handleDelete} key={question.id} question={question} />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionListElements}</ul>
    </section>
  );
}

export default QuestionList;
