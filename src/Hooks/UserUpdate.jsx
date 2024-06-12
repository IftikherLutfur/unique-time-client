import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const UserUpdate = () => {
    const axiosSecure = useAxiosSecure();
    const { data: userData = [] } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user')
            return res.data;

        }
    })
    return [userData]
};

export default UserUpdate;