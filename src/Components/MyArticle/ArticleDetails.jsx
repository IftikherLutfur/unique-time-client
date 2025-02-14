import { useLoaderData } from "react-router-dom";

const ArticleDetails = () => {
    const loader = useLoaderData();

    if (!loader) {
        return <p className="text-center text-lg font-bold py-20">Loading...</p>;
    }

    return (
        <div className="py-28 max-h-min ">
            <div className="max-w-full h-[500px] flex gap-3 p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
                {/* First div */}
                <div className="flex-1">
                    <div className="space-y-2">
                        <img 
                            src={loader?.image || "https://via.placeholder.com/500"} 
                            alt={loader?.title || "No Image"} 
                            className="block object-cover object-center w-full rounded-md dark:bg-gray-500" 
                        />
                    </div>
                </div>

                {/* Second div */}
                <div className="flex-1">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-gray-600 font-medium">{loader?.publisher}</p>
                            <a rel="noopener noreferrer" href={loader?.link || "#"} className="block">
                                <h3 className="text-xl font-semibold dark:text-violet-600">{loader?.title}</h3>
                            </a>
                            <p className="leading-snug text-black">{loader?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;
