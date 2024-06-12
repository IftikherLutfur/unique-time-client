import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const UsePremium = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = UseAuth();
    const {data: isPremium=[]} = useQuery({
        queryKey:[user?.email ,'isPremium'],
        enabled: !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/premiumCard/card/${user.email}`)
            return res.data?.isPremium;
        }
    })


    return [isPremium]
};

export default UsePremium;
