import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados fictícios para o gráfico
const data = [
  { name: 'Carne', Vendidos: 120 },
  { name: 'Queijo', Vendidos: 98 },
  { name: 'Pizza', Vendidos: 86 },
  { name: 'Frango/Cat.', Vendidos: 75 },
  { name: 'Palmito', Vendidos: 65 },
  { name: 'Calabresa', Vendidos: 55 },
];

function ProdutosMaisVendidosChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
        <XAxis dataKey="name" stroke="var(--text-secondary)" />
        <YAxis stroke="var(--text-secondary)" />
        <Tooltip
          contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
          formatter={(value) => `${value} un.`}
        />
        <Legend />
        <Bar dataKey="Vendidos" fill="var(--brand-yellow)" name="Unidades Vendidas" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ProdutosMaisVendidosChart;