import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Cart from "./components/Cart";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import { lazy, Suspense } from "react";
import Shimmer from "./components/Shimmer";
import UserContext from "../utils/UserContext";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";

// dynamic / lazy loading of About component
const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  const [userName, setUserName] = useState();

  // authentication code...
  useEffect(() => {
    // make an api call and send username and password
    const data = {
      username: "",
    };
    setUserName(data.username);
  }, []);

  return (
    
    <Provider store={appStore}>
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
            <div className="class">
            <Header />
            <Outlet />
            </div>
        </UserContext.Provider>
    </Provider>
    
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          // we need suspense because of lazy loading or dynamic loading
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resid",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

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
 * Never dynamically load a component inside another component ,always outside the component on the top just where we write the import statement
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
