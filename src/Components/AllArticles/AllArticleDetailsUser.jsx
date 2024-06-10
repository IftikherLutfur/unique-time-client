import { NavLink } from "react-router-dom";

const AllArticleDetailsUser = ({ article }) => {
	
	return (
		<div>
			<div className="relative flex items-end w-96 justify-start text-left dark:bg-gray-500 bg-center bg-cover h-96">
				<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b dark:via- dark:from-gray-50 dark:to-gray-50">
					<img className="h-[300px]" src={article.image} alt="" />
				</div>
				<div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
					<a rel="noopener noreferrer" href="#" className="px-3 py-2 text-xs font-semibold tracking-wider uppercase dark:text-gray-800 dark:bg-violet-600">{article.publisher}</a>
					<a href=""></a>
				</div>

				<h2 className="z-10 pt-4 p-5">
					<NavLink to={`/article/get/${article._id}`}>
						<a rel="noopener noreferrer" href="#" className="font-medium text-md hover:underline dark:text-gray-800">{article.title}</a>
					</NavLink>
				</h2>

			</div>
		</div>
	);
};

export default AllArticleDetailsUser;