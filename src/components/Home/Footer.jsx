import React from 'react'
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
     <footer className="bg-gray-800 text-white py-8">
     <div className="container mx-auto text-center">
       <p className="text-sm">&copy; 2025 Go Hire. All Rights Reserved.</p>
       <div className="mt-4">
         <Link to="/about" className="text-gray-400 hover:text-white px-4">About</Link>
         <Link to="/contact" className="text-gray-400 hover:text-white px-4">Contact</Link>
         <Link to="/privacy" className="text-gray-400 hover:text-white px-4">Privacy Policy</Link>
       </div>
     </div>
   </footer>
  )
}

export default Footer