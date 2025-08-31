// src/sections/Produtos.jsx
import React from 'react';
import '../styles/Produtos.css';

// Placeholder data for products
const produtos = [
  { id: 1, nome: 'Pastel de Carne', descricao: 'Delicioso pastel com recheio de carne moída temperada.', preco: 'R$ 8,00' },
  { id: 2, nome: 'Pastel de Queijo', descricao: 'O clássico que todo mundo ama, com queijo mussarela derretido.', preco: 'R$ 8,00' },
  { id: 3, nome: 'Pastel de Pizza', descricao: 'Sabor de pizza em um pastel crocante, com queijo, presunto e orégano.', preco: 'R$ 8,50' },
  { id: 4, nome: 'Pastel de Frango com Catupiry', descricao: 'Combinação perfeita de frango desfiado com o cremoso Catupiry.', preco: 'R$ 9,00' },
  { id: 5, nome: 'Pastel de Palmito', descricao: 'Recheio suave e saboroso de palmito cremoso.', preco: 'R$ 8,50' },
  { id: 6, nome: 'Pastel de Chocolate', descricao: 'Para os amantes de doce, um pastel recheado com chocolate ao leite.', preco: 'R$ 9,50' },
];

function Produtos() {
  return (
    <section id="produtos" className="produtos-section">
      <h2>Nossos Produtos</h2>
      <div className="produtos-grid">
        {produtos.map(produto => (
          <div key={produto.id} className="produto-card">
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <span className="produto-preco">{produto.preco}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Produtos;
