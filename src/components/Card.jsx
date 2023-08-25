import { useState } from 'react';
import '../styles/Card.css';

function Card({ imgUrl, increaseScore, endGame, shuffleCards }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (!isSelected) {
      setIsSelected(true);
      increaseScore();
      shuffleCards();
    } else {
      endGame('lose');
    }
  };

  return (
    <button className="card-btn" onClick={handleClick}>
      <img src={imgUrl} className="card-img" />
    </button>
  );
}

export default Card;
