import '../styles/Header.css';

function Header({ quit, clickHelp }) {
  return (
    <div className="header">
      <img src="/logo.png" alt="" className="logo-img" onClick={quit} />
      <div className="header-txt">
        <img src="/leaf.png" alt="" className="leaf-img" />
        <h1>Memory Game</h1>
      </div>
      <button type="button" className="help-btn" onClick={clickHelp}>
        ?
      </button>
    </div>
  );
}

export default Header;
