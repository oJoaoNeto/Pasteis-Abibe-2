// src/pages/Financeiro.jsx

import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Financeiro.css';

const KPICard = ({ title, value, description, icon }) => (
    <div className="card kpi-card">
        <div className="kpi-card-icon">{icon}</div>
        <div className="kpi-card-info">
            <h3>{title}</h3>
            <p>{value}</p>
            <small style={{ color: 'var(--text-secondary)' }}>{description}</small>
        </div>
    </div>
);


function Financeiro() {
    const { insumos, receitas, custosFixos } = useData();

    const analiseFinanceira = useMemo(() => {
        const analiseReceitas = receitas.map(receita => {
            const custoProducaoUnitario = receita.ingredientes.reduce((totalCusto, ingrediente) => {
                const insumo = insumos.find(i => i.id === ingrediente.insumoId);
                return totalCusto + (insumo ? insumo.custo * ingrediente.quantidade : 0);
            }, 0);
            const margemContribuicao = receita.precoVenda - custoProducaoUnitario;
            const margemPercentual = (margemContribuicao / receita.precoVenda) * 100;
            return { ...receita, custoProducaoUnitario, margemContribuicao, margemPercentual };
        });
        const totalCustosFixos = custosFixos.reduce((total, custo) => total + custo.valor, 0);
        const margemMediaPercentual = analiseReceitas.reduce((total, r) => total + r.margemPercentual, 0) / (analiseReceitas.length || 1);
        let pontoDeEquilibrio = 8000;
        if (margemMediaPercentual > 0) {
            pontoDeEquilibrio = totalCustosFixos / (margemMediaPercentual / 100);
        }
        return { analiseReceitas, totalCustosFixos, pontoDeEquilibrio };
    }, [insumos, receitas, custosFixos]);

    const { analiseReceitas, totalCustosFixos, pontoDeEquilibrio } = analiseFinanceira;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="financeiro-page">
            <h1>Gestão Financeira</h1>

            <div className="kpi-grid">
                <KPICard
                    title="Total de Custos Fixos"
                    value={`R$ ${totalCustosFixos.toFixed(2)}`}
                    description="Soma de aluguel, salários, etc."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                />
                <KPICard
                    title="Ponto de Equilíbrio"
                    value={`R$ ${pontoDeEquilibrio.toFixed(2)}`}
                    description="Faturamento mínimo para não ter prejuízo."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><polyline points="12 6 12 12 16 14"></polyline></svg>}
                />
            </div>

            <div className="content-grid">
                {/* 👇 A CLASSE "table-card" FOI ADICIONADA AQUI 👇 */}

                <div className="card"> {/* Removemos a classe table-card daqui */}
                    <h2>Análise de Custos por Produto</h2>

                    {/* 👇 Adicionamos o novo container de rolagem aqui 👇 */}
                    <div className="table-container">
                        <table className="custos-table">
                            <thead>
                                <tr>
                                    <th className="text-left">Pastel</th>
                                    <th className="text-right col-nowrap">Preço Venda</th>
                                    <th className="text-right col-nowrap">Custo Produção</th>
                                    <th className="text-right col-nowrap">Margem (R$)</th>
                                    <th className="text-right col-nowrap">Margem (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analiseReceitas.map(r => (
                                    <tr key={r.id}>
                                        <td className="text-left">{r.nome}</td>
                                        <td className="text-right col-nowrap">R$ {r.precoVenda.toFixed(2)}</td>
                                        <td className="text-right col-nowrap"><span className="text-danger">R$ {r.custoProducaoUnitario.toFixed(2)}</span></td>
                                        <td className="text-right col-nowrap"><span className="text-success">R$ {r.margemContribuicao.toFixed(2)}</span></td>
                                        <td className="text-right col-nowrap">{r.margemPercentual.toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card chart-container">
                    <h2>Composição dos Custos Fixos</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={custosFixos}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="valor"
                                nameKey="nome"
                            >
                                {custosFixos.map((entry, index) => (
                                    <Cell key={`cell-index-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `R$ ${Number(value).toFixed(2)}`}

                                // Estilo para a CAIXA do tooltip (fundo, borda)
                                contentStyle={{
                                    backgroundColor: 'var(--bg-surface)',
                                    borderColor: 'var(--border-color)',
                                }}

                                // 👇 ESTA NOVA PROPRIEDADE É A CHAVE PARA O TEXTO 👇
                                // Estilo para CADA ITEM de texto dentro do tooltip
                                itemStyle={{
                                    color: 'var(--text-primary)'
                                }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Financeiro;