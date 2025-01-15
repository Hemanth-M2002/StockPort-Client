import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import Login from './components/Login';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => ({
          ...stock,
          currentPrice: Number((stock.currentPrice * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2)),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addStock = (newStock) => {
    setStocks([...stocks, { ...newStock, id: Date.now() }]);
  };

  const updateStock = (updatedStock) => {
    setStocks(stocks.map(stock => (stock.id === updatedStock.id ? updatedStock : stock)));
    setEditingStock(null);
  };

  const deleteStock = (id) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  const startEditing = (stock) => {
    setEditingStock(stock);
  };

  const handleLogout = () => {
    // Clear session or token and redirect to login page (you can modify this logic)
    console.log('Logged out');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={
            <>
              <nav className="bg-indigo-700 text-white shadow-lg">
                <div className="container mx-auto p-4 flex justify-between items-center">
                 <Link to="/dashboard" className="text-3xl font-extrabold tracking-tight">
                 <h1>StockPort</h1> </Link> 
                  <div className="relative">
  <button 
    onClick={() => setDropdownOpen(!isDropdownOpen)} 
    className="flex items-center px-4 py-2 bg-indigo-800 hover:bg-indigo-600 rounded-lg text-sm font-medium">
    <span className="mr-2">User</span>
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>

  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 bg-white text-indigo-700 shadow-lg rounded-lg w-48 z-10">
      <ul>
        <li>
          <Link 
            to="/profile" 
            className="block px-4 py-2 text-sm text-black font-medium hover:bg-indigo-100 rounded-t-lg">
            Profile
          </Link>
        </li>
        <li>
          <button 
            onClick={handleLogout} 
            className="block w-full text-left text-black px-4 py-2 text-sm font-medium hover:bg-indigo-100 rounded-b-lg">
            Logout
          </button>
        </li>
      </ul>
    </div>
  )}
</div>
                </div>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <section className="mb-8">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                      <Dashboard stocks={stocks} />
                    </div>
                  </section>

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

                <div>
                  <section className="bg-white shadow-lg rounded-lg p-6 sticky top-4">
                    <h2 className="text-xl font-bold text-indigo-700 mb-4">
                      {editingStock ? 'Edit Stock' : 'Add New Stock'}
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
