import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const usePublisher = () => {
     const axiosPublic = useAxiosPublic();
    const {data:getPublisher=[]} = useQuery({
        queryKey:['getData'],
        queryFn: async () =>{
            const res  = await axiosPublic.get('/publisher')
            console.log(res.data);
            return res.data;
        }
    })
    return [getPublisher]
}
export default usePublisher;