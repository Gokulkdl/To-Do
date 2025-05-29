import {  FaClipboardList, FaSignOutAlt  } from "react-icons/fa";

const Navbar = ({ onLogout }) => {
  return (
<nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg backdrop-blur-sm border-b border-gray-700">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-20 items-center">
      {/* Logo with animation */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="absolute -inset-1 bg-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
          <div className="relative flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <FaClipboardList className="text-xl" />
          </div>
        </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          ToDo App
        </span>
      </div>

      {/* Logout Button with animation */}
      <div className="flex items-center">
        <button
          onClick={onLogout}
          className="relative group flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30 overflow-hidden"
        >
          <span className="relative z-10">Logout</span>
          <FaSignOutAlt className="relative z-10" />
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          <span className="absolute -inset-1 bg-white rounded-lg blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
