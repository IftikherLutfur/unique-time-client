import axios from "axios";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";


export const axiosSecure = axios.create({
    baseURL: 'https://unique-time-server.vercel.app'})
const useAxiosSecure = () => {

    const {logOut} = UseAuth();
    const navigate = useNavigate();
    
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped', token);
    config.headers.authorization = `Bearer ${token}`
        return config;
    },function(error) {
        return Promise.reject(error)
    });

    axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },  (error) => {
        const status = error.response.status;
        console.log(status);
        if(status === 401 || status === 403){
          logOut();
          navigate('/login')
        }
        return Promise.reject(error);
      });


    return axiosSecure;
};

export default useAxiosSecure;