import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,Grid,
  Paper,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { green, red, indigo } from '@mui/material/colors';

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState({ series: [], options: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

   const handleProfileClick = () => {
    setProfileMenuOpen((prevState) => !prevState);
  };


  const handleLogout = ()=>{
    setProfileMenuOpen(false);
    alert("Logged out")
  }

  useEffect(() => {
    const fetchStockData = async () => {
      const stockSymbols = ['AAPL', 'SSNLF', 'GOOGL']; // Replace with your stock symbols
      const apiKey = '4B8LYPDOIYZUT8TP';
      const stockData = [];

      try {
        for (const symbol of stockSymbols) {
          const response = await axios.get(
            `https://www.alphavantage.co/query`,
            {
              params: {
                function: 'TIME_SERIES_DAILY',
                symbol,
                apikey: apiKey,
              },
            }
          );

          if (response.data['Time Series (Daily)']) {
            const timeSeries = response.data['Time Series (Daily)'];
            const dates = Object.keys(timeSeries);
            const prices = dates.map((date) => parseFloat(timeSeries[date]['4. close']));

            stockData.push({
              name: symbol,
              currentPrice: prices[0],
              buyPrice: prices[5] || prices[0], // Price 5 days ago (or current if unavailable)
              quantity: 10, // Example: Quantity owned
              prices,
              dates,
            });
          } else {
            console.error(`No data for stock symbol: ${symbol}`);
            setError(`Failed to fetch data for ${symbol}`);
          }
        }

        if (stockData.length > 0) {
          setStocks(stockData);

          // Set data for the chart
          setChartData({
            series: stockData.map((stock) => ({
              name: stock.name,
              data: stock.prices.reverse(),
            })),
            options: {
              chart: {
                type: 'line',
                background: '#f4f4f4',
                toolbar: {
                  show: true,
                },
              },
              xaxis: {
                categories: stockData[0].dates.reverse(),
              },
            },
          });
        } else {
          setError('No valid stock data available');
        }
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('An error occurred while fetching stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const totalValue = stocks.reduce((sum, stock) => sum + stock.quantity * stock.currentPrice, 0);
  const topPerformer = stocks.reduce((top, stock) => {
    const performance = (stock.currentPrice - stock.buyPrice) / stock.buyPrice;
    return performance > top.performance ? { name: stock.name, performance } : top;
  }, { name: '', performance: -Infinity });

  const totalGainLoss = stocks.reduce((sum, stock) => {
    return sum + (stock.currentPrice - stock.buyPrice) * stock.quantity;
  }, 0);

  if (loading) {
    return <Typography variant="h6" sx={{ textAlign: 'center' }}>Loading stock data...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>{error}</Typography>;
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, color: indigo[800] }}>
        Stock Portfolio Dashboard
      </Typography>
      
      {/* User Profile Icon */}
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleProfileClick}
        sx={{ position: 'absolute', top: 20, right: 20 }}
      >
        <AccountCircle sx={{ fontSize: 40, color: indigo[800] }} />
      </IconButton>

      {/* Tailwind CSS Dropdown Menu */}
      {profileMenuOpen && (
        <div className="absolute top-20 right-20 mt-2 w-48 bg-white rounded-lg shadow-lg border">
          <ul className="py-2">
            <li>
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ backgroundColor: indigo[50], p: 2 }}>
            <CardContent>
              <Typography variant="h6" color={indigo[800]}>
                Total Value
              </Typography>
              <Typography variant="h4" fontWeight="bold" color={indigo[600]}>
                ${totalValue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ backgroundColor: green[50], p: 2 }}>
            <CardContent>
              <Typography variant="h6" color={green[800]}>
                Top Performer
              </Typography>
              <Typography variant="h5" fontWeight="bold" color={green[600]}>
                {topPerformer.name}
              </Typography>
              <Typography variant="body1" color={green[500]}>
                +{(topPerformer.performance * 100).toFixed(2)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ backgroundColor: totalGainLoss >= 0 ? green[50] : red[50], p: 2 }}>
            <CardContent>
              <Typography variant="h6" color={totalGainLoss >= 0 ? green[800] : red[800]}>
                Total Gain/Loss
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: totalGainLoss >= 0 ? green[600] : red[600],
                }}
              >
                {totalGainLoss >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                ${Math.abs(totalGainLoss).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: indigo[800] }}>
              Stock Performance Chart
            </Typography>
            <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
