import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../SectionTitle";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import UseAdmin from "./UseAdmin";


const AllUsers = () => {

    // const [users, setUsers] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = UseAdmin();

    // axiosSecure.get('/users')
    // .then(res=>{
    //     setUsers(res.data)
    // })

    const { data: user = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            console.log(res.data);
            return res.data

        }
    })

    const handleDelete = async (user) => {

        const res = await axiosSecure.delete(`/users/${user._id}`)
        console.log(res.data)
        if (res.data.deletedCount > 0) {
            toast.success(`${user?.name} has been deleted`)
            refetch()
        }


    }
    const handleUpdate = async (user) => {
        const res = await axiosSecure.patch(`/users/admin/${user._id}`)
        console.log(res.data);
        if (res.data.modifiedCount) {
            toast.success(`${user?.name} is now Admin`)
        }
    }

    return (
        <div>
            <SectionTitle heading='All users' subHeading='Here you can see all the registered users on your website. You can make anyone an admin from here or delete anyone'></SectionTitle>
            <section className="container px-4 mx-auto">
                <div className="flex items-center gap-x-3">
                </div>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span></span>
                                                </div>
                                            </th>
                                            <th scope="col" className="py-3.5 px-8 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span>Name</span>
                                                </div>
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span></span>
                                                </div>
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span></span>
                                                </div>
                                            </th>



                                            <th scope="col" className="pl-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Email</span>

                                                </button>
                                            </th>
                                            <th scope="col" className="px-20 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Role</span>

                                                </button>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Action</span>

                                                </button>
                                            </th>


                                        </tr>
                                    </thead>
                                    {user.map(users => <tbody key={users._id} className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">


                                                    <div className="flex items-center gap-x-2">
                                                        <img className="object-cover w-10 h-10 rounded-full" src={users.image} alt="" />
                                                        <div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-8 py-4 text-sm flex gap-2 font-medium text-white whitespace-nowrap">
                                               <div>
                                               {users.name}
                                               </div>
                                              <div>
                                              {
                                users.isPremium === 'yes' ?                                                 <div className=" absolute rounded-md text-center item-center bg-green-500 text-white">
                                 <small className= "h-1.5 p-px rounded-md w-1.5  ">Premium</small>
                            </div>: ""
                              }
                                              </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {/*empty for gap  */}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {/*empty for gap  */}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {users.email}
                                            </td>
                                            <td className="pl-20 py-4 text-sm text-white">
                                                {users?.role === "admin" ? "Admin" :
                                                    <button onClick={() => handleUpdate(users)}> <FaUsers className="bg-orange-500 text-2xl rounded-md text-white" /></button>
                                                }
                                                <Toaster />
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">

                                                    <button onClick={() => handleDelete(users)} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                    <Toaster />


                                                </div>
                             
                                            </td>
                                        </tr>


                                    </tbody>)}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </div>
    );
};

export default AllUsers;