import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Marquee from "react-fast-marquee";
import SectionTitle from "../SectionTitle";
import usePublisher from "./usePublisher";

const GetPublishers = () => {
    // const axiosPublic = useAxiosPublic();

    // const {data:getPublisher=[]} = useQuery({
    //     queryKey:['getData'],
    //     queryFn: async () =>{
    //         const res  = await axiosPublic.get('/publisher')
    //         console.log(res.data);
    //         return res.data;
    //     }
    // })

    const [getPublisher] = usePublisher();


    return (
        <div >
         
        <div className="my-5">
        <SectionTitle heading='All Publisher'/>
        </div>

        <div className="flex">
                
            <Marquee speed={150} >
          {getPublisher.map(publish=>
          
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