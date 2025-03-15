import { NavLink } from "react-router-dom";

const AllArticleDetailsUser = ({ article }) => {
    return (
        <div className="relative w-96 h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl duration-300 transition-transform transform hover:scale-105">
            {/* Article Image */}
            <div className="relative w-full h-[250px] overflow-hidden">
                <img className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" src={article.image} alt="Article" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {article.publisher}
                </div>
            </div>
			
          {/* Article Content */}
            <div className="p-5 bg-white dark:bg-gray-900">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-violet-600 transition-colors">
                    <NavLink to={`/get/${article._id}`} className="hover:underline">
                        {article.title}
                    </NavLink>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                    {article.description || "Click to read more..."} {/* যদি সংক্ষেপিত বিবরণ থাকে */}
                </p>
            </div>
        </div>
    );
};

export default AllArticleDetailsUser;
