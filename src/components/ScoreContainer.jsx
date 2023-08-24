import '../styles/ScoreContainer.css';

function ScoreContainer({ score, highScore }) {
  return (
    <div className="score-container">
      <div className="scores">
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>
      <p>Round placeholder</p>
    </div>
  );
}

export default ScoreContainer;
