import { FaEye } from "react-icons/fa";

const NewsCardHooks = ({publish}) => {
    return (
       <div className=" mt-10 ">
         <div className="  max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
        <div className="flex justify-between pb-4 border-bottom">
            <div className="">
                <a rel="noopener noreferrer" href="#" className="mb-0 capitalize dark:text-gray-800">{publish.publisher_name}</a>
            </div>
                <p>{publish.published_date}</p>
        </div>
        <div className="space-y-4">
            <div className="space-y-2">
                <img src="https://source.unsplash.com/random/480x360/?4" alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                <div className="flex items-center text-xs">
                    <span>6 min ago</span>
                </div>
            </div>
            <div className="space-y-2">
                <a rel="noopener noreferrer" href="#" className="block">
                  <p className="flex items-center gap-2"><FaEye/>{publish.views}</p>
                </a>
                <p className="leading-snug dark:text-gray-600">{publish.news_description}</p>
            </div>
        </div>
    </div>
       </div>
    );
};

export default NewsCardHooks;