import React from 'react'
import {Link}  from 'react-router-dom';
const Home = () => {
  return (
    
    <div className="relative h-screen w-full overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/video/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-40 space-y-6">
            <h1 className="text-white text-5xl font-bold text-center">
                Welcome to DNACommerce!
            </h1>
            
            <div className="flex space-x-4">
                <Link to='/signup'>
                    <button className="rounded-full font-bold px-6 py-2 bg-white text-black hover:bg-gray-300">
                        Sign Up
                    </button>
                </Link>
                <Link to='/login'>
                    <button className="rounded-full font-bold px-6 py-2 bg-black text-white hover:bg-gray-700">
                        Login
                    </button>
                </Link>
                
            </div>
            <p className="text-bold text-white">A recommendation system that suggests products based on your DNA-like inputs</p>
        </div>

    
        
    </div>
  );
};


export default Home