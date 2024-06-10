import { AiFillDelete } from "react-icons/ai";
import { MdCancel, MdDownloadDone } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SectionTitle from "../SectionTitle";

const AllArticles = () => {

    const axiosSecure = useAxiosSecure();

    const { data: articles = [] , refetch} = useQuery({
        queryKey: ['article'],
        queryFn: async () => {
            const res = axiosSecure.get('/article')
            console.log(res.data);
            return (await res).data;
        }
    })


    // const { register, handleSubmit } = useForm({
    //     shouldUseNativeValidation: true,
    // })
    // const onSubmit = async (data) => {
    //     console.log(data);
    //    const info = {
    //     reason: data.name
    //    }

    //    const cancel = await axiosPublic.post('/cancel', info)
    //    console.log(cancel.data);
    //    return cancel.data;
    // }

    const handleUpdate = async (article) =>{
        console.log(article);
        const updateRes = await axiosSecure.patch(`/article/${article._id}`)
        if(updateRes.data.matchedCount>0){
            toast.success('Accepted');
            refetch();
        }
        return updateRes.data;
    }

    const handleCancel = async (article) =>{
         console.log(article);

         const cancelUpdate = await axiosSecure.patch(`/article/admin/${article._id}`)
         console.log(cancelUpdate.data);
         refetch();
         return cancelUpdate.data
    }

    const handleDelete = async (article) => {
        console.log(article);
        const deleteRes =await axiosSecure.delete(`/article/${article._id}`)
        console.log(deleteRes.data);
        if (deleteRes.data.deletedCount>0) {
            toast.success("Article has been deleted")
            refetch()
        }
        return deleteRes.data;
    }

    return (
        <div className="mt-6 mr-24">
           <SectionTitle heading='here is all article' subHeading='Hello admin you can accept, reject and delete anyone you want'/>
            <section className="container px-4 mx-auto">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Team members</h2>
<div className="text-center">
    
<span className="px-3 text-center py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-semibold ">
                       Total Article : {articles.length}</span>
</div>
                </div>

                <div className="flex flex-col mt-px w-[1000px]">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">

                                                    <span>Author</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Status</span>

                                                    <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" />
                                                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" />
                                                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" />
                                                    </svg>
                                                </button>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Publisher</span>


                                                </button>
                                            </th>


                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th>
                                          
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>


                                        </tr>
                                    </thead>
                                    {articles.map(article => <tbody key={article._id} className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">


                                                    <div className="flex items-center gap-x-2">
                                                        <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                                        <div>
                                                            <h2 className="font-medium text-gray-800 dark:text-white ">{article.email}</h2>

                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                    <span className={article.status === 'pending' ? "h-1.5 w-1.5 rounded-full bg-red-500" : "h-1.5 w-1.5 rounded-full bg-emerald-500"}></span>

                                                    <h2 className=
                                                        {article.status ==='pending' ? "text-sm font-normal text-red-500" : "text-sm font-normal text-white"}>
                                        {article.status=== 'pending' ? "Pending" : article.status}</h2>
                                                </div>
                                            </td>

                                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                    <h2 className="text-sm font-normal text-emerald-500">{article.publisher}</h2>
                                                </div>
                                            </td>




                                            <td className="px-4 py-4 w-24 text-sm whitespace-nowrap">
                                                <p className="text-white">{article.title}</p>
                                            </td>
                                            {/* <td></td> */}

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">
       <button  onClick={()=>handleUpdate(article)} className={ article.status === 'decline' ? "hidden" : " text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"}>
                                                    <MdDownloadDone />
                                                    </button>

         <button  onClick={()=>handleCancel(article)}
         className={article.status === 'decline' ? "hidden" : "text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"}>
                                                        <MdCancel/>
                                                    </button>
                                                    {/* Open the modal using document.getElementById('ID').showModal() method */}



                                                    <button onClick={() => handleDelete(article)} className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                        <AiFillDelete />
                                                    </button>
                                                    <toast/>


                                                </div>
                                            </td>

                                        </tr>


                                    </tbody>)}

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span>
                            previous
                        </span>
                    </a>

                    <div className="items-center hidden lg:flex gap-x-3">
                        <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                    </div>

                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <span>
                            Next
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default AllArticles;