import { useLoaderData } from "react-router-dom";

const PremiumArticlesDetails = () => {
    const loader = useLoaderData();
    console.log(loader);

    return (
        <div className="py-28">
            <div className="flex justify-evenly mx-6 py-5 border-2 px-4 gap-5">
                <div className="flex flex-col items-center">
                    {/* Image with fixed width and height */}
                    <img 
                        src={loader.image} 
                        alt={loader.title} 
                        className="w-80 h-80 object-cover rounded-md" 
                    />
                    <h1 className="text-2xl font-bold mt-4">{loader.title}</h1>
                    <p className="text-xl font-semibold mt-2">{loader.description}</p>
                </div>
            </div>
        </div>
    );
};

export default PremiumArticlesDetails;
