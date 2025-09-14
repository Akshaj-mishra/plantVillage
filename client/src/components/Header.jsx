import React from "react";
import { assets } from "../assets/assets";

export const Header = () => {
  return (
    <div className="relative flex flex-col items-center text-center my-20 px-4">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-green-200/30 blur-3xl rounded-full -z-10"></div>

      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border 
        border-neutral-300 shadow-sm hover:shadow-md hover:scale-105 transition"
      >
        <p className="text-stone-600 font-medium">Help gardeners grow</p>
        <img src={assets.starIcon} alt="star" className="w-5 h-5" />
      </div>

      {/* Headings */}
      <h1
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mt-10 leading-tight 
        max-w-[700px] mx-auto"
      >
        Turn <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">images</span> into
      </h1>
      <h1
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mt-2 leading-tight 
        max-w-[700px] mx-auto"
      >
        <span className="text-green-600">information</span> in seconds 🚀
      </h1>

      {/* Subtext */}
      <p className="mt-12 text-lg sm:text-xl text-stone-600 max-w-[750px] mx-auto leading-relaxed">
        Cultivate your green thumb. Transform your space into a lush sanctuary —
        just scan a plant and watch it flourish 🌱.
      </p>
    </div>
  );
};

export default Header;
