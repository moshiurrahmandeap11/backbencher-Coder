import { useEffect, useState } from "react";
import axiosInstance from "../../../../hooks/AxiosInstance/AxiosInstance";
import Loader from "../../../sharedItems/Loader/Loader";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import MainButton from "../../../sharedItems/MainButton/MainButton";

interface User {
  _id: string;
  uid: string;
  name: string | null;
  email: string | null;
  age: number | null;
  profileimage: string | null;
  coverphoto: string | null;
  role: string;
  createdat: string;
  updatedat: string;
  lastlogin: string | null;
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const [roleLoading, setRoleLoading] = useState<string | null>(null);

    const navigate = useNavigate();

    const roleOptions = [
        { value: 'user', label: 'Normal User', color: 'gray' },
        { value: 'admin', label: 'Admin', color: 'red' },
        { value: 'mentor', label: 'Mentor', color: 'blue' },
        { value: 'student', label: 'Student', color: 'green' },
        { value: 'certified_developer', label: 'Certified Developer', color: 'purple' }
    ];

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/users/');
            console.log('Users data:', response.data);
            setUsers(response.data.data || []);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to fetch users');
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleEditProfile = (user: User) => {
        const firstName = user?.name?.split(" ")[0] || "user";
        navigate(`/edit-profile/${firstName}/${user.uid}`);
    };

    const handleDelete = async (userToDelete: User) => {
        if (!window.confirm(`Are you sure you want to delete user: ${userToDelete.name || userToDelete.email}? This action cannot be undone.`)) {
            return;
        }

        try {
            setDeleteLoading(userToDelete.uid);
            await axiosInstance.delete(`/users/${userToDelete.uid}`);
            
            setUsers(prev => prev.filter(user => user.uid !== userToDelete.uid));
            toast.success('User deleted successfully');
        } catch (error: any) {
            console.error('Error deleting user:', error);
            const errorMessage = error.response?.data?.message || 'Failed to delete user';
            toast.error(errorMessage);
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleRoleChange = async (user: User, newRole: string) => {
        try {
            setRoleLoading(user.uid);
            
            await axiosInstance.patch(`/users/${user.uid}/role`, { role: newRole });
            
            // Update local state
            setUsers(prev => prev.map(u => 
                u.uid === user.uid ? { ...u, role: newRole } : u
            ));
            
            const roleLabel = roleOptions.find(r => r.value === newRole)?.label || newRole;
            toast.success(`User role updated to ${roleLabel}`);
        } catch (error: any) {
            console.error('Error updating role:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update role';
            toast.error(errorMessage);
        } finally {
            setRoleLoading(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString: string | null) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getInitials = (name: string | null) => {
        if (!name) return '?';
        return name.split(' ').map(part => part.charAt(0).toUpperCase()).join('').slice(0, 2);
    };

    const getRoleColor = (role: string) => {
        const roleOption = roleOptions.find(r => r.value === role);
        return roleOption?.color || 'gray';
    };

    const getRoleBadge = (role: string) => {
        const roleOption = roleOptions.find(r => r.value === role);
        const color = getRoleColor(role);
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}>
                {roleOption?.label || role}
            </span>
        );
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">User Management</h1>
                        <p className="text-blue-100">Manage all users in the system</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <MainButton 
                            variant="secondary"
                            className="bg-white/20 hover:bg-white/30 border-white text-white"
                            onClick={fetchUsers}
                        >
                            Refresh Users
                        </MainButton>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 -mt-4">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                    <div className="text-sm text-gray-500">Total Users</div>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                        {users.filter(u => u.name).length}
                    </div>
                    <div className="text-sm text-gray-500">With Name</div>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                        {users.filter(u => u.age).length}
                    </div>
                    <div className="text-sm text-gray-500">With Age</div>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                        {users.filter(u => u.profileimage).length}
                    </div>
                    <div className="text-sm text-gray-500">With Photo</div>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                        {users.filter(u => u.role === 'admin').length}
                    </div>
                    <div className="text-sm text-gray-500">Admins</div>
                </div>
            </div>

            {/* Users Table */}
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Activity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((userItem) => (
                                <tr key={userItem.uid} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {userItem.profileimage ? (
                                                    <img 
                                                        className="h-10 w-10 rounded-full object-cover" 
                                                        src={`http://localhost:3000${userItem.profileimage}`}
                                                        alt={userItem.name || 'User'}
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                        <span className="text-white font-semibold text-sm">
                                                            {getInitials(userItem.name)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {userItem.name || 'No Name'}
                                                </div>
                                                <div className="text-sm text-gray-500 font-mono">
                                                    {userItem.uid.slice(0, 8)}...
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{userItem.email}</div>
                                        <div className="text-sm text-gray-500">
                                            {userItem.age ? `${userItem.age} years` : 'Age not set'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col space-y-2">
                                            {getRoleBadge(userItem.role)}
                                            <div className="relative">
                                                <select
                                                    value={userItem.role}
                                                    onChange={(e) => handleRoleChange(userItem, e.target.value)}
                                                    disabled={roleLoading === userItem.uid}
                                                    className="block w-full pl-3 pr-10 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    {roleOptions.map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                {roleLoading === userItem.uid && (
                                                    <div className="absolute right-2 top-1">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>Joined: {formatDate(userItem.createdat)}</div>
                                        <div>Last Login: {formatDateTime(userItem.lastlogin)}</div>
                                        <div>Updated: {formatDate(userItem.updatedat)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex space-x-2">
                                                <MainButton
                                                    size="sm"
                                                    variant="primary"
                                                    onClick={() => handleEditProfile(userItem)}
                                                    className="bg-blue-600 hover:bg-blue-700 flex-1"
                                                >
                                                    Edit
                                                </MainButton>
                                                <MainButton
                                                    size="sm"
                                                    variant="danger"
                                                    onClick={() => handleDelete(userItem)}
                                                    loading={deleteLoading === userItem.uid}
                                                    disabled={deleteLoading === userItem.uid}
                                                    className="bg-red-600 hover:bg-red-700 flex-1"
                                                >
                                                    Delete
                                                </MainButton>
                                            </div>
                                            <div className="grid grid-cols-2 gap-1">
                                                {roleOptions
                                                    .filter(role => role.value !== userItem.role)
                                                    .slice(0, 4)
                                                    .map(role => (
                                                        <button
                                                            key={role.value}
                                                            onClick={() => handleRoleChange(userItem, role.value)}
                                                            disabled={roleLoading === userItem.uid}
                                                            className={`text-xs px-2 py-1 rounded bg-${role.color}-50 text-${role.color}-700 hover:bg-${role.color}-100 transition-colors`}
                                                        >
                                                            {role.label.split(' ')[0]}
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                        <p className="text-gray-500 mb-4">There are no users in the system yet.</p>
                        <MainButton variant="primary">
                            Create First User
                        </MainButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;