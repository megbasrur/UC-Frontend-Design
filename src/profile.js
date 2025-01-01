import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { AuthProvider } from './AuthContext';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
const navigate=useNavigate();

const navigateToWishlist = () => {
  navigate('/wishlist'); // Change '/wishlist' to your actual route for the Wishlist page
};


  return (
    <div className="container mx-auto py-8">
      <div className='flex justify-center items-center gap-7'>
      <FontAwesomeIcon icon={faUser} size='lg' color='white' />
      <h2 className='text-white text-2xl'>Your Account</h2>
      </div>
      <hr className='mt-10'></hr>
      <div className='flex flex-col justify-center items-center'>
        <div className='grid grid-cols-3 xs:grid-cols-2 gap-x-48 gap-y-8 mt-20 justify-center items-center ml-'>
        <div className='bg-white border text-blue-600 font-semibold text-lg border-gray-600 shadow-md w-40 rounded-md p-5 text-center'>Your Orders</div>
        <div className='bg-white border text-blue-600 font-semibold text-lg border-gray-600 shadow-md  w-40 rounded-md p-5 text-center' onClick={navigateToWishlist}>Your Wishlist</div>
        <div className='bg-white border text-blue-600 font-semibold text-lg border-gray-600 shadow-md  w-40 rounded-md p-5 text-center'>Addresses</div>
        <div className='bg-white border text-blue-600 font-semibold text-lg border-gray-600 shadow-md w-40 rounded-md p-5 text-center'>Payments</div>
        <div className='bg-white border text-blue-600 font-semibold text-lg border-gray-600 shadow-md w-40 rounded-md p-5 text-center'>Notifications</div>
        <div className='bg-white border text-blue-600 font-semibold text-lg border-gray-600 shadow-md w-40 rounded-md p-5 text-center'>Customer Service</div>
      </div>
      </div>
      </div>
    
  );
};

export default Profile;