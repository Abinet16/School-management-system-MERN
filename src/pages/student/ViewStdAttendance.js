import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { 
  calculateOverallAttendancePercentage, 
  calculateSubjectAttendancePercentage, 
  groupAttendanceBySubject 
} from '../../components/attendanceCalculator';
import CustomBarChart from '../../components/CustomBarChart';
import { 
  ChevronDownIcon,
  ChevronUpIcon,
  ChartBarIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';

const ViewStdAttendance = () => {
  const dispatch = useDispatch();
  const [openStates, setOpenStates] = useState({});
  const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [selectedSection, setSelectedSection] = useState('table');

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser._id]);

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  if (response) console.log(response);
  else if (error) console.log(error);

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  const attendanceBySubject = groupAttendanceBySubject(subjectAttendance);
  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

  const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
    return {
      subject: subName,
      attendancePercentage: subjectAttendancePercentage,
      totalClasses: sessions,
      attendedClasses: present
    };
  });

  const handleSectionChange = (newSection) => {
    setSelectedSection(newSection);
  };

  const renderTableSection = () => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-20">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Details</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Sessions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                  const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                  const attendanceColor = subjectAttendancePercentage >= 75 ? 'text-green-600' : 
                                         subjectAttendancePercentage >= 50 ? 'text-yellow-600' : 'text-red-600';

                  return (
                    <React.Fragment key={index}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {subName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {present}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {sessions}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap font-medium ${attendanceColor}`}>
                          {subjectAttendancePercentage}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleOpen(subId)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            {openStates[subId] ? (
                              <ChevronUpIcon className="-ml-0.5 mr-1 h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="-ml-0.5 mr-1 h-4 w-4" />
                            )}
                            Details
                          </button>
                        </td>
                      </tr>
                      {openStates[subId] && (
                        <tr>
                          <td colSpan="5" className="px-6 py-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="text-lg font-medium text-gray-900 mb-3">Attendance Records</h3>
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {allData.map((data, index) => {
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
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <p className="text-lg font-medium text-indigo-800">
              Overall Attendance Percentage: <span className="font-bold">{overallAttendancePercentage.toFixed(2)}%</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderChartSection = () => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Visualization</h2>
        <div className="h-96">
          <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div>
            {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
              <>
                {selectedSection === 'table' && renderTableSection()}
                {selectedSection === 'chart' && renderChartSection()}

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-around">
                      <button
                        onClick={() => handleSectionChange('table')}
                        className={`flex flex-col items-center py-3 px-6 ${selectedSection === 'table' ? 'text-indigo-600' : 'text-gray-500'}`}
                      >
                        <TableCellsIcon className={`h-6 w-6 ${selectedSection === 'table' ? 'text-indigo-600' : 'text-gray-400'}`} />
                        <span className="text-xs mt-1">Table</span>
                      </button>
                      <button
                        onClick={() => handleSectionChange('chart')}
                        className={`flex flex-col items-center py-3 px-6 ${selectedSection === 'chart' ? 'text-indigo-600' : 'text-gray-500'}`}
                      >
                        <ChartBarIcon className={`h-6 w-6 ${selectedSection === 'chart' ? 'text-indigo-600' : 'text-gray-400'}`} />
                        <span className="text-xs mt-1">Chart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No Attendance Records Found
                </h3>
                <p className="text-gray-500">
                  Currently you have no attendance details available.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStdAttendance;