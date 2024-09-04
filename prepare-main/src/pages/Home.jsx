// src/pages/Home.js

import { Link } from "react-router-dom";
import Background from "../assets/background.jpeg"; 

function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }} 
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay untuk kontras */}
      
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center text-white px-4 py-8">
        {}
        <div className="max-w-2xl mb-8">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">
            Experience the Magic of Live Concerts
          </h1>
          <p className="text-lg">
            Imagine the thrill of standing in a sea of fans, the lights dimming, and the roar of excitement as your favorite artist takes the stage. Feel the bass thumping through the floor, the energy of the crowd lifting you higher with every beat. Our platform brings you closer to those unforgettable moments. Whether it’s a long-awaited tour or an intimate gig, we’ve got the tickets to turn your concert dreams into reality. Get ready to make memories that will last a lifetime!
          </p>
        </div>
        
        {}
        <div className="flex flex-col gap-4">
          <Link to="/login">
            <button className="w-64 py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-blue-600 hover:bg-tosca-700 transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="w-64 py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-red-600 hover:bg-red-700 transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
