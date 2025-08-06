import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import SuccessAlert from '../../../components/SuccessAlert';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "0" }]);
    const [alert, setAlert] = useState({ show: false, type: '', message: "" });
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { status, currentUser, response, error } = useSelector(state => state.user);
    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const handleSubjectChange = (index, field) => (e) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = e.target.value;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "0" }]);
    };

    const handleRemoveSubject = (index) => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        
        // Validate form
        const isValid = subjects.every(subject => 
            subject.subName.trim() && 
            subject.subCode.trim() && 
            !isNaN(subject.sessions)
        );

        if (!isValid) {
            setAlert({ show: true, type: 'error', message: "Please fill all fields with valid values" });
            return;
        }

        const fields = {
            sclassName,
            subjects: subjects.map(subject => ({
                subName: subject.subName,
                subCode: subject.subCode,
                sessions: parseInt(subject.sessions) || 0,
            })),
            adminID,
        };

        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added') {
            setAlert({ show: true, type: 'success', message: "Subjects added successfully!" });
            setTimeout(() => {
                navigate("/Admin/subjects");
                dispatch(underControl());
            }, 1500);
        } else if (status === 'failed') {
            setAlert({ show: true, type: 'error', message: response });
            setLoader(false);
        } else if (status === 'error') {
            setAlert({ show: true, type: 'error', message: "Network Error" });
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    if (loader) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner size={12} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    {alert.show && (
                        <div className="mb-6">
                            {alert.type === 'error' ? (
                                <ErrorAlert message={alert.message} />
                            ) : (
                                <SuccessAlert message={alert.message} />
                            )}
                        </div>
                    )}

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Add New Subjects</h1>
                        <p className="text-gray-600 mt-2">Enter subject details below</p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        {subjects.map((subject, index) => (
                            <div key={index} className="grid grid-cols-12 gap-4 items-end">
                                <div className="col-span-12 md:col-span-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                                    <input
                                        type="text"
                                        value={subject.subName}
                                        onChange={handleSubjectChange(index, 'subName')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g. Mathematics"
                                        required
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code</label>
                                    <input
                                        type="text"
                                        value={subject.subCode}
                                        onChange={handleSubjectChange(index, 'subCode')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g. MATH101"
                                        required
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sessions</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={subject.sessions}
                                        onChange={handleSubjectChange(index, 'sessions')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-2 flex space-x-2">
                                    {index === 0 ? (
                                        <button
                                            type="button"
                                            onClick={handleAddSubject}
                                            className="flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                        >
                                            <PlusIcon className="h-5 w-5" />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSubject(index)}
                                            className="flex items-center justify-center p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Subjects
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubjectForm;