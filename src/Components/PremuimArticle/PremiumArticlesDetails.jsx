import { useLoaderData } from "react-router-dom";


const PremiumArticlesDetails = () => {

    const loader = useLoaderData();
    console.log(loader);
    
    
    return (
        <div className="py-28">
           <div className="flex justify-evenly mx-6 py-5 border-2 px-4 gap-5">
           <div>
                <img src={loader.image} alt="" />
            </div>

            <div>
           <h1 className="text-2xl font-bold">{loader.title}</h1>
           <p className="text-xl font-semibold">{loader.description}</p>
           <p>{loader.time}</p>

            
            </div>
           </div>

        </div>
    );
};

export default PremiumArticlesDetails;