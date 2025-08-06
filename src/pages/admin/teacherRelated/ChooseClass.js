import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'
import ErrorAlert from '../../../components/ErrorAlert'

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass)
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"))
    }, [currentUser._id, dispatch])

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID)
        }
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <LoadingSpinner size={12} />
                        </div>
                    ) : error ? (
                        <ErrorAlert message={error} />
                    ) : getresponse ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">No Classes Found</h2>
                            <p className="text-gray-600 mb-8">It looks like you haven't created any classes yet.</p>
                            <button
                                onClick={() => navigate("/Admin/addclass")}
                                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-sm"
                            >
                                Create Your First Class
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {situation === "Teacher" ? "Assign Teacher to Class" : "Add Subjects to Class"}
                                </h1>
                                <button
                                    onClick={() => navigate("/Admin/addclass")}
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300 shadow-sm"
                                >
                                    Add New Class
                                </button>
                            </div>

                            {sclassesList && sclassesList.length > 0 ? (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-700">Select a Class</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {sclassesList.map((sclass) => (
                                            <div 
                                                key={sclass._id}
                                                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                                                onClick={() => navigateHandler(sclass._id)}
                                            >
                                                <div className="flex flex-col items-center">
                                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-lg font-medium text-gray-900">{sclass.sclassName}</h3>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            navigateHandler(sclass._id)
                                                        }}
                                                        className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300"
                                                    >
                                                        Select
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No classes available. Please create a class first.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChooseClass