import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UserUpdate = () => {
    const axiosPublic = useAxiosPublic();
    const { data: userData = [] } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get('/user')
            console.log(res.data);
            return res.data;

        }
    })
    return [userData]
};

export default UserUpdate;