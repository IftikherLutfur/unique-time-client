import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false);
  const { login, googleLogin } = UseAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const togglePassword = () => {
    setShow(!show);
  };

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
    login(data.email, data.password)
      .then(() => {
        toast.success("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-wrap items-center justify-center min-h-screen px-4 py-10 ">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg md:mr-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-4xl">
            Sign In
          </h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              {...register("email", { required: "Please enter your email." })}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={!show ? "password" : "text"}
                className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...register("password", {
                  required: "Please enter your password.",
                })}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {show ? "🙊" : "🙈"}
              </button>
            </div>
          </div>
          <div>
            <button className="w-full px-4 py-2 font-bold text-white bg-pink-400 rounded-md hover:bg-pink-500">
              Login
            </button>
            <Toaster />
          </div>
          <button
            type="button"
            onClick={handleForGoogleLogin}
            className="flex items-center justify-center w-full px-4 py-2 space-x-3 border rounded-md hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <span>Login with Google</span>
          </button>
        </form>
      </div>
      <div className="w-full mt-6 md:mt-0 md:w-1/2">
        <img
          src="https://img.freepik.com/free-vector/breaking-news-banners-design_23-2148506834.jpg"
          alt="Login Illustration"
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
