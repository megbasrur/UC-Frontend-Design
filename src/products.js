import React, { useContext } from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import Modal from "./modal";
import Swal from 'sweetalert2';
import CartContext from "./CartContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Products=()=>{
    const [products, setProducts]=useState([]);
    const[currentPage,setCurrentPage]=useState(1);
    const[totalProducts,setTotalProducts]=useState(0);
    const[selectedproduct,setSelectedProduct]=useState(null);
    const[isOpen,setIsOpen]=useState(false);
    const[allCategories, setAllCategories]=useState([]);
    const[selectedCategory, setSelectedCategory]=useState('');
    const[priceOrder, setPriceOrder]=useState('');
    const[minPrice,setMinPrice]=useState('');
    const[maxPrice,setMaxPrice]=useState('');
    const limit=15;
    
    const {wishlist, addToWishlist, removeFromWishlist, handleWishlist}= useContext(CartContext);

    const fetchProducts = (category = "", order="") => {
        let url=`https://dummyjson.com/products?limit=${limit}&skip=${(currentPage - 1) * limit}`;
        if(category){
            url=`https://dummyjson.com/products/category/${category}`;
        }

        axios.get(url)
        .then((response)=>{
            console.log(response.data);
            const products = response.data.products;

            // Sort products based on priceOrder state
            if (order === "low-to-high") {
                products.sort((a, b) => a.price - b.price);
            } else if (order === "high-to-low") {
                products.sort((a, b) => b.price - a.price);
            }

            setProducts(products);
            setTotalProducts(response.data.total);
        })
        .catch((error)=>console.error(error));
    };
            

    useEffect(()=>{
        fetchProducts(selectedCategory, priceOrder);
        
    },[currentPage,selectedCategory,priceOrder]);
  

    useEffect(()=>{
        const fetchCategories=async()=>{
            axios.get('https://dummyjson.com/products/category-list')
            .then((response)=>{
                console.log(response.data);
                setAllCategories(response.data);
        
            })
            .catch((error)=>console.error(error));
        }
        fetchCategories();
    },[]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);
   
    const totalPages= Math.ceil(totalProducts/limit);

    const handleNext=()=>{
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1);
            /*window.scrollTo({ top: 0, behavior: 'smooth' });*/
        }
    };

    const handlePrevious=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1);
            /*window.scrollTo({ top: 0, behavior: 'smooth' });*/
        }
    };

    const handleShowMore=(product)=>{
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        fetchProducts(e.target.value,minPrice,maxPrice);
        setCurrentPage(1); // Reset to first page
    };

    /*const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
        setCurrentPage(1); // Reset to first page
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
        setCurrentPage(1); // Reset to first page
    };*/

    const handlePriceOrder=(e)=>{
        setPriceOrder(e.target.value);
    }

    const {addToCart}=useContext(CartContext);

    


    const closeModal=()=>{
        setIsOpen(false);
        setSelectedProduct(null);
    };

   
      
    

    return(
        <div>
            <h2 className="text-2xl font-bold text-center mb-5 text-white mt-10">Products</h2>
            <hr className="mb-10"></hr>
            {/*Dropdown*/}
             <div className="flex gap-20 justify-between ml-2 mr-10">
             <div className="flex gap-5 mt-5 ">
    <label htmlFor="category" className="ml-5 mt-2 text-gray-300">Filter By Category:</label>
    <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className=" h-10 pl-2 border rounded"
    >
        <option value="">All Categories</option>
        {allCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
        ))}
    </select>
</div>
<div className="mb-6 mt-5">
                <label htmlFor="priceOrder" className="mr-4 text-gray-300">Sort by Price:</label>
                <select
                    id="priceOrder"
                    value={priceOrder}
                    onChange={handlePriceOrder}
                    className="p-2 border rounded"
                >
                    <option value="">Select order</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                </select>
            </div>
</div>



        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6 ">
        {products.length>0? (products.map((product) => (
          <div key={product.id} className="relative bg-white border-2 border-blue-600 p-10 rounded-md shadow-lg flex flex-col items-center justify-center gap-2">
             <button className="absolute top-2 right-5 bg-white p-2 mt-2 text-sm rounded-md">
            <FontAwesomeIcon 
  icon={faHeart} 
  color={wishlist.find(item => item.id === product.id) ? "red" : "gray"} // Toggle color based on wishlist state
  size="md"
  onClick={() => handleWishlist(product)} // Handle add/remove click
  className="cursor-pointer"
/>
</button>
            <h2 className="text-lg font-bold text-black text-center underline">{product.title}</h2>
            <p className="text-blue-600 p-1 mt-1 rounded-md">${product.price}</p>
            <img src={product.thumbnail} className="w-32 shadow-sm "></img>
            <p className="text-sm text-gray-500  mt-2">{product.description}</p>
            <p className="text-md text-blue-950 bg-gray-200 border-2 rounded shadow-md mt-2 p-2 font-semibold">Category: {product.category}</p>
            <div className="flex gap-7 mt-3">
            <button onClick={()=>handleShowMore(product)} className="bg-red-600 p-2 mt-2 text-sm hover:bg-red-700 rounded-md ">Show More</button>
            <button onClick={()=> addToCart(product)} className="bg-green-500 p-2 mt-2 hover:bg-green-700 text-sm rounded-md">Add To Cart</button>
           

            </div>
            </div>
        ))):
        (
            <p>Loading products</p>
        )}
        </div>
        <Modal isOpen={isOpen} onClose={closeModal} product={selectedproduct}/>
        <div className="flex justify-around items-center mt-8 space-x-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 ml-5 bg-blue-600 text-white rounded disabled:bg-gray-500"
                >
                    Previous
                </button>
                <span className="underline text-gray-500">Page {currentPage}</span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className=" mr-10 px-4 py-2  bg-blue-600 text-white rounded disabled:bg-gray-500"
                >
                    Next
                </button>
            </div>
        </div>
        
    );
};


export default Products;

/*<div className="flex justify-between items-center p-4">
                <div>
                    <label className="mr-2">Category:</label>
                    <select onChange={handleCategoryChange} value={category}>
                        <option value="">All Categories</option>
                        {allcategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mr-2">Min Price:</label>
                    <input
                        type="number"
                        value={min}
                        onChange={handleMinPriceChange}
                        placeholder="Min"
                        className="border p-1 rounded"
                    />
                    <label className="mx-2">Max Price:</label>
                    <input
                        type="number"
                        value={max}
                        onChange={handleMaxPriceChange}
                        placeholder="Max"
                        className="border p-1 rounded"
                    />
                </div>
            </div>*/

         /*   <div>
    <label className="mr-2">Min Price:</label>
    <input
        type="number"
        value={minPrice}
        onChange={handleMinPriceChange}
        placeholder="Min"
        className="border rounded p-1"
    />
    <label className="mx-2">Max Price:</label>
    <input
        type="number"
        value={maxPrice}
        onChange={handleMaxPriceChange}
        placeholder="Max"
        className="border rounded p-1"
    />
</div>
</div>*/ 