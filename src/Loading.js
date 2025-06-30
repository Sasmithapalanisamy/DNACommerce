import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import dnaLoading from "./Animation .json"; 

/**
 * LoadingPage
 * @param {number} duration 
 */
const Loading = ({ duration = 3000 }) => {
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/results", { replace: true });
    }, duration);
    return () => clearTimeout(timer);
  }, [navigate, duration]);

  return (
    <AnimatePresence>
      <motion.div
        className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-[#dff3fd] to-[#f3e9ff]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
       
        <Lottie animationData={dnaLoading} loop className="h-40 w-40" />

        <motion.h1
          className="mt-6 text-2xl font-semibold text-gray-700"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Analyzing your traits...
        </motion.h1>


        <div className="mt-4 flex space-x-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.2s]"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.1s]"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"></span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;

