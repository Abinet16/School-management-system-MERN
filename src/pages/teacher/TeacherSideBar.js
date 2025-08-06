import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HomeIcon,
  UserIcon,
  AcademicCapIcon,
  MegaphoneIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const TeacherSideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const sclassName = currentUser.teachSclass?.sclassName || 'Class';

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/Teacher/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/", icon: HomeIcon, label: "Home" },
    { path: "/Teacher/class", icon: AcademicCapIcon, label: `Class ${sclassName}` },
    { path: "/Teacher/complain", icon: MegaphoneIcon, label: "Complaints" },
  ];

  const userItems = [
    { path: "/Teacher/profile", icon: UserIcon, label: "Profile" },
    { path: "/logout", icon: ArrowRightOnRectangleIcon, label: "Logout" },
  ];

  return (
    <div className="flex flex-col h-full p-4 w-64 bg-white border-r border-gray-200">
      {/* Logo/Branding */}
      <div className="mb-8 px-4 py-2">
        <h2 className="text-xl font-bold text-indigo-600">Teacher Portal</h2>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path) 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 ${
              isActive(item.path) ? 'text-indigo-600' : 'text-gray-500'
            }`} />
            <span className="font-medium">{item.label}</span>
            {isActive(item.path) && (
              <div className="ml-auto w-1 h-6 bg-indigo-600 rounded-full"></div>
            )}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          User
        </div>
        
        {userItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path) 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 ${
              isActive(item.path) ? 'text-indigo-600' : 'text-gray-500'
            }`} />
            <span className="font-medium">{item.label}</span>
            {isActive(item.path) && (
              <div className="ml-auto w-1 h-6 bg-indigo-600 rounded-full"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeacherSideBar;