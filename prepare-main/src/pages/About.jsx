import React from 'react';
import gambar from '../assets/gambar.jpg';
import gambar2 from '../assets/gambar2.jpg';
import gambar3 from '../assets/gambar3.jpeg';

const About = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-green-100 py-16">
      <div className="container mx-auto px-6 text-center ">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6">About Us</h2>
        <p className="text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
        We are here to give you the best Experience by giving the best services that you are ever had
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img
              src={gambar}
              alt="Our Vision"
              className="w-30 h-30 mx-auto mb-6 rounded-full shadow-md"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be a leading provider of innovative and impactful ticket provider.
            </p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img
              src={gambar2}
              alt="Our Mission"
              className="w-30 h-30 mx-auto mb-6 rounded-full shadow-md"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To empower businesses and individuals with the best Experience.
            </p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img
              src={gambar3}
              alt="Our Values"
              className="w-30 h-30 mx-auto mb-6 rounded-full shadow-md"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Innovation, Integrity, and Excellence in everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
