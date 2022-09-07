function Footer() {
  return (
    <section className="footer">
      <div className="footer__container">
        <p className="footer__copyright">&copy;2022.Yuriy Stepanov</p>
        <nav className="footer__navigation">
          <ul className="footer__links">
            <li className="footer__link">
              <a href="https://github.com/xenoxil" target="_blank" rel="nofollow noopener noreferrer" className="link">
                Github
              </a>
            </li>
            <li className="footer__link">
              <a
                href="https://hh.ru/resume/0658f453ff0aeb9c1b0039ed1f35544b415076"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="link">
                Резюме
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Footer;
