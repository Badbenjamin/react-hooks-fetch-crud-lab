import React from "react";

function QuestionItem({ question, handleDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;
  // console.log(question)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClick() {
    // console.log(question.id)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then(() => handleDelete(question))
  }

  function handleChange(e){
    const newCorrectIndex = (e.target.value)
    onUpdate(question, newCorrectIndex)

    // console.log("QI CI", question.correctIndex)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleClick} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
