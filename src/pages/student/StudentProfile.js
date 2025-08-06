import React from 'react';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-5xl font-bold">
                  {String(currentUser.name).charAt(0)}
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-6 h-6 border-2 border-white"></div>
              </div>

              {/* Basic Info */}
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{currentUser.name}</h1>
              <p className="text-gray-600 mb-4">Student Roll No: {currentUser.rollNum}</p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-indigo-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">Class</p>
                  <p className="font-medium text-indigo-700">{sclassName.sclassName}</p>
                </div>
                <div className="bg-purple-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">School</p>
                  <p className="font-medium text-purple-700">{studentSchool.schoolName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">January 1, 2000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">Male</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-blue-600">john.doe@example.com</p>
                </div>
              </div>
              
              {/* Contact Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">(123) 456-7890</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">123 Main Street, City, Country</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p className="font-medium">(987) 654-3210</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Performance */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Overall GPA</span>
                  <span className="font-medium">3.8/4.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Summary</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold mr-4">
                  95%
                </div>
                <div>
                  <p className="text-sm text-gray-600">Present: 95 days</p>
                  <p className="text-sm text-gray-600">Absent: 5 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;