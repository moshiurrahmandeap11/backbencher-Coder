import React from 'react';

interface SidebarProps {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'users', label: 'User Management', icon: '👥' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'reports', label: 'Reports', icon: '📋' },
    ];

    return (
        <div className="p-4 lg:p-6">
            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                            activeMenu === item.id
                                ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveMenu(item.id)}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;