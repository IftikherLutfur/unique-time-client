import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const Root = () => {
    return (
        <div className="max-h-svh">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;