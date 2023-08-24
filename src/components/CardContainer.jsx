import '../styles/CardContainer.css';

function CardContainer({ villagers }) {
  return (
    <div className="card-container">
      {villagers.map((obj) => {
        return (
          <button key={obj.id} className="card-btn">
            <img src={obj.image_url} className="card-img" />
          </button>
        );
      })}
    </div>
  );
}

export default CardContainer;
