import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLoaderData } from "react-router-dom";

const ArticleDetails = () => {
    const loader = useLoaderData();
    console.log(loader);
    return (
        <div className="py-28 ">
            <div className="max-w-full h-[500px] flex gap-3 p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
                {/* first div */}
                <div className="flex-1">
                    <div className="space-y-2">
                        <img src={loader.image} alt="" className="block object-cover object-center w-full rounded-md dark:bg-gray-500" />
                        <div className="flex items-center text-xs">
                            <span>6 min ago</span>
                        </div>
                    </div>
                </div>
             {/* Second div */}
                <div className="flex-1">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p>{loader.publisher}</p>
                            <a rel="noopener noreferrer" href="#" className="block">
                                <h3 className="text-xl font-semibold dark:text-violet-600">{loader.title}</h3>
                            </a>
                            <p className="leading-snug dark:text-gray-600">{loader.description}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ArticleDetails;