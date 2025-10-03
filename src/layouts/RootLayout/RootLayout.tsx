
import { Outlet } from 'react-router';
import Navbar from '../../components/sharedItems/Navbar/Navbar';
import Footer from '../../components/sharedItems/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
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