import '../styles/EndPopup.css';
import Button from './Button';

function EndPopup({ text, score, playAgain, quit, cardQuantity, gifUrl, gifClass }) {
  return (
    <div className="popup-container">
      <div className="blocker"></div>
      <div className="end-container">
        <div className="end-popup">
          <p className="end-text">{text}</p>
          <img src={gifUrl} alt="" className={gifClass} />
          <p className="end-score">
            Your final score is <strong>{score}</strong>
          </p>
          <div className="btns">
            <Button
              btnLabel="Play again"
              btnClass="play-again-btn"
              handleClick={() => playAgain(cardQuantity)}
            />
            <Button btnLabel="Quit" btnClass="quit-btn" handleClick={quit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndPopup;
