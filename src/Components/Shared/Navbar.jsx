import { useState } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";


const Navbar = () => {
    const { user, logOut } = UseAuth();

    const [isOpen, setIsOpen] = useState(true);



    const handleLogOut = () =>{
        logOut();
    }

    return (
        <div className="fixed z-10 w-full bg-opacity-60 bg-black text-white">
            <nav className="">
                <div className="container px-6 py-4 mx-auto">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between">
                            <a href="#">
                                <h1 className="text-2xl text-white font-bold">Unique <em>Time</em></h1>
                            </a>


                            <div className="flex lg:hidden">
                                <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">


                                </button>
                            </div>
                        </div>


                        <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out  lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                               <NavLink to='/'>
                               <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200
                     hover:bg-gray-100 dark:hover:bg-gray-700">Home</a>
                               </NavLink>
                                <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Add Articles</a>
                                <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">All Articles</a>
                                <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Subscription</a>
                            <NavLink to='dashboard'>
                            <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</a>
                                </NavLink>   
                                {user ?
                                    <a onClick={() => setIsOpen(!isOpen)} href="#" className="px-3 py-2 mx-3 mt-2 text-gray-700 rounded-md lg:mt-0 dark:text-gray-200 ">
                                        <img className="w-[77px] h-[75px] rounded-full border-2 border-green-" src={user.photoURL} alt="" /></a>
                                    :
                                    <div>
                                        <NavLink to='/login'><a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Login</a></NavLink>
                                        <NavLink to='/register'>
                                            <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Register</a>
                                        </NavLink>
                                    </div>

                                }
                            </div>

{user && <div> 
    
{ isOpen || 
                             <div className="relative inline-block mt-20">



                                <div

                                    className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                                >
                                    <a href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> your profile </a>
                                    <a href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> Your projects </a>
                                    <a href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> Help </a>
                                    <a href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> Settings </a>
                                    <a onClick={handleLogOut} href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> Sign Out 
                                    </a>
                                </div>
                            </div>
                            }
</div>}


                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;