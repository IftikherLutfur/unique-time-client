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
           <section className="ml-72 mt-5 p-6 mx-auto  rounded-md shadow-md bg-slate-100 text-black">
    <h2 className="text-lg text-center font-semibold  capitalize ">Add A Publisher</h2>

    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
            <div className="mt-5">
            <label className="">Publisher Name</label>
                <input 
                {...register('name', {
                    required:"can't press the add button until the fill up",
                })} 
                type="text" className="block w-full px-4 py-2 mt-2 border-blue-900 border-2 rounded-md bg-white text-black  focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                            <fieldset className="w-full border-2 border-blue-900 bg-white rounded-lg mt-2 text-black">
                                <label htmlFor="files" className="block text-sm font-medium"></label>
                                <div className="flex py-2">
                                    <input type="file" name="image"  {...register("image", {
                                        required: "Please enter the name.",
                                    })} id="files" className="px-2 hover:cursor-pointer " />
                                </div>
                            </fieldset>
                        </div>

                        <div className="flex justify-end mt-3">
            <button className="px-8 py-2.5 leading-5 w-full text-white transition-colors duration-300 transform bg-purple-500 hover:bg-purple-600 focus:outline-none focus:bg-gray-600">Add</button>
            <Toaster/>
        </div>
        </div>

       
    </form>
</section>
           
        </div>
    );
};

export default AddPublishers;