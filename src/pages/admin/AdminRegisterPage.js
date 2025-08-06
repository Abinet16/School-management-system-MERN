import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/userRelated/userHandle';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const AdminRegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [formErrors, setFormErrors] = useState({
        name: false,
        schoolName: false,
        email: false,
        password: false
    });

    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const name = formData.get('adminName');
        const schoolName = formData.get('schoolName');
        const email = formData.get('email');
        const password = formData.get('password');

        // Validate form
        const errors = {
            name: !name,
            schoolName: !schoolName,
            email: !email,
            password: !password
        };

        setFormErrors(errors);

        if (Object.values(errors).some(error => error)) {
            return;
        }

        const fields = { name, email, password, role, schoolName };
        setLoading(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        setFormErrors(prev => ({ ...prev, [name]: false }));
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoading(false);
        } else if (status === 'error') {
            console.error(error);
            setLoading(false);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Registration Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-90">
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Admin Account</h1>
                            <p className="text-gray-600">
                                Set up your school management system with full admin privileges
                            </p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="adminName"
                                    name="adminName"
                                    type="text"
                                    autoComplete="name"
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors`}
                                    placeholder="John Doe"
                                />
                                {formErrors.name && (
                                    <p className="mt-1 text-sm text-red-600">Name is required</p>
                                )}
                            </div>

                            {/* School Name Field */}
                            <div>
                                <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                                    School Name
                                </label>
                                <input
                                    id="schoolName"
                                    name="schoolName"
                                    type="text"
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.schoolName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors`}
                                    placeholder="Prestige Academy"
                                />
                                {formErrors.schoolName && (
                                    <p className="mt-1 text-sm text-red-600">School name is required</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors`}
                                    placeholder="you@example.com"
                                />
                                {formErrors.email && (
                                    <p className="mt-1 text-sm text-red-600">Email is required</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors pr-12`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                                {formErrors.password && (
                                    <p className="mt-1 text-sm text-red-600">Password is required</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all ${loading ? 'opacity-75' : ''}`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Register Now
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/Adminlogin" className="font-medium text-purple-600 hover:text-purple-500 hover:underline">
                                    Log in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Popup Modal */}
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full">
                            <div className="p-6">
                                <div className="flex justify-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-lg font-medium text-center text-gray-900 mb-2">Registration Error</h3>
                                <p className="text-sm text-gray-500 text-center mb-6">
                                    {message}
                                </p>
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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

export default AdminRegisterPage;