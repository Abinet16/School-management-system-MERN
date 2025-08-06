import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { ChevronDownIcon, ChevronUpIcon, UserIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import TableTemplate from "../../components/TableTemplate";
import Spinner from "../../components/Spinner";

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.error(error);
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170, className: 'font-medium text-gray-900' },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    }));

    const StudentsButtonHaver = ({ row }) => {
        const [open, setOpen] = useState(false);
        const anchorRef = useRef(null);
        const [selectedOption, setSelectedOption] = useState('Take Attendance');

        const handleOptionSelect = (option) => {
            setSelectedOption(option);
            setOpen(false);
            if (option === 'Take Attendance') {
                navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
            } else if (option === 'Provide Marks') {
                navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
            }
        };

        return (
            <div className="flex space-x-2">
                <button
                    onClick={() => navigate("/Teacher/class/student/" + row.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center"
                >
                    <UserIcon className="h-4 w-4 mr-1" />
                    View
                </button>
                
                <div className="relative">
                    <button
                        ref={anchorRef}
                        onClick={() => setOpen(!open)}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors flex items-center"
                    >
                        {selectedOption}
                        {open ? (
                            <ChevronUpIcon className="h-4 w-4 ml-1" />
                        ) : (
                            <ChevronDownIcon className="h-4 w-4 ml-1" />
                        )}
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                                {['Take Attendance', 'Provide Marks'].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleOptionSelect(option)}
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                            selectedOption === option
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner size="lg" />
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Class Details</h1>
                        <p className="text-gray-600">Manage your class students and activities</p>
                    </div>

                    {getresponse ? (
                        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                            <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No Students Found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                There are no students registered in this class yet.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Students List</h2>
                            </div>
                            
                            {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                                <TableTemplate 
                                    buttonHaver={StudentsButtonHaver} 
                                    columns={studentColumns} 
                                    rows={studentRows}
                                    className="border-none"
                                    hoverEffect={true}
                                    stickyHeader={true}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TeacherClassDetails;