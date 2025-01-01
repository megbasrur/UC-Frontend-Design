import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);


    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));

      if (storedCart) setCart(storedCart);
      if (storedWishlist) setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    if (wishlist.length) {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
}, [wishlist]);

  // Function to add items to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        // Show SweetAlert asking if the user wants to increase the quantity
        Swal.fire({
            icon: 'question',
            title: 'Product Already in Cart',
            text: `${product.title} is already in your cart. Do you want to increase the quantity by 1?`,
            showCancelButton: true,
            confirmButtonText: 'Yes, Increase Quantity',
            cancelButtonText: 'No, Keep Quantity',
        }).then((result) => {
            if (result.isConfirmed) {
                // Increase the quantity of the existing product
                const updatedCart = cart.map(item => 
                    item.id === product.id 
                    ? { ...item, quantity: (item.quantity || 1) + 1 } 
                    : item
                );
                
                // Update state and localStorage
                setCart(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                
                // Success message for quantity increase
                Swal.fire({
                    icon: 'success',
                    title: 'Quantity Increased',
                    text: `The quantity of ${product.title} has been increased by 1.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                // Keep the original quantity (do nothing)
                Swal.fire({
                    icon: 'info',
                    title: 'Quantity Unchanged',
                    text: `${product.title} quantity remains the same.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    } else {
        // Add product to cart if it doesn't exist
        const newProduct = { ...product, quantity: 1 }; // Set initial quantity to 1
        const newCart = [...cart, newProduct];
        
        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${product.title} has been added to your cart!`,
            showConfirmButton: false,
            timer: 1500,
        });
        
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart)); // Save cart to localStorage
    }
};


  // Function to remove items from the cart
  const removeFromCart = (productId) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Do you really want to remove this item from the cart?',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
  }).then((result) => {
      if (result.isConfirmed) {
          // If the user confirms, proceed to remove the item
          const newCart = cart.filter(item => item.id !== productId);
          setCart(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart)); // Save updated cart to localStorage

          // Show success message
          Swal.fire({
              icon: 'success',
              title: 'Removed!',
              text: 'The item has been removed from your cart.',
              timer: 1500,
              showConfirmButton: false,
          });
      }
  });
  };

  


  // Function to clear the cart
  const clearCart = () => {
      setCart([]);
      localStorage.removeItem("cart"); // Clear cart from localStorage
  };

  const removeFromWishlist = (productId) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Do you really want to remove this item from the wishlist?',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Filter out the product to remove it from wishlist
        const newWishlist = wishlist.filter(item => item.id !== productId);
        
        // Update wishlist state and localStorage
        setWishlist(newWishlist);
        localStorage.setItem("wishlist", JSON.stringify(newWishlist)); // Save updated wishlist to localStorage
  
        // Success message
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: 'The item has been removed from your wishlist.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

const addToWishlist = (product) => {
  const existingProduct = wishlist.find(item => item.id === product.id);
  
  if (existingProduct) {
      Swal.fire({
          icon: 'info',
          title: 'Already in Wishlist',
          text: `${product.title} is already in your wishlist.`,
          showConfirmButton: false,
          timer: 1500,
      });
  } else {
      setWishlist([...wishlist, product]);
      Swal.fire({
          icon: 'success',
          title: 'Added to Wishlist',
          text: `${product.title} has been added to your wishlist!`,
          showConfirmButton: false,
          timer: 1500,
      });
  }
};

const handleWishlist = (product) => {
  // Find the product in the wishlist
  const existingProduct = wishlist.find((item) => item.id === product.id);

  if (existingProduct) {
    // If the product is found, remove it from the wishlist
    removeFromWishlist(product.id);
   
  } else {
    // If the product is not found, add it to the wishlist
    addToWishlist(product);
   
  }
};


const clearWishlist = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Are you sure?',
    text: 'Do you really want to clear all items from your wishlist?',
    showCancelButton: true,
    confirmButtonText: 'Yes, clear it!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // Clear the wishlist
      setWishlist([]);
      localStorage.removeItem("wishlist"); // Remove wishlist from localStorage

      // Success message
      Swal.fire({
        icon: 'success',
        title: 'Cleared!',
        text: 'Your wishlist has been cleared.',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};

    return (
      <CartContext.Provider value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        handleWishlist,
    }}>
        {children}
    </CartContext.Provider>
    );
};

export default CartContext;


/*import React, { createContext, useState } from "react";
import Swal from "sweetalert2";


const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const exists=prevCart.find((item)=>item.id===product.id);
        if(exists){
            //if product already in cart
            Swal.fire({
                icon: "info",
                title: "Already in Cart",
                text: `${product.title} is already in your cart! Increasing quantity by 1`,
                showConfirmButton: false,
                timer: 1500,
              });
              setCart(cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ));
              
              // API call to update the cart (PUT request with merge: true to update quantity)
              const payload = {
                merge: true, // This will merge the existing products with the new ones
                products: cart.map(item =>
                  item.id === product.id
                    ? { id: item.id, quantity: item.quantity + 1 }
                    : item
                ),
              };
          
              fetch('https://dummyjson.com/carts/1', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log("API Response:", data);
                })
                .catch((error) => {
                  console.error("Error adding to cart:", error);
                }); 
        }
        else{ //product not there
            const newProduct = { ...product, quantity: 1 };
            setCart([...cart, newProduct]);
        
            // API call to update the cart (PUT request to add new product)
            const payload = {
              merge: true,
              products: [...cart, { id: product.id, quantity: 1 }],
            };
        
            fetch('https://dummyjson.com/carts/1', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("API Response:", data);
              })
              .catch((error) => {
                console.error("Error adding to cart:", error);
              });
        
            Swal.fire({
              icon: "success",
              title: "Added to Cart",
              text: `${product.title} has been added to your cart!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
    };

    const removeFromCart = (id) => {
        const updatedCart = cart.filter((product) => product.id !== id);
        setCart(updatedCart);
      
        // API call to update the cart (PUT request to remove product)
        const payload = {
          merge: true,
          products: updatedCart.map(item => ({ id: item.id, quantity: item.quantity })),
        };
      
        fetch('https://dummyjson.com/carts/1', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("API Response:", data);
          })
          .catch((error) => {
            console.error("Error removing from cart:", error);
          });
      
        Swal.fire({
          icon: "success",
          title: "Removed from Cart",
          text: `Product has been removed from your cart!`,
          showConfirmButton: false,
          timer: 1500,
        });
      };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;*/
