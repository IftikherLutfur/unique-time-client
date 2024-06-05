import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllArticlesForUser = () => {
	const axiosPublic = useAxiosPublic();
	const { data: articleShow = [] } = useQuery({
		queryKey: ['articleShow'],
		queryFn: async () => {
			const res = await axiosPublic.get('/article')
			console.log(res.data);
			return res.data;
		}
	})

	return (
		<div className="pt-28">
			<SectionTitle heading='all articles' />
			<div className="max-w-screen-xl p-5 mx-auto dark:bg-gray-100 dark:text-gray-800">
				<div className="grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
					{articleShow.map( article => article.status === 'published' ? <div key={article._id} className="relative flex items-end justify-start w-full text-left dark:bg-gray-500 bg-center bg-cover h-96">
						<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b dark:via- dark:from-gray-50 dark:to-gray-50"></div>
						<div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
							<a rel="noopener noreferrer" href="#" className="px-3 py-2 text-xs font-semibold tracking-wider uppercase dark:text-gray-800 dark:bg-violet-600">{article.publisher}</a>
							<div className="flex flex-col justify-start text-center dark:text-gray-800">
								<span className="text-3xl font-semibold leading-none tracking-wide">04</span>
								<span className="leading-none uppercase">Aug</span>
							</div>
						</div>
						<h2 className="z-10 p-5">
							<a rel="noopener noreferrer" href="#" className="font-medium text-md hover:underline dark:text-gray-800">{article.description}</a>
						</h2>
					</div> : '')}
					
				</div>
			</div>
		</div>
	);
};

export default AllArticlesForUser;