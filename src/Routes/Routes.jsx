import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/HomeComponents/Home";
import Register from "../Components/Authentication/Register";
import Login from "../Components/Authentication/Login";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        }
      ]
    },
  ]);

  export default router