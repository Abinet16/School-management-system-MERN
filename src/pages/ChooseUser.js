import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import { AccountCircle, School, Group } from '@mui/icons-material';

const ChooseUser = ({ visitor }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const password = "zxc"; // Default guest password

    const { status, currentUser, currentRole } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const navigateHandler = (user) => {
        if (visitor === "guest") {
            setLoader(true);
            let fields = {};
            if (user === "Admin") {
                fields = { email: "yogendra@12", password };
            } else if (user === "Student") {
                fields = { rollNum: "1", studentName: "Dipesh Awasthi", password };
            } else if (user === "Teacher") {
                fields = { email: "tony@12", password };
            }
            dispatch(loginUser(fields, user));
        } else {
            if (user === "Admin") {
                navigate('/Adminlogin');
            } else if (user === "Student") {
                navigate('/Studentlogin');
            } else if (user === "Teacher") {
                navigate('/Teacherlogin');
            }
        }
    };

    useEffect(() => {
        if (status === 'success' && currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            } else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            }
            setLoader(false);
        } else if (status === 'error') {
            setLoader(false);
            setMessage("Network Error. Please try again later.");
            setShowPopup(true);
        }
    }, [status, currentRole, navigate, currentUser]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center p-4 md:p-8">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {visitor === "guest" ? "Explore as Guest" : "Welcome to School Management"}
                    </h1>
                    <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                        Select your role to continue to the {visitor === "guest" ? "guest dashboard" : "login page"}
                    </p>
                </div>

                {/* User Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Admin Card */}
                    <div 
                        onClick={() => navigateHandler("Admin")}
                        className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:bg-opacity-20 hover:shadow-xl hover:-translate-y-2 border border-white border-opacity-20 hover:border-opacity-30"
                    >
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="mb-6 p-4 bg-white bg-opacity-20 rounded-full">
                                <AccountCircle className="text-white text-5xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Admin</h3>
                            <p className="text-purple-100 flex-grow">
                                Login as an administrator to access the dashboard to manage app data.
                            </p>
                            <div className="mt-6 w-full h-0.5 bg-white bg-opacity-20"></div>
                            <button className="mt-4 text-white font-medium hover:underline">
                                {visitor === "guest" ? "Enter as Guest" : "Login"}
                            </button>
                        </div>
                    </div>

                    {/* Student Card */}
                    <div 
                        onClick={() => navigateHandler("Student")}
                        className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:bg-opacity-20 hover:shadow-xl hover:-translate-y-2 border border-white border-opacity-20 hover:border-opacity-30"
                    >
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="mb-6 p-4 bg-white bg-opacity-20 rounded-full">
                                <School className="text-white text-5xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Student</h3>
                            <p className="text-purple-100 flex-grow">
                                Login as a student to explore course materials and assignments.
                            </p>
                            <div className="mt-6 w-full h-0.5 bg-white bg-opacity-20"></div>
                            <button className="mt-4 text-white font-medium hover:underline">
                                {visitor === "guest" ? "Enter as Guest" : "Login"}
                            </button>
                        </div>
                    </div>

                    {/* Teacher Card */}
                    <div 
                        onClick={() => navigateHandler("Teacher")}
                        className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:bg-opacity-20 hover:shadow-xl hover:-translate-y-2 border border-white border-opacity-20 hover:border-opacity-30"
                    >
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="mb-6 p-4 bg-white bg-opacity-20 rounded-full">
                                <Group className="text-white text-5xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Teacher</h3>
                            <p className="text-purple-100 flex-grow">
                                Login as a teacher to create courses, assignments, and track student progress.
                            </p>
                            <div className="mt-6 w-full h-0.5 bg-white bg-opacity-20"></div>
                            <button className="mt-4 text-white font-medium hover:underline">
                                {visitor === "guest" ? "Enter as Guest" : "Login"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading Overlay */}
                {loader && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
                            <p className="text-gray-700 font-medium">Loading dashboard...</p>
                        </div>
                    </div>
                )}

                {/* Popup Modal */}
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
                                <div className="text-sm text-gray-500 mb-6">
                                    {message}
                                </div>
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="w-full px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChooseUser;