import React from "react";

function QuestionItem({ question, handleDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  // console.log(question)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClick() {
    console.log(id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then((deletedItem) => handleDelete(deletedItem))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleClick} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
