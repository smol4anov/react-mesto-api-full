import { Link } from 'react-router-dom';

const Header = (props) => {
  const { linkPath, linkText, userEmail, onClick } = props;
  const headerLinkClassList = `header__link ${!userEmail ? '' : 'header__link_logged-in'}`;
  return (
    <header className="header page__header">
      <a href="#" className="logo"></a>
      <div className="header__signup">
        <p className="header__email">{userEmail}</p>
        <Link to={linkPath} className={headerLinkClassList} onClick={onClick} >{linkText}</Link>
      </div>
    </header>
  );
}

export default Header;