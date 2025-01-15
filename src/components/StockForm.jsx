import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockForm = ({ onSubmit, initialData }) => {
  const [stock, setStock] = useState({
    name: '',
    ticker: '',
    quantity: '',
    buyPrice: '',
    currentPrice: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setStock(initialData);
      fetchStockData(initialData.ticker);
    }
  }, [initialData]);

  const fetchStockData = async (ticker) => {
    if (!ticker) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query`, {
          params: {
            function: 'TIME_SERIES_INTRADAY',
            symbol: ticker,
            interval: '5min',
            apikey: '4B8LYPDOIYZUT8TP' // Replace with your AlphaVantage API key
          }
        }
      );
      const data = response.data['Time Series (5min)'];
      const latestTime = Object.keys(data)[0];
      const latestPrice = data[latestTime]['4. close'];
      setStock(prevStock => ({
        ...prevStock,
        currentPrice: latestPrice
      }));
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch stock data whenever the ticker changes
    if (stock.ticker) {
      fetchStockData(stock.ticker);
    }
  }, [stock.ticker]);

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
            disabled
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          {initialData ? 'Update Stock' : 'Add Stock'}
        </button>
      </form>
      {isLoading && <p className="text-center text-indigo-600 mt-4">Fetching current price...</p>}
    </div>
  );
};

export default StockForm;
