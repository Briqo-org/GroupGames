import React, { useState } from "react";

const TriviaGame = () => {
  const [question, setQuestion] = useState(null);

  const fetchQuestion = async () => {
    try {
      const response = await fetch("/next-question");
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  return (
    <div className="trivia-game">
      <h2>Trivia Game</h2>
      {question ? (
        <div>
          <p>{question.text}</p>
          {question.options.map((option, index) => (
            <button key={index}>{option}</button>
          ))}
        </div>
      ) : (
        <button onClick={fetchQuestion}>Start Trivia</button>
      )}
    </div>
  );
};

export default TriviaGame;
