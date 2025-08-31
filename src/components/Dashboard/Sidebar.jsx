import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Wheat, NotebookText, Factory, DollarSign, Sun, Moon, Home } from 'lucide-react';
import logoImg from '../assets/logo-abibe.jpg';
import '../styles/Sidebar.css';

const Sidebar = ({ currentTheme, toggleTheme }) => {
  // A função NavLink do react-router-dom adiciona uma classe 'active'
  // ao link que corresponde à URL atual. O CSS usa essa classe para o destaque.
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logoImg} alt="Logo Pastelaria Abibe" className="sidebar-logo" />
        <h1 className="sidebar-title">Dashboard</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            {/* O prop 'end' é crucial para que o link "Dashboard" só fique ativo na sua própria página, e não nas sub-páginas. */}
            <NavLink to="/dashboard" className="sidebar-link" end>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/insumos" className="sidebar-link">
              <Wheat size={20} />
              <span>Insumos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/receitas" className="sidebar-link">
              <NotebookText size={20} />
              <span>Fichas Técnicas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/producao" className="sidebar-link">
              <Factory size={20} />
              <span>Produção Diária</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/financeiro" className="sidebar-link">
              <DollarSign size={20} />
              <span>Financeiro</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <Link to="/" className="sidebar-link" title="Voltar para a página inicial">
          <Home size={20} />
          <span>Voltar para o Site</span>
        </Link>
        <button type="button" className="theme-switcher" onClick={toggleTheme} aria-label="Mudar tema">
          {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          <span>{currentTheme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;