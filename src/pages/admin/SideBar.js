import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  BookOpen, 
  Users, 
  FileText,
  Megaphone,
  AlertCircle
} from 'lucide-react';

const SideBar = ({ collapsed = false }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/Admin/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { path: "/Admin/dashboard", icon: Home, label: "Dashboard" },
    { path: "/Admin/classes", icon: BookOpen, label: "Classes" },
    { path: "/Admin/subjects", icon: FileText, label: "Subjects" },
    { path: "/Admin/teachers", icon: Users, label: "Teachers" },
    { path: "/Admin/students", icon: User, label: "Students" },
    { path: "/Admin/notices", icon: Megaphone, label: "Notices" },
    { path: "/Admin/complains", icon: AlertCircle, label: "Complaints" }
  ];

  return (
    <div className={`fixed h-screen flex flex-col ${collapsed ? 'w-20' : 'w-64'} bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden`}>
      {/* Logo/School Name */}
      {/* {!collapsed && (
        <div className="flex items-center justify-center py-6 px-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-purple-700">SchoolAdmin</h1>
        </div>
      )} */}
      
      {/* Menu Items - Non-scrollable container */}
      <nav className="flex-1 flex flex-col px-3 py-4 space-y-1 overflow-hidden">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center ${collapsed ? 'justify-center p-3' : 'px-4 py-3'} rounded-lg transition-all duration-200
              ${isActive(item.path) 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}
          >
            <item.icon className={`h-5 w-5 ${isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-purple-600'}`} />
            {!collapsed && (
              <span className={`ml-3 ${isActive(item.path) ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;