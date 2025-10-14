import { Outlet } from 'react-router';
import Navbar from '../../components/sharedItems/Navbar/Navbar';
import Footer from '../../components/sharedItems/Footer/Footer';
import SEO from '../../components/Seo/Seo';
import { useState, useEffect } from 'react';
import axiosInstance from '../../hooks/AxiosInstance/AxiosInstance';
import Maintenance from '../../components/Maintainance/Maintainance.tsx';
import Loader from '../../components/sharedItems/Loader/Loader.tsx';

const RootLayout = () => {
    const [isMaintenance, setIsMaintenance] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkMaintenanceMode();
    }, []);

    const checkMaintenanceMode = async () => {
        try {
            const response = await axiosInstance.get('/site-settings/maintenance-status');
            
            if (response.data.success) {
                setIsMaintenance(response.data.maintenance_mode);
            } else {
                setIsMaintenance(false);
            }
        } catch (error) {
            console.error('Error checking maintenance mode:', error);
            setIsMaintenance(false);
        } finally {
            setLoading(false);
        }
    };

    // Show loading spinner while checking maintenance status
    if (loading) {
        return <Loader></Loader>
    }

    // Show maintenance page if maintenance mode is enabled
    if (isMaintenance) {
        return <Maintenance />;
    }

    // Otherwise show the normal layout
    return (
        <div>
            <SEO></SEO>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;