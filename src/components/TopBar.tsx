import React, { useState } from 'react';
import { User, ChevronDown, LogOut, UserCircle } from 'lucide-react';

interface TopBarProps {
  userName: string;
}

const TopBar: React.FC<TopBarProps> = ({ userName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://media.licdn.com/dms/image/v2/D4E0BAQGgPkP6zIxRwQ/company-logo_200_200/B4EZY_NeITHEAQ-/0/1744817218635/leucine_logo?e=2147483647&v=beta&t=k-yQ6a5P8lCwrxtd6DRYsm-4wlQyQqoh47CjVAXXVnw" 
            alt="Leucine Logo" 
            className="h-8 w-auto mr-3"
          />
          <h1 className="text-xl font-semibold text-gray-900">Data Migration</h1>
        </div>
        
        <div className="relative">
          <button 
            onClick={toggleDropdown}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-2 mr-2">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <span className="mr-1">{userName}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <a 
                href="#" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(false);
                }}
              >
                <UserCircle className="h-4 w-4 mr-2" />
                View Profile
              </a>
              <a 
                href="#" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(false);
                  // Add logout logic here
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
