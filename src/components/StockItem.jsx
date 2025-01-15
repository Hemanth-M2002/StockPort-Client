import React from 'react';

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const StockItem = ({ stock, onEdit, onDelete }) => {
  const totalValue = stock.quantity * stock.currentPrice;
  const percentChange = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{stock.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{stock.ticker}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{stock.quantity}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">${stock.buyPrice}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">${stock.currentPrice}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">${totalValue.toFixed(2)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`text-sm font-medium flex items-center ${percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {percentChange >= 0 ? (
            <ArrowUpIcon className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 mr-1" />
          )}
          {Math.abs(percentChange).toFixed(2)}%
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button 
          onClick={() => onEdit(stock)} 
          className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-150 ease-in-out"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(stock.id)} 
          className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StockItem;

