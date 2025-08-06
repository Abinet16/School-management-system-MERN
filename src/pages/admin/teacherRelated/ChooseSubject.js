import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import LoadingSpinner from '../../../components/LoadingSpinner'
import ErrorAlert from '../../../components/ErrorAlert'

const ChooseSubject = ({ situation }) => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [classID, setClassID] = useState("")
    const [teacherID, setTeacherID] = useState("")
    const [loader, setLoader] = useState(false)

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass)

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id)
            const classID = params.id
            dispatch(getTeacherFreeClassSubjects(classID))
        }
        else if (situation === "Teacher") {
            const { classID, teacherID } = params
            setClassID(classID)
            setTeacherID(teacherID)
            dispatch(getTeacherFreeClassSubjects(classID))
        }
    }, [situation])

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true)
        dispatch(updateTeachSubject(teacherId, teachSubject))
        navigate("/Admin/teachers")
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner size={12} />
            </div>
        )
    }

    if (error) {
        return <ErrorAlert message={error} />
    }

    if (response) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        All subjects already have teachers assigned
                    </h1>
                    <p className="text-gray-600 mb-6">
                        There are no available subjects without assigned teachers.
                    </p>
                    <button
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                        className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300"
                    >
                        Add New Subjects
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {situation === "Teacher" ? "Assign Subject to Teacher" : "Select Subject"}
                        </h1>
                        {situation === "Norm" && (
                            <button
                                onClick={() => navigate("/Admin/addsubject/" + classID)}
                                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors duration-300"
                            >
                                Add New Subject
                            </button>
                        )}
                    </div>

                    {subjectsList && subjectsList.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject Code
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {subjectsList.map((subject, index) => (
                                        <tr key={subject._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {subject.subName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {subject.subCode}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {situation === "Norm" ? (
                                                    <button
                                                        onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}
                                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
                                                    >
                                                        Choose
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                                        disabled={loader}
                                                        className={`px-4 py-2 rounded-md transition-colors duration-300 ${loader ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white`}
                                                    >
                                                        {loader ? (
                                                            <div className="flex items-center">
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Processing...
                                                            </div>
                                                        ) : (
                                                            'Assign Subject'
                                                        )}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No subjects available for this class.</p>
                            <button
                                onClick={() => navigate("/Admin/addsubject/" + classID)}
                                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
                            >
                                Add Subjects
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChooseSubject