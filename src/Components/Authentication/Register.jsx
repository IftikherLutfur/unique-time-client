import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {

    const [show , setShow] = useState(false)
   
    const { createUser, update, googleLogin } = UseAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

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
        console.log(data);
        

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        });
        console.log(res.data.data.display_url);

        createUser(data.email, data.password)
            .then(result => {
                update(data.name, data.image)
                console.log(result.user);
        
                const userInfo={
                    name:data.name,
                    email:data.email,
                    image:res.data.data.display_url,
                    isPremium: 'no'
                } 
                 
                axiosPublic.post('/users' , userInfo)
                .then(res=>{
                    console.log(res.data);
                    if(res.data.insertedId){
                        toast.success("Register Successful")
                    }
                })


                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
            



    }
    return (
        <div className="py-36 mx-44 flex items-center gap-4 justify-evenly" >
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 w-full dark:bg-gray-50 dark:text-gray-800">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Register Now!</h1>

                </div>

                <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4 mx-10 b">

                        <div>
                            <label className="block mb-2 text-sm">Name</label>

                            <input className="border-2 w-72 h-10 px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                                {...register("name", {
                                    required: "Please enter your first name.",
                                })}
                            />
                        </div>
                        <div>
                        <fieldset className="w-full space-y-1 dark:text-gray-800">
                                <label htmlFor="files" className="block text-sm font-medium"></label>
                                <div className="flex">
                                    <input type="file" name="image"  {...register("image", {
                                        required: "Please enter your first name.",
                                    })} id="files" className="px-1 py-2 border-2 w-72 h-12 rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100" />
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm">Email</label>

                            <input className="border-2 w-72 h-10 px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                                {...register("email", {
                                    required: "Please enter your first name.",
                                })}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm">Password</label>
                            
                            <input type={!show ? "password" : 'text'} className="border-2 w-72 h-10 px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                                {...register("password", {
                                    required: "Please enter your first name.",
                                })}
                            />
                            <p className="absolute bottom-7 left-[520px]" onClick={()=>setShow(!show)}><FaEye/></p>
                        </div>

                        



                        <div>
                            <button className="btn w-full bg-pink-400 font-bold ">Register</button>
                            <Toaster/>
                        </div>
                    </div>

                    <button onClick={handleForGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-72 ml-10 p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Login with Google</p>
                        </button>

                </form>
            </div>
            <div>
                <img className="w-[500px]" src="https://img.freepik.com/free-vector/breaking-news-banners-design_23-2148506834.jpg" alt="" />
            </div>
        </div>
    );
};

export default Register;