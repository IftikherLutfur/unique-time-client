import { useForm } from "react-hook-form";
import SectionTitle from "../SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import usePublisher from "../Publishers/usePublisher";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = UseAuth();
  const [getPublisher] = usePublisher();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const imageFile = new FormData();
    imageFile.append("image", data.image[0]);

    try {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      const articleInfo = {
        title: data.title,
        publisher: data.publisher,
        description: data.description,
        image: res.data.data.display_url,
        email: user?.email,
        name: user?.displayName || user?.email,
        tag: data.tag,
        status: "pending",
        createdAt: new Date().toISOString(), // Store date & time
      };

      const postRes = await axiosPublic.post("/article", articleInfo);

      if (postRes.data.insertedId) {
        toast.success("Article Published!");
        reset();
      }
    } catch (error) {
      toast.error("Failed to upload article. Try again.");
    }
  };

  return (
    <div className="py-20 px-6 md:px-12">
      <SectionTitle heading="Add an Article"  subHeading={"Not published until admin approve it"}/>
      <div className="max-w-4xl mx-auto bg-[#f7f7f7] shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          
          {/* Title Field */}
          <div>
            <label className="text-gray-700 font-semibold">Title</label>
            <input 
              type="text"
              {...register("title", { required: "Title is required." })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Publisher Selection */}
          <div>
            <label className="text-gray-700 font-semibold">Publisher</label>
            <select 
              {...register("publisher", { required: "Select a publisher." })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            >
              {getPublisher.map(publish => (
                <option key={publish._id} value={publish.name}>{publish.name}</option>
              ))}
            </select>
            {errors.publisher && <p className="text-red-500 text-sm">{errors.publisher.message}</p>}
          </div>

          {/* Description Field */}
          <div>
            <label className="text-gray-700 font-semibold">Description</label>
            <textarea
              {...register("description", { required: "Description is required." })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-purple-400"
              rows="4"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-gray-700 font-semibold">Upload Image</label>
            <input 
              type="file"
              {...register("image", { required: "Image is required." })}
              className="w-full px-2 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>

          {/* Tag Field */}
          <div>
            <label className="text-gray-700 font-semibold">Tag</label>
            <input 
              type="text"
              {...register("tag", { required: "Tag is required." })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            />
            {errors.tag && <p className="text-red-500 text-sm">{errors.tag.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-6 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600 transition"
            >
              Add Article
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default AddArticles;
