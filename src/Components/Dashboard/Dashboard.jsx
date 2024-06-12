import { FaBookMedical, FaHome, FaUsersCog } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import { IoStatsChartSharp } from "react-icons/io5";

const Dashboard = () => {
    const { user, logOut } = UseAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
        navigate('/login')

    }
    return (
        <div>
            <div className="flex flex-col w-full lg:flex-row">


                <div className="h-full p-3 space-y-2 min-h-screen w-60 dark:bg-gray-50 dark:text-gray-800">
                    <div className="flex items-center p-2 space-x-4">
                        <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                        <div>
                            <h2 className="text-lg font-semibold">{user.displayName}</h2>
                            <span className="flex items-center space-x-1">
                               
                            </span>
                        </div>
                    </div>
                    <div className="divide-y dark:divide-gray-300">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">

                            <li>
                                <NavLink to='/dashboard'>
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                    <IoStatsChartSharp/><span>Dashboard</span>
                                    </a>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allUsers'>
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                        <FaUsersCog /><span>All Users</span>
                                    </a>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allArticle'>
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                        <FaBookMedical /><span>All Articles</span>
                                    </a>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/publisher'>
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">

                                        <MdAddToPhotos /><span>Add Publishers</span>
                                    </a>
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="pt-4 pb-2 space-y-1 text-sm">
                            <li>
                            </li>
                            <li>
                                <NavLink to='/'>
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <FaHome /><span>Home</span>
                                    </a>
                                </NavLink>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                        <rect width="32" height="64" x="256" y="232"></rect>
                                    </svg>
                                    <span onClick={handleLogout}>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>


                <div className="mx-20">
                    <Outlet />

                </div>

            </div>

        </div>
    );
};

export default Dashboard;