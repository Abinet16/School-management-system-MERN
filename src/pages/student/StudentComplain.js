import { useEffect, useState } from 'react';
import Popup from '../../components/Popup';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id;
    const school = currentUser.school._id;
    const address = "Complain";

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const validateForm = () => {
        const newErrors = {};
        if (!date) newErrors.date = "Date is required";
        if (!complaint.trim()) newErrors.complaint = "Complaint cannot be empty";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setLoader(true);
            dispatch(addStuff(fields, address));
        }
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage({
                text: "Complaint submitted successfully!",
                type: "success"
            });
            setComplaint("");
            setDate("");
        }
        else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage({
                text: "Network Error. Please try again.",
                type: "error"
            });
        }
    }, [status, error]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <div className="text-center mb-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="mt-3 text-2xl font-bold text-gray-900">Submit a Complaint</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please provide details about your concern. We'll address it as soon as possible.
                    </p>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date of Incident
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={`block w-full rounded-md shadow-sm ${errors.date ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} sm:text-sm`}
                            />
                            {errors.date && (
                                <p className="mt-2 text-sm text-red-600">{errors.date}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="complaint" className="block text-sm font-medium text-gray-700">
                            Complaint Details
                        </label>
                        <div className="mt-1 relative">
                            <textarea
                                id="complaint"
                                rows={4}
                                value={complaint}
                                onChange={(e) => setComplaint(e.target.value)}
                                className={`block w-full rounded-md shadow-sm ${errors.complaint ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} sm:text-sm`}
                                placeholder="Describe your complaint in detail..."
                            />
                            {errors.complaint && (
                                <p className="mt-2 text-sm text-red-600">{errors.complaint}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loader}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loader ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {loader ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <span>Submit Complaint</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <Popup 
                message={message.text} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
                icon={message.type === "success" ? CheckCircleIcon : ExclamationCircleIcon}
                iconColor={message.type === "success" ? "green" : "red"}
            />
        </div>
    );
};

export default StudentComplain;