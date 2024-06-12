import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserData = () => {
    const axiosSecure = useAxiosSecure();
    const {data:userInfo=[]}= useQuery({
        queryKey:['userInfo'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/user')
            console.log(res.data);
            return res.data;
        }
    })
    return [userInfo]
    
};

export default useUserData;