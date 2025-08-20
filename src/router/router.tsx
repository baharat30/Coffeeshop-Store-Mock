import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import HomePage from "../pages/HomePage/homepage";
import Posts from "../components/posts/posts";
import SinglePost from "../components/singlepost/singlepost";
import MenuPage from "../pages/menuPage/menupage";
import ShopPage from '../pages/shopPage/shoppage';
import CartPage from '../pages/cartPage/cartpage'
import CheckOut from '../pages/checkout/checkout';
import NotFound from '../pages/404/notFound';
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Profile from "../pages/Profile/profile"
import PaymentPage from "../pages/paymentPage/paymentpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true, 
        element: <HomePage />,
      },
      {
        path: "home", 
        element: <HomePage />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/:postId",
        element: <SinglePost />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
       {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckOut />,
      },
       {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*", 
        element: <NotFound />,
      }
    ],
  },
]);

export default router;
