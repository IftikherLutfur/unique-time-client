import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <div className="flex gap-10 mx-8">

                <div className="w-48 bg-orange-600 text-white min-h-screen">
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
                        <NavLink to='/dashboard/publisher'>
                            <li className=" my-2">
                                Add Publishers
                            </li>
                        </NavLink>
                    <div className=" divider"></div>
                    <NavLink to='/'>
                        <li>Home</li>
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