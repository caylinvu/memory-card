import '../styles/Card.css';

function Card({ key, imgUrl }) {
  return (
    <button key={key} className="card-btn">
      <img src={imgUrl} className="card-img" />
    </button>
  );
}

export default Card;
