import { Outlet, useOutletContext } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import '../styles/DashboardLayout.css';

function DashboardLayout() {
  // Removemos o controle de tema local e usamos o global
  const { theme, toggleTheme } = useOutletContext();

  return (
    <div className="app-layout">
      <Sidebar currentTheme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <Outlet /> {/* As páginas do dashboard serão renderizadas aqui */}
      </main>
    </div>
  );
}

export default DashboardLayout;