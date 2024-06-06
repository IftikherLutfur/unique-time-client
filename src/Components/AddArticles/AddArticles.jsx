import { useForm } from "react-hook-form";
import SectionTitle from "../SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import usePublisher from "../Publishers/usePublisher";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddArticles = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = UseAuth();
    const [getPublisher] = usePublisher();
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    })

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        });
        console.log(res.data.data.display_url);

        const articleInfo = {
            title: data.title,
            publisher: data.publisher,
            description: data.description,
            image: res.data.data.display_url,
            email: user?.email,
            name: user?.name,
            status:"pending"
        }
        const postRes = await axiosPublic.post('/article', articleInfo)
        console.log(postRes.data);
        if(postRes.data.insertedId){
            toast.success("Article Published")
        }

    }

    return (
        <div className="pt-32">
            <SectionTitle heading="add an article"></SectionTitle>
            <section className="max-w-4xl p-6 mx-auto bg-pink-400 text-white rounded-md shadow-md bg">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Add Article</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white font-semibold">Title</label>
                            <input id="username" type="text"
                                {...register("title", {
                                    required: "Please enter your first name.",
                                })}
                                className="block w-full px-4 py-2 mt-2 rounded-lg bg-white text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white font-semibold" >Publisher</label>

                            <select {...register('publisher', { required: true })}
                                className="block w-full px-4 py-2 mt-2 rounded-lg bg-white text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring ">
                                <option disabled selected>Select a Publisher</option>
                                {getPublisher.map(publish=><option key={publish._id} value={publish.name}>{publish.name}</option>)}
                                {/* <option value="CNN">CNN</option>
                                <option value="The Guardian">The Guardian</option>
                                <option value="Reuters">Reuters</option>
                                <option value="Al Jazeera">Al Jazeera</option> */}
                            </select>
                        </div>

                        <div className="col-span-2 row-span-4">
                            <label className="text-white font-semibold">Description</label>
                            <input type="text"
                                {...register("description", {
                                    required: "Please enter your first name.",
                                })}
                                className="block w-full px-4  py-2 mt-2 rounded-lg bg-white text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <fieldset className="w-full space-y-1 dark:text-gray-800">
                                <label htmlFor="files" className="block text-sm font-medium"></label>
                                <div className="flex">
                                    <input type="file" name="image"  {...register("image", {
                                        required: "Please enter your first name.",
                                    })} id="files" className="px-2 py-6 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100" />
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <label className="text-white font-semibold">Tag</label>
                            <input type="text"
                                {...register("tag", {
                                    required: "Please enter your first name.",
                                })}
                                className="block w-full px-4 py-2 mt-2 rounded-lg bg-white text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>


                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Published</button>
                        <Toaster/>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddArticles;