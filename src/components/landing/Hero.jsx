// src/sections/Hero.jsx
import React from 'react';
import '../styles/Hero.css';
import heroPastel from '../assets/hero-pastel.jpg';

function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1>O Sabor da Tradição em Cada Mordida</h1>
        <p>Pastéis feitos na hora com ingredientes frescos e muito carinho. Experimente a diferença!</p>
        <a href="#produtos" className="hero-cta-button">Ver Cardápio</a>
      </div>
      <div className="hero-image">
        <img src={heroPastel} alt="Pastel delicioso" />
      </div>
    </section>
  );
}

export default Hero;
