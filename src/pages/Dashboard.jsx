
import '../styles/Dashboard.css';
// Importe os novos componentes de gráfico
import VendasSemanaChart from '../components/Dashboard/charts/VendasSemanaChart.jsx';
import ProdutosMaisVendidosChart from '../components/Dashboard/charts/ProdutosMaisVendidosChart.jsx';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bem-vindo ao painel de controle da Pastéis Abibe!</p>
      </header>
      
      <div className="dashboard-widgets">
        <div className="widget card">
          <h3>Vendas do Dia</h3>
          <p className="widget-value">R$ 1.234,56</p>
        </div>
        <div className="widget card">
          <h3>Itens Produzidos</h3>
          <p className="widget-value">578</p>
        </div>
        <div className="widget card">
          <h3>Custo de Insumos</h3>
          <p className="widget-value">R$ 456,78</p>
        </div>
        <div className="widget card">
          <h3>Lucro Estimado</h3>
          <p className="widget-value">R$ 777,78</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container card">
          <h2>Vendas da Semana</h2>
          <VendasSemanaChart />
        </div>
        <div className="chart-container card">
          <h2>Produtos Mais Vendidos</h2>
          <ProdutosMaisVendidosChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;