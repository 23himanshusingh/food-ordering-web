import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import { lazy, Suspense } from "react";
import Shimmer from "./components/Shimmer";

const About = lazy(() => import ("./components/About"));

const AppLayout = () => {
    return (
        <div className="class">
            <Header />
            <Outlet />
        </div>
    );
};

const appRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <AppLayout />,
            children: [
                {
                    path: "/",
                    element: <Body/>,
                },
                {
                    path: "/about",
                    element: <Suspense fallback={<Shimmer/>}><About/></Suspense>,
                },
                {
                    path: "/contact",
                    element: <Contact/>,
                },
                {
                    path: "/restaurants/:resid",
                    element: <RestaurantMenu/>,
                },
            ],
            errorElement: <Error/>,
        },
    ]
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);



/**
 * Optimization techniques of our app-->
 * Bundling(done by parcel, it bundles the complete react app in a single js file using compression, minification )
 * Chunking/
 * Lazy loading/
 * logical bundling/
 * code splitting/
 * dynamic/lazy import ,,, lazy(()=>{import ...})
 * on demand loading)loading only required components the user is looking for )
 * 
 * upon on demand loading, upon render->react suspends loading
 */


/**
 * Never dynamically load a component inside another component ,always outside the component on the top just wjere we write the import statement
 */




/**
 * Hook is just a normal js function
 * Why we need hooks?
 * Use cases of js functions?
 * 1)Readablity 2)Modularity 3)Reusability 4)Maintainable 5)Testable
 * 
 * How to create custom hookS?
 * 
 */