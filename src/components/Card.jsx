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
}) {
  const [isSelected, setIsSelected] = useState(false);

  async function handleClick() {
    if (!isSelected) {
      setCardsShowing(false);
      setIsSelected(true);
      increaseScore();
      if (score + 1 < cardQuantity) {
        setTimeout(() => {
          shuffleCards();
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
          <button className="card-btn" onClick={handleClick}>
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
