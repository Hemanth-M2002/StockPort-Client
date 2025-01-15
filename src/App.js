import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import Login from './components/Login';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [editingStock, setEditingStock] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          currentPrice: Number((stock.currentPrice * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addStock = (newStock) => {
    setStocks([...stocks, { ...newStock, id: Date.now() }]);
  };

  const updateStock = (updatedStock) => {
    setStocks(stocks.map(stock => 
      stock.id === updatedStock.id ? updatedStock : stock
    ));
    setEditingStock(null);
  };

  const deleteStock = (id) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  const startEditing = (stock) => {
    setEditingStock(stock);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900">
      <Router>
        {/* Conditional Navbar Rendering */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={
            <>
              {/* Navigation Bar only shows on the dashboard route */}
              <nav className="bg-indigo-700 text-white shadow-lg">
                <div className="container mx-auto p-4 flex justify-between items-center">
                  <h1 className="text-3xl font-extrabold tracking-tight">StockPort</h1>
                  <Link to="/dashboard" className="px-4 py-2 bg-indigo-800 hover:bg-indigo-600 rounded-lg transition-all text-sm font-medium">
                    Dashboard
                  </Link>
                </div>
              </nav>

              {/* Dashboard and Stock List */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Dashboard Section */}
                <div className="lg:col-span-2">
                  <section className="mb-8">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                      <Dashboard stocks={stocks} />
                    </div>
                  </section>

                  {/* Stock List Section */}
                  <section>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                      <h2 className="text-xl font-bold text-indigo-700 mb-4">Stock List</h2>
                      <StockList
                        stocks={stocks}
                        onEdit={startEditing}
                        onDelete={deleteStock}
                      />
                    </div>
                  </section>
                </div>

                {/* Stock Form Section */}
                <div>
                  <section className="bg-white shadow-lg rounded-lg p-6 sticky top-4">
                    <h2 className="text-xl font-bold text-indigo-700 mb-4">
                      {editingStock ? "Edit Stock" : "Add New Stock"}
                    </h2>
                    <StockForm
                      onSubmit={editingStock ? updateStock : addStock}
                      initialData={editingStock}
                    />
                  </section>
                </div>
              </div>
            </>
          } />
          <Route path="/stock-form" element={<StockForm onSubmit={editingStock ? updateStock : addStock} initialData={editingStock} />} />
          <Route path="/stock-list" element={<StockList stocks={stocks} onEdit={startEditing} onDelete={deleteStock} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
