
import './App.css';
import Navbar from './navbar';
import Footer from './footer';
import Home from './home';
import Cart from './cart';
import Profile from './profile';
import Products from './products';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Login';
import { useState, useEffect} from 'react';
import { CartProvider } from './CartContext';
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';
import Wishlist from './wishlist';

function App() {
  const[isLoginOpen,setIsLoginOpen]=useState(false);
  const location=useLocation();

  const hideNavbar=['/login','/signup'];
  
  return (
    <CartProvider>
    <div className="flex flex-col min-h-screen bg-gray-800">
        {!hideNavbar.includes(location.pathname)&&<Navbar isLoginOpen={isLoginOpen}/>}
        <div className="flex-grow">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />}/>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login setIsLoginOpen={setIsLoginOpen}/>} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/products" element={<Products />} />
            <Route path="/wishlist" element={<Wishlist />}/>
          </Routes>
        </div>
        <Footer />
        </div>
        </CartProvider>
  );
}

export default App;
