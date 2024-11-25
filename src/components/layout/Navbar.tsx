// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import {
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Settings,
  User,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'Low stock alert: Biogesic', time: '5 minutes ago' },
    { id: 2, message: 'New counterfeit report submitted', time: '1 hour ago' },
    { id: 3, message: 'System update available', time: '2 hours ago' },
  ];

  return (
    <div className="h-16 bg-white border-b px-4 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        
        <div className="hidden md:flex items-center ml-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-lg relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border z-50">
              <h3 className="px-4 py-2 text-sm font-semibold border-b">
                Notifications
              </h3>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t">
                <button className="text-sm text-blue-600 hover:text-blue-500">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Profile dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border z-50">
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
              <hr className="my-1" />
              <button
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  window.location.href = '/login';
                }}
                className="px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;