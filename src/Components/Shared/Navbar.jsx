import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import UseAdmin from "../Dashboard/UseAdmin";
import UsePremium from "../../Hooks/UsePremium";
import { ThemeContext } from "../../../ThemeContext";

const Navbar = () => {
    const { user, logOut } = UseAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAdmin] = UseAdmin();
    const [isPremium] = UsePremium();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const handleLogOut = () => {
        logOut();
    };

    return (
        <div className="fixed z-10 w-full bg-white dark:bg-gray-900 shadow-lg text-gray-800 dark:text-white transition-colors duration-300">
            <nav className="container mx-auto px-6 lg:flex lg:items-center lg:justify-between">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Unique <em>Time</em></h1>
                    <button
                        type="button"
                        className="lg:hidden text-gray-800 dark:text-white hover:text-gray-600 focus:outline-none"
                        aria-label="toggle menu"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                <div className={`${isOpen ? "block" : "hidden"} lg:flex lg:items-center lg:space-x-6 transition-all`}>
                    <NavLink to="/" className="block mt-2 lg:mt-0 px-3 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">Home</NavLink>
                    
                    {user && (
                        <NavLink to="/addArticle" className="block mt-2 lg:mt-0 px-3 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">Add Articles</NavLink>
                    )}

                    <NavLink to="/allArticlesForUser" className="block mt-2 lg:mt-0 px-3 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">All Articles</NavLink>

                    {isPremium && user && (
                        <NavLink to="/premiumArticle" className="block mt-2 lg:mt-0 px-3 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">Premium Articles</NavLink>
                    )}

                    {user && (
                        <NavLink to="/myArticle" className="block mt-2 lg:mt-0 px-3 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">My Articles</NavLink>
                    )}

                    {isAdmin && user && (
                        <NavLink to="/dashboard" className="block mt-2 lg:mt-0 px-3 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">Dashboard</NavLink>
                    )}

                    {user ? (
                        <div className="relative inline-block profile-menu">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="block mt-2 lg:mt-0 px-3 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                            >
                                <img className="w-10 h-10 rounded-full border-2 border-black" src={user.photoURL} alt="User Profile" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-lg mt-2">
                                    <NavLink to="/userProfile" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Your Profile</NavLink>
                                    <button onClick={handleLogOut} className="block px-4 py-2 text-left w-full hover:bg-gray-200 dark:hover:bg-gray-700">Sign Out</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="py-2">
                            <NavLink to="/login" className="block mt-2 lg:mt-0 px-3 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">Login</NavLink>
                            <NavLink to="/register" className="block mt-2 lg:mt-0 px-3 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">Register</NavLink>
                        </div>
                    )}

                    {/* Dark Mode Toggle Button */}
                    <button onClick={toggleTheme} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
