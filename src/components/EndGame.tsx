import React from 'react';

const EndGame = () => {
  return (
    <div>
      <h1>You Escaped!</h1>
      <p>Congratulations, you completed all rooms and escaped the house!</p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default EndGame;
