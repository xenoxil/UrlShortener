function Header(props: any) {
  return (
    <section className="section__header">
      <div className="header__container">
        <p className="header__userEmail">{props.userEmail}</p>
        <button className="header__logoutBtn" type="reset" onClick={props.logOut}>
          Logout
        </button>
      </div>
    </section>
  );
}

export default Header;
