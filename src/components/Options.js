import React from "react";

export default function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}  ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
          key={index}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {/* <input type='radio' name='answer' value={option} onChange={() => dispatch({type: 'newAnswer', payload: option})} /> */}
          {/* {option.correct && <i className="fas fa-check"></i>} */}

          {option}
        </button>
      ))}
    </div>
  );
}
