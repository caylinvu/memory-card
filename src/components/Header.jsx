import '../styles/Header.css';

function Header() {
  return (
    <div className="header">
      <img src="/logo.png" alt="" className="logo-img" />
      <div className="header-txt">
        <img src="/leaf.png" alt="" className="leaf-img" />
        <h1>Memory Game</h1>
      </div>
    </div>
  );
}

export default Header;