import React, {useState, useContext, useEffect} from "react";
import AuthContext from "./AuthContext";
import CartContext from "./CartContext";
import { useNavigate } from "react-router-dom";

const Cart=()=>{
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status
  const navigate = useNavigate();

  useEffect(() => {
      //logged in?
      const token = localStorage.getItem("token");
      if (token) {
          setIsLoggedIn(true);
      }
  }, []);

  if (!isLoggedIn) {
      // Redirect to login page if the user is not logged in
      return (
        <div className="mt-7 p-6 bg-gray-100">
          <h2 className="text-2xl font-bold text-center mb-5">Your Cart</h2>
          <p className="text-center text-gray-500">
            You need to <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>log in</span> to view your cart.
          </p>
        </div>
      );
  }

  return (
      <div className="mt-7 p-6 ">
          <h2 className="text-2xl font-bold text-center mb-5 text-white">Your Cart</h2>
          <hr className="mb-10"></hr>
          {cart.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
              <div>
                  <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                      {cart.map((product) => (
                          <div key={product.id} className="bg-gray-200 border-2 flex flex-col justify-center items-center border-blue-600 p-10 rounded-md shadow-lg">
                              <h2 className="text-lg font-bold text-black text-center">{product.title}</h2>
                              <p className="text-blue-500 mt-1">${product.price}</p>
                              <img src={product.thumbnail} className="w-32 shadow-sm "></img>
                              <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                              <p className="mt-2 text-center text-md mb-2">
              Quantity: {product.quantity || 1} {/* Default quantity is 1 */}
            </p>
                              <div className="flex justify-center items-center mt-2">
                                  <button
                                      onClick={() => removeFromCart(product.id)}
                                      className="bg-red-600 p-2 text-sm rounded-md"
                                  >
                                      Remove
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
                </div>
          )}
                  <div className="mt-9 flex justify-between items-center ">
                      <button
                          onClick={clearCart}
                          className="px-4 py-2 bg-gray-600 text-white rounded"
                      >
                          Clear Cart
                      </button>
                      <button
                          onClick={() => navigate("/checkout")}
                          className="px-4 py-2 bg-blue-600 text-white rounded"
                      >
                          Checkout
                      </button>
                  </div>
              </div>
       
    );
};

export default Cart;

/*import React, { useContext, useState, useEffect } from 'react';
import CartContext from './CartContext';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const[cart, removeFromCart]= useContext(CartContext);
  const{token}=useContext(AuthContext);
  const [cartItems, setCartItems]=useState([]);
  const navigate=useNavigate();

  // getting carts by user with id 5
useEffect(()=>{
  fetch('https://dummyjson.com/carts/user/5')
.then(res => res.json())
.then(data=>{
    setCartItems(data.carts[0].products); 
    console.log(data.carts[0].products);
  }
)
.catch(error => console.error('Error fetching cart:', error));
}, []);


return (
  <div>
    p
  </div>
);
}

export default Cart;

 /* useEffect(() => {
    if (token) {
      // Fetch the cart items from the API when user is logged in
      fetch('https://dummyjson.com/carts/user/5')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCartItems(data.products); // Assuming the response contains a 'products' array
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    }
  }, [token]);

  if (!token) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-500">Please log in to view your cart.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Log In
        </button>
      </div>
    );
  }
}

  export default Cart;*/

  /*return (
    <div>
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {cart.length>0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {cart.map((product) => (
                        <div key={product.id} className="bg-white border-2 border-blue-600 p-6 rounded-md shadow-lg flex flex-col items-center gap-2">
                            <h2 className="text-lg font-bold text-black">{product.title}</h2>
                            <p className="text-blue-500">${product.price}</p>
                            <button
                                onClick={() => removeFromCart(product.id)}
                                className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    </div>
            )
                  
                :(
                      <p className="text-gray-500">Your cart is empty.</p>
                  ) 
}
          
    </div>
  );
};*/

