// import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../SectionTitle";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import axios from "axios";
import { useEffect, useState } from "react";
import AllArticleDetailsUser from "./AllArticleDetailsUser";

const AllArticlesForUser = () => {
    const [data, setData]= useState([])
    // const axiosPublic = useAxiosPublic();

    // const { data: articleShow = [] } = useQuery({
    //     queryKey: ['articleShow'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get("/article");
    //         console.log(axiosPublic);
            
    //         console.log(res,"Hello");
            
    //         return res.data;
    //     }
    // });

    useEffect(()=>{
        const fetchData = async () =>{

           try {
            const res = await axios.get('https://unique-time.web.app/article')
            setData(res.data)
           } catch (error) {
            console.error("Error fetching data", error)
           }
           
           
        }
        fetchData()
    },[])

    
    // Filter published articles
    const publishedArticles = data.filter(article => article.status === "published");

    return (
        <div className="pt-28">
            <SectionTitle heading='All Articles' />
            <div className="max-w-screen-xl p-5 mx-auto dark:bg-gray-100 dark:text-gray-800">
                <div className="grid lg:ml-10 grid-cols-1 gap-5 lg:grid-cols-3 sm:grid-cols-2">
                    {publishedArticles.map(article => (
                        
                       <AllArticleDetailsUser key={article._id} article={article}/>
                    ))}
                    
                </div>
            </div>
        </div>
    );
};

export default AllArticlesForUser;
