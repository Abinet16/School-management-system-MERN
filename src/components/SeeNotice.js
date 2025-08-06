import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import TableViewTemplate from './TableViewTemplate';
import Spinner  from './Spinner'; // Assume you have a Spinner component

const SeeNotice = () => {
    const dispatch = useDispatch();
    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    useEffect(() => {
        if (currentRole === "Admin") {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        } else {
            dispatch(getAllNotices(currentUser.school._id, "Notice"));
        }
    }, [dispatch, currentRole, currentUser]);

    if (error) {
        console.error("Error fetching notices:", error);
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170, className: 'font-medium text-gray-900' },
        { id: 'details', label: 'Details', minWidth: 100 },
        { 
            id: 'date', 
            label: 'Date', 
            minWidth: 170,
            format: (value) => new Date(value).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        },
    ];

    const noticeRows = noticesList.map((notice) => {
        return {
            title: notice.title,
            details: notice.details,
            date: notice.date,
            id: notice._id,
        };
    });

    return (
        <div className="mt-12 mr-5 ml-5 sm:ml-0">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner size="lg" />
                </div>
            ) : response ? (
                <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No Notices Available</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        There are no notices to display at this time.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-8">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Notices</h3>
                        <p className="mt-2 text-gray-600">
                            Important announcements and updates
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        {Array.isArray(noticesList) && noticesList.length > 0 && (
                            <TableViewTemplate 
                                columns={noticeColumns} 
                                rows={noticeRows}
                                className="border-none"
                                hoverEffect={true}
                                stickyHeader={true}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SeeNotice;