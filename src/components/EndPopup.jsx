import '../styles/EndPopup.css';
import Button from './Button';

function EndPopup({ text, score, playAgain, quit, cardQuantity }) {
  return (
    <div className="popup-container">
      <div className="blocker"></div>
      <div className="end-popup">
        <p>{text}</p>
        <p>Your final score is {score}</p>
        <Button
          btnLabel="Play again"
          btnClass="play-again-btn"
          handleClick={() => playAgain(cardQuantity)}
        />
        <Button btnLabel="Quit" btnClass="quit-btn" handleClick={quit} />
      </div>
    </div>
  );
}

export default EndPopup;
