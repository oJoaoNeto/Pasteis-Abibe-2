// src/pages/Insumos.jsx

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import '../styles/Insumos.css'; // Seu import está correto

function Insumos() {
  const { insumos, addInsumo, removerInsumo, updateInsumo } = useData();

  // --- Lógica de estados e handlers (permanece a mesma) ---
  const [novoNome, setNovoNome] = useState('');
  const [novaUnidade, setNovaUnidade] = useState('KG');
  const [novoCusto, setNovoCusto] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ nome: '', custo: '', estoque: '' });

  const handleSubmitNovoInsumo = (e) => {
    e.preventDefault();
    if (!novoNome || novoCusto <= 0) {
      return alert("Preencha todos os campos corretamente.");
    }
    addInsumo({ nome: novoNome, unidade: novaUnidade, custo: Number(novoCusto), estoque: 0 });
    setNovoNome('');
    setNovaUnidade('KG');
    setNovoCusto('');
  };

  const handleEditClick = (insumo) => {
    setEditingId(insumo.id);
    setEditFormData({ ...insumo });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleSaveClick = (id) => {
    updateInsumo(id, {
      nome: editFormData.nome,
      custo: Number(editFormData.custo),
      estoque: Number(editFormData.estoque),
    });
    setEditingId(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="insumos-page">
      <h1>Controle de Insumos</h1>

      <div className="card add-form-card">
        <form onSubmit={handleSubmitNovoInsumo} className="add-form">
          <input type="text" placeholder="Nome do Insumo" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} className="form-input" />
          <select value={novaUnidade} onChange={(e) => setNovaUnidade(e.target.value)} className="form-select">
            <option value="KG">KG</option>
            <option value="Litro">Litro</option>
            <option value="Unidade">Unidade</option>
          </select>
          <input type="number" step="0.01" placeholder="Custo por Unidade" value={novoCusto} onChange={(e) => setNovoCusto(e.target.value)} className="form-input" />
          <button type="submit" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Adicionar</span>
          </button>
        </form>
      </div>

      <div className="card table-card">
        <table className="insumos-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Estoque Atual</th>
              <th>Unidade</th>
              <th>Custo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map((insumo) => (
              <tr key={insumo.id}>
                {editingId === insumo.id ? (
                  // --- LINHA EM MODO DE EDIÇÃO ---
                  <>
                    <td><input type="text" name="nome" value={editFormData.nome} onChange={handleEditFormChange} className="form-input" /></td>
                    <td><input type="number" step="0.001" name="estoque" value={editFormData.estoque} onChange={handleEditFormChange} className="form-input" /></td>
                    <td>{insumo.unidade}</td>
                    <td><input type="number" step="0.01" name="custo" value={editFormData.custo} onChange={handleEditFormChange} className="form-input" /></td>
                    <td className="actions-cell">
                      <button onClick={() => handleSaveClick(insumo.id)} className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                        <span>Salvar</span>
                      </button>
                      <button onClick={handleCancelClick} className="btn btn-outline">Cancelar</button>
                    </td>
                  </>
                ) : (
                  // --- LINHA EM MODO DE VISUALIZAÇÃO ---
                  <>
                    <td>{insumo.nome}</td>
                    <td style={{ textAlign: 'center' }}>{insumo.estoque.toFixed(3)}</td>
                    <td style={{ textAlign: 'center' }}>{insumo.unidade}</td>
                    <td style={{ textAlign: 'center' }}>R$ {insumo.custo.toFixed(2)}</td>
                    <td className="actions-cell">
                      <button onClick={() => handleEditClick(insumo)} className="btn btn-outline">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                         <span>Editar</span>
                      </button>
                      <button onClick={() => removerInsumo(insumo.id)} className="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Insumos;