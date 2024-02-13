import './Header.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="headerContainer">
      <Link to="/" onClick={logoutAndRedirect} className="headerLink">PhotoRealm</Link>
      <br />
      {isLoggedIn ? (
        <>
          <button onClick={logoutAndRedirect} className="headerButton">Logout</button>
        </>
      ) : (
        <Link to="/login" className="headerLink">Login</Link>
      )}
    </header>
  );
};

export default Header;
