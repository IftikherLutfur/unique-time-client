import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <div className="flex justify-around">

                <div className="bg-orange-600 text-white min-h-screen px-5">
                    <ul className="text-xl text-center my-10">
                        <NavLink to='/dashboard/users'>
                            <li className=" my-2">
                                All Users
                            </li>
                        </NavLink>
                        <NavLink>
                            <li className=" my-2">
                                All Articles
                            </li>
                        </NavLink>
                        <NavLink>
                            <li className=" my-2">
                                Add Publishers
                            </li>
                        </NavLink>
                    </ul>
                </div>

            <div>
                <Outlet/>
              
            </div>

            </div>

        </div>
    );
};

export default Dashboard;