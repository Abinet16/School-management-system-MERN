import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                {/* Dialog Header */}
                <div className="p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
                        <svg 
                            className="h-6 w-6 text-purple-600" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                            />
                        </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-900">
                        Confirm Logout
                    </h3>
                    <div className="mt-2">
                        <p className="text-gray-600">
                            Are you sure you want to log out from your account?
                        </p>
                        {currentUser && currentUser.name && (
                            <p className="mt-2 text-sm text-gray-500">
                                Logged in as: <span className="font-medium">{currentUser.name}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Dialog Footer */}
                <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse sm:justify-start">
                    <button
                        onClick={handleLogout}
                        type="button"
                        className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:text-sm transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        Log Out
                    </button>
                    <button
                        onClick={handleCancel}
                        type="button"
                        className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:text-sm transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;