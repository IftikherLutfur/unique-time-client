import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

const Login = () => {

    const [show, setShow] = useState(false)
    const { login, googleLogin } = UseAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleForGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name:result?.user?.displayName,
                    image:result?.user?.photoURL,
                    email:result?.user?.email,
                }
                axiosPublic.post('/users', userInfo)
                .then(res=>{
                    console.log(res.data);
                    if(res.data.insertedId){
                        toast.success("LogIn Successful")
                    }
                    navigate('/')
                })

            })
            .catch(error => {
                console.log(error);
            })
    }

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    })
    const onSubmit = async (data) => {
        console.log(data)


        login(data.email, data.password)
            .then(result => {
                console.log(result.user);
                toast.success('Login Successful')
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="py-36 mx-44 flex justify-evenly" >
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 w-full dark:bg-gray-50 dark:text-gray-800">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign In!</h1>

                </div>

                <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4 mx-10 b">

                        <div>
                            <label className="block mb-2 text-sm">Email</label>

                            <input className="border-2 w-72 h-8 px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                                {...register("email", {
                                    required: "Please enter your first name.",
                                })}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm">Password</label>

                            <input type={!show ? "password" : 'text'} className="border-2 w-72 h-8 px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                                {...register("password", {
                                    required: "Please enter your first name.",
                                })}
                            />
                             <p className="absolute bottom-48 left-[520px]" onClick={()=>setShow(!show)}><FaEye/></p>
                        </div>



                        <div>
                            <button className="btn w-full bg-pink-400 font-bold ">Login</button>
                            <Toaster />
                        </div>

                        <button onClick={handleForGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Login with Google</p>
                        </button>
                    </div>

                </form>
            </div>
            <div>
                <img className="w-[500px]" src="https://img.freepik.com/free-vector/breaking-news-banners-design_23-2148506834.jpg" alt="" />
            </div>
        </div>
    );
};

export default Login;