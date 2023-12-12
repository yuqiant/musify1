import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './index.css';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
    const { isAuthenticated, userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDashboardClick = (event) => {
        // Prevent default navigation of NavLink
        event.preventDefault();

        if (isAuthenticated) {
            // navigate(`/dashboard/${userId}`);
            navigate(`/dashboard`);
        } else {
            alert("You must be signed in to access the dashboard.");
            navigate("/signin");
        }
    };

    return (
        <nav className="wd-navigation">
            <p className="bold-left-align">Musify</p>
            <ul className="menu">
                <li className="list-group-item">
                    <NavLink 
                        to="/home" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Home
                    </NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to={`/dashboard`} activeClassName="active" onClick={handleDashboardClick}>
                        Dashboard
                    </NavLink>
                    {/* <NavLink
                        to="/dashboard"
                        className={({ isActive }) => isActive ? 'active' : ''}
                        isActive={(match, location) => {
                            // 检查路径是否为 '/dashboard' 或者以 '/admin/dashboard' 开头
                            return location.pathname === '/dashboard' || location.pathname.startsWith('/admin/dashboard');
                        }}
                    >
                        Dashboard
                    </NavLink> */}

                </li>


                <li className="list-group-item">
                    {isAuthenticated ? (
                        <NavLink to={`/profile/`} activeClassName="active">
                            Profile
                        </NavLink>
                    ) : (
                        <NavLink to="/signin" activeClassName="active">
                            Sign In/Up
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
