import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { registerUser, underControl, getAllSclasses } from '../../../redux/userRelated/userHandle';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import SuccessAlert from '../../../components/SuccessAlert';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [formData, setFormData] = useState({
        name: '',
        rollNum: '',
        password: '',
        className: '',
        sclassName: ''
    });

    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const [loader, setLoader] = useState(false);

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setFormData(prev => ({ ...prev, sclassName: params.id }));
        }
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [params.id, situation, adminID, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClassChange = (e) => {
        if (e.target.value === 'Select Class') {
            setFormData({ ...formData, className: 'Select Class', sclassName: '' });
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === e.target.value
            );
            setFormData({ 
                ...formData, 
                className: selectedClass.sclassName, 
                sclassName: selectedClass._id 
            });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (situation === "Student" && !formData.sclassName) {
            setAlert({ show: true, type: 'error', message: "Please select a class" });
            return;
        }

        if (!formData.name || !formData.rollNum || !formData.password) {
            setAlert({ show: true, type: 'error', message: "Please fill all required fields" });
            return;
        }

        const fields = { 
            ...formData, 
            adminID, 
            role, 
            attendance 
        };

        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    useEffect(() => {
        if (status === 'added') {
            setAlert({ show: true, type: 'success', message: "Student added successfully!" });
            setTimeout(() => {
                dispatch(underControl());
                navigate(-1);
            }, 1500);
        } else if (status === 'failed') {
            setAlert({ show: true, type: 'error', message: response });
            setLoader(false);
        } else if (status === 'error') {
            setAlert({ show: true, type: 'error', message: "Network Error" });
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Add New Student</h1>
                        <p className="text-gray-600 mt-2">Fill in the details below to register a student</p>
                    </div>

                    {alert.show && (
                        <div className="mb-6">
                            {alert.type === 'error' ? (
                                <ErrorAlert message={alert.message} />
                            ) : (
                                <SuccessAlert message={alert.message} />
                            )}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter student's name"
                                autoComplete="name"
                                required
                            />
                        </div>

                        {situation === "Student" && (
                            <div>
                                <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
                                    Class
                                </label>
                                <select
                                    id="className"
                                    name="className"
                                    value={formData.className}
                                    onChange={handleClassChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    required
                                >
                                    <option value='Select Class'>Select Class</option>
                                    {sclassesList.map((classItem, index) => (
                                        <option key={index} value={classItem.sclassName}>
                                            {classItem.sclassName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label htmlFor="rollNum" className="block text-sm font-medium text-gray-700 mb-1">
                                Roll Number
                            </label>
                            <input
                                id="rollNum"
                                name="rollNum"
                                type="number"
                                value={formData.rollNum}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter roll number"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Set a password"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-4">
                            <button
                                type="submit"
                                disabled={loader}
                                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${loader ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                            >
                                {loader ? (
                                    <div className="flex items-center justify-center">
                                        <LoadingSpinner size={6} color="white" />
                                        <span className="ml-2">Registering...</span>
                                    </div>
                                ) : (
                                    'Register Student'
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;