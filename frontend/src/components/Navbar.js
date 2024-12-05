// src/components/Navbar.js
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold">Logo</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:ml-auto sm:space-x-6 items-center">
            <a href="/vehicles" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200">Vehicles</a>
            <a href="/bookings" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200">Bookings</a>
          </div>

          {/* Mobile menu button */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-4 pt-2 pb-3 space-y-2">
          <a href="/vehicles" className="text-white hover:bg-blue-700 block px-4 py-2 rounded-md text-base font-medium transition duration-200">Vehicles</a>
          <a href="/bookings" className="text-white hover:bg-blue-700 block px-4 py-2 rounded-md text-base font-medium transition duration-200">Bookings</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
