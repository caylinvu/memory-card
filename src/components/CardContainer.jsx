import '../styles/CardContainer.css';
import Card from './Card';

function CardContainer({ villagers, increaseScore, endGame, shuffleCards, score, totalRounds }) {
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
            score={score}
            totalRounds={totalRounds}
          />
        );
      })}
    </div>
  );
}

export default CardContainer;
