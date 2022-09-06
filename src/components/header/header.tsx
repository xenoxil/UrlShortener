function Header(props: any) {
  return (
    <section className="section__header">
      <div className="header__container">
        <p className="header__userEmail">{/*props.userEmail*/ `xe@ya.ru`}</p>
        <button className="header__logoutBtn">Выйти</button>
      </div>
    </section>
  );
}

export default Header;
