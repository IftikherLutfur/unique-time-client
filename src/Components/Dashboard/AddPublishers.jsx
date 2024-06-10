import { useForm } from "react-hook-form";
import SectionTitle from "../SectionTitle";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const hosting_api_for_image = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddPublishers = () => {

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    })
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = {image: data.image[0]}
        const image = await axiosPublic.post(hosting_api_for_image, imageFile , {
            headers: {
                "content-type":"multipart/form-data"
            }
        });
        console.log(image.data.data.display_url);
        const addInfo ={
            name: data.name,
            image: image.data.data.display_url
        }

        const res = await axiosPublic.post('/publisher',addInfo)
        console.log(res.data);
        if(res.data.insertedId){
            toast.success("Publisher added")
        }
        return res.data;
         
       
    
    
    }

    return (
        <div>
           <div className="ml-72 mt-10">
           <SectionTitle heading='Add publisher'/>
           </div>
           <section className="ml-72 mt-5 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 className="text-lg text-center font-semibold text-gray-700 capitalize dark:text-white">Add A Publisher</h2>

    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
            <div className="mt-5">
            <label className="text-white">Publisher Name</label>
                <input 
                {...register('name', {
                    required:"can't press the add button until the fill up",
                })} 
                type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                            <fieldset className="w-full space-y-1 dark:text-gray-800">
                                <label htmlFor="files" className="block text-sm font-medium"></label>
                                <div className="flex">
                                    <input type="file" name="image"  {...register("image", {
                                        required: "Please enter your first name.",
                                    })} id="files" className="px-2 mt-4 py-2 text-white rounded-md " />
                                </div>
                            </fieldset>
                        </div>

        
        </div>

        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add</button>
            <Toaster/>
        </div>
    </form>
</section>
           
        </div>
    );
};

export default AddPublishers;