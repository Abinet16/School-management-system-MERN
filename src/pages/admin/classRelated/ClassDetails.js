import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SuccessAlert from '../../../components/SuccessAlert';
import ErrorAlert from '../../../components/ErrorAlert';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    
    if (!title.trim() || !details.trim() || !date) {
      setAlert({ show: true, type: 'error', message: 'Please fill all fields' });
      return;
    }

    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      setAlert({ show: true, type: 'success', message: 'Notice added successfully!' });
      setTimeout(() => {
        navigate('/Admin/notices');
        dispatch(underControl());
      }, 1500);
    } else if (status === 'error') {
      setAlert({ show: true, type: 'error', message: error || "Network Error" });
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Add New Notice</h1>
            <p className="text-gray-600 mt-2">Fill in the details below to create a new notice</p>
          </div>

          {alert.show && (
            <div className="mb-6">
              {alert.type === 'error' ? (
                <ErrorAlert message={alert.message} />
              ) : (
                <SuccessAlert message={alert.message} />
              )}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter notice title"
                required
              />
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                Details
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[100px]"
                placeholder="Enter notice details"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={loader}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${loader ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                {loader ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size={6} color="white" />
                    <span className="ml-2">Adding...</span>
                  </div>
                ) : (
                  'Add Notice'
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotice;