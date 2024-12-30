import React from 'react'
import logo_img from "../../assets/logo_fitglow.png"
import { MouseEvent } from 'react'; 
import { useNavigate } from 'react-router-dom';


function Header() {
  
  const navigate=useNavigate()

  function goToSignUp(event:React. MouseEvent<HTMLButtonElement>): void {
    navigate("/signup")
    throw new Error('Function not implemented.');
  }
  function goToLogin(event:React. MouseEvent<HTMLButtonElement>): void {
    navigate("/login")
    throw new Error('Function not implemented.');
  }


  return (
    <header className="bg-white text-[#572c5f] p-4 sticky top-0 z-50">
  <div className="container mx-auto flex justify-between items-center">
    
    <div className="text-lg font-semibold">
      <img src={logo_img} alt="Logo" className="w-24" />
    </div>

    
    <nav className="hidden md:flex space-x-8">
      <a href="#" className="hover:text-yellow-400 transition">Home</a>
      <a href="#" className="hover:text-yellow-400 transition">About</a>
      <a href="#" className="hover:text-yellow-400 transition">Trainers</a>
      <a href="#" className="hover:text-yellow-400 transition">Contact</a>
    </nav>

    
    <div className="hidden md:flex space-x-4">
      <button onClick={goToSignUp}
      className="bg-transparent border-2 border-[#572c5f] text-[#572c5f] py-2 px-4 rounded-md hover:bg-[#572c5f] hover:text-white transition">
        SignUp
      </button>
      <button onClick={goToLogin}
       className="bg-[#572c5f] text-white py-2 px-4 rounded-md hover:bg-[#572c5f] transition">
        LogOut
      </button>
    </div>

  
    <div className="md:hidden flex items-center space-x-4">
      <button className="text-white" id="hamburger-menu">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>

  
  <div id="mobile-menu" className="md:hidden hidden bg-gray-800 text-white p-4">
    <a href="#" className="block py-2 hover:text-yellow-400">Home</a>
    <a href="#" className="block py-2 hover:text-yellow-400">About</a>
    <a href="#" className="block py-2 hover:text-yellow-400">Services</a>
    <a href="#" className="block py-2 hover:text-yellow-400">Contact</a>
  </div>
</header>

  )
}

export default Header
