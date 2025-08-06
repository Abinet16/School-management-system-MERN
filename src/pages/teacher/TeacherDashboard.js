import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  ChevronLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import AccountMenu from '../../components/AccountMenu';
import TeacherSideBar from './TeacherSideBar';
import Logout from '../Logout';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';
import { useTheme } from '../../context/ThemeContext';

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { theme } = useTheme(); // Assuming you have a theme context

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 flex flex-col h-full transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-0 md:w-20'} 
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        {/* Sidebar header */}
        <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          {sidebarOpen && (
            <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Teacher Portal
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-md ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            {sidebarOpen ? (
              <ChevronLeftIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Sidebar content */}
        <div className="flex-1 overflow-y-auto">
          <TeacherSideBar expanded={sidebarOpen} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className={`sticky top-0 z-10 flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-md mr-4 md:hidden ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {sidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {location.pathname.split('/').pop() === 'dashboard' 
                ? 'Dashboard' 
                : location.pathname.split('/').pop().charAt(0).toUpperCase() + 
                  location.pathname.split('/').pop().slice(1).replace(/([A-Z])/g, ' $1')}
            </h1>
          </div>
          <AccountMenu />
        </header>

        {/* Page content */}
        <main className={`flex-1 overflow-y-auto p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <Routes>
            <Route path="/" element={<TeacherHomePage />} />
            <Route path='*' element={<Navigate to="/" />} />
            <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
            <Route path="/Teacher/profile" element={<TeacherProfile />} />
            <Route path="/Teacher/complain" element={<TeacherComplain />} />
            <Route path="/Teacher/class" element={<TeacherClassDetails />} />
            <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />
            <Route 
              path="/Teacher/class/student/attendance/:studentID/:subjectID" 
              element={<StudentAttendance situation="Subject" />} 
            />
            <Route 
              path="/Teacher/class/student/marks/:studentID/:subjectID" 
              element={<StudentExamMarks situation="Subject" />} 
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;