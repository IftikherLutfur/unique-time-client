import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/HomeComponents/Home";
import Register from "../Components/Authentication/Register";
import Login from "../Components/Authentication/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import AllUsers from "../Components/Dashboard/AllUsers";
import AddPublishers from "../Components/Dashboard/AddPublishers";

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
        },

      ]
    },

    {
      path:'dashboard',
      element:<Dashboard/>,
      children:[
        {
          path:'users',
          element:<AllUsers/>
        },
        {
          path:'publisher',
          element:<AddPublishers/>
        }
      ]
    }
  ]);

  export default router