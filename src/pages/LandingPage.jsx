import React from 'react';
import Hero from '../components/landing/Hero';
import Historia from '../components/landing/Historia';
import Produtos from '../components/landing/Produtos';
import Servicos from '../components/landing/Servicos';

function LandingPage() {
  return (
    <>
      <Hero />
      <Historia />
      <Produtos />
      <Servicos />
    </>
  );
}

export default LandingPage;