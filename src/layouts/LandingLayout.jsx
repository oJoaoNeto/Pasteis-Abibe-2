import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

function LandingLayout() {
  // Recebe o tema e a função do App.jsx
  const { theme, toggleTheme } = useOutletContext();

  return (
    <>
      {/* Passa as propriedades para a Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="landing-main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default LandingLayout;