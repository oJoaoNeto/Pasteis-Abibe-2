export const initialInsumos = [
  { id: 1, nome: 'Farinha de Trigo Especial', unidade: 'KG', estoque: 25, custo: 4.50 },
  { id: 2, nome: 'Carne Moída de Primeira', unidade: 'KG', estoque: 10, custo: 35.00 },
  { id: 3, nome: 'Óleo de Soja', unidade: 'Litro', estoque: 5, custo: 8.00 },
  { id: 4, nome: 'Azeitona Verde', unidade: 'KG', estoque: 2, custo: 25.00 },
];

export const initialReceitas = [
  {
    id: 1,
    nome: 'Pastel de Carne Clássico',
    precoVenda: 8.00,
    ingredientes: [
      { insumoId: 1, quantidade: 0.100 }, // 100g de farinha
      { insumoId: 2, quantidade: 0.150 }, // 150g de carne
      { insumoId: 4, quantidade: 0.020 }, // 20g de azeitona
    ],
  },
  {
    id: 2,
    nome: 'Pastel de Vento',
    precoVenda: 5.00,
    ingredientes: [
      { insumoId: 1, quantidade: 0.120 }, // 120g de farinha
    ],
  },
];

export const initialProdutosAcabados = [
    { receitaId: 1, nome: 'Pastel de Carne Clássico', quantidade: 20 },
    { receitaId: 2, nome: 'Pastel de Vento', quantidade: 35 },
];

export const initialCustosFixos = [
    { id: 1, nome: 'Aluguel', valor: 1500.00 },
    { id: 2, nome: 'Salário Cozinheiro', valor: 2200.00 },
    { id: 3, nome: 'Energia Elétrica', valor: 450.00 },
]