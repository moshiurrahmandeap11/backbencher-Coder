import { NavLink } from "react-router";


const Navbar = () => {
    const navItems = <>
    <NavLink to={"/"}>Home</NavLink>
    </>
    return (
        <div className="navbar bg-base-100 flex justify-between">
            {navItems}
        </div>
    );
};

export default Navbar;
