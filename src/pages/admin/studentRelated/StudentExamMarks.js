import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SuccessAlert from '../../../components/SuccessAlert';
import ErrorAlert from '../../../components/ErrorAlert';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [formData, setFormData] = useState({
        studentID: "",
        subjectName: "",
        chosenSubName: "",
        marksObtained: ""
    });

    const [alert, setAlert] = useState({ show: false, type: '', message: "" });
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (situation === "Student") {
            setFormData(prev => ({ ...prev, studentID: params.id }));
            const stdID = params.id;
            dispatch(getUserDetails(stdID, "Student"));
        }
        else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setFormData(prev => ({ ...prev, studentID, chosenSubName: subjectID }));
            dispatch(getUserDetails(studentID, "Student"));
        }
    }, [situation, params, dispatch]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails, situation]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubjectChange = (e) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === e.target.value
        );
        setFormData(prev => ({
            ...prev,
            subjectName: selectedSubject.subName,
            chosenSubName: selectedSubject._id
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (!formData.chosenSubName || !formData.marksObtained) {
            setAlert({ show: true, type: 'error', message: "Please fill all required fields" });
            return;
        }

        const fields = { 
            subName: formData.chosenSubName, 
            marksObtained: formData.marksObtained 
        };

        setLoader(true);
        dispatch(updateStudentFields(formData.studentID, fields, "UpdateExamResult"));
    };

    useEffect(() => {
        if (response) {
            setLoader(false);
            setAlert({ show: true, type: 'success', message: response });
        }
        else if (error) {
            setLoader(false);
            setAlert({ show: true, type: 'error', message: "Failed to update marks" });
        }
        else if (statestatus === "added") {
            setLoader(false);
            setAlert({ show: true, type: 'success', message: "Marks updated successfully!" });
        }
    }, [response, statestatus, error]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner size={12} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
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
                        <h1 className="text-2xl font-bold text-gray-800">Exam Marks Entry</h1>
                        <div className="mt-4 space-y-2">
                            <p className="text-lg text-gray-600">
                                <span className="font-medium">Student:</span> {userDetails?.name || 'Loading...'}
                            </p>
                            {currentUser?.teachSubject && (
                                <p className="text-lg text-gray-600">
                                    <span className="font-medium">Subject:</span> {currentUser.teachSubject.subName}
                                </p>
                            )}
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        {situation === "Student" && (
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Subject
                                </label>
                                <select
                                    id="subject"
                                    name="subjectName"
                                    value={formData.subjectName}
                                    onChange={handleSubjectChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    {subjectsList?.map((subject, index) => (
                                        <option key={index} value={subject.subName}>
                                            {subject.subName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-1">
                                Marks Obtained
                            </label>
                            <input
                                type="number"
                                id="marks"
                                name="marksObtained"
                                value={formData.marksObtained}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter marks"
                                min="0"
                                max="100"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loader}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${loader ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                            {loader ? (
                                <div className="flex items-center justify-center">
                                    <LoadingSpinner size={6} color="white" />
                                    <span className="ml-2">Submitting...</span>
                                </div>
                            ) : (
                                'Submit Marks'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentExamMarks;