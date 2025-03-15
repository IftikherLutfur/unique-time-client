import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../SectionTitle";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

const MyArticle = () => {

    const { user } = UseAuth();
    const axiosPublic = useAxiosPublic();
    const { data: articles = [], refetch } = useQuery({
        queryKey: ['article', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/article/${user.email}`);
            console.log(res.data);
            return res.data;
        }
    });

    const handleUpdate = async (art) => {
        console.log(art);
    }

    const handleDelete = async (art) => {
        const resDelete = await axiosPublic.delete(`/article/${art._id}`);
        console.log(resDelete.data);
        if (resDelete.data) {
            toast.success('Item Deleted');
            refetch();
        }
        return resDelete.data;
    }

    return (
        <div className="pt-36 mb-7">
            <SectionTitle heading='My article' subHeading='Here is the all artcles that you have added. you can see the status and you can do edit and delete your articles' />
            <section className="container px-4 mt-5 max-w-full">
                <div className="flex items-center gap-x-3">
                    {/* <h2 className="text-lg font-medium text-gray-800 dark:text-white">Team members</h2> */}
                    <div className="text-center">
                        <span className="px-3 text-center py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-semibold ">
                            Total Article : {articles.length}</span>
                    </div>
                </div>
                <div className="flex flex-col mt-px">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span>SI NO.</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Status</span>
                                                    <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" />
                                                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" />
                                                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" />
                                                    </svg>
                                                </button>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Title</span>
                                                </button>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
                                        </tr>
                                    </thead>
                                    {articles.map((art, index) => (
                                        <tbody key={art._id} className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <div className="flex items-center gap-x-2">
                                                            <div>
                                                                <h2 className="font-medium text-gray-800 dark:text-white ">{index + 1}</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                        <span className={art.status === 'pending' ? "h-1.5 w-1.5 rounded-full bg-red-500" : "h-1.5 w-1.5 rounded-full bg-emerald-500"}></span>
                                                        <h2 className={art.status === 'pending' ? "text-sm font-normal text-red-500 dark:text-red-200" : "text-sm font-normal text-black dark:text-white"}>
                                                            {art.status === 'pending' ? "Pending" : art.status}
                                                        </h2>
                                                    </div>
                                                </td>

                                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <h2 className="text-sm font-normal text-black dark:text-white">{art.title}</h2>
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <button className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                        <NavLink to={`/article/get/${art._id}`}>
                                                            <p className="text-sm font-normal text-black dark:text-white">Details</p>
                                                        </NavLink>
                                                    </button>
                                                </td>

                                                <td className="py-4 text-sm font-medium whitespace-nowrap">
                                                    <button onClick={() => handleUpdate(art)} className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 dark:bg-gray-800">
                                                        <MdEdit size={22} className="text-black dark:text-white" />
                                                        <span className="text-sm font-normal text-gray-800 dark:text-white">Update</span>
                                                    </button>
                                                </td>
                                                <td className="py-4 text-sm font-medium whitespace-nowrap">
                                                    <button onClick={() => handleDelete(art)} className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                                        <AiFillDelete size={22} className="text-red-400" />
                                                        <span className="text-sm font-normal text-gray-800 dark:text-white">Delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster />
        </div>
    );
}

export default MyArticle;
