import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
//import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';
import { Pencil, Trash2, User, X } from 'lucide-react';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [schoolName, setSchoolName] = useState('');

    const address = "Admin";

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
            setSchoolName(currentUser.schoolName);
        }
    }, [currentUser]);

    const handleUpdateProfile = (event) => {
        event.preventDefault();
        const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };
        dispatch(updateUser(fields, currentUser._id, address));
        setOpenEditDialog(false);
    };

    const handleDeleteAccount = () => {
        try {
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <div className="p-8">
                        {/* Avatar */}
                        <div className="flex justify-center">
                            <div className="h-32 w-32 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                                <User className="h-16 w-16 text-white" />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="mt-6 text-center">
                            <h1 className="text-3xl font-bold text-gray-900">{currentUser?.name}</h1>
                            <p className="mt-1 text-lg text-gray-600">{currentUser?.email}</p>
                            <p className="mt-2 text-gray-700">
                                <span className="font-medium">School:</span> {currentUser?.schoolName}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => setOpenEditDialog(true)}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Pencil className="h-5 w-5" />
                                Edit Profile
                            </button>
                            <button
                                onClick={() => setOpenDeleteDialog(true)}
                                className="px-6 py-3 border border-red-500 text-red-500 font-medium rounded-xl hover:bg-red-50 transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                                <Trash2 className="h-5 w-5" />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Profile Modal */}
                {openEditDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                                <button 
                                    onClick={() => setOpenEditDialog(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <form onSubmit={handleUpdateProfile} className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                                            School
                                        </label>
                                        <input
                                            id="school"
                                            type="text"
                                            value={schoolName}
                                            onChange={(e) => setSchoolName(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Leave blank to keep current"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setOpenEditDialog(false)}
                                        className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {openDeleteDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                            <div className="p-6">
                                <div className="flex justify-center mb-4">
                                    <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                                        <Trash2 className="h-8 w-8 text-red-600" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-center text-gray-900 mb-2">Delete Account</h2>
                                <p className="text-gray-600 text-center mb-6">
                                    Are you sure you want to delete your account? This action cannot be undone.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => setOpenDeleteDialog(false)}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;