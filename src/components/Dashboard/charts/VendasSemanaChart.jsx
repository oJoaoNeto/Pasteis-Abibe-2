import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados fictícios para o gráfico
const data = [
  { name: 'Seg', Vendas: 2200 },
  { name: 'Ter', Vendas: 3100 },
  { name: 'Qua', Vendas: 1900 },
  { name: 'Qui', Vendas: 2880 },
  { name: 'Sex', Vendas: 3990 },
  { name: 'Sáb', Vendas: 4500 },
  { name: 'Dom', Vendas: 4100 },
];

function VendasSemanaChart() {
  return (
    // O ResponsiveContainer faz o gráfico se adaptar ao tamanho do seu contêiner pai
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
        <XAxis dataKey="name" stroke="var(--text-secondary)" />
        <YAxis stroke="var(--text-secondary)" />
        <Tooltip
          contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
          formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
        />
        <Legend />
        <Line type="monotone" dataKey="Vendas" stroke="var(--brand-red)" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default VendasSemanaChart;