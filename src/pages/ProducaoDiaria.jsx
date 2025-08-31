// src/pages/ProducaoDiaria.jsx

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import '../styles/ProducaoDiaria.css'; // Importe o novo CSS

function ProducaoDiaria() {
  const { receitas, produtosAcabados, registrarProducao } = useData();
  
  // Lógica de estado do formulário
  const [selectedReceita, setSelectedReceita] = useState(receitas[0]?.id || '');
  const [quantidade, setQuantidade] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedReceita || quantidade <= 0) {
        alert("Selecione uma receita e informe uma quantidade válida.");
        return;
    }
    registrarProducao(Number(selectedReceita), Number(quantidade));
    setQuantidade(1); // Reseta a quantidade após o registro
  };

  return (
    <div className="producao-page">
      <h1>Produção Diária</h1>

      <div className="producao-grid">
        {/* Card para Registrar a Produção */}
        <div className="card">
          <h2>Registrar Produção</h2>
          <form onSubmit={handleSubmit} className="registro-form">
            <div className="form-group">
              <label htmlFor="receita-select">Selecione o Pastel:</label>
              <select 
                  id="receita-select" 
                  value={selectedReceita} 
                  onChange={(e) => setSelectedReceita(e.target.value)}
                  className="form-select"
              >
                {receitas.map(r => (
                  <option key={r.id} value={r.id}>{r.nome}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="quantidade-input">Quantidade:</label>
              <input 
                  type="number" 
                  id="quantidade-input" 
                  value={quantidade} 
                  onChange={(e) => setQuantidade(e.target.value)}
                  min="1"
                  className="form-input"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              <span>Produzir</span>
            </button>
          </form>
        </div>
        
        {/* Card para o Estoque de Produtos Acabados */}
        <div className="card">
          <h2>Estoque de Produtos Acabados</h2>
          {produtosAcabados.length > 0 ? (
            <ul className="estoque-list">
              {produtosAcabados.map(produto => (
                  <li key={produto.receitaId} className="estoque-item">
                      <span className="estoque-item-nome">{produto.nome}:</span>
                      <strong className="estoque-item-quantidade">{produto.quantidade} un</strong>
                  </li>
              ))}
            </ul>
          ) : (
            <p style={{color: 'var(--text-secondary)'}}>Nenhum produto em estoque.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProducaoDiaria;