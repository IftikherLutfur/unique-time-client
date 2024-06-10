import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UseAdmin = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin = [] } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled:!!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
           
            return res.data?.admin;
        }
    })

    return [isAdmin]
};

export default UseAdmin;