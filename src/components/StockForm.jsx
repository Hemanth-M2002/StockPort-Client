import React, { useState, useEffect } from 'react';

const StockForm = ({ onSubmit, initialData }) => {
  const [stock, setStock] = useState({
    name: '',
    ticker: '',
    quantity: '',
    buyPrice: '',
    currentPrice: ''
  });

  useEffect(() => {
    if (initialData) {
      setStock(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(stock);
    setStock({ name: '', ticker: '', quantity: '', buyPrice: '', currentPrice: '' });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{initialData ? 'Edit Stock' : 'Add New Stock'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Stock Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={stock.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="ticker" className="block text-sm font-medium text-gray-700">Ticker</label>
          <input
            type="text"
            id="ticker"
            name="ticker"
            value={stock.ticker}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={stock.quantity}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700">Buy Price</label>
          <input
            type="number"
            id="buyPrice"
            name="buyPrice"
            value={stock.buyPrice}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">Current Price</label>
          <input
            type="number"
            id="currentPrice"
            name="currentPrice"
            value={stock.currentPrice}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          {initialData ? 'Update Stock' : 'Add Stock'}
        </button>
      </form>
    </div>
  );
};

export default StockForm;

