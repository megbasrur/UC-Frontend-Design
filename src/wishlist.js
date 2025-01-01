import React,{useState,useContext} from "react";
import Swal from "sweetalert2";
import CartContext from "./CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Wishlist=()=>{
    const {wishlist, removeFromWishlist, addToCart, clearWishlist}=useContext(CartContext);

   
const navigate=useNavigate();


        const handleAddToCart = (product) => {
            addToCart(product);
            Swal.fire({
              icon: "success",
              title: "Added to Cart",
              text: `${product.title} has been added to your cart!`,
              timer: 1500,
              showConfirmButton: false,
            });
          };

          return (
            <div className="wishlist-container">
              <h1 className="text-center text-2xl text-white mt-10 font-semibold mb-5">Your Wishlist</h1>
            <hr className="mb-10"></hr>
              {wishlist.length === 0 ? (
                <p className="text-center text-lg text-gray-400">Your wishlist is empty.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ml-3 mr-3">
                  {wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border-2 border-gray-300 rounded-lg shadow-md p-5 flex flex-col items-center"
                    >
                    
                      <h3 className="text-lg font-semibold text-black mb-2">{product.title}</h3>
                      <p className="text-blue-500 mb-2">${product.price}</p>
                      <img src={product.thumbnail} className="w-32 shadow-sm "></img>
                      <p className="text-sm text-gray-500 mt-2 mb-2">{product.description}</p>
        
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-red-600 text-black py-2 px-4 rounded-md hover:bg-red-700 transition"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="bg-green-500 text-black py-2 px-4 rounded-md hover:bg-green-700 transition"
                        >
                          <FontAwesomeIcon icon={faHeart} className="mr-2" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-14 flex justify-between items-center ">
                      <button
                          onClick={clearWishlist}
                          className="px-4 py-2 ml-5  bg-gray-600 text-white rounded"
                      >
                          Clear Wishlist
                      </button>
                      <button
                          onClick={() => navigate("/cart")}
                          className="px-4 py-2 mr-5 bg-blue-600 text-white rounded"
                      >
                          Go to Cart
                      </button>
                  </div>
            </div>
          );
        };
        
        export default Wishlist;
