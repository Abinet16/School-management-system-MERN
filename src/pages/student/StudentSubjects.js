import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';
import {
  ChartBarIcon,
  TableCellsIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState('table');
  const [activeTab, setActiveTab] = useState(subjectMarks.length > 0 ? 'performance' : 'subjects');

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser._id]);

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
      if (userDetails.examResult?.length > 0) {
        setActiveTab('performance');
      }
    }
  }, [userDetails]);

  useEffect(() => {
    if (subjectMarks.length === 0) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }
  }, [subjectMarks, dispatch, currentUser.sclassName._id]);

  if (response) console.log(response);
  if (error) console.log(error);

  const renderPerformanceTab = () => {
    return (
      <div className="space-y-6">
        {/* Performance Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Academic Performance</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedSection('table')}
                className={`px-4 py-2 rounded-lg ${selectedSection === 'table' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <TableCellsIcon className="h-5 w-5 inline mr-2" />
                Table View
              </button>
              <button
                onClick={() => setSelectedSection('chart')}
                className={`px-4 py-2 rounded-lg ${selectedSection === 'chart' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <ChartBarIcon className="h-5 w-5 inline mr-2" />
                Chart View
              </button>
            </div>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Subjects</p>
              <p className="text-2xl font-bold text-blue-800">{subjectMarks.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Average Score</p>
              <p className="text-2xl font-bold text-green-800">
                {subjectMarks.reduce((sum, mark) => sum + mark.marksObtained, 0) / subjectMarks.length || 0}%
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Highest Score</p>
              <p className="text-2xl font-bold text-purple-800">
                {Math.max(...subjectMarks.map(mark => mark.marksObtained))}%
              </p>
            </div>
          </div>

          {/* Performance Content */}
          {selectedSection === 'table' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marks Obtained
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subjectMarks.map((result, index) => {
                    if (!result.subName || !result.marksObtained) return null;
                    
                    const performanceColor = result.marksObtained >= 75 ? 'text-green-600' :
                                          result.marksObtained >= 50 ? 'text-yellow-600' : 'text-red-600';
                    const performanceText = result.marksObtained >= 75 ? 'Excellent' :
                                           result.marksObtained >= 50 ? 'Good' : 'Needs Improvement';

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <BookOpenIcon className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="font-medium text-gray-900">{result.subName.subName}</div>
                              <div className="text-sm text-gray-500">{result.subName.subCode}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900 font-medium">{result.marksObtained}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${performanceColor} bg-opacity-20 ${performanceColor.replace('text', 'bg')}`}>
                            {performanceText}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {selectedSection === 'chart' && (
            <div className="h-96 mt-6">
              <CustomBarChart 
                chartData={subjectMarks} 
                dataKey="marksObtained" 
                barColor="#4f46e5" 
                title="Subject Performance"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSubjectsTab = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <AcademicCapIcon className="h-8 w-8 text-indigo-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Class Information</h2>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            You are currently enrolled in:
          </h3>
          <div className="bg-indigo-50 p-4 rounded-lg inline-block">
            <p className="text-indigo-800 font-semibold">
              Class {sclassDetails && sclassDetails.sclassName}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500 mr-2" />
            Subjects Offered:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectsList && subjectsList.map((subject, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <BookOpenIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{subject.subName}</h4>
                    <p className="text-sm text-gray-500">Code: {subject.subCode}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {subjectMarks.length > 0 && (
                  <button
                    onClick={() => setActiveTab('performance')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'performance' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    My Performance
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('subjects')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'subjects' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Class Subjects
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'performance' && renderPerformanceTab()}
            {activeTab === 'subjects' && renderSubjectsTab()}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSubjects;