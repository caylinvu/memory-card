import '../styles/CardContainer.css';
import Card from './Card';

function CardContainer({
  villagers,
  increaseScore,
  endGame,
  shuffleCards,
  cardsShowing,
  setCardsShowing,
}) {
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
            cardsShowing={cardsShowing}
            setCardsShowing={setCardsShowing}
          />
        );
      })}
    </div>
  );
}

export default CardContainer;
