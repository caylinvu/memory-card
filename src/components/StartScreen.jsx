import '../styles/StartScreen.css';
import DifficultyButton from './DifficultyButton';

function StartScreen({ playGame }) {
  return (
    <div className="start-screen">
      <img src="logo.png" className="start-logo" alt="" />
      <h1>Memory Game</h1>
      <div className="difficulty-btns">
        <DifficultyButton btnLabel="Easy" cardQuantity={5} handleClick={playGame} />
        <DifficultyButton btnLabel="Medium" cardQuantity={8} handleClick={playGame} />
        <DifficultyButton btnLabel="Hard" cardQuantity={12} handleClick={playGame} />
      </div>
    </div>
  );
}

export default StartScreen;
