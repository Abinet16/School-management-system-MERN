import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import { PlusIcon, TrashIcon, EyeIcon, BookOpenIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const deleteHandler = (deleteID, address) => {
    setAlert({ show: true, type: 'error', message: "Sorry the delete function has been disabled for now." });
    // Uncomment to enable delete functionality
    // dispatch(deleteUser(deleteID, address))
    //   .then(() => {
    //     dispatch(getAllSclasses(adminID, "Sclass"));
    //   })
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

  const ClassTable = () => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Class List</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/Admin/addclass")}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Class
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sclassesList?.map((sclass) => (
                <tr key={sclass._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sclass.sclassName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => deleteHandler(sclass._id, "Sclass")}
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigate("/Admin/classes/class/" + sclass._id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <div className="relative inline-block text-left group">
                        <button
                          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                          title="More options"
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                        <div className="hidden group-hover:block absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <button
                              onClick={() => navigate("/Admin/addsubject/" + sclass._id)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <BookOpenIcon className="h-4 w-4 mr-2 text-blue-500" />
                              Add Subjects
                            </button>
                            <button
                              onClick={() => navigate("/Admin/class/addstudents/" + sclass._id)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <UserPlusIcon className="h-4 w-4 mr-2 text-green-500" />
                              Add Students
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {alert.show && (
        <div className="mb-6">
          {alert.type === 'error' ? (
            <ErrorAlert message={alert.message} />
          ) : null}
        </div>
      )}

      {getresponse ? (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Classes Found</h2>
          <p className="text-gray-600 mb-6">It looks like you haven't created any classes yet.</p>
          <button
            onClick={() => navigate("/Admin/addclass")}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Your First Class
          </button>
        </div>
      ) : (
        <>
          {Array.isArray(sclassesList) && sclassesList.length > 0 ? (
            <ClassTable />
          ) : (
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Classes Available</h2>
              <button
                onClick={() => navigate("/Admin/addclass")}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Add New Class
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowClasses;