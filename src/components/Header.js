function Header() {
  return (
    <header className="app-header">
      <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="React logo" />
      <h1>React Quiz</h1>
    </header>
  );
}

export default Header;
