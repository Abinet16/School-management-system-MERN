import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [showPassword, setShowPassword] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true);

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            let hasError = false;
            if (!rollNum) { setRollNumberError(true); hasError = true; } else { setRollNumberError(false); }
            if (!studentName) { setStudentNameError(true); hasError = true; } else { setStudentNameError(false); }
            if (!password) { setPasswordError(true); hasError = true; } else { setPasswordError(false); }

            if (hasError) {
                setLoader(false);
                return;
            }
            const fields = { rollNum, studentName, password };
            dispatch(loginUser(fields, role));
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            let hasError = false;
            if (!email) { setEmailError(true); hasError = true; } else { setEmailError(false); }
            if (!password) { setPasswordError(true); hasError = true; } else { setPasswordError(false); }

            if (hasError) {
                setLoader(false);
                return;
            }
            const fields = { email, password };
            dispatch(loginUser(fields, role));
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        setGuestLoader(true);
        const password = "zxc";

        let fields = {};
        if (role === "Admin") {
            fields = { email: "abenet@12", password };
        } else if (role === "Student") {
            fields = { rollNum: "1", studentName: "abenet shegaw", password };
        } else if (role === "Teacher") {
            fields = { email: "abenet@16", password };
        }
        dispatch(loginUser(fields, role));
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
            setGuestLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error. Please try again later.");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            {/* Left Section - Login Form */}
            <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{role} Login</h1>
                        <p className="text-gray-600">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {role === "Student" ? (
                            <>
                                <div>
                                    <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Roll Number
                                    </label>
                                    <input
                                        id="rollNumber"
                                        name="rollNumber"
                                        type="number"
                                        autoComplete="off"
                                        autoFocus
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${rollNumberError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                                        placeholder="Enter your roll number"
                                    />
                                    {rollNumberError && (
                                        <p className="mt-1 text-sm text-red-600">Roll Number is required</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Student Name
                                    </label>
                                    <input
                                        id="studentName"
                                        name="studentName"
                                        type="text"
                                        autoComplete="name"
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${studentNameError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                                        placeholder="Enter your name"
                                    />
                                    {studentNameError && (
                                        <p className="mt-1 text-sm text-red-600">Name is required</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                                    placeholder="Enter your email"
                                />
                                {emailError && (
                                    <p className="mt-1 text-sm text-red-600">Email is required</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-12`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="mt-1 text-sm text-red-600">Password is required</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
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

                            <div className="text-sm">
                                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loader}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${loader ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {loader ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : 'Login'}
                            </button>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={guestModeHandler}
                                disabled={guestLoader}
                                className={`w-full flex justify-center py-3 px-4 border border-purple-600 rounded-md shadow-sm text-sm font-medium text-purple-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${guestLoader ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {guestLoader ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading Guest...
                                    </>
                                ) : 'Login as Guest'}
                            </button>
                        </div>

                        {role === "Admin" && (
                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/Adminregister" className="font-medium text-purple-600 hover:text-purple-500">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Right Section - Background Image */}
            <div className="hidden md:block md:w-1/2 lg:w-3/5 xl:w-2/3 bg-gradient-to-br from-purple-600 to-indigo-700">
                <div className="h-full flex items-center justify-center p-12">
                    <div className="text-center text-white max-w-2xl">
                        <h2 className="text-4xl font-bold mb-6">School Management System</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Streamline your educational institution's operations with our comprehensive management solution.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                <svg className="h-10 w-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                                <p className="text-sm">Student Management</p>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                <svg className="h-10 w-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                                <p className="text-sm">Attendance Tracking</p>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                <svg className="h-10 w-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                                <p className="text-sm">Performance Analytics</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Error</h3>
                            <div className="mt-2 text-sm text-gray-500">
                                {message}
                            </div>
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {(loader || guestLoader) && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <svg className="animate-spin h-10 w-10 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-gray-700">Please wait...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;