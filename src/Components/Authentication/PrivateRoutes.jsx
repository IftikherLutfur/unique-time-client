import { Navigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";

const PrivateRoutes = ({children}) => {

    const {user, loading} = UseAuth();

    

    if(loading){
        return <div>Loading........</div>
    }

    if(user){
        return children;
    }

    return (
        <Navigate to='/login'>
            
        </Navigate>
    );
};

export default PrivateRoutes;