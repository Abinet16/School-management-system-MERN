import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentRole, currentUser } = useSelector(state => state.user);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left">
      {/* Avatar Button */}
      <div>
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="user-menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
            {String(currentUser.name).charAt(0)}
          </div>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Click outside to close */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={closeMenu}
            aria-hidden="true"
          />
          
          <div
            className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            {/* Profile Section */}
            <div className="px-4 py-3" role="none">
              <p className="text-sm font-medium text-gray-900" role="none">
                {currentUser.name}
              </p>
              <p className="truncate text-sm text-gray-500" role="none">
                {currentUser.email || currentRole}
              </p>
            </div>

            <div className="py-1" role="none">
              <Link
                to={`/${currentRole}/profile`}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={closeMenu}
              >
                <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400" />
                Profile
              </Link>
            </div>

            <div className="py-1" role="none">
              <button
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={closeMenu}
              >
                <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400" />
                Settings
              </button>
            </div>

            <div className="py-1" role="none">
              <Link
                to="/logout"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={closeMenu}
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                Logout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountMenu;