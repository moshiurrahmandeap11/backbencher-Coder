import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../hooks/AxiosInstance/AxiosInstance";
import UseAuth from "../../hooks/UseAuth/UseAuth";

interface PrivacySettings {
  name: string;
  email: string;
  age: string;
}

interface UserProfile {
  _id: string;
  uid: string;
  name: string | null;
  email: string | null;
  age: number | null;
  privacySettings: PrivacySettings;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const { uid } = useParams<{ uid: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingPrivacy, setUpdatingPrivacy] = useState<string | null>(null);
  const { logOut } = UseAuth();
const navigate = useNavigate();
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

const togglePrivacy = async (field: keyof PrivacySettings) => {
  
  if (!profile || !profile.privacySettings) {
    console.log("❌ No profile or privacy settings found");
    return;
  }

  setUpdatingPrivacy(field);
  try {
    const newPrivacySettings = {
      ...profile.privacySettings,
      [field]: profile.privacySettings[field] === 'public' ? 'private' : 'public'
    };

    const response = await axiosInstance.patch(`/users/${uid}/privacy`, {
      privacySettings: newPrivacySettings
    });

    // Updated user data দিয়ে state update করুন
    if (response.data.data) {
      setProfile(response.data.data);
    } else {
      // Fallback: manually update
      setProfile({
        ...profile,
        privacySettings: newPrivacySettings,
        updatedAt: new Date().toISOString()
      });
    }

  } catch (error: any) {
    console.error("❌ Error updating privacy:", error);
    
    if (error.response) {
      console.error("📡 Server Response:", error.response.data);
      console.error("🔢 Status Code:", error.response.status);
      setError(`Server Error: ${error.response.data.message || "Unknown error"}`);
    } else if (error.request) {
      console.error("🌐 Network Error - No response received");
      setError("Network error. Please check your connection.");
    } else {
      console.error("⚡ Request Error:", error.message);
      setError(error.message || "Failed to update privacy settings");
    }
  } finally {
    setUpdatingPrivacy(null);
  }
};

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDisplayValue = (field: keyof PrivacySettings, value: any) => {
    if (!profile || !profile.privacySettings) return value || "Not specified";
    
    if (profile.privacySettings[field] === 'private') {
      return '••••••';
    }
    return value || "Not specified";
  };

  const getPrivacyIcon = (field: keyof PrivacySettings) => {
    if (!profile || !profile.privacySettings) return '🔒';
    return profile.privacySettings[field] === 'public' ? '🌐' : '🔒';
  };

  const getPrivacyStatus = (field: keyof PrivacySettings) => {
    if (!profile || !profile.privacySettings) return 'Private';
    return profile.privacySettings[field] === 'public' ? 'Public' : 'Private';
  };



  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/auth/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
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
          <p className="text-lg text-gray-600">Manage your profile and privacy settings</p>
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
                  {getDisplayValue('name', profile.name) || "Anonymous User"}
                </h2>
                <p className="text-indigo-100">
                  {getDisplayValue('email', profile.email) || "No email provided"}
                </p>
                {profile.age && (
                  <p className="text-indigo-100 mt-1">
                    Age: {getDisplayValue('age', profile.age)}
                  </p>
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
                
                <div className="space-y-4">
                  {/* Name with Privacy Toggle */}
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-gray-900 font-medium">
                        {getDisplayValue('name', profile.name)}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePrivacy('name')}
                      disabled={updatingPrivacy === 'name'}
                      className="flex items-center space-x-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 min-w-[100px] justify-center"
                    >
                      <span className="text-lg">{getPrivacyIcon('name')}</span>
                      <span className="hidden sm:inline-block text-xs">
                        {getPrivacyStatus('name')}
                      </span>
                      {updatingPrivacy === 'name' && (
                        <div className="animate-spin h-4 w-4 border-b-2 border-gray-600 rounded-full"></div>
                      )}
                    </button>
                  </div>
                  
                  {/* Email with Privacy Toggle */}
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-500">Email Address</label>
                      <p className="text-gray-900 font-medium">
                        {getDisplayValue('email', profile.email)}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePrivacy('email')}
                      disabled={updatingPrivacy === 'email'}
                      className="flex items-center space-x-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 min-w-[100px] justify-center"
                    >
                      <span className="text-lg">{getPrivacyIcon('email')}</span>
                      <span className="hidden sm:inline-block text-xs">
                        {getPrivacyStatus('email')}
                      </span>
                      {updatingPrivacy === 'email' && (
                        <div className="animate-spin h-4 w-4 border-b-2 border-gray-600 rounded-full"></div>
                      )}
                    </button>
                  </div>
                  
                  {/* Age with Privacy Toggle */}
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-500">Age</label>
                      <p className="text-gray-900 font-medium">
                        {getDisplayValue('age', profile.age ? `${profile.age} years` : null)}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePrivacy('age')}
                      disabled={updatingPrivacy === 'age'}
                      className="flex items-center space-x-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 min-w-[100px] justify-center"
                    >
                      <span className="text-lg">{getPrivacyIcon('age')}</span>
                      <span className="hidden sm:inline-block text-xs">
                        {getPrivacyStatus('age')}
                      </span>
                      {updatingPrivacy === 'age' && (
                        <div className="animate-spin h-4 w-4 border-b-2 border-gray-600 rounded-full"></div>
                      )}
                    </button>
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

            {/* Privacy Legend */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Privacy Settings Guide</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🌐</span>
                  <span className="text-blue-700">Public - Visible to everyone</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🔒</span>
                  <span className="text-blue-700">Private - Only you can see</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-blue-600">
                Click the buttons to toggle between public and private settings
              </p>
            </div>

            {/* Debug Info - Remove in production */}
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Debug Info</h4>
              <p className="text-xs text-yellow-700">
                Current Privacy: Name: {profile.privacySettings?.name}, Email: {profile.privacySettings?.email}, Age: {profile.privacySettings?.age}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
              <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200">
                Edit Profile
              </button>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
                Send Message
              </button>
              <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition duration-200">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;