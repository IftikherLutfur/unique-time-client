import { useLoaderData } from "react-router-dom";

const ArticleDetails = () => {
    const loader = useLoaderData();

    if (!loader) {
        return <p className="text-center text-lg font-bold py-20">Loading...</p>;
    }
   if (loader) {
    return <>Hello</>
   }
    return (
        <div className="py-28 min-h-screen"> {/* Fixed the height issue */}
            <div className="max-w-full h-[500px] flex gap-3 p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
                
                {/* First div - Image Section */}
                <div className="flex-1">
                    <div className="space-y-2">
                        <img 
                            src={loader?.image || "https://via.placeholder.com/500"} 
                            alt="Article Image" 
                            className="block object-cover object-center w-full rounded-md dark:bg-gray-500" 
                        />
                    </div>
                </div>

                {/* Second div - Article Content */}
                <div className="flex-1">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-gray-600 font-medium">{loader?.publisher}</p>

                            {/* Fixed the href issue */}
                            {loader?.link ? (
                                <a rel="noopener noreferrer" href={loader.link} className="block">
                                    <h3 className="text-xl font-semibold dark:text-violet-600">{loader?.title} hello</h3>
                                </a>
                            ) : (
                                <h3 className="text-xl font-semibold dark:text-violet-600">{loader?.title}</h3>
                            )}

                            <p className="leading-snug text-black">{loader?.description}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ArticleDetails;
