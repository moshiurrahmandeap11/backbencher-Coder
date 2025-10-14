import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import MainButton from '../../../../sharedItems/MainButton/MainButton';
import axiosInstance from '../../../../../hooks/AxiosInstance/AxiosInstance';

interface SiteSettings {
    site_name: string;
    site_description: string;
    site_url: string;
    contact_email: string;
    maintenance_mode: boolean;
    allow_registrations: boolean;
}

const SiteSettings = () => {
    const [siteSettings, setSiteSettings] = useState<SiteSettings>({
        site_name: 'Backbencher Coder',
        site_description: 'Empowering developers worldwide',
        site_url: 'https://backbenchercoder.com',
        contact_email: 'info@backbenchercoder.com',
        maintenance_mode: false,
        allow_registrations: true,
    });
    const [loading, setLoading] = useState(false);

    // Fetch site settings on component mount
    useEffect(() => {
        fetchSiteSettings();
    }, []);

    const fetchSiteSettings = async () => {
        try {
            const response = await axiosInstance.get('/site-settings');
            if (response.data.success && response.data.data) {
                setSiteSettings(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching site settings:', error);
            toast.error('Failed to load site settings');
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.put('/site-settings', siteSettings);
            if (response.data.success) {
                toast.success('Site settings updated successfully!');
            }
        } catch (error: any) {
            console.error('Error updating site settings:', error);
            toast.error(error.response?.data?.message || 'Failed to update site settings');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        if (!window.confirm('Are you sure you want to reset to default settings?')) {
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post('/site-settings/reset');
            if (response.data.success) {
                setSiteSettings(response.data.data);
                toast.success('Site settings reset to default!');
            }
        } catch (error: any) {
            console.error('Error resetting site settings:', error);
            toast.error(error.response?.data?.message || 'Failed to reset site settings');
        } finally {
            setLoading(false);
        }
    };

    // ✅ Maintenance mode toggle function
    const handleMaintenanceToggle = async (enabled: boolean) => {
        // Optimistically update UI first
        setSiteSettings(prev => ({...prev, maintenance_mode: enabled}));
        
        try {
            const response = await axiosInstance.patch('/site-settings/status', {
                maintenance_mode: enabled
            });
            
            if (response.data.success) {
                toast.success(`Maintenance mode ${enabled ? 'enabled' : 'disabled'}`);
            } else {
                throw new Error(response.data.message || 'Failed to update maintenance mode');
            }
        } catch (error) {
            console.error('Error updating maintenance mode:', error);
            toast.error('Failed to update maintenance mode');
            // Revert on error
            setSiteSettings(prev => ({...prev, maintenance_mode: !enabled}));
        }
    };

    // ✅ NEW: Allow registrations toggle function
    const handleAllowRegistrationsToggle = async (enabled: boolean) => {
        // Optimistically update UI first
        setSiteSettings(prev => ({...prev, allow_registrations: enabled}));
        
        try {
            const response = await axiosInstance.patch('/site-settings/status', {
                allow_registrations: enabled
            });
            
            if (response.data.success) {
                toast.success(`User registrations ${enabled ? 'enabled' : 'disabled'}`);
            } else {
                throw new Error(response.data.message || 'Failed to update registration settings');
            }
        } catch (error) {
            console.error('Error updating registration settings:', error);
            toast.error('Failed to update registration settings');
            // Revert on error
            setSiteSettings(prev => ({...prev, allow_registrations: !enabled}));
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                    </label>
                    <input
                        type="text"
                        value={siteSettings.site_name}
                        onChange={(e) => setSiteSettings({...siteSettings, site_name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                    </label>
                    <input
                        type="email"
                        value={siteSettings.contact_email}
                        onChange={(e) => setSiteSettings({...siteSettings, contact_email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                    </label>
                    <textarea
                        value={siteSettings.site_description}
                        onChange={(e) => setSiteSettings({...siteSettings, site_description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site URL
                    </label>
                    <input
                        type="url"
                        value={siteSettings.site_url}
                        onChange={(e) => setSiteSettings({...siteSettings, site_url: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                        <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                        <p className="text-sm text-gray-600">Put the site in maintenance mode</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={siteSettings.maintenance_mode}
                            onChange={(e) => handleMaintenanceToggle(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                        <h4 className="font-medium text-gray-900">Allow User Registrations</h4>
                        <p className="text-sm text-gray-600">Allow new users to register on the site</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={siteSettings.allow_registrations}
                            onChange={(e) => handleAllowRegistrationsToggle(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <MainButton 
                    variant="secondary" 
                    onClick={handleReset}
                    loading={loading}
                >
                    Reset to Default
                </MainButton>
                <MainButton 
                    onClick={handleSave}
                    loading={loading}
                >
                    Save Changes
                </MainButton>
            </div>
        </div>
    );
};

export default SiteSettings;