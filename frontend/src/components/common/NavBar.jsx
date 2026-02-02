import { Link } from "react-router-dom";
import React from "react";
import logo from "../../assests/logo.png";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <img src={logo} alt="Healio Logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-xl font-bold text-blue-600">Healio</span>
        </div>

        {/* Center: Menu Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-gray-900 transition-colors duration-200">
            Home
          </Link>
          <Link to="/how-it-works" className="hover:text-gray-900 transition-colors duration-200">
            How It Works
          </Link>
          <Link to="/about" className="hover:text-gray-900 transition-colors duration-200">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-900 transition-colors duration-200">
            Contact
          </Link>
        </div>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
