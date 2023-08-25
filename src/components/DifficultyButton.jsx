function DifficultyButton({ btnLabel, cardQuantity, handleClick }) {
  return (
    <button type="button" onClick={() => handleClick(cardQuantity)}>
      {btnLabel}
    </button>
  );
}

export default DifficultyButton;
