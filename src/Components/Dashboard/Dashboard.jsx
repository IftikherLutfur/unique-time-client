import { FaBookMedical, FaHome, FaUsersCog } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="flex flex-col w-full lg:flex-row">

                <div className="w-48 bg-orange-600 text-white min-h-screen">
                    <ul className="text-xl text-center my-10">
                        <NavLink to='/dashboard'>
                        <button className="btn bg-orange-700 text-white mb-2 w-full px-3"> <li className="flex items-center gap-2 mx-4"><FaUsersCog />All User</li></button>
                        </NavLink>
                        <NavLink to='/dashboard/allArticle'>
                            <button className="btn bg-orange-700 text-white mb-2 w-full px-3"> <li className="flex items-center gap-2 mx-4"> <FaBookMedical /> All Articles</li></button>
                        </NavLink>
                        <NavLink to='/dashboard/publisher'>
                            <button className="btn bg-orange-700 text-white mb-2 w-full px-3"> <li className="flex items-center gap-2 mx-4"><MdAddToPhotos/>Add Publishers</li></button>
                        </NavLink>
                    <div className=" divider"></div>
                    <NavLink to='/'>
                       <button className="btn bg-orange-700 text-white mb-2 w-full px-3"> <li className="flex items-center gap-2 mx-4"><FaHome/>Home</li></button>
                    </NavLink>
                    </ul>
                </div>
                 

            <div className="mx-20">
                <Outlet/>
              
            </div>

            </div>

        </div>
    );
};

export default Dashboard;