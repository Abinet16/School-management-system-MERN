import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import { 
  UserGroupIcon, 
  UserIcon, 
  IdentificationIcon, 
  ClockIcon, 
  AcademicCapIcon,
  ChartBarIcon,
  TableCellsIcon,
  EyeIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params;
  const [activeTab, setActiveTab] = useState('details');
  const [selectedSection, setSelectedSection] = useState('attendance');

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (subloading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={12} />
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  const StudentRow = ({ student, showAttendance = false }) => (
    <tr key={student._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {student.rollNum}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {student.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/Admin/students/student/${student._id}`)}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <EyeIcon className="h-4 w-4 mr-1" />
            View
          </button>
          <button
            onClick={() => navigate(
              showAttendance 
                ? `/Admin/subject/student/attendance/${student._id}/${subjectID}`
                : `/Admin/subject/student/marks/${student._id}/${subjectID}`
            )}
            className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
          >
            {showAttendance ? (
              <>
                <ClipboardDocumentListIcon className="h-4 w-4 mr-1" />
                Attendance
              </>
            ) : (
              <>
                <PencilSquareIcon className="h-4 w-4 mr-1" />
                Marks
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );

  const SubjectStudentsSection = () => {
    return (
      <div className="space-y-6">
        {getresponse ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-gray-500 mb-4">
              <UserGroupIcon className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 text-lg">No students found in this class</p>
            </div>
            <button
              onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Students
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedSection === 'attendance' ? 'Student Attendance' : 'Student Marks'}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll No.
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sclassStudents?.map(student => (
                    <StudentRow 
                      key={student._id} 
                      student={student} 
                      showAttendance={selectedSection === 'attendance'} 
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedSection('attendance')}
                  className={`px-6 py-3 flex items-center ${selectedSection === 'attendance' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                  Attendance
                </button>
                <button
                  onClick={() => setSelectedSection('marks')}
                  className={`px-6 py-3 flex items-center ${selectedSection === 'marks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  <PencilSquareIcon className="h-5 w-5 mr-2" />
                  Marks
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SubjectDetailsSection = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Subject Details</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <IdentificationIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Subject Name</p>
              <p className="text-lg font-medium">{subjectDetails?.subName || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <IdentificationIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Subject Code</p>
              <p className="text-lg font-medium">{subjectDetails?.subCode || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ClockIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Sessions</p>
              <p className="text-lg font-medium">{subjectDetails?.sessions || '0'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <AcademicCapIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Class Name</p>
              <p className="text-lg font-medium">
                {subjectDetails?.sclassName?.sclassName || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <UserGroupIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Number of Students</p>
              <p className="text-lg font-medium">{sclassStudents?.length || '0'}</p>
            </div>
          </div>

          {subjectDetails?.teacher ? (
            <div className="flex items-center space-x-4">
              <UserIcon className="h-6 w-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Teacher</p>
                <p className="text-lg font-medium">{subjectDetails.teacher.name}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate(`/Admin/teachers/addteacher/${subjectDetails?._id}`)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Assign Teacher
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
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
              onClick={() => setActiveTab('students')}
              className={`px-3 py-2 text-sm font-medium rounded-md capitalize ${activeTab === 'students' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              Students
            </button>
          </nav>
        </div>

        {activeTab === 'details' && <SubjectDetailsSection />}
        {activeTab === 'students' && <SubjectStudentsSection />}
      </div>
    </div>
  );
};

export default ViewSubject;