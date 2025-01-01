import React from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';



const Footer=()=>{
    return(
        <div className="mt-28 bg-black border-t-2 border-black shadow-lg text-white py-8 ">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-10 ml-20">
            {/* Footer Left: Description */}
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-400 w-60">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel est varius, tincidunt justo nec, rhoncus nisl. Nunc suscipit bibendum vestibulum. Aliquam in laoreet massa, sed bibendum leo. Phasellus imperdiet, dui in aliquet molestie, est sem efficitur dui, at sodales lacus elit at ipsum. Vivamus aliquet libero quis euismod porta. 
              </p>
            </div>
      
            {/* Footer Center: Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="text-gray-400">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/products" className="hover:text-white">Products</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
      
            {/* Footer Right: Social Media */}
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <FontAwesomeIcon icon={faFacebook} />
                
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faTwitter} />
              </div>
            </div>
          </div>
      
          {/* Footer Bottom: Copyright */}
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
          </div>
        </div>
      </div>
      
    );
};

export default Footer;