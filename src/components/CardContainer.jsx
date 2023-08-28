import '../styles/CardContainer.css';
import Card from './Card';

function CardContainer({
  villagers,
  increaseScore,
  endGame,
  shuffleCards,
  cardsShowing,
  setCardsShowing,
  score,
  cardQuantity,
  setShowHelp,
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
            score={score}
            cardQuantity={cardQuantity}
            setShowHelp={setShowHelp}
          />
        );
      })}
    </div>
  );
}

export default CardContainer;
