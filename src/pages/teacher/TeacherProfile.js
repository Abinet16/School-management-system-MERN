import React from 'react';
import { useSelector } from 'react-redux';
import { UserCircleIcon, AcademicCapIcon, BookOpenIcon, BuildingLibraryIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);
  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  if (error) {
    console.error("Profile Error:", error);
  }

  const profileItems = [
    {
      icon: UserCircleIcon,
      label: "Name",
      value: currentUser.name,
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: EnvelopeIcon,
      label: "Email",
      value: currentUser.email,
      color: "text-purple-600 bg-purple-50"
    },
    {
      icon: AcademicCapIcon,
      label: "Class",
      value: teachSclass?.sclassName || "Not assigned",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: BookOpenIcon,
      label: "Subject",
      value: teachSubject?.subName || "Not assigned",
      color: "text-amber-600 bg-amber-50"
    },
    {
      icon: BuildingLibraryIcon,
      label: "School",
      value: teachSchool?.schoolName || "Not available",
      color: "text-red-600 bg-red-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
                  <UserCircleIcon className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                  <div className="bg-green-500 rounded-full h-5 w-5"></div>
                </div>
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-white">{currentUser.name}</h1>
            <p className="text-white/90">{teachSubject?.subName} Teacher</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileItems.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-full ${item.color} mr-4`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
              <p className="mt-2 text-gray-600">
                For any changes to your profile information, please contact the school administration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;