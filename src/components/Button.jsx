function Button({ btnLabel, btnClass, handleClick }) {
  return (
    <button type="button" className={btnClass} onClick={handleClick}>
      {btnLabel}
    </button>
  );
}

export default Button;
