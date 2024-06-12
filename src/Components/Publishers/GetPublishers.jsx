
import Marquee from "react-fast-marquee";
import SectionTitle from "../SectionTitle";
import usePublisher from "./usePublisher";

const GetPublishers = () => {
    

    const [getPublisher] = usePublisher();


    return (
        <div >
         
        <div className="my-5">
        <SectionTitle heading='All Publisher'/>
        </div>

        <div className="flex">
                
            <Marquee speed={150} >
          {getPublisher?.map(publish=>
            <div key={publish._id} className="border-2 p-4">
                <img className="w-44 h-40" src={publish.image} alt="" />
                <h1 className="text-center mt-2 text-xl font-semibold">{publish.name}</h1>
            </div>
        
    )}
    </Marquee>
        </div>
          
        </div>
    );
};

export default GetPublishers;