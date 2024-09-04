// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-10 border-t border-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between mb-8">
          {/* About Us Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-base leading-relaxed">
              We are here to give you the best Experience by giving the best services that you are ever had
            </p>
          </div>

          {/* Contact Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-base leading-relaxed">
              Email: <a href="fadlyariansyahputra@gmail.com" className="text-yellow-300 hover:underline">fadlyariansyahputra@gmail.com</a><br />
              Phone: <a href="tel:+6282162953765" className="text-yellow-300 hover:underline">+62 821 6295 3765</a>
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <p className="text-base leading-relaxed">
              <Link to="/" className="text-yellow-300 hover:underline">Home</Link><br />
              <Link to="/about" className="text-yellow-300 hover:underline">About Us</Link><br />
              <Link to="/contact" className="text-yellow-300 hover:underline">Contact</Link>
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-base">&copy; {new Date().getFullYear()}  Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
