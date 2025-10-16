import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Save, User, Mail, Calendar, Eye, EyeOff, Camera, X, Image as ImageIcon } from 'lucide-react';
import UseAuth from '../../../hooks/UseAuth/UseAuth';
import axiosInstance from '../../../hooks/AxiosInstance/AxiosInstance';

interface UserProfile {
  _id: string;
  uid: string;
  name: string | null;
  email: string | null;
  age: number | null;
  profileImage: string | null;
  coverPhoto: string | null;
  privacySettings: {
    name: string;
    email: string;
    age: string;
    profileImage: string;
    coverPhoto: string;
  };
  createdAt: string;
  updatedAt: string;
}

const EditProfile = () => {
  const { uid } = useParams<{ uid: string }>();
  const { user } = UseAuth();
  const navigate = useNavigate();

  // Redirect if user doesn't exist or doesn't match the profile UID
  useEffect(() => {
    if (!user || user.uid !== uid) {
      navigate('/');
    }
  }, [user, uid, navigate]);
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const [privacySettings, setPrivacySettings] = useState({
    name: 'public',
    email: 'public',
    age: 'public',
    profileImage: 'public',
    coverPhoto: 'public',
  });

  const [showAge, setShowAge] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(null);
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const coverPhotoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/users/${uid}`);
        const userData = res.data.data;
        setProfile(userData);
        
        // Set form data
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          age: userData.age ? userData.age.toString() : '',
        });

        // Set privacy settings
        setPrivacySettings(userData.privacySettings || {
          name: 'public',
          email: 'public',
          age: 'public',
          profileImage: 'public',
          coverPhoto: 'public',
        });

        // Set image previews if they exist
        if (userData.profileImage) {
          setProfileImagePreview(userData.profileImage);
        }
        if (userData.coverPhoto) {
          setCoverPhotoPreview(userData.coverPhoto);
        }

      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchProfile();
    }
  }, [uid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePrivacy = (field: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: prev[field] === 'public' ? 'private' : 'public'
    }));
  };

  // Handle profile image selection
  const handleProfileImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setSelectedProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  // Handle cover photo selection
  const handleCoverPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setSelectedCoverPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  // Remove selected profile image
  const handleRemoveProfileImage = () => {
    setSelectedProfileImage(null);
    setProfileImagePreview(profile?.profileImage || null);
    if (profileImageInputRef.current) {
      profileImageInputRef.current.value = '';
    }
  };

  // Remove selected cover photo
  const handleRemoveCoverPhoto = () => {
    setSelectedCoverPhoto(null);
    setCoverPhotoPreview(profile?.coverPhoto || null);
    if (coverPhotoInputRef.current) {
      coverPhotoInputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('age', formData.age ? formData.age : '');
      formDataToSend.append('privacySettings', JSON.stringify(privacySettings));
      
      // Add images if selected
      if (selectedProfileImage) {
        formDataToSend.append('profileImage', selectedProfileImage);
      }
      if (selectedCoverPhoto) {
        formDataToSend.append('coverPhoto', selectedCoverPhoto);
      }

      // Use PATCH for partial update
      await axiosInstance.patch(`/users/${uid}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        navigate(-1); // Go back to previous page
      }, 1500);

    } catch (error) {
      console.error('Error updating profile:', error);
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Edit Profile
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Update your personal information and privacy settings
            </p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
              {/* Error/Success Messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 text-sm">{success}</p>
                </div>
              )}

              {/* Cover Photo Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Cover Photo
                </h2>

                <div className="flex flex-col items-center space-y-4">
                  {/* Cover Photo Preview */}
                  <div className="relative w-full">
                    <div className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100">
                      {coverPhotoPreview ? (
                        <img 
                          src={coverPhotoPreview} 
                          alt="Cover preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon className="w-12 h-12 mb-2" />
                          <p className="text-sm">No cover photo</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Remove Cover Photo Button */}
                    {coverPhotoPreview && (
                      <button
                        type="button"
                        onClick={handleRemoveCoverPhoto}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Cover Photo Upload Controls */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
                    <input
                      type="file"
                      ref={coverPhotoInputRef}
                      onChange={handleCoverPhotoSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    <button
                      type="button"
                      onClick={() => coverPhotoInputRef.current?.click()}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex-1 justify-center"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>{coverPhotoPreview ? 'Change Cover Photo' : 'Upload Cover Photo'}</span>
                    </button>

                    {/* Privacy Toggle for Cover Photo */}
                    <button
                      type="button"
                      onClick={() => togglePrivacy('coverPhoto')}
                      className="flex items-center space-x-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      {privacySettings.coverPhoto === 'public' ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                      <span className="capitalize">{privacySettings.coverPhoto}</span>
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Recommended size: 1200×400 pixels • Max size: 5MB
                  </p>
                </div>
              </div>

              {/* Profile Image Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Profile Image
                </h2>

                <div className="flex flex-col items-center space-y-4">
                  {/* Profile Image Preview */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      {profileImagePreview ? (
                        <img 
                          src={profileImagePreview} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <User className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Remove Profile Image Button */}
                    {profileImagePreview && (
                      <button
                        type="button"
                        onClick={handleRemoveProfileImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Profile Image Upload Controls */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <input
                      type="file"
                      ref={profileImageInputRef}
                      onChange={handleProfileImageSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    <button
                      type="button"
                      onClick={() => profileImageInputRef.current?.click()}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{profileImagePreview ? 'Change Profile Image' : 'Upload Profile Image'}</span>
                    </button>

                    {/* Privacy Toggle for Profile Image */}
                    <button
                      type="button"
                      onClick={() => togglePrivacy('profileImage')}
                      className="flex items-center space-x-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      {privacySettings.profileImage === 'public' ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                      <span className="capitalize">{privacySettings.profileImage}</span>
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Recommended: Square image • Max size: 5MB
                  </p>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Personal Information
                </h2>

                {/* Name Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <User className="w-4 h-4" />
                      <span>Full Name</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => togglePrivacy('name')}
                      className="flex items-center space-x-1 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      {privacySettings.name === 'public' ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                      <span className="capitalize">{privacySettings.name}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => togglePrivacy('email')}
                      className="flex items-center space-x-1 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      {privacySettings.email === 'public' ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                      <span className="capitalize">{privacySettings.email}</span>
                    </button>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Age Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Calendar className="w-4 h-4" />
                      <span>Age</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowAge(!showAge)}
                        className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                        {showAge ? 'Hide' : 'Show'}
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePrivacy('age')}
                        className="flex items-center space-x-1 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                      >
                        {privacySettings.age === 'public' ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        <span className="capitalize">{privacySettings.age}</span>
                      </button>
                    </div>
                  </div>
                  <input
                    type={showAge ? "number" : "password"}
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Privacy Legend */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">
                  Privacy Settings
                </h3>
                <div className="space-y-2 text-xs text-blue-700">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-3 h-3" />
                    <span>Public: Visible to everyone</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EyeOff className="w-3 h-3" />
                    <span>Private: Only you can see</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-4 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Profile Tips
          </h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Keep your information up to date for better experience</li>
            <li>• Use privacy settings to control who sees your information</li>
            <li>• You can always come back and update your profile</li>
            <li>• Profile images should be clear and appropriate</li>
            <li>• Cover photos look best at 1200×400 pixels</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;