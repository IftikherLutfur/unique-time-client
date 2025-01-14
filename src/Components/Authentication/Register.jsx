import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const [show, setShow] = useState(false);
  const togglePassword = () => {
    setShow(!show);
  };

  const { createUser, update, googleLogin } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleForGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const userInfo = {
          name: result?.user?.displayName,
          image: result?.user?.photoURL,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success("LogIn Successful");
          }
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    createUser(data.email, data.password)
      .then((result) => {
        update(data.name, res.data.data.display_url);
        const userInfo = {
          name: data.name,
          email: data.email,
          image: res.data.data.display_url,
          isPremium: "no",
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success("Register Successful");
          }
        });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="py-12 px-4 sm:px-8 lg:px-16 xl:px-32 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
      <div className="max-w-md w-full bg-gray-50 text-gray-800 p-6 rounded-md shadow-md">
        <h1 className="text-4xl font-bold text-center mb-6">Register Now!</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-2 text-sm">Name</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              {...register("name", { required: "Please enter your name." })}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Profile Image</label>
            <input
              type="file"
              {...register("image", { required: "Please upload an image." })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              {...register("email", { required: "Please enter your email." })}
            />
          </div>
          <div className="relative">
            <label className="block mb-2 text-sm">Password</label>
            <input
              type={!show ? "password" : "text"}
              className="w-full px-3 py-2 border rounded-md"
              {...register("password", { required: "Please enter a password." })}
            />
          <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-2/3 transform -translate-y-1/2 text-xl text-gray-500 hover:text-gray-700"
              >
                {show ? "🙊" : "🙈"}
              </button>
          </div>
          <button className="w-full py-2 bg-pink-400 text-white font-bold rounded-md">
            Register
          </button>
          <Toaster />
        </form>
        <button
          onClick={handleForGoogleLogin}
          className="w-full mt-4 flex items-center justify-center p-2 border rounded-md"
        >
          <FaGoogle className="mr-2" /> 
          Login with Google
        </button>
      </div>
      <div className="w-full max-w-lg">
        <img
          src="https://img.freepik.com/free-vector/breaking-news-banners-design_23-2148506834.jpg"
          alt="Register Banner"
          className="w-full h-auto rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default Register;
