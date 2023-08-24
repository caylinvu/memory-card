import '../styles/CardContainer.css';
import Card from './Card';

function CardContainer({ villagers, increaseScore, endGame }) {
  return (
    <div className="card-container">
      {villagers.map((obj) => {
        return (
          <Card
            key={obj.id}
            imgUrl={obj.image_url}
            increaseScore={increaseScore}
            endGame={endGame}
          />
        );
      })}
    </div>
  );
}

export default CardContainer;
