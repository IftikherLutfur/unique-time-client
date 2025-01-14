import { AiFillDelete } from "react-icons/ai";
import { MdCancel, MdDownloadDone } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SectionTitle from "../SectionTitle";
import { useState } from "react";

const AllArticles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles = [], refetch } = useQuery({
        queryKey: ['article'],
        queryFn: async () => {
            const res = axiosSecure.get('/article');
            return (await res).data;
        }
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    // Calculate the total number of pages
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    // Get the articles for the current page
    const currentArticles = articles.slice(
        (currentPage - 1) * articlesPerPage,
        currentPage * articlesPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleUpdate = async (article) => {
        const updateRes = await axiosSecure.patch(`/article/${article._id}`);
        if (updateRes.data.matchedCount > 0) {
            toast.success('Accepted');
            refetch();
        }
        return updateRes.data;
    };

    const handleCancel = async (article) => {
        const cancelUpdate = await axiosSecure.patch(`/article/admin/${article._id}`);
        refetch();
        return cancelUpdate.data;
    };

    const handleDelete = async (article) => {
        const deleteRes = await axiosSecure.delete(`/article/${article._id}`);
        if (deleteRes.data.deletedCount > 0) {
            toast.success("Article has been deleted");
            refetch();
        }
        return deleteRes.data;
    };

    return (
        <div className="mt-6 mr-24">
            <SectionTitle heading='Here is all article' subHeading='Hello admin you can accept, reject and delete anyone you want'/>
            <section className="container px-4 mx-auto">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Articles</h2>
                    <div className="text-center">
                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-semibold">
                            Total Articles: {articles.length}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col mt-px w-[1000px]">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <span>Author</span>
                                            </th>

                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <span>Status</span>
                                            </th>

                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <span>Publisher</span>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Title</th>
                                          
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
                                        </tr>
                                    </thead>

                                    {currentArticles.map(article => (
                                        <tbody key={article._id} className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="flex items-center gap-x-3">
                                                        
                                                        <div>
                                                            <h2 className="font-medium text-gray-800 dark:text-white">{article.email}</h2>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                        <span className={article.status === 'pending' ? "h-1.5 w-1.5 rounded-full bg-red-500" : "h-1.5 w-1.5 rounded-full bg-emerald-500"}></span>
                                                        <h2 className={article.status === 'pending' ? "text-sm font-normal text-red-500" : "text-sm font-normal text-black"}>
                                                            {article.status === 'pending' ? "Pending" : article.status}
                                                        </h2>
                                                    </div>
                                                </td>

                                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <h2 className="text-sm font-normal text-emerald-500">{article.publisher}</h2>
                                                </td>

                                                <td className="px-4 py-4 w-24 text-sm whitespace-nowrap">
                                                    <p className="font-semibold text-black">{article.title}</p>
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <button onClick={() => handleUpdate(article)} className={article.status === 'decline' ? "hidden" : "text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"}>
                                                            <MdDownloadDone />
                                                        </button>

                                                        <button onClick={() => handleCancel(article)} className={article.status === 'decline' ? "hidden" : "text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"}>
                                                            <MdCancel />
                                                        </button>

                                                        <button onClick={() => handleDelete(article)} className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                            <AiFillDelete />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Previous</span>
                    </button>

                    <div className="items-center hidden lg:flex gap-x-3">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-2 py-1 text-sm rounded-md ${currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60' : 'text-gray-500  dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <span>Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AllArticles;
