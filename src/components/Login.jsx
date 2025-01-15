import { useState } from 'react'
import { LineChart, TrendingUp, Lock, User } from 'lucide-react'
import StockBackground from './StockBackground'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempted with:', email, password)
  }

  const handleClick =(e)=>{
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      <StockBackground />
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src="https://shorturl.at/Nibjb" 
          alt="Stock market background" 
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="w-full max-w-md relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
        <div className="space-y-1 p-6">
          <div className="text-2xl font-bold flex items-center justify-center text-white">
            <LineChart className="mr-2 h-6 w-6 text-green-400" />
            StockFolio
          </div>
          <div className="text-gray-300 text-center">
            Access your portfolio and track your investments
          </div>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-200">Email</label>
              <div className="relative">
                <input 
                  id="email" 
                  placeholder="name@example.com" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="w-full p-3 pl-10 bg-gray-800 border-2 border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-200">Password</label>
              <div className="relative">
                <input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="w-full p-3 pl-10 bg-gray-800 border-2 border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            <button 
              className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-md"
              type="submit"
              onClick={handleClick}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="w-full px-4 py-3 bg-gray-800 text-center">
          <p className="text-sm text-gray-300">
            Don't have an account? <a href="#" className="text-green-400 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
      <div className="hidden lg:block fixed bottom-4 left-4 right-4 z-20">
        <div className="flex justify-between items-center">
          <img 
            // src="https://shorturl.at/4KIlu" 
            alt="Stock market graph" 
            width={200} 
            height={50}
            className="rounded-full opacity-50"
          />
          <TrendingUp className="h-8 w-8 text-green-400" />
        </div>
      </div>
    </div>
  )
}
