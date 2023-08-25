import '../styles/ScoreContainer.css';

function ScoreContainer({ score, highScore, totalRounds }) {
  return (
    <div className="score-container">
      <div className="scores">
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>
      <p>
        {score}/{totalRounds}
      </p>
    </div>
  );
}

export default ScoreContainer;
