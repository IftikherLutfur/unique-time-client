import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";

const UserProfile = () => {
    const { user, update } = UseAuth();
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });

    const onSubmit = async (data) => {
        console.log(data);
        update(data.name, data.image)
            .then(result => {
                console.log(result.ur);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="py-10 px-4">
            <div className="flex flex-col items-center max-w-md mx-auto p-6 bg-[#f7f7f7] rounded-lg shadow-lg">
                {/* Profile Image */}
                <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover mb-4"
                />

                {/* User Info */}
                <h2 className="text-2xl font-semibold mb-2">{user.displayName}</h2>
                <span className="text-sm text-gray-500 mb-6">{user.email}</span>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                    {/* Update Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700">Update Name</label>
                        <input 
                            id="name"
                            type="text"
                            className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                            {...register("name", {
                                required: "Please enter your name.",
                            })}
                        />
                    </div>

                    {/* Update Image */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-bold text-gray-700">Update Image URL</label>
                        <input 
                            id="image"
                            type="text"
                            className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                            {...register("image", {
                                required: "Please enter your image URL.",
                            })}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="my-5">
                        <button type="submit" className="w-full py-2 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition-colors">
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
