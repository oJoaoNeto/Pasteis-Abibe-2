import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon} from 'lucide-react';
import '../styles/Navbar.css';
import logoImg from '../assets/logo-abibe.jpg';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <img src={logoImg} alt="Logo Pastelaria Abibe" />
        </Link>
 
        <ul className="nav-menu">
          <li><a href="/#historia" className="nav-link">Nossa História</a></li>
          <li><a href="/#produtos" className="nav-link">Produtos</a></li>
          <li><a href="/#servicos" className="nav-link">Serviços</a></li>
          <li><a href="/#footer" className="nav-link">Contato</a></li>
        </ul>
 
        <div className="nav-actions">
          <div className="separator"></div>
          <button type="button" onClick={toggleTheme} className="theme-toggle-button" aria-label="Mudar tema">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/login" className="nav-cta-button">
            Acesso Restrito
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
