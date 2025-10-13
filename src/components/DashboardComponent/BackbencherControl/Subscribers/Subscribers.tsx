import  { useState, useEffect } from 'react';

import toast from 'react-hot-toast';
import { Search, Mail, Calendar, Trash2, Edit, ToggleLeft, ToggleRight, Users, BarChart3 } from 'lucide-react';
import axiosInstance from '../../../../hooks/AxiosInstance/AxiosInstance';
import Loader from '../../../sharedItems/Loader/Loader';
import MainButton from '../../../sharedItems/MainButton/MainButton';
import Swal from 'sweetalert2';

interface Subscriber {
    id: number;
    email: string;
    subscriberd_at: string;
    is_active: boolean;
}

const Subscribers = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        recent: 0
    });
    const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);
    const [editEmail, setEditEmail] = useState('');

    useEffect(() => {
        fetchSubscribers();
        fetchStats();
    }, []);

    useEffect(() => {
        const filtered = subscribers.filter(subscriber =>
            subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSubscribers(filtered);
    }, [searchTerm, subscribers]);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/subscribers');
            if (response.data.success) {
                setSubscribers(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            toast.error('Failed to load subscribers');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await axiosInstance.get('/subscribers/stats/summary');
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

const handleDelete = async (id: number, email: string) => {
  // SweetAlert2 confirm dialog
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `You are about to delete subscriber: ${email}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  try {
    const response = await axiosInstance.delete(`/subscribers/${id}`);
    if (response.data.success) {
      Swal.fire("Deleted!", "Subscriber deleted successfully.", "success");
      fetchSubscribers();
      fetchStats();
    }
  } catch (error: any) {
    console.error("Error deleting subscriber:", error);
    toast.error(error.response?.data?.message || "Failed to delete subscriber");
  }
};

    const handleToggleStatus = async (id: number) => {
        try {
            const response = await axiosInstance.patch(`/subscribers/${id}/toggle`);
            if (response.data.success) {
                toast.success(response.data.message);
                fetchSubscribers();
                fetchStats();
            }
        } catch (error: any) {
            console.error('Error toggling subscription:', error);
            toast.error(error.response?.data?.message || 'Failed to update subscription');
        }
    };

    const startEdit = (subscriber: Subscriber) => {
        setEditingSubscriber(subscriber);
        setEditEmail(subscriber.email);
    };

    const cancelEdit = () => {
        setEditingSubscriber(null);
        setEditEmail('');
    };

    const saveEdit = async () => {
        if (!editingSubscriber) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!editEmail || !emailRegex.test(editEmail)) {
            toast.error('Please enter a valid email address');
            return;
        }

        try {
            const response = await axiosInstance.put(`/subscribers/${editingSubscriber.id}`, {
                email: editEmail,
                is_active: editingSubscriber.is_active
            });

            if (response.data.success) {
                toast.success('Subscriber updated successfully');
                setEditingSubscriber(null);
                setEditEmail('');
                fetchSubscribers();
            }
        } catch (error: any) {
            console.error('Error updating subscriber:', error);
            toast.error(error.response?.data?.message || 'Failed to update subscriber');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscribers Management</h1>
                    <p className="text-gray-600">Manage your newsletter subscribers and their preferences</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active</p>
                                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <ToggleRight className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Inactive</p>
                                <p className="text-3xl font-bold text-red-600">{stats.inactive}</p>
                            </div>
                            <div className="p-3 bg-red-100 rounded-lg">
                                <ToggleLeft className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Recent (7 days)</p>
                                <p className="text-3xl font-bold text-purple-600">{stats.recent}</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <BarChart3 className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Controls */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search subscribers by email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="text-sm text-gray-500">
                            Showing {filteredSubscribers.length} of {subscribers.length} subscribers
                        </div>
                    </div>
                </div>

                {/* Subscribers Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subscription Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSubscribers.map((subscriber) => (
                                    <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingSubscriber?.id === subscriber.id ? (
                                                <input
                                                    type="email"
                                                    value={editEmail}
                                                    onChange={(e) => setEditEmail(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                                                />
                                            ) : (
                                                <div className="flex items-center space-x-3">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {subscriber.email}
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(subscriber.subscriberd_at)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleToggleStatus(subscriber.id)}
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                                                    subscriber.is_active
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                }`}
                                            >
                                                {subscriber.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                {editingSubscriber?.id === subscriber.id ? (
                                                    <>
                                                        <MainButton
                                                            size="sm"
                                                            variant="primary"
                                                            onClick={saveEdit}
                                                            className="bg-green-600 hover:bg-green-700"
                                                        >
                                                            Save
                                                        </MainButton>
                                                        <MainButton
                                                            size="sm"
                                                            variant="secondary"
                                                            onClick={cancelEdit}
                                                        >
                                                            Cancel
                                                        </MainButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => startEdit(subscriber)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(subscriber.id, subscriber.email)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredSubscribers.length === 0 && (
                        <div className="text-center py-12">
                            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No subscribers found</h3>
                            <p className="text-gray-500">
                                {searchTerm ? 'Try adjusting your search terms' : 'No subscribers in the system yet'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Subscribers;