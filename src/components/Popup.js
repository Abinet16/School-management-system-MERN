import { React, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Popup = ({ message, setShowPopup, showPopup, icon: Icon, iconColor = 'indigo' }) => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);

    // Animation handling
    useEffect(() => {
        if (showPopup) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                handleClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShowPopup(false);
            dispatch(underControl());
            dispatch(underStudentControl());
        }, 300); // Match this with the transition duration
    };

    // Determine notification type and styling
    const isSuccess = message === "Done Successfully" || message.type === "success";
    const bgColor = isSuccess ? 'bg-green-50' : 'bg-red-50';
    const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
    const borderColor = isSuccess ? 'border-green-400' : 'border-red-400';
    const icon = Icon || (isSuccess ? CheckCircleIcon : ExclamationCircleIcon);
    const iconBgColor = isSuccess ? 'bg-green-100' : 'bg-red-100';
    const iconTextColor = isSuccess ? 'text-green-600' : 'text-red-600';

    // Animation classes
    const transitionClasses = {
        entering: 'transform ease-out duration-300 transition translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2',
        entered: 'transform ease-out duration-300 transition translate-y-0 opacity-100 sm:translate-x-0',
        exiting: 'transform transition ease-in duration-300 opacity-0',
        exited: 'hidden',
    };

    return (
        <div className={`fixed inset-0 flex items-start justify-end p-4 pointer-events-none z-50 ${!isVisible && 'hidden'}`}>
            <div className={`w-full max-w-sm rounded-lg shadow-lg ${bgColor} border ${borderColor} pointer-events-auto overflow-hidden transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <div className="p-4">
                    <div className="flex items-start">
                        <div className={`flex-shrink-0 p-2 rounded-full ${iconBgColor} ${iconTextColor}`}>
                            {React.createElement(icon, { className: 'h-6 w-6' })}
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className={`text-sm font-medium ${textColor}`}>
                                {typeof message === 'object' ? message.text : message}
                            </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                className={`rounded-md inline-flex ${bgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSuccess ? 'focus:ring-green-500' : 'focus:ring-red-500'}`}
                                onClick={handleClose}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon className={`h-5 w-5 ${textColor}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;