import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Student Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Subjects Card */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-6 flex flex-col items-center">
                            <div className="bg-blue-100 p-4 rounded-full mb-4">
                                <img src={Subject} alt="Subjects" className="w-12 h-12" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Total Subjects</h3>
                            <CountUp 
                                end={numberOfSubjects} 
                                duration={2.5} 
                                className="text-3xl font-bold text-blue-600"
                            />
                        </div>
                    </div>

                    {/* Assignments Card */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-6 flex flex-col items-center">
                            <div className="bg-purple-100 p-4 rounded-full mb-4">
                                <img src={Assignment} alt="Assignments" className="w-12 h-12" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Total Assignments</h3>
                            <CountUp 
                                end={15} 
                                duration={4} 
                                className="text-3xl font-bold text-purple-600"
                            />
                        </div>
                    </div>

                    {/* Attendance Card */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1">
                        <div className="p-6 h-full flex flex-col items-center justify-center">
                            {response ? (
                                <p className="text-lg font-medium text-gray-600">No Attendance Found</p>
                            ) : loading ? (
                                <p className="text-lg font-medium text-gray-600">Loading...</p>
                            ) : subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                <>
                                    <h3 className="text-lg font-medium text-gray-700 mb-4">Overall Attendance</h3>
                                    <div className="w-40 h-40">
                                        <CustomPieChart data={chartData} />
                                    </div>
                                    <p className="mt-4 text-xl font-semibold text-green-600">
                                        <CountUp end={overallAttendancePercentage} duration={2} />%
                                    </p>
                                </>
                            ) : (
                                <p className="text-lg font-medium text-gray-600">No Attendance Found</p>
                            )}
                        </div>
                    </div>

                    {/* Performance Card (example) */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-6 flex flex-col items-center">
                            <div className="bg-green-100 p-4 rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Average Score</h3>
                            <CountUp 
                                end={85} 
                                duration={3} 
                                suffix="%"
                                className="text-3xl font-bold text-green-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Notices Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Notices</h2>
                        <SeeNotice />
                    </div>
                </div>

                {/* Quick Links (example) */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="#" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-2">View Timetable</h3>
                        <p className="opacity-90">Check your class schedule</p>
                    </a>
                    <a href="#" className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-2">Submit Assignment</h3>
                        <p className="opacity-90">Upload your completed work</p>
                    </a>
                    <a href="#" className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
                        <p className="opacity-90">Get help from teachers</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default StudentHomePage