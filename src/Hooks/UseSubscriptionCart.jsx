import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const UseSubscriptionCart = () => {

    const axiosPublic = useAxiosPublic();
    const {data:cart=[]} = useQuery({
        queryKey:['cart'],
        queryFn: async () =>{
         const result = await axiosPublic.get('/premium')
        //  console.log(result.data);
         return result.data
        }
    }) 
    return [cart]
};

export default UseSubscriptionCart;