import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import SeeNotice from '../../components/SeeNotice';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import {
  UserGroupIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const TeacherHomePage = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents?.length || 0;
    const numberOfSessions = subjectDetails?.sessions || 0;
    const testsTaken = 24; // Example data
    const totalHours = 30; // Example data

    const stats = [
        { 
            title: "Class Students", 
            value: numberOfStudents, 
            icon: UserGroupIcon,
            color: "bg-blue-100 text-blue-600"
        },
        { 
            title: "Total Lessons", 
            value: numberOfSessions, 
            icon: BookOpenIcon,
            color: "bg-purple-100 text-purple-600"
        },
        { 
            title: "Tests Taken", 
            value: testsTaken, 
            icon: ClipboardDocumentCheckIcon,
            color: "bg-green-100 text-green-600"
        },
        { 
            title: "Total Hours", 
            value: totalHours, 
            suffix: "hrs",
            icon: ClockIcon,
            color: "bg-amber-100 text-amber-600"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        <CountUp 
                                            end={stat.value} 
                                            duration={2.5} 
                                            className="text-indigo-600"
                                        />
                                        {stat.suffix && <span className="text-sm ml-1">{stat.suffix}</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Notices</h2>
                    <SeeNotice />
                </div>
            </div>
        </div>
    );
};

export default TeacherHomePage;