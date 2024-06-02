import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
      })
      const onSubmit = async (data) => {
        console.log(data)




      }
    return (
        <div className="py-36 mx-44 flex justify-evenly" >
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 w-full dark:bg-gray-50 dark:text-gray-800">
            <div className="mb-8 text-center">
		<h1 className="my-3 text-4xl font-bold">Register Now!</h1>
		
	</div>

            <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
         <div className="space-y-4 mx-10 b">
            
      <div>
            <label className="block mb-2 text-sm">Name</label> 

      <input className="border-2 w-72 h-8 px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
        {...register("name", {
          required: "Please enter your first name.",
        })}
      />
      </div>
      <div>
            <label className="block mb-2 text-sm">Photo</label> 

      <input className="border-2 w-72 h-8 px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
        {...register("image", {
          required: "Please enter your first name.",
        })}
      />
      </div>
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

      <input className="border-2 w-72 h-8 px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
        {...register("password", {
          required: "Please enter your first name.",
        })}
      />
      </div>



      <div>
        <button className="btn w-full bg-pink-400 font-bold ">Register</button>
      </div>
            </div>       

    </form>
            </div>
            <div>
                <img className="w-[500px]" src="https://img.freepik.com/free-vector/breaking-news-banners-design_23-2148506834.jpg" alt="" />
            </div>
        </div>
    );
};

export default Register;