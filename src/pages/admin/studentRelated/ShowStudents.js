import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import { 
  UserPlusIcon, 
  UserMinusIcon, 
  EyeIcon, 
  CalendarIcon, 
  ChartBarIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

const ShowStudents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading, error, response } = useSelector((state) => state.student);
  const { currentUser } = useSelector(state => state.user);

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [currentUser._id, dispatch]);

  const deleteHandler = (deleteID, address) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteUser(deleteID, address))
        .then(() => {
          dispatch(getAllStudents(currentUser._id));
          setAlert({ show: true, type: 'success', message: 'Student deleted successfully' });
        })
        .catch(err => {
          setAlert({ show: true, type: 'error', message: 'Failed to delete student' });
        });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size={12} />
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  const toggleDropdown = (studentId) => {
    setOpenDropdownId(openDropdownId === studentId ? null : studentId);
  };

  const StudentActionsDropdown = ({ studentId }) => {
    const dropdownRef = useRef(null);

    const handleAction = (action) => {
      setOpenDropdownId(null);
      if (action === 'attendance') {
        navigate(`/Admin/students/student/attendance/${studentId}`);
      } else if (action === 'marks') {
        navigate(`/Admin/students/student/marks/${studentId}`);
      }
    };

    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => toggleDropdown(studentId)}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Actions
          {openDropdownId === studentId ? (
            <ChevronUpIcon className="w-5 h-5 ml-2" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 ml-2" />
          )}
        </button>

        {openDropdownId === studentId && (
          <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <button
                onClick={() => handleAction('attendance')}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                Take Attendance
              </button>
              <button
                onClick={() => handleAction('marks')}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <ChartBarIcon className="w-5 h-5 mr-2 text-green-500" />
                Provide Marks
              </button>
            </div>
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
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{alert.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/Admin/addstudents")}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <UserPlusIcon className="w-5 h-5 mr-2" />
            Add Student
          </button>
        </div>
      </div>

      {response ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-500 mb-4">
            <UserPlusIcon className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-lg">No students found</p>
          </div>
          <button
            onClick={() => navigate("/Admin/addstudents")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add New Student
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentsList?.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {student.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.rollNum}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.sclassName?.sclassName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => deleteHandler(student._id, "Student")}
                          className="p-2 text-red-600 hover:text-red-800 transition-colors"
                          title="Remove"
                        >
                          <UserMinusIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => navigate(`/Admin/students/student/${student._id}`)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                        >
                          <EyeIcon className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <StudentActionsDropdown studentId={student._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowStudents;