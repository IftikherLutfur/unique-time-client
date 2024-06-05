import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";

const UserProfile = () => {

    const { user, update } = UseAuth();

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    })
    const onSubmit = async (data) => {
        console.log(data)
        update(data.name, data.image)
        .then(result=>{
            console.log(result.ur);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    return (
        <div>
            <div className="flex flex-col max-h-full pt-28 p-6  dark:bg-gray-50 dark:text-gray-800 text-center max-w-md mx-36">
                <img src={user.photoURL} alt="" className="  h-64 rounded-sm sm:h-96 " />
                <div>
                    <h2 className="text-xl font-semibold">{user.displayName}</h2>
                    <span className="block pb-2 text-sm dark:text-gray-600">{user.email}</span>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>

                                <label className="block mb-2 text-sm font-bold">Update Name</label>

                                <input className="border-2 w-72 h-8 px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                                    {...register("name", {
                                        required: "Please enter your first name.",
                                    })}
                                />
                            </div>
                            <div>

                                <label className="block mb-2 text-sm font-bold">Update Image</label>

                                <input className="border-2 w-72 h-8 px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                                    {...register("image", {
                                        required: "Please enter your first name.",
                                    })}
                                />
                            </div>

                            <div className="my-5">
                                <button className="btn">Update</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;