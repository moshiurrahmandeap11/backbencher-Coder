import { Outlet, useNavigate } from 'react-router';
import MainButton from '../../components/sharedItems/MainButton/MainButton';
import { MoveLeft } from 'lucide-react';
import SEO from '../../components/Seo/Seo';

const AuthLayout = () => {
    const navigate = useNavigate();
    return (
        <div>
            <SEO></SEO>
            <main>
                <MainButton onClick={() => navigate("/")} variant='outline' className='cursor-pointer m-5 flex items-center justify-center gap-2'>
                    <MoveLeft></MoveLeft>
                    <span>Back To Home</span>
                </MainButton>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AuthLayout;