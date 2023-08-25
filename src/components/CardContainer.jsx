import '../styles/CardContainer.css';
import Card from './Card';

function CardContainer({ villagers, increaseScore, endGame, shuffleCards }) {
  return (
    <div className="card-container">
      {villagers.map((obj) => {
        return (
          <Card
            key={obj.id}
            imgUrl={obj.image_url}
            increaseScore={increaseScore}
            endGame={endGame}
            shuffleCards={shuffleCards}
          />
        );
      })}
    </div>
  );
}

export default CardContainer;
