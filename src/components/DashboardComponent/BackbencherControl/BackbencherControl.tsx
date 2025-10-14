import  { useState } from 'react';
import MainContent from './MainContent/MainContent';
import UserManagement from './UserManagement/UserManagement';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Subscribers from './Subscribers/Subscribers';
import Settings from './Settings/Settings';


const BackbencherControl = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard');

    // Component mapping
    const renderComponent = () => {
        switch (activeComponent) {
            case 'dashboard':
                return <MainContent />;
            case 'users':
                return <UserManagement />;
            case 'subscribers':
                return <Subscribers></Subscribers>;
            case 'settings':
                return <Settings></Settings>;
            case 'reports':
                return <div className="bg-white rounded-lg shadow-lg p-6">Reports Component</div>;
            default:
                return <MainContent />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - Always on top */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <Header />
            </header>

            <div className="flex flex-col lg:flex-row">
                {/* Sidebar - Hidden on mobile, visible on desktop */}
                <aside className="w-full lg:w-64 bg-white shadow-lg lg:shadow-none lg:min-h-[calc(100vh-64px)] lg:sticky lg:top-16">
                    <Sidebar activeMenu={activeComponent} setActiveMenu={setActiveComponent} />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 lg:min-h-[calc(100vh-64px)] p-4 lg:p-6">
                    {renderComponent()}
                </main>
            </div>
        </div>
    );
};

export default BackbencherControl;