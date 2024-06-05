import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const GetPublishers = () => {
    const axiosPublic = useAxiosPublic();

    const {data:getPublisher=[]} = useQuery({
        queryKey:['getData'],
        queryFn: async () =>{
            const res  = await axiosPublic.get('/publisher')
            console.log(res.data);
            return res.data;
        }
    })
    return (
        <div className="flex gap-12">
            
           {getPublisher.map(publish=><div key={publish._id} className="border-2 p-4">
                <img className="w-44 h-40" src={publish.image} alt="" />
                <h1 className="text-center mt-2 text-xl font-semibold">{publish.name}</h1>
            </div>)}
        </div>
    );
};

export default GetPublishers;