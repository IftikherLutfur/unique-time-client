import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AllArticleDetailsUser from "./AllArticleDetailsUser";
import { useState } from "react";

const AllArticlesForUser = () => {
    const axiosPublic = useAxiosPublic();

    const { data: articleShow = [] } = useQuery({
        queryKey: ['articleShow'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/article`);
            return res.data;
        }
    });
    


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    // Filter published articles
    const publishedArticles = articleShow
    .filter(article => article.status === "published")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Calculate the total number of pages
    const totalPages = Math.ceil(publishedArticles.length / articlesPerPage);

    // Get the articles for the current page
    const currentArticles = publishedArticles.slice(
        (currentPage - 1) * articlesPerPage,
        currentPage * articlesPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="pt-28">
            <SectionTitle heading='All Articles' />

            <div className="max-w-screen-xl p-5 mx-auto dark:bg-gray-100 dark:text-gray-800">
                <div className="grid lg:ml-10 grid-cols-1 gap-5 lg:grid-cols-3 sm:grid-cols-2">
                    {currentArticles.map(article => (
                        <AllArticleDetailsUser 
                            key={article._id}
                            article={article}
                        />
                    ))}
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
            </div>
        </div>
    );
};

export default AllArticlesForUser;
