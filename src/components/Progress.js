import React from "react";

export default function Progress({ i, numQuestions ,point, totalPoints }) {
  return (
    <header className="progress">
      <progress value={i} max={numQuestions} />
      <p>
        Question <strong>{i}</strong> of {numQuestions}
      </p>
      <p>
        <strong>{point}</strong> / <strong>{totalPoints}</strong>  <strong>points</strong>
      </p>

    </header>
  );
}
