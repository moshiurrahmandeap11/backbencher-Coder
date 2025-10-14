import  { useState } from 'react';
import { 
    Settings as SettingsIcon, 
    Globe, 
    User, 
    Shield, 
    Bell, 
    Palette,
    Zap,
    CreditCard,
    Sliders
} from 'lucide-react';
import SiteSettings from './SiteSettings/SiteSettings';
import ProfileSettings from './ProfileSettings/ProfileSettings';
import SecuritySettings from './SecuritySettings/SecuritySettings';
import NotificationSettings from './NotificationSettings/NotificationSettings';
import AppearanceSettings from './AppearanceSettings/AppearanceSettings';
import IntegrationSettings from './IntegrationsSettings/IntegrationSettings';
import BillingSettings from './BillingSettings/BillingSettings';
import AdvancedSettings from './AdvancedSettings/AdvancedSettings';

type SettingsTab = 'site' | 'profile' | 'security' | 'notifications' | 'appearance' | 'integrations' | 'billing' | 'advanced';

const Settings = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('site');

    const settingsTabs = [
        { id: 'site' as SettingsTab, label: 'Site Settings', icon: <Globe className="w-5 h-5" />, component: <SiteSettings /> },
        { id: 'profile' as SettingsTab, label: 'Profile', icon: <User className="w-5 h-5" />, component: <ProfileSettings /> },
        { id: 'security' as SettingsTab, label: 'Security', icon: <Shield className="w-5 h-5" />, component: <SecuritySettings /> },
        { id: 'notifications' as SettingsTab, label: 'Notifications', icon: <Bell className="w-5 h-5" />, component: <NotificationSettings /> },
        { id: 'appearance' as SettingsTab, label: 'Appearance', icon: <Palette className="w-5 h-5" />, component: <AppearanceSettings /> },
        { id: 'integrations' as SettingsTab, label: 'Integrations', icon: <Zap className="w-5 h-5" />, component: <IntegrationSettings /> },
        { id: 'billing' as SettingsTab, label: 'Billing', icon: <CreditCard className="w-5 h-5" />, component: <BillingSettings /> },
        { id: 'advanced' as SettingsTab, label: 'Advanced', icon: <Sliders className="w-5 h-5" />, component: <AdvancedSettings /> },
    ];

    const renderActiveComponent = () => {
        const tab = settingsTabs.find(tab => tab.id === activeTab);
        return tab ? tab.component : null;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <SettingsIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                    </div>
                    <p className="text-gray-600">Manage your application settings and preferences</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                            <nav className="space-y-1">
                                {settingsTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                                            activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <div className={`${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`}>
                                            {tab.icon}
                                        </div>
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Settings Overview</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Active Settings</span>
                                    <span className="font-medium text-gray-900">8</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Last Updated</span>
                                    <span className="font-medium text-gray-900">Today</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {settingsTabs.find(tab => tab.id === activeTab)?.label}
                                    </h2>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Configure your {settingsTabs.find(tab => tab.id === activeTab)?.label.toLowerCase()} preferences
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <SettingsIcon className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            {/* Active Component */}
                            <div className="min-h-[500px]">
                                {renderActiveComponent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;