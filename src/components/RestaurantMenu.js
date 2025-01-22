import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../../utils/constants";
import mockResData from "../../utils/mockResData";

const RestaurantMenu = () => {
  // Local state variable
  const [resInfo, setResInfo] = useState(null);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + params.resid);
      const json = await data.json();

      console.log(json);
      setResInfo(json?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (resInfo === null) {
    return <Shimmer />;
  }

  // Extract restaurant details
  const restaurantInfo = resInfo?.cards[2]?.card?.card?.info || {};
  const { name, avgRating, cuisines, costForTwoMessage } = restaurantInfo;

  // Extract menu items
  const menuCards =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  const menuItems = menuCards
    .flatMap((card) => card?.card?.card?.itemCards || [])
    .map((item) => item.card.info);

  return (
    <div className="menu">
      <div className="restaurant-details">
        <h1>{name || "Restaurant Name"}</h1>
        <p>Cuisines: {cuisines?.join(", ") || "Not available"}</p>
        <p>⭐ Rating: {avgRating || "Not rated"}</p>
        <p>{costForTwoMessage || "Cost details not available"}</p>
      </div>

      <h2>Menu</h2>
      <ul className="menu-list">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <li key={item?.id} className="menu-item">
              <div>
                <h3>{item?.name}</h3>
                <p>₹{item?.price / 100 || item.defaultPrice / 100}</p>
                <p>{item?.description || "No description available"}</p>
                <p>
                  <strong>
                    {item?.itemAttribute?.vegClassifier || "Classification unknown"}
                  </strong>
                </p>
              </div>
            </li>
          ))
        ) : (
          <p>No menu items available</p>
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
