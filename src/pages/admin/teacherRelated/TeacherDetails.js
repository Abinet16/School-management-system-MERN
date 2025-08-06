import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { User, BookOpen, Bookmark, ArrowRight, PlusCircle } from 'lucide-react';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        {/* Teacher Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                            <div className="flex items-center space-x-4">
                                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                                    <User className="h-8 w-8" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{teacherDetails?.name}</h1>
                                    <p className="text-purple-100">Teacher Profile</p>
                                </div>
                            </div>
                        </div>

                        {/* Teacher Details */}
                        <div className="p-6 space-y-6">
                            {/* Class Information */}
                            <div className="bg-gray-50 rounded-xl p-5">
                                <div className="flex items-center space-x-3 mb-3">
                                    <BookOpen className="h-6 w-6 text-purple-600" />
                                    <h2 className="text-xl font-semibold text-gray-800">Class Information</h2>
                                </div>
                                <div className="space-y-2 pl-9">
                                    <p className="text-gray-700">
                                        <span className="font-medium">Class:</span> {teacherDetails?.teachSclass?.sclassName || 'Not assigned'}
                                    </p>
                                </div>
                            </div>

                            {/* Subject Information */}
                            <div className="bg-gray-50 rounded-xl p-5">
                                <div className="flex items-center space-x-3 mb-3">
                                    <Bookmark className="h-6 w-6 text-purple-600" />
                                    <h2 className="text-xl font-semibold text-gray-800">Subject Information</h2>
                                </div>
                                {isSubjectNamePresent ? (
                                    <div className="space-y-2 pl-9">
                                        <p className="text-gray-700">
                                            <span className="font-medium">Subject:</span> {teacherDetails?.teachSubject?.subName}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Sessions:</span> {teacherDetails?.teachSubject?.sessions}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="pl-9">
                                        <button
                                            onClick={handleAddSubject}
                                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                                        >
                                            <PlusCircle className="h-5 w-5 mr-2" />
                                            Add Subject
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Additional Information */}
                            <div className="bg-gray-50 rounded-xl p-5">
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">Additional Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-5">
                                    <div>
                                        <p className="text-sm text-gray-500">Teacher ID</p>
                                        <p className="text-gray-700 font-medium">{teacherDetails?._id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">School</p>
                                        <p className="text-gray-700 font-medium">{teacherDetails?.school?.schoolName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherDetails;