import toast from "react-hot-toast";
import UseAuth from "../../../../hooks/UseAuth/UseAuth";
import Loader from "../../../sharedItems/Loader/Loader";
import { useNavigate } from "react-router";
import MainButton from "../../../sharedItems/MainButton/MainButton";

const Header = () => {
    const { loading, logOut } = UseAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            toast.success("Logged Out Successfully");
            navigate('/auth/login'); // Redirect to login page after logout
        } catch (error: any) {
            console.error("Logout error:", error);
            toast.error(error.message || "Failed to logout");
        }
    }

    if(loading){
        return <Loader></Loader>
    }

    return (
        <div className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 
                    onClick={() => navigate("/")} 
                    className="text-xl cursor-pointer font-bold hover:text-blue-200 transition-colors"
                >
                    Backbencher Control Panel
                </h1>
                <div className="flex items-center space-x-4">
                    <MainButton 
                        onClick={handleLogOut} 
                        variant="primary"
                        size="sm"
                        className=" cursor-pointer "
                    >
                        Logout
                    </MainButton>
                </div>
            </div>
        </div>
    );
};

export default Header;