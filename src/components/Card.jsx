import { useState } from 'react';
import '../styles/Card.css';

function Card({
  imgUrl,
  increaseScore,
  endGame,
  shuffleCards,
  cardsShowing,
  setCardsShowing,
  score,
  cardQuantity,
  setShowHelp,
  cardsDisabled,
  setCardsDisabled,
}) {
  const [isSelected, setIsSelected] = useState(false);

  async function handleClick() {
    setShowHelp(false);
    if (!isSelected) {
      setCardsDisabled(true);
      setCardsShowing(false);
      setIsSelected(true);
      increaseScore();
      if (score + 1 < cardQuantity) {
        setTimeout(() => {
          shuffleCards();
          setCardsDisabled(false);
          setCardsShowing(true);
        }, 800);
      }
    } else {
      endGame('lose');
    }
  }

  return (
    <div className={`card ${cardsShowing ? 'front' : 'back'}`}>
      <div className="card-inner">
        <div className="card-front">
          <button className="card-btn" onClick={handleClick} disabled={cardsDisabled}>
            <img src={imgUrl} className="card-img" draggable={false} />
          </button>
        </div>
        <div className="card-back">
          <img src="/card-back.jpg" className="card-back-img" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Card;
