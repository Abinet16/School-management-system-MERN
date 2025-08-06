import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Menu, ChevronLeft, X } from 'lucide-react';
import StudentSideBar from './StudentSideBar';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';

const StudentDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar backdrop */}
            {mobileSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={toggleMobileSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static z-30 w-64 h-screen bg-white shadow-xl transform transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
                ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        {sidebarOpen && (
                            <h1 className="text-xl font-bold text-purple-700">Student Portal</h1>
                        )}
                        <button 
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hidden lg:block"
                        >
                            <ChevronLeft className={`h-5 w-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
                        </button>
                    </div>

                    {/* Sidebar content */}
                    <div className="flex-1 overflow-y-auto">
                        <StudentSideBar collapsed={!sidebarOpen} />
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navigation */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <button 
                                onClick={toggleMobileSidebar}
                                className="p-2 mr-4 text-gray-500 rounded-lg hover:bg-gray-100 lg:hidden"
                            >
                                {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                            {/* <h1 className="text-xl font-semibold text-gray-800">Student Dashboard</h1> */}
                        </div>
                        <AccountMenu />
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
                    <Routes>
                        <Route path="/" element={<StudentHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Student/dashboard" element={<StudentHomePage />} />
                        <Route path="/Student/profile" element={<StudentProfile />} />
                        <Route path="/Student/subjects" element={<StudentSubjects />} />
                        <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                        <Route path="/Student/complain" element={<StudentComplain />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;