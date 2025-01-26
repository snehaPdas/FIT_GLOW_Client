import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo_img from "../../assets/logo_fitglow.png";
import profileicon from '../../assets/profieicon.png';

function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null); // Ref for the dropdown
  const navigate = useNavigate();

  // Handle Logout
  function handleLogout() {
    localStorage.removeItem("accesstoken");
    navigate("/login");
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false); // Close the dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
<header className="w-full bg-white text-[#572c5f] p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold">
          <img src={logo_img} alt="Logo" className="w-24" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="/home" className="hover:text-[#d9a8d4] transition">Home</a>
          <a href="#" className="hover:text-[#d9a8d4] transition">About</a>
          <a href="/trainers" className="hover:text-[#d9a8d4] transition">Trainers</a>
          <a href="#" className="hover:text-[#d9a8d4] transition">Contact</a>
        </nav>

        {/* User Profile */}
        <div className="relative" ref={profileMenuRef}>
          <img
            alt="user profile"
            src={profileicon}
            className="h-10 w-10 cursor-pointer rounded-full object-cover"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          />
          {isProfileMenuOpen && (
            <ul
              role="menu"
              className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white text-gray-800"
            >
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/profile">My Profile</Link>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
