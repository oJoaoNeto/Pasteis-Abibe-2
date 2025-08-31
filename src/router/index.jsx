import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../App';

// Layouts
import LandingLayout from '../layouts/LandingLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';

// Dashboard Pages - CORREÇÃO: O nome da pasta é 'dashboard' em minúsculas.
import Dashboard from '../pages/Dashboard';
import Insumos from '../pages/Insumos';
import FichasTecnicas from '../pages/FichasTecnicas';
import ProducaoDiaria from '../pages/ProducaoDiaria';
import Financeiro from '../pages/Financeiro';


const router = createBrowserRouter([
  {
    element: <App />, // App is now the root layout, providing context to all children.
    children: [
      {
        path: '/',
        element: <LandingLayout />,
        children: [
          { index: true, element: <LandingPage /> }
        ]
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        // TODO: Proteger esta rota
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'insumos', element: <Insumos /> }, // Ex: /dashboard/insumos
          { path: 'receitas', element: <FichasTecnicas /> },
          { path: 'producao', element: <ProducaoDiaria /> },
          { path: 'financeiro', element: <Financeiro /> },
        ]
      }
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}