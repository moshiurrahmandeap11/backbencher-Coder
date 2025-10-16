// pages/Error/Unauthorized.tsx
import { Link } from 'react-router';
import MainButton from '../../sharedItems/MainButton/MainButton';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        
        <div className="space-y-4">
          <Link to="/" className="block">
            <MainButton variant="primary" className="w-full">
              Go to Homepage
            </MainButton>
          </Link>
          
          <Link to="/dashboard" className="block">
            <MainButton variant="secondary" className="w-full">
              Go to Your Dashboard
            </MainButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;