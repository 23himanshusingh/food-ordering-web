import { LOGO_URL } from "../../utils/constants";
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const location = useLocation();

  const {loggedInUser} = useContext(UserContext);

  const isActive = (path) => location.pathname === path;

  //subscribing to store using a selector
  const cartItems = useSelector((store) => store.cart.items);

  const itemCount = Object.values(cartItems).reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="flex justify-between items-center bg-pink-200 shadow-lg px-6 py-4">
      {/* Logo */}
      <div className="logo-container">
        <img className="h-16 w-auto" src={LOGO_URL} alt="Logo" />
      </div>

      {/* Navigation Menu */}
      <div>
        <ul className="flex space-x-6">
          <li
            className={`px-3 py-2 rounded-md font-semibold transition-transform duration-200 ${
              isActive("/")
                ? "bg-white text-pink-600 scale-105 shadow-md"
                : "text-gray-700 hover:text-pink-600 hover:scale-105"
            }`}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={`px-3 py-2 rounded-md font-semibold transition-transform duration-200 ${
              isActive("/about")
                ? "bg-white text-pink-600 scale-105 shadow-md"
                : "text-gray-700 hover:text-pink-600 hover:scale-105"
            }`}
          >
            <Link to="/about">About</Link>
          </li>
          <li
            className={`px-3 py-2 rounded-md font-semibold transition-transform duration-200 ${
              isActive("/contact")
                ? "bg-white text-pink-600 scale-105 shadow-md"
                : "text-gray-700 hover:text-pink-600 hover:scale-105"
            }`}
          >
            <Link to="/contact">Contact</Link>
          </li>
          <li
            className={`px-3 py-2 rounded-md font-semibold transition-transform duration-200 ${
              isActive("/cart")
                ? "bg-white text-pink-600 scale-105 shadow-md"
                : "text-gray-700 hover:text-pink-600 hover:scale-105"
            }`}
          >
            <Link to="/cart">Cart ({itemCount})</Link>
          </li>
          <li>
            <button
              className="px-4 py-2 rounded-md bg-white font-semibold text-gray-700 hover:text-pink-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
              onClick={() => {
                btnName === "Login"
                  ? setBtnName("Logout")
                  : setBtnName("Login");
              }}
            >
              {btnName}
            </button>
          </li>
          <li
            className="px-3 py-2 rounded-md font-semibold transition-transform duration-200"
          >
            {loggedInUser}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
