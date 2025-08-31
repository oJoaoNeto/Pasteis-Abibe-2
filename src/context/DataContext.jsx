// src/context/DataContext.jsx


import React, { createContext, useState, useContext } from 'react';

import { initialInsumos, initialReceitas, initialProdutosAcabados, initialCustosFixos } from '../data/mockData';


const DataContext = createContext();


export const DataProvider = ({ children }) => {

const [insumos, setInsumos] = useState(initialInsumos);

  const [receitas, setReceitas] = useState(initialReceitas);

const [produtosAcabados, setProdutosAcabados] = useState(initialProdutosAcabados);

const [custosFixos, setCustosFixos] = useState(initialCustosFixos);


// --- FUNCIONALIDADES DE INSUMOS ---

 const addInsumo = (novoInsumo) => {

const insumoComId = { ...novoInsumo, id: Date.now() };

 setInsumos(prevInsumos => [...prevInsumos, insumoComId]);

alert(`Insumo "${novoInsumo.nome}" adicionado com sucesso!`);

  };


  const removerInsumo = (idParaRemover) => {

    if (window.confirm("Tem certeza que deseja excluir este insumo?")) {

      setInsumos(prevInsumos => prevInsumos.filter(insumo => insumo.id !== idParaRemover));

    }

  };

  

  // 👇 FUNÇÃO DE ATUALIZAÇÃO ADICIONADA AQUI

  const updateInsumo = (idParaAtualizar, dadosAtualizados) => {

    setInsumos(prevInsumos => 

      prevInsumos.map(insumo => 

        insumo.id === idParaAtualizar ? { ...insumo, ...dadosAtualizados } : insumo

      )

    );

  };


  // --- FUNCIONALIDADES DE RECEITAS ---

  const addReceita = (novaReceita) => {

    const receitaComId = { ...novaReceita, id: Date.now() };

    setReceitas(prevReceitas => [...prevReceitas, receitaComId]);

    alert(`Receita "${novaReceita.nome}" adicionada com sucesso!`);

  };


  const removerReceita = (idParaRemover) => {

    if (window.confirm("Tem certeza que deseja excluir esta ficha técnica?")) {

        setReceitas(prevReceitas => prevReceitas.filter(receita => receita.id !== idParaRemover));

    }

  };


  // 👇 FUNÇÃO DE ATUALIZAÇÃO ADICIONADA AQUI

  const updateReceita = (idParaAtualizar, dadosAtualizados) => {

    setReceitas(prevReceitas =>

      prevReceitas.map(receita =>

        receita.id === idParaAtualizar ? { ...receita, ...dadosAtualizados } : receita

      )

    );

  };


  // --- FUNCIONALIDADE DE PRODUÇÃO (A MAIS COMPLEXA) ---

  const registrarProducao = (receitaId, quantidadeProduzida) => {

    // ... (código da função inalterado)

    const receita = receitas.find(r => r.id === receitaId);

    if (!receita) { return alert("Erro: Receita não encontrada!"); }

    const novosInsumos = [...insumos];

    for (const ingrediente of receita.ingredientes) {

      const insumoIndex = novosInsumos.findIndex(i => i.id === ingrediente.insumoId);

      if (insumoIndex !== -1) {

        novosInsumos[insumoIndex].estoque -= ingrediente.quantidade * quantidadeProduzida;

      }

    }

    setInsumos(novosInsumos);

    const novosProdutos = [...produtosAcabados];

    const produtoIndex = novosProdutos.findIndex(p => p.receitaId === receitaId);

    if (produtoIndex !== -1) {

      novosProdutos[produtoIndex].quantidade += quantidadeProduzida;

    } else {

      novosProdutos.push({ receitaId, nome: receita.nome, quantidade: quantidadeProduzida });

    }

    setProdutosAcabados(novosProdutos);

    alert(`${quantidadeProduzida} unidades de "${receita.nome}" foram produzidas com sucesso!`);

  };

  

  // --- FUNCIONALIDADES FINANCEIRAS ---

  const addCustoFixo = (novoCusto) => {

    const custoComId = { ...novoCusto, id: Date.now() };

    setCustosFixos(prevCustos => [...prevCustos, custoComId]);

  };


  const removerCustoFixo = (idParaRemover) => {

    setCustosFixos(prevCustos => prevCustos.filter(custo => custo.id !== idParaRemover));

  };

  

  // 👇 FUNÇÃO DE ATUALIZAÇÃO ADICIONADA AQUI

  const updateCustoFixo = (idParaAtualizar, dadosAtualizados) => {

    setCustosFixos(prevCustos => 

      prevCustos.map(custo =>

        custo.id === idParaAtualizar ? { ...custo, ...dadosAtualizados } : custo

      )

    );

  };


  // Objeto com todos os dados e funções que serão disponibilizados para a aplicação

  const value = {

    insumos,

    receitas,

    produtosAcabados,

    custosFixos,

    addInsumo,

    removerInsumo,

    updateInsumo, // 👈 ADICIONADO

    addReceita,

    removerReceita,

    updateReceita, // 👈 ADICIONADO

    registrarProducao,

    addCustoFixo,

    removerCustoFixo,

    updateCustoFixo, // 👈 ADICIONADO

  };


  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;

};


export const useData = () => {

  return useContext(DataContext);

};