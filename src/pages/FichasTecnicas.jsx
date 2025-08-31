// src/pages/FichasTecnicas.jsx
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import '../styles/FichasTecnicas.css'; // Seu CSS para a página de Fichas Técnicas

function FichasTecnicas() {
  const { receitas, insumos, addReceita, removerReceita, updateReceita } = useData();

  // --- Estados para o formulário de NOVA receita ---
  const [novoNomeReceita, setNovoNomeReceita] = useState('');
  const [novoPrecoVenda, setNovoPrecoVenda] = useState('');
  const [novosIngredientes, setNovosIngredientes] = useState([]); // { insumoId: ..., quantidade: ... }
  
  // Estados para adicionar ingrediente individualmente no formulário
  const [selectedInsumoId, setSelectedInsumoId] = useState('');
  const [selectedQuantidade, setSelectedQuantidade] = useState('');

  // --- Estados para o modo de EDIÇÃO (de uma receita inteira) ---
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ 
    nome: '', 
    precoVenda: '', 
    ingredientes: [] // { insumoId: ..., quantidade: ... }
  });

  // --- Handlers para o formulário de ADIÇÃO ---
  const handleAddIngrediente = () => {
    if (selectedInsumoId && selectedQuantidade > 0) {
      const insumoExistente = insumos.find(i => i.id === Number(selectedInsumoId));
      if (!insumoExistente) {
        alert("Insumo selecionado inválido.");
        return;
      }
      // Verifica se o insumo já está na lista de ingredientes
      const ingredienteExistenteIndex = novosIngredientes.findIndex(
        ing => ing.insumoId === Number(selectedInsumoId)
      );

      if (ingredienteExistenteIndex > -1) {
        // Se existe, atualiza a quantidade
        const updatedIngredientes = [...novosIngredientes];
        updatedIngredientes[ingredienteExistenteIndex].quantidade += Number(selectedQuantidade);
        setNovosIngredientes(updatedIngredientes);
      } else {
        // Se não existe, adiciona um novo
        setNovosIngredientes(prev => [
          ...prev,
          {
            insumoId: Number(selectedInsumoId),
            nomeInsumo: insumoExistente.nome, // Armazena o nome para facilitar exibição
            unidadeInsumo: insumoExistente.unidade, // Armazena unidade
            quantidade: Number(selectedQuantidade),
          },
        ]);
      }
      setSelectedInsumoId('');
      setSelectedQuantidade('');
    } else {
      alert("Selecione um insumo e digite uma quantidade válida.");
    }
  };

  const handleRemoveIngrediente = (insumoIdToRemove) => {
    setNovosIngredientes(prev => prev.filter(ing => ing.insumoId !== insumoIdToRemove));
  };

  const handleSubmitNovaReceita = (e) => {
    e.preventDefault();
    if (!novoNomeReceita || novoPrecoVenda <= 0 || novosIngredientes.length === 0) {
      return alert("Preencha o nome, preço de venda e adicione pelo menos um ingrediente.");
    }

    addReceita({
      nome: novoNomeReceita,
      precoVenda: Number(novoPrecoVenda),
      ingredientes: novosIngredientes.map(({ insumoId, quantidade }) => ({ insumoId, quantidade })), // Salva apenas ID e QTD
    });

    // Limpa o formulário
    setNovoNomeReceita('');
    setNovoPrecoVenda('');
    setNovosIngredientes([]);
  };

  // --- Funções para o MODO DE EDIÇÃO de RECEITA ---
  const handleEditClick = (receita) => {
    setEditingId(receita.id);
    // Preenche o form de edição com os dados atuais, incluindo nome dos insumos
    setEditFormData({ 
      ...receita,
      ingredientes: receita.ingredientes.map(ing => {
        const insumoInfo = insumos.find(i => i.id === ing.insumoId);
        return {
          ...ing,
          nomeInsumo: insumoInfo ? insumoInfo.nome : 'Insumo Desconhecido',
          unidadeInsumo: insumoInfo ? insumoInfo.unidade : '',
        };
      }),
    });
  };

  const handleCancelClick = () => {
    setEditingId(null); // Sai do modo de edição
  };

  const handleSaveClick = (id) => {
    if (!editFormData.nome || editFormData.precoVenda <= 0 || editFormData.ingredientes.length === 0) {
        return alert("Preencha o nome, preço de venda e adicione pelo menos um ingrediente.");
    }
    // Salva apenas os dados relevantes para o contexto
    updateReceita(id, {
        nome: editFormData.nome,
        precoVenda: Number(editFormData.precoVenda),
        ingredientes: editFormData.ingredientes.map(({ insumoId, quantidade }) => ({ insumoId, quantidade })),
    });
    setEditingId(null); // Sai do modo de edição após salvar
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEditIngredienteChange = (index, field, value) => {
    const updatedIngredientes = [...editFormData.ingredientes];
    updatedIngredientes[index][field] = Number(value); // Garante que quantidade é número
    setEditFormData(prevData => ({ ...prevData, ingredientes: updatedIngredientes }));
  };

  const handleAddEditIngrediente = () => {
    // Lógica para adicionar novos ingredientes no modo de edição
    const existingInsumo = insumos.find(i => i.id === Number(selectedInsumoId));
    if (selectedInsumoId && selectedQuantidade > 0 && existingInsumo) {
        const newIngredient = {
            insumoId: Number(selectedInsumoId),
            nomeInsumo: existingInsumo.nome,
            unidadeInsumo: existingInsumo.unidade,
            quantidade: Number(selectedQuantidade),
        };
        const updatedIngredientes = [...editFormData.ingredientes];
        const existingIndex = updatedIngredientes.findIndex(ing => ing.insumoId === newIngredient.insumoId);

        if (existingIndex > -1) {
            updatedIngredientes[existingIndex].quantidade += newIngredient.quantidade;
        } else {
            updatedIngredientes.push(newIngredient);
        }
        setEditFormData(prevData => ({ ...prevData, ingredientes: updatedIngredientes }));
        setSelectedInsumoId('');
        setSelectedQuantidade('');
    } else {
        alert("Selecione um insumo e digite uma quantidade válida.");
    }
  };

  const handleRemoveEditIngrediente = (insumoIdToRemove) => {
    const updatedIngredientes = editFormData.ingredientes.filter(ing => ing.insumoId !== insumoIdToRemove);
    setEditFormData(prevData => ({ ...prevData, ingredientes: updatedIngredientes }));
  };


  // Função auxiliar para calcular custo e margem
  const calcularCustoEMargem = (receita) => {
    let custoProducao = 0;
    receita.ingredientes.forEach(ing => {
      const insumo = insumos.find(i => i.id === ing.insumoId);
      if (insumo) {
        custoProducao += insumo.custo * ing.quantidade;
      }
    });
    const margemContribuicao = receita.precoVenda - custoProducao;
    return { custoProducao, margemContribuicao };
  };

  return (
    <div className="fichas-tecnicas-page">
      <h1>Fichas Técnicas de Receitas</h1>

      {/* Formulário de Adição de Receitas */}
      <div className="card add-receita-form-card">
        <h2>Adicionar Nova Receita</h2>
        <form onSubmit={handleSubmitNovaReceita} className="add-receita-form">
          <div className="form-group">
            <label htmlFor="nomeReceita">Nome da Receita:</label>
            <input 
              type="text" 
              id="nomeReceita"
              value={novoNomeReceita} 
              onChange={(e) => setNovoNomeReceita(e.target.value)} 
              className="form-input" 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="precoVenda">Preço de Venda (R$):</label>
            <input 
              type="number" 
              id="precoVenda"
              step="0.01" 
              value={novoPrecoVenda} 
              onChange={(e) => setNovoPrecoVenda(e.target.value)} 
              className="form-input" 
              required
            />
          </div>

          <h3>Ingredientes:</h3>
          <div className="ingredientes-list">
            {novosIngredientes.map((ing, index) => (
              <div key={index} className="ingrediente-item">
                <span>{ing.nomeInsumo}: {ing.quantidade.toFixed(3)} {ing.unidadeInsumo}</span>
                <button type="button" onClick={() => handleRemoveIngrediente(ing.insumoId)}>x</button>
              </div>
            ))}
          </div>

          <div className="ingrediente-form-row">
            <select 
              value={selectedInsumoId} 
              onChange={(e) => setSelectedInsumoId(e.target.value)} 
              className="form-select"
            >
              <option value="">Selecione um Insumo</option>
              {insumos.map(insumo => (
                <option key={insumo.id} value={insumo.id}>
                  {insumo.nome} ({insumo.unidade})
                </option>
              ))}
            </select>
            <input 
              type="number" 
              step="0.001" 
              placeholder="Quantidade" 
              value={selectedQuantidade} 
              onChange={(e) => setSelectedQuantidade(e.target.value)} 
              className="form-input" 
            />
            <button type="button" onClick={handleAddIngrediente} className="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Adicionar
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Salvar Receita
          </button>
        </form>
      </div>

      {/* Lista de Receitas Cadastradas */}
      <h2>Receitas Cadastradas</h2>
      <div className="fichas-tecnicas-grid">
        {receitas.map((receita) => {
          const { custoProducao, margemContribuicao } = calcularCustoEMargem(receita);
          return (
            <div key={receita.id} className="card receita-card">
              {editingId === receita.id ? (
                // --- MODO DE EDIÇÃO DA RECEITA ---
                <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(receita.id); }}>
                  <div className="form-group">
                    <label htmlFor={`editNome-${receita.id}`}>Nome:</label>
                    <input 
                      type="text" 
                      name="nome" 
                      id={`editNome-${receita.id}`}
                      value={editFormData.nome} 
                      onChange={handleEditFormChange} 
                      className="form-input" 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`editPreco-${receita.id}`}>Preço de Venda (R$):</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      name="precoVenda" 
                      id={`editPreco-${receita.id}`}
                      value={editFormData.precoVenda} 
                      onChange={handleEditFormChange} 
                      className="form-input" 
                      required
                    />
                  </div>

                  <h3>Ingredientes:</h3>
                  <div className="ingredientes-list">
                    {editFormData.ingredientes.map((ing, index) => (
                      <div key={ing.insumoId || index} className="ingrediente-item">
                        <span>{ing.nomeInsumo}: </span>
                        <input 
                          type="number" 
                          step="0.001" 
                          value={ing.quantidade} 
                          onChange={(e) => handleEditIngredienteChange(index, 'quantidade', e.target.value)} 
                          className="form-input"
                          style={{width: '60px'}} /* Estilo inline para largura específica */
                        />
                        <span> {ing.unidadeInsumo}</span>
                        <button type="button" onClick={() => handleRemoveEditIngrediente(ing.insumoId)}>x</button>
                      </div>
                    ))}
                  </div>

                  <div className="ingrediente-form-row" style={{marginTop: '1rem'}}>
                    <select 
                      value={selectedInsumoId} 
                      onChange={(e) => setSelectedInsumoId(e.target.value)} 
                      className="form-select"
                    >
                      <option value="">Add Insumo</option>
                      {insumos.map(insumo => (
                        <option key={insumo.id} value={insumo.id}>
                          {insumo.nome}
                        </option>
                      ))}
                    </select>
                    <input 
                      type="number" 
                      step="0.001" 
                      placeholder="Qtd." 
                      value={selectedQuantidade} 
                      onChange={(e) => setSelectedQuantidade(e.target.value)} 
                      className="form-input" 
                    />
                    <button type="button" onClick={handleAddEditIngrediente} className="btn btn-secondary">Add</button>
                  </div>


                  <div className="receita-actions">
                    <button type="submit" className="btn btn-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                      Salvar
                    </button>
                    <button type="button" onClick={handleCancelClick} className="btn btn-outline">Cancelar</button>
                  </div>
                </form>
              ) : (
                // --- MODO DE VISUALIZAÇÃO DA RECEITA ---
                <>
                  <h2>{receita.nome}</h2>
                  <div className="receita-details">
                    <p><span className="label">Preço de Venda:</span> R$ {receita.precoVenda.toFixed(2)}</p>
                    <p><span className="label">Custo de Produção:</span> R$ {custoProducao.toFixed(2)}</p>
                    <p><span className="label">Margem de Contribuição:</span> <span className="margem">R$ {margemContribuicao.toFixed(2)}</span></p>

                    <p><span className="label">Ingredientes:</span></p>
                    <ul>
                      {receita.ingredientes.map((ing, index) => {
                        const insumoInfo = insumos.find(i => i.id === ing.insumoId);
                        return insumoInfo ? (
                          <li key={index}>
                            {insumoInfo.nome}: {ing.quantidade.toFixed(3)} {insumoInfo.unidade}
                          </li>
                        ) : (
                          <li key={index}>Insumo desconhecido (ID: {ing.insumoId})</li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="receita-actions">
                    <button onClick={() => handleEditClick(receita)} className="btn btn-outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                      <span>Editar</span>
                    </button>
                    <button onClick={() => removerReceita(receita.id)} className="btn btn-danger">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      <span>Excluir</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FichasTecnicas;