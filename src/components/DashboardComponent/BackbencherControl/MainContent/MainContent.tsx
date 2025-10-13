

const MainContent = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Backbencher Control Panel</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-700">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-900">1,234</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-700">Active Today</h3>
                    <p className="text-3xl font-bold text-green-900">567</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h3 className="text-lg font-semibold text-yellow-700">Pending</h3>
                    <p className="text-3xl font-bold text-yellow-900">89</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-lg font-semibold text-red-700">Issues</h3>
                    <p className="text-3xl font-bold text-red-900">12</p>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600">
                    Select an option from the sidebar to manage different sections of your application.
                </p>
            </div>
        </div>
    );
};

export default MainContent;