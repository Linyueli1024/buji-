import { Layout } from "../page/Layout";
import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Room from "../page/Room";
import Activity from "../page/Activity";
import Order from "../page/Order";

const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children:[{
      index:true,
      element: <Home/>
    },
    {
      path:'room',
      element: <Room/>
    },
    {
      path:'activity',
      element: <Activity/>
    },
    {
      path:'order',
      element: <Order/>
    }]
  },
])

export {router}