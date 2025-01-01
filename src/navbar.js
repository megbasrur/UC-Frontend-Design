import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './logo.jpg';
import AuthContext from './AuthContext';
import Swal from 'sweetalert2';


const Navbar=({isLoginOpen})=>{
    const {token,logout}= useContext(AuthContext);
    const navigate=useNavigate();

    const handleLogout=()=>{
        logout();
        Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: 'You have been logged out successfully!',
            timer: 2000,
            showConfirmButton: false, 
        }).then(() => {
            navigate('/home'); // Redirect after the alert
        });
    }

    return(
        <div  className={`transition duration-300 ${isLoginOpen ? 'bg-white bg-opacity-50' : 'bg-blue-500'}`}
        style={isLoginOpen ? { filter: 'blur(5px)' } : {}}> 
            {/*upper navbar*/}
            <div className='bg-blue-500 flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-120 border-b-2'>
            <img src={Logo} className='ml-12 w-20 h-auto'></img>
            {/*<div className='text-white font-bold text-xl'>Luxura</div>*/}
            <div className='flex mr-24 justify-center gap-14 items-center'>
                <input type="text" placeholder='Search' className='w-[500px] sm:w-[200px] group-hover:w-[300px] focus:w-[400px] transition-all duration-300 bg-gray-300 rounded-md border border-gray-300 px-2 py-1'></input>
            
            <Link to="/cart" className="hover:text-gray-400">Cart</Link>
            <Link to="/profile" className="hover:text-gray-400">Profile</Link>
            {!token? (
                        <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
                    ):(
                        <button onClick={handleLogout}
                        className="text-white hover:text-gray-400"
                        >Logout</button>
                    )}
            </div>
            </div>
            <div className="w-full mx-auto flex justify-evenly bg-white">

            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/products" className="hover:text-gray-400">Products</Link>
            <Link to='/wishlist' className="hover:text-gray-400">Wishlist</Link>
          
          
            {/*<div className='flex justify-center'>

            <div className="text-white mx-4">Home</div>
            <div className="text-white mx-4">Products</div>
            <div className="text-white mx-4">About Us</div>
            </div>
            <div className='bg-gray-400 border-black rounded-md'>Search</div>
            <div className="text-white mx-4">Cart</div>*/}
            </div>
            </div>
    );
};

export default Navbar;