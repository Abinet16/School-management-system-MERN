import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, Route, Routes } from 'react-router-dom';
import { Menu, ChevronLeft, LogOut, Users, BookOpen, User, DollarSign, Bell } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
//import { getAllSclasses, getAllStudents, getAllTeachers } from '../../redux/actions'; // Update with your actual action paths

// Components
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AccountMenu from '../../components/AccountMenu';

// Import all your route components
import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';

    const AdminHomePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const navigate = useNavigate();


    const dispatch = useDispatch();
    const { studentsList, sclassesList, teachersList, currentUser } = useSelector(state => ({
        studentsList: state.student.studentsList,
        sclassesList: state.sclass.sclassesList,
        teachersList: state.teacher.teachersList,
        currentUser: state.user.currentUser
    }));

    const adminID = currentUser?._id;

    useEffect(() => {
        if (adminID) {
            dispatch(getAllStudents(adminID));
            dispatch(getAllSclasses(adminID, "Sclass"));
            dispatch(getAllTeachers(adminID));
        }
    }, [adminID, dispatch]);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

    // Admin Home Page Component

        const numberOfStudents = studentsList?.length || 0;
        const numberOfClasses = sclassesList?.length || 0;
        const numberOfTeachers = teachersList?.length || 0;

        return (
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Students Card */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 transform hover:-translate-y-1">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mb-4 shadow-md">
                                <Users className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Students</h3>
                            <p className="text-3xl font-bold text-purple-600">
                                <CountUp end={numberOfStudents} duration={2.5} />
                            </p>
                        </div>
                    </div>

                    {/* Total Classes Card */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 transform hover:-translate-y-1">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center mb-4 shadow-md">
                                <BookOpen className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Classes</h3>
                            <p className="text-3xl font-bold text-pink-600">
                                <CountUp end={numberOfClasses} duration={3} />
                            </p>
                        </div>
                    </div>

                    {/* Total Teachers Card */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 transform hover:-translate-y-1">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-md">
                                <User className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Teachers</h3>
                            <p className="text-3xl font-bold text-emerald-600">
                                <CountUp end={numberOfTeachers} duration={2.5} />
                            </p>
                        </div>
                    </div>

                    {/* Fees Collection Card */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 transform hover:-translate-y-1">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4 shadow-md">
                                <DollarSign className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Fees Collection</h3>
                            <p className="text-3xl font-bold text-amber-600">
                                <CountUp end={23000} duration={2.5} prefix="$" />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Notices Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center mb-6">
                        <Bell className="h-6 w-6 text-purple-600 mr-2" />
                        <h2 className="text-xl font-bold text-gray-800">Latest Notices</h2>
                    </div>
                    <div className="space-y-4">
                        {/* Replace with your actual notices component */}
                        <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <h4 className="font-medium text-gray-800">School Reopening Notice</h4>
                            <p className="text-sm text-gray-600 mt-1">Classes will resume on January 15th</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <h4 className="font-medium text-gray-800">Parent-Teacher Meeting</h4>
                            <p className="text-sm text-gray-600 mt-1">Scheduled for January 20th at 10 AM</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar backdrop */}
            {mobileSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={toggleMobileSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static z-30 w-64 h-screen bg-white shadow-xl transform transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
                ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        {sidebarOpen && (
                            <h1 className="text-xl font-bold text-purple-700">School Admin</h1>
                        )}
                        <button 
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hidden lg:block"
                        >
                            <ChevronLeft className={`h-5 w-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
                        </button>
                    </div>

                    {/* Sidebar content */}
                    <div className="flex-1 overflow-y-auto">
                        <SideBar collapsed={!sidebarOpen} />
                    </div>

                    {/* Sidebar footer */}
                    <div className="p-4 border-t border-gray-200">
                        <button 
                            onClick={() => navigate('/logout')}
                            className="flex items-center w-full p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            {sidebarOpen && <span className="ml-3">Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navigation */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <button 
                                onClick={toggleMobileSidebar}
                                className="p-2 mr-4 text-gray-500 rounded-lg hover:bg-gray-100 lg:hidden"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
                        </div>
                        <AccountMenu />
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />

                        {/* Notice Routes */}
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* Subject Routes */}
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />
                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        {/* Class Routes */}
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                        {/* Student Routes */}
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* Teacher Routes */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminHomePage;