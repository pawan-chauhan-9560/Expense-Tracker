import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react"; // Importing social media icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-400 transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;