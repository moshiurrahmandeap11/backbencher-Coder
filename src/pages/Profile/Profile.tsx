import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../hooks/AxiosInstance/AxiosInstance";

interface UserProfile {
  _id: string;
  uid: string;
  name: string | null;
  email: string | null;
  age: number | null;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const { uid } = useParams<{ uid: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async (uid: string) => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/users/${uid}`);
        setProfile(res.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchProfile(uid);
    }
  }, [uid]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">The requested profile could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">User Profile</h1>
          <p className="text-lg text-gray-600">Welcome to your profile page</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl font-bold text-white">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : '👤'}
                </span>
              </div>
              
              {/* Basic Info */}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {profile.name || "Anonymous User"}
                </h2>
                <p className="text-indigo-100">
                  {profile.email || "No email provided"}
                </p>
                {profile.age && (
                  <p className="text-indigo-100 mt-1">Age: {profile.age}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Personal Information
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900 font-medium">
                      {profile.name || "Not specified"}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                    <p className="text-gray-900 font-medium">
                      {profile.email || "Not specified"}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-gray-900 font-medium">
                      {profile.age ? `${profile.age} years` : "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Account Information
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">User ID</label>
                    <p className="text-gray-900 font-mono text-sm bg-gray-50 p-2 rounded">
                      {profile.uid}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Member Since</label>
                    <p className="text-gray-900 font-medium">
                      {formatDate(profile.createdAt)}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="text-gray-900 font-medium">
                      {formatDate(profile.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-sm text-blue-500">Account Created</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {profile.age || "N/A"}
                </div>
                <div className="text-sm text-green-500">Years Old</div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {profile.email ? "Verified" : "Pending"}
                </div>
                <div className="text-sm text-purple-500">Email Status</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
              <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200">
                Edit Profile
              </button>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Profile</h3>
          <p className="text-gray-600">
            This profile was created using our secure authentication system. 
            {!profile.name && " Some information may be missing as the user hasn't completed their profile setup."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;