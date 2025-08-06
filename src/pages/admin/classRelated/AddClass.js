import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import SuccessAlert from '../../../components/SuccessAlert';
import ClassroomImage from "../../../assets/classroom.png";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id;
    const address = "Sclass";

    const [loader, setLoader] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (!sclassName.trim()) {
            setAlert({ show: true, type: 'error', message: 'Class name cannot be empty' });
            return;
        }
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            setAlert({ show: true, type: 'success', message: 'Class created successfully!' });
            setTimeout(() => {
                navigate("/Admin/classes/class/" + tempDetails._id);
                dispatch(underControl());
            }, 1500);
        }
        else if (status === 'failed') {
            setAlert({ show: true, type: 'error', message: response });
            setLoader(false);
        }
        else if (status === 'error') {
            setAlert({ show: true, type: 'error', message: "Network Error" });
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <img
                            src={ClassroomImage}
                            alt="Classroom"
                            className="w-3/4 h-auto object-contain"
                        />
                        <h1 className="text-2xl font-bold text-gray-800 mt-6">Create New Class</h1>
                        <p className="text-gray-600 mt-2">Enter the details below to add a new class</p>
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
                            <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
                                Class Name
                            </label>
                            <input
                                id="className"
                                type="text"
                                value={sclassName}
                                onChange={(e) => setSclassName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter class name"
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
                                        <span className="ml-2">Creating...</span>
                                    </div>
                                ) : (
                                    'Create Class'
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Go Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClass;

// SuccessAlert component (create this as a separate file)
