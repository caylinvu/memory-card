import '../styles/CardContainer.css';
import Card from './Card';

function CardContainer({ villagers }) {
  return (
    <div className="card-container">
      {villagers.map((obj) => {
        return <Card key={obj.id} imgUrl={obj.image_url} />;
      })}
    </div>
  );
}

export default CardContainer;
