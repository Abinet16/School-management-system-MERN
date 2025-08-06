import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  MegaphoneIcon,
  AcademicCapIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const StudentSideBar = () => {
  const location = useLocation();
  
  // Helper function to determine active link
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/Student/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full p-4 w-64 bg-white border-r border-gray-200">
      {/* Logo/Branding */}
      <div className="mb-8 px-4 py-2">
        <h2 className="text-xl font-bold text-indigo-600">Student Portal</h2>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        <Link
          to="/"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <HomeIcon className={`w-5 h-5 mr-3 ${isActive('/') ? 'text-indigo-600' : 'text-gray-500'}`} />
          <span className="font-medium">Home</span>
          {isActive('/') && <div className="ml-auto w-1 h-6 bg-indigo-600 rounded-full"></div>}
        </Link>

        <Link
          to="/Student/subjects"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/Student/subjects') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <DocumentTextIcon className={`w-5 h-5 mr-3 ${isActive('/Student/subjects') ? 'text-indigo-600' : 'text-gray-500'}`} />
          <span className="font-medium">Subjects</span>
          {isActive('/Student/subjects') && <div className="ml-auto w-1 h-6 bg-indigo-600 rounded-full"></div>}
        </Link>

        <Link
          to="/Student/attendance"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/Student/attendance') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <AcademicCapIcon className={`w-5 h-5 mr-3 ${isActive('/Student/attendance') ? 'text-indigo-600' : 'text-gray-500'}`} />
          <span className="font-medium">Attendance</span>
          {isActive('/Student/attendance') && <div className="ml-auto w-1 h-6 bg-indigo-600 rounded-full"></div>}
        </Link>

        <Link
          to="/Student/complain"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/Student/complain') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <MegaphoneIcon className={`w-5 h-5 mr-3 ${isActive('/Student/complain') ? 'text-indigo-600' : 'text-gray-500'}`} />
          <span className="font-medium">Complaints</span>
          {isActive('/Student/complain') && <div className="ml-auto w-1 h-6 bg-indigo-600 rounded-full"></div>}
        </Link>
      </nav>

      {/* User Section */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          User
        </div>
        
        <Link
          to="/Student/profile"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/Student/profile') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <UserCircleIcon className={`w-5 h-5 mr-3 ${isActive('/Student/profile') ? 'text-indigo-600' : 'text-gray-500'}`} />
          <span className="font-medium">Profile</span>
          {isActive('/Student/profile') && <div className="ml-auto w-1 h-6 bg-indigo-600 rounded-full"></div>}
        </Link>

        <Link
          to="/logout"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/logout') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <ArrowRightOnRectangleIcon className={`w-5 h-5 mr-3 ${isActive('/logout') ? 'text-indigo-600' : 'text-gray-500'}`} />
          <span className="font-medium">Logout</span>
          {isActive('/logout') && <div className="ml-auto w-1 h-6 bg-indigo-600 rounded-full"></div>}
        </Link>
      </div>
    </div>
  );
};

export default StudentSideBar;