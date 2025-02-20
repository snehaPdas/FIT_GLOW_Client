import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import multiple images
import Banner1 from "../../assets/edit_selectedcover.jpg";
import Banner2 from "../../assets/aboutus3.jpg";
import Banner3 from "../../assets/training.png";
import Banner4 from "../../assets/aboutus4.jpg";

const images = [Banner1, Banner2, Banner3, Banner4];

function Banner() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[900px] w-full">
      {/* Image Animation */}
      <AnimatePresence>
        <motion.div
          key={currentImage} // Unique key for re-render
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlay Effect */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="w-[90%] mx-auto flex items-center justify-between relative z-10">
        <motion.div
          className="lg:w-fit"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          {/* Animated Text */}
          <motion.div
            className="sm:text-6xl xs:text-5xl text-left text-white font-serif font-extrabold uppercase"
            style={{ marginTop: "200px" }}
          >
            <motion.h1 initial={{ x: -100 }} animate={{ x: 0 }} transition={{ delay: 1 }}>Get</motion.h1>
            <motion.h1 initial={{ x: -100 }} animate={{ x: 0 }} transition={{ delay: 1.2 }}>in</motion.h1>
            <motion.h1 
              className="bg-black/30 text-white rounded-sm px-1 shadow-sm shadow-white/50"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4 }}
            >
              Health
            </motion.h1>
            <motion.h1 initial={{ x: -100 }} animate={{ x: 0 }} transition={{ delay: 1.6 }}>Today</motion.h1>
          </motion.div>

          {/* Join Now Button */}
          <motion.div
            className="w-full flex items-center justify-between mt-6 py-2 px-6 uppercase bg-green-500 rounded-md shadow-lg cursor-pointer hover:scale-105 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-white text-lg font-semibold">Join Now</h3>
            <div className="w-[40%] flex items-center text-gray-700 text-4xl gap-0">
              <hr className="w-full border border-gray-700 relative -right-3" />
            </div>
          </motion.div>

          {/* Discount Message */}
          <motion.p
            className="text-md text-white bg-black/30 font-semibold mt-2 capitalize rounded-lg p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            25% Discount on first month
          </motion.p>
        </motion.div>

        {/* Image Navigation Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <motion.div
              key={index}
              className={`h-3 w-3 rounded-full ${index === currentImage ? "bg-white" : "bg-gray-500"}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentImage(index)}
            ></motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
