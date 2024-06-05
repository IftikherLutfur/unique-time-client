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
import AddArticles from "../Components/AddArticles/AddArticles";
import AllArticles from "../Components/Dashboard/AllArticles";
import Error from "../Components/Error";
import UserProfile from "../Components/UserProfile/UserProfile";
import PrivateRoutes from "../Components/Authentication/PrivateRoutes";
import AllArticlesForUser from "../Components/AllArticles/AllArticlesForUser";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement:<Error/>,
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
        {
          path:'/addArticle',
          element:<PrivateRoutes><AddArticles/></PrivateRoutes>
        },
        {
          path:'/userProfile',
          element:<PrivateRoutes><UserProfile/></PrivateRoutes>
        },
        {
          path:'/allArticlesForUser',
          element:<AllArticlesForUser/>
        }

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
        },
        {
          path:'allArticle',
          element:<AllArticles/>
        }
      ]
    }
  ]);

  export default router