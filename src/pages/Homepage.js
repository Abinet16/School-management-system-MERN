import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8">
            <div className="max-w-7xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Section - Illustration */}
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl opacity-20 blur-xl"></div>
                            <img
                                src="https://placehold.co/800x600/7e22ce/FFFFFF?text=School+Management"
                                alt="School Management System"
                                className="relative w-full h-auto rounded-2xl shadow-2xl transform hover:scale-[1.01] transition-transform duration-300"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden md:block">
                                <div className="flex items-center space-x-2">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Students Enrolled</p>
                                        <p className="font-bold text-gray-800">1,250+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Content */}
                    <div className="order-1 lg:order-2">
                        <div className="max-w-lg mx-auto lg:mx-0">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                                Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">School Management</span>
                            </h1>
                            
                            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                                Streamline school operations, enhance learning experiences, and connect your educational community with our comprehensive management platform.
                            </p>

                            <div className="mt-10 space-y-4">
                                <Link 
                                    to="/choose" 
                                    className="block w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
                                >
                                    Get Started
                                </Link>
                                
                                <Link 
                                    to="/chooseasguest" 
                                    className="block w-full px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center hover:bg-purple-50"
                                >
                                    Explore as Guest
                                </Link>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-2 text-gray-600">Attendance Tracking</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-2 text-gray-600">Performance Analytics</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-2 text-gray-600">Secure Communication</span>
                                </div>
                            </div>

                            <div className="mt-12 text-center lg:text-left">
                                <p className="text-gray-500">
                                    Don't have an account?{' '}
                                    <Link to="/Adminregister" className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors">
                                        Register now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;