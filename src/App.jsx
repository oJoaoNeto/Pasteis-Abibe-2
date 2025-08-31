import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  // 1. Gerencia o estado do tema aqui, no componente pai de todos.
  // Ele lê o tema salvo no localStorage ou usa 'light' como padrão.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // 2. Função para trocar o tema e salvar a preferência.
  const toggleTheme = () => {
    setTheme(currentTheme => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // 3. Aplica a classe CSS no body sempre que o tema mudar.
  useEffect(() => {
    const body = document.body;
    body.className = ''; // Limpa classes anteriores
    body.classList.add(`${theme}-mode`);
  }, [theme]);

  return (
    <div className="app-container">
      {/* 4. Passa o tema e a função para os layouts filhos via contexto */}
      <Outlet context={{ theme, toggleTheme }} />
    </div>
  );
}

export default App;
