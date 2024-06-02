import { useEffect, useState } from "react";
import NewsCardHooks from "../../Hooks/NewsCardHooks";

const AllPublisher = () => {
    const [publishers, setPublisher] = useState([])
    useEffect(()=>{
        fetch('news.json')
        .then(res=>res.json())
        .then(data=>setPublisher(data))
    },[])
    return (
        <div className="grid grid-cols-3">
           {publishers.slice(0,12).map(publisher=><div key={publisher.id}>
                <NewsCardHooks publish={publisher} />
           </div>
           )} 
        </div>
    );
};

export default AllPublisher;