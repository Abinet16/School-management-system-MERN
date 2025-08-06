import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { 
  calculateOverallAttendancePercentage, 
  calculateSubjectAttendancePercentage, 
  groupAttendanceBySubject 
} from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart';
import CustomPieChart from '../../../components/CustomPieChart';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import SuccessAlert from '../../../components/SuccessAlert';
import { 
  ChartBarIcon, 
  
  PencilIcon, 
  TrashIcon, 
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  IdentificationIcon,
  AcademicCapIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

import {TableIcon} from '@heroicons/react/outline';

const ViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { userDetails, response, loading, error } = useSelector((state) => state.user);

  const studentID = params.id;
  const address = "Student";

  const [activeTab, setActiveTab] = useState('details');
  const [selectedSection, setSelectedSection] = useState('table');
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: "" });

  const [formData, setFormData] = useState({
    name: '',
    rollNum: '',
    password: '',
    sclassName: '',
    studentSchool: '',
    subjectMarks: [],
    subjectAttendance: []
  });

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
      dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
    }
  }, [dispatch, userDetails]);

  useEffect(() => {
    if (userDetails) {
      setFormData({
        name: userDetails.name || '',
        rollNum: userDetails.rollNum || '',
        password: '',
        sclassName: userDetails.sclassName || '',
        studentSchool: userDetails.school || '',
        subjectMarks: userDetails.examResult || [],
        subjectAttendance: userDetails.attendance || []
      });
    }
  }, [userDetails]);

  const toggleSubjectExpansion = (subId) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subId]: !prev[subId]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const fields = formData.password === "" 
      ? { name: formData.name, rollNum: formData.rollNum }
      : { name: formData.name, rollNum: formData.rollNum, password: formData.password };

    dispatch(updateUser(fields, studentID, address))
      .then(() => {
        dispatch(getUserDetails(studentID, address));
        setAlert({ show: true, type: 'success', message: 'Student updated successfully' });
        setEditMode(false);
      })
      .catch((error) => {
        setAlert({ show: true, type: 'error', message: 'Failed to update student' });
      });
  };

  const deleteHandler = () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteUser(studentID, address))
        .then(() => {
          navigate('/Admin/students');
        })
        .catch((error) => {
          setAlert({ show: true, type: 'error', message: 'Failed to delete student' });
        });
    }
  };

  const removeHandler = (id, deladdress) => {
    dispatch(removeStuff(id, deladdress))
      .then(() => {
        dispatch(getUserDetails(studentID, address));
        setAlert({ show: true, type: 'success', message: 'Attendance removed successfully' });
      })
      .catch((error) => {
        setAlert({ show: true, type: 'error', message: 'Failed to remove attendance' });
      });
  };

  const removeSubAttendance = (subId) => {
    dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
      .then(() => {
        dispatch(getUserDetails(studentID, address));
        setAlert({ show: true, type: 'success', message: 'Subject attendance removed' });
      })
      .catch((error) => {
        setAlert({ show: true, type: 'error', message: 'Failed to remove subject attendance' });
      });
  };

  // Calculate attendance data
  const overallAttendancePercentage = calculateOverallAttendancePercentage(formData.subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;
  const chartData = [
    { name: 'Present', value: overallAttendancePercentage },
    { name: 'Absent', value: overallAbsentPercentage }
  ];

  const subjectData = Object.entries(groupAttendanceBySubject(formData.subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
    return {
      subject: subName,
      attendancePercentage: subjectAttendancePercentage,
      totalClasses: sessions,
      attendedClasses: present
    };
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={12} />
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  const StudentDetailsSection = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Student Details</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            {editMode ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={deleteHandler}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Delete
          </button>
        </div>
      </div>

      {editMode ? (
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
            <input
              type="number"
              name="rollNum"
              value={formData.rollNum}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password (leave blank to keep current)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Update Details
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <UserIcon className="h-6 w-6 text-gray-500" />
            <span className="text-lg text-gray-800">{formData.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <IdentificationIcon className="h-6 w-6 text-gray-500" />
            <span className="text-lg text-gray-800">Roll Number: {formData.rollNum}</span>
          </div>
          <div className="flex items-center space-x-4">
            <AcademicCapIcon className="h-6 w-6 text-gray-500" />
            <span className="text-lg text-gray-800">Class: {formData.sclassName?.sclassName || 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-4">
            <BuildingLibraryIcon className="h-6 w-6 text-gray-500" />
            <span className="text-lg text-gray-800">School: {formData.studentSchool?.schoolName || 'N/A'}</span>
          </div>

          {formData.subjectAttendance?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Overall Attendance</h3>
              <div className="h-64">
                <CustomPieChart data={chartData} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const StudentAttendanceSection = () => {
    const renderTableSection = () => (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Attendance Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sessions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(groupAttendanceBySubject(formData.subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                return (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{present}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sessions}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subjectAttendancePercentage.toFixed(2)}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleSubjectExpansion(subId)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                          >
                            {expandedSubjects[subId] ? (
                              <>
                                <ChevronUpIcon className="h-4 w-4 mr-1" />
                                Hide
                              </>
                            ) : (
                              <>
                                <ChevronDownIcon className="h-4 w-4 mr-1" />
                                Details
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => removeSubAttendance(subId)}
                            className="p-2 text-red-600 hover:text-red-800 transition-colors"
                            title="Remove"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}
                            className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                          >
                            Change
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedSubjects[subId] && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-md font-medium mb-2">Attendance Details</h4>
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {allData.map((data, idx) => {
                                  const date = new Date(data.date);
                                  const dateString = date.toString() !== "Invalid Date" 
                                    ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                    : "Invalid Date";
                                  return (
                                    <tr key={idx} className="hover:bg-gray-50">
                                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{dateString}</td>
                                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{data.status}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-lg font-medium">
            Overall Attendance: {overallAttendancePercentage.toFixed(2)}%
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => removeHandler(studentID, "RemoveStudentAtten")}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete All
            </button>
            <button
              onClick={() => navigate(`/Admin/students/student/attendance/${studentID}`)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Attendance
            </button>
          </div>
        </div>
      </div>
    );

    const renderChartSection = () => (
      <div className="bg-white rounded-lg shadow p-6 h-96">
        <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
      </div>
    );

    return (
      <div className="space-y-6">
        {formData.subjectAttendance?.length > 0 ? (
          <>
            {selectedSection === 'table' && renderTableSection()}
            {selectedSection === 'chart' && renderChartSection()}

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedSection('table')}
                  className={`px-6 py-3 flex items-center ${selectedSection === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  <TableIcon className="h-5 w-5 mr-2" />
                  Table View
                </button>
                <button
                  onClick={() => setSelectedSection('chart')}
                  className={`px-6 py-3 flex items-center ${selectedSection === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  Chart View
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-gray-500 mb-4">
              <ChartBarIcon className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 text-lg">No attendance records found</p>
            </div>
            <button
              onClick={() => navigate(`/Admin/students/student/attendance/${studentID}`)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Attendance
            </button>
          </div>
        )}
      </div>
    );
  };

  const StudentMarksSection = () => {
    const renderTableSection = () => (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Exam Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks Obtained</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData.subjectMarks?.map((result, index) => {
                if (!result.subName || !result.marksObtained) return null;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.subName.subName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.marksObtained}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate(`/Admin/students/student/marks/${studentID}`)}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Marks
          </button>
        </div>
      </div>
    );

    const renderChartSection = () => (
      <div className="bg-white rounded-lg shadow p-6 h-96">
        <CustomBarChart chartData={formData.subjectMarks} dataKey="marksObtained" />
      </div>
    );

    return (
      <div className="space-y-6">
        {formData.subjectMarks?.length > 0 ? (
          <>
            {selectedSection === 'table' && renderTableSection()}
            {selectedSection === 'chart' && renderChartSection()}

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedSection('table')}
                  className={`px-6 py-3 flex items-center ${selectedSection === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  <TableIcon className="h-5 w-5 mr-2" />
                  Table View
                </button>
                <button
                  onClick={() => setSelectedSection('chart')}
                  className={`px-6 py-3 flex items-center ${selectedSection === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  Chart View
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-gray-500 mb-4">
              <ChartBarIcon className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 text-lg">No exam results found</p>
            </div>
            <button
              onClick={() => navigate(`/Admin/students/student/marks/${studentID}`)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Marks
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {alert.show && (
        <div className="mb-6">
          {alert.type === 'error' ? (
            <ErrorAlert message={alert.message} />
          ) : (
            <SuccessAlert message={alert.message} />
          )}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-2 text-sm font-medium rounded-md capitalize ${activeTab === 'details' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-3 py-2 text-sm font-medium rounded-md capitalize ${activeTab === 'attendance' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveTab('marks')}
              className={`px-3 py-2 text-sm font-medium rounded-md capitalize ${activeTab === 'marks' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              Marks
            </button>
          </nav>
        </div>

        {activeTab === 'details' && <StudentDetailsSection />}
        {activeTab === 'attendance' && <StudentAttendanceSection />}
        {activeTab === 'marks' && <StudentMarksSection />}
      </div>
    </div>
  );
};

export default ViewStudent;