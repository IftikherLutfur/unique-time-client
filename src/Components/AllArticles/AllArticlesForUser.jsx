import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AllArticleDetailsUser from "./AllArticleDetailsUser";


const AllArticlesForUser = () => {
	const axiosPublic = useAxiosPublic();
	
	const { data: articleShow = [] } = useQuery({
		queryKey: ['articleShow'],
		queryFn: async () => {
			const res = await axiosPublic.get(`/article`)
			console.log(res.data);
			return res.data;
		}
	})

	return (
		<div className="pt-28">
			<SectionTitle heading='all articles' />
 
      <div className="max-w-screen-xl p-5 mx-auto dark:bg-gray-100 dark:text-gray-800">
				<div className="grid lg:ml-10 grid-cols-1 gap-5 lg:grid-cols-3 sm:grid-cols-2">
					{articleShow.map(article=> article.status === "published" ? <AllArticleDetailsUser 
					key={article._id}
					article={article}
					/> : '')}
				</div>
				
			</div>
  

	


		</div>
	);
};

export default AllArticlesForUser;