import React, {useState} from "react";
import Ad1 from './ad1.jpg';
import Ad2 from './ad2.jpg';
import Ad3 from './ad3.jpg';
import Ad4 from './ad4.jpg';
import Laptop from './laptop.jpg';
import Clothing from './clothing.jpg';
import Appliance from './appliances.jpg';
import Books from './books.jpg';
import Cosmetics from './cosmetics.jpg';


const ads=[
    {id:0, image: Ad1},
    {id:1,image : Ad2},
    {id:2, image:Ad3},
];

const categories=[
    {id:1, name:"Electronics", image: Laptop},
    {id:2, name:"Fashion",image:  Clothing},
    {id:3, name:"Books",image: Books},
    {id:4, name:"Appliances",image: Appliance},
    {id:5, name:"Cosmetics", image: Cosmetics}
]

const bestsellers=[
    {id:1, image: "https://content.presspage.com/uploads/633/f560a24d-88da-446a-9746-31ac89eb5d9e/1920_gp-ln-23-007-pixel7a-6-48-master-full-uk-blue-240323.png?10000" },
    {id:2, image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668180874i/62685463.jpg"},
    {id:3, image:"https://www.pngall.com/wp-content/uploads/12/Modern-Wardrobe-PNG-File.png" },
    {id:4, image:"https://purepng.com/public/uploads/large/purepng.com-lipstickclothinglipstickfashion-objects-girl-makeup-stick-sexy-beauty-accessory-lipstick-lip-lips-cosmetics-631522935839vcyto.png"},
    {id:5, image:"https://cdn.shopify.com/s/files/1/0902/4728/products/guciper_1024x1024.png?v=1543206624"},
    {id:6, image:"https://www.pngall.com/wp-content/uploads/2016/05/Kettle-Free-PNG-Image.png"},
    {id:7, image:"https://purepng.com/public/uploads/large/purepng.com-bedbedpadsackdossbedstead-1701527921606if0m2.png"},
    {id:8, image:"http://clipart-library.com/images_k/shoe-transparent-background/shoe-transparent-background-12.png"},
]

const Home=()=>{
    const[currentAd, setCurrentAd]=useState(0);

   
    const handleNext=()=>{
        setCurrentAd((prev)=>(prev+1)%ads.length);
    };

    const handlePrev=()=>{
        setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length);
    };

    return(
        <div>
        <div className=" flex flex-col justify-center items-center w-full max-w-4xl mt-10 mx-auto">
        <div className="relative w-full overflow-hidden">
            <div className="relative w-full">
          <img
            src={ads[currentAd].image}
            alt={`Advertisement ${ads[currentAd].id}`}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          </div>
          <div>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
          >
             &#8249; {/* Left arrow */}
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
          >
              &#8250; {/* Right arrow */}
          </button>
        </div>
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          {ads.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentAd === index ? "bg-white":"bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
        </div>

        <div className="mt-10 w-full">
  <h2 className="ml-10 text-2xl font-bold mb-4 text-white">Categories</h2>
  <div className="lg:mb-0 md:mb-0 sm:mb-52">
  <div className="flex items-center justify-center gap-5 ml-10 mr-10">
    <button
      className="h-10 bg-black text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
    >
      &#8249; {/* Left arrow */}
    </button>
    <div className=" w-full grid lg:grid-cols-5 sm:grid-cols-3 gap-10 h-36 scroll-smooth">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-gray-100 flex flex-col justify-center items-center border shadow-lg rounded-md h-36 p-4 hover:shadow-md"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-contain"
          />
          <h3 className="text-lg font-semibold mt-2">{category.name}</h3>
        </div>
      ))}
    </div>
    <button
      className="bg-black text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
    >
      &#8250; {/* Right arrow */}
    </button>
  </div>
</div>

      
      

      <div className="mt-10 w-full">
        <h2 className="ml-10 text-2xl font-bold mb-4 text-white">Our BestSellers</h2>
        <div className="flex items-center justify-center gap-5 ml-10 mr-10 overflow-hidden">
    <button
      className="h-10 bg-black text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
    >
      &#8249; {/* Left arrow */}
    </button>
    <div className="overflow-x-auto w-full grid lg:grid-cols-4 sm:grid-cols-3 gap-10 scroll-smooth">
      {bestsellers.map((bestseller) => (
        <div
          key={bestseller.id}
          className="bg-gray-400 flex border-2  shadow-lg rounded-md h-36 items-center p-4 hover:shadow-md object-center"
        >
          <img
            src={bestseller.image}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
    <button
      className=" bg-black text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
    >
      &#8250; {/* Right arrow */}
    </button>
  </div>
  </div>
  </div>
  </div>
  );
}
  

export default Home;

/*<div className=" grid lg:grid-cols-6 sm:grid-cols-3 gap-10 w-auto h-48">
          {bestsellers.map((bestseller) => (
            <div
              key={bestseller.id}
              className="bg-gray-500 flex border shadow-lg rounded-md h-36 items-center p-4 overflow-hidden hover:shadow-md object-center"
            >
              <img
                src={bestseller.image}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>*/

        /*  <div className="mt-10 w-full">
        <h2 className="ml-10 text-2xl font-bold mb-4 text-white">Categories</h2>
        <div className="flex items-center justify-center gap-5 ml-10 mr-10">
    <button
      className="h-10 bg-black text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
    >
      &#8249; {/* Left arrow */
  /*  </button>
    <div className="overflow-hidden w-full grid md:grid-cols-5 sm:grid-cols-3 gap-5">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-gray-400 flex flex-col items-center p-4 rounded-lg shadow hover:shadow-md"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-contain"
          />
          <h3 className="text-lg font-semibold">{category.name}</h3>
        </div>
      ))}
       <button
  className=" bg-black text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
>
  &#8250; {/* Right arrow */
/*</button>
    </div>
  </div>
  */