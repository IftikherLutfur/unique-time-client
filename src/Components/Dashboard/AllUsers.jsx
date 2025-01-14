import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../SectionTitle";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import UseAdmin from "./UseAdmin";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = UseAdmin();

    const { data: user = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const handleDelete = async (user) => {
        const res = await axiosSecure.delete(`/users/${user._id}`);
        if (res.data.deletedCount > 0) {
            toast.success(`${user?.name} has been deleted`);
            refetch();
        }
    };

    const handleUpdate = async (user) => {
        const res = await axiosSecure.patch(`/users/admin/${user._id}`);
        if (res.data.modifiedCount) {
            toast.success(`${user?.name} is now Admin`);
        }
    };

    return (
        <div>
            <SectionTitle
                heading="All Users"
                subHeading="Here you can see all the registered users on your website. You can make anyone an admin from here or delete anyone."
            />
            <section className="container mx-auto px-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Image
                                </th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Name
                                </th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Email
                                </th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Role
                                </th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((users) => (
                                <tr
                                    key={users._id}
                                    className="border-t dark:border-gray-700"
                                >
                                    <td className="px-4 py-2">
                                        <img
                                            src={users.image}
                                            alt={users.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-col">
                                            <span>{users.name}</span>
                                            {users.isPremium === 'yes' && (
                                                <span className="text-xs bg-green-500 text-white rounded px-2 mt-1">
                                                    Premium
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">{users.email}</td>
                                    <td className="px-4 py-2">
                                        {users?.role === 'admin' ? (
                                            'Admin'
                                        ) : (
                                            <button
                                                onClick={() => handleUpdate(users)}
                                                className="bg-orange-500 text-white p-1 rounded"
                                            >
                                                <FaUsers />
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(users)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Toaster />
            </section>
        </div>
    );
};

export default AllUsers;
