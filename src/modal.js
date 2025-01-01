import React from "react";

const Modal=({isOpen,onClose, product})=>{
    if(!isOpen||!product) return null;

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
        <div className="bg-white sm:w-3/5 lg:w-2/5 p-6 rounded-lg flex flex-col gap-2 justify-center shadow-lg z-10">
        
            <h2 className="text-xl rounded text-center font-bold mb-2">{product.title}</h2>
            <hr className="border border-black"></hr>
            
            <div className="flex gap-1">
            <p className="text-gray-700 underline">Price </p>
            <p className="text-blue-600">:  ${product.price}</p>
            </div>
            <p className="text-gray-700 underline">Description: </p>
            <p className="text-blue-600 text-left"> {product.description}</p>
            <div className="flex gap-1">
            <p className="text-gray-700 underline">Category </p>
            <p className="text-blue-600">: {product.category}</p>
            </div>
            <div className="flex gap-1">
            <p className="text-gray-700 underline">Rating </p>
            <p className="text-blue-600">: {product.rating}⭐</p>
            </div>
            <div className="flex gap-1">
            <p className="text-gray-700 underline">Stock </p>
            <p className="text-blue-600">: {product.stock}</p>
            </div>
            <div className="flex gap-1">
            <p className="text-gray-700 underline">Discount </p>
            <p className="text-blue-600">: {product.discountPercentage}%</p>
            </div>
            <div className="flex justify-center">
            <button
                className="mt-4 px-4 py-2 w-24 bg-gray-500 text-white rounded"
                onClick={onClose}
            >
                Close
            </button>
            </div>
        </div>
    </div>

    );
};

export default Modal;