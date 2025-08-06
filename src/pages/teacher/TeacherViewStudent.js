import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { 
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject
} from '../../components/attendanceCalculator';
import { 
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  ClipboardDocumentCheckIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import CustomPieChart from '../../components/CustomPieChart';
import Spinner from '../../components/Spinner';

const TeacherViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

  const address = "Student";
  const studentID = params.id;
  const teachSubject = currentUser.teachSubject?.subName;
  const teachSubjectID = currentUser.teachSubject?._id;

  const [openStates, setOpenStates] = useState({});
  const [studentData, setStudentData] = useState({
    sclassName: '',
    school: '',
    examResult: '',
    attendance: []
  });

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (userDetails) {
      setStudentData({
        sclassName: userDetails.sclassName || '',
        school: userDetails.school || '',
        examResult: userDetails.examResult || '',
        attendance: userDetails.attendance || []
      });
    }
  }, [userDetails]);

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  if (error) {
    console.error("Error loading student data:", error);
  }

  // Calculate attendance data
  const attendanceBySubject = groupAttendanceBySubject(studentData.attendance);
  const overallAttendancePercentage = calculateOverallAttendancePercentage(studentData.attendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;
  const chartData = [
    { name: 'Present', value: overallAttendancePercentage },
    { name: 'Absent', value: overallAbsentPercentage }
  ];

  // Filter for the teacher's subject only
  const teacherSubjectAttendance = Object.entries(attendanceBySubject)
    ?.find(([subName]) => subName === teachSubject);

  const teacherSubjectMarks = (studentData?.examResult || []).find(
    result => result.subName?.subName === teachSubject
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Student Basic Info */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Student Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <UserIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="text-lg font-medium">{userDetails?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                      <AcademicCapIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Roll Number</p>
                      <p className="text-lg font-medium">{userDetails?.rollNum}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                      <AcademicCapIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Class</p>
                      <p className="text-lg font-medium">{studentData.sclassName?.sclassName}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                      <BuildingLibraryIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">School</p>
                      <p className="text-lg font-medium">{studentData.school?.schoolName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Attendance</h2>
                  <button
                    onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Attendance
                  </button>
                </div>
              </div>

              {teacherSubjectAttendance ? (
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Present
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Sessions
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Attendance %
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {teacherSubjectAttendance[0]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {teacherSubjectAttendance[1].present}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {teacherSubjectAttendance[1].sessions}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {calculateSubjectAttendancePercentage(
                              teacherSubjectAttendance[1].present,
                              teacherSubjectAttendance[1].sessions
                            )}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleOpen(teacherSubjectAttendance[1].subId)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              {openStates[teacherSubjectAttendance[1].subId] ? (
                                <ChevronUpIcon className="h-4 w-4 mr-1" />
                              ) : (
                                <ChevronDownIcon className="h-4 w-4 mr-1" />
                              )}
                              Details
                            </button>
                          </td>
                        </tr>
                        {openStates[teacherSubjectAttendance[1].subId] && (
                          <tr>
                            <td colSpan="5" className="px-6 py-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Attendance Records</h3>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                      <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Status
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {teacherSubjectAttendance[1].allData.map((data, index) => {
                                        const date = new Date(data.date);
                                        const dateString = date.toString() !== "Invalid Date" 
                                          ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) 
                                          : "Invalid Date";
                                        const statusColor = data.status === 'Present' ? 'text-green-600' : 'text-red-600';

                                        return (
                                          <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {dateString}
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${statusColor}`}>
                                              {data.status}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Overall Attendance</h3>
                      <p className="text-2xl font-bold text-indigo-600">
                        {overallAttendancePercentage.toFixed(2)}%
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Attendance Visualization</h3>
                      <div className="h-64">
                        <CustomPieChart data={chartData} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No attendance records found for {teachSubject}
                </div>
              )}
            </div>

            {/* Marks Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Subject Marks</h2>
                  <button
                    onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Marks
                  </button>
                </div>
              </div>

              {teacherSubjectMarks ? (
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Marks Obtained
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {teacherSubjectMarks.subName.subName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {teacherSubjectMarks.marksObtained}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No marks recorded for {teachSubject}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherViewStudent;