import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";

const Root = () => {
    return (
        <div className="mx-5">
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Root;