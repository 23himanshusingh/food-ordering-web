import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurant from "../../utils/useRestaurant";
import { CDN_URL } from "../../utils/constants";

const RestaurantMenu = () => {
  const params = useParams();
  const resInfo = useRestaurant(params.resid);

  if (resInfo === null) {
    return <Shimmer />;
  }

  // Extract restaurant details
  const restaurantInfo = resInfo?.cards[2]?.card?.card?.info || {};
  const { name, avgRating, cuisines, costForTwoMessage, cloudinaryImageId } = restaurantInfo;

  // Extract menu items
  const menuCards =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  const menuItems = menuCards
    .flatMap((card) => card?.card?.card?.itemCards || [])
    .map((item) => item.card.info);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Restaurant Details */}
      <div
        className="bg-cover bg-center bg-no-repeat text-center text-white shadow-md rounded-md p-6 mb-6"
        style={{
          backgroundImage: `url(${CDN_URL + cloudinaryImageId})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <h1 className="text-4xl font-bold drop-shadow-md mb-4">
          {name || "Restaurant Name"}
        </h1>
        <p className="text-lg drop-shadow-md">
          Cuisines: {cuisines?.join(", ") || "Not available"}
        </p>
        <p className="text-lg drop-shadow-md mt-2">⭐ Rating: {avgRating || "Not rated"}</p>
        <p className="text-lg drop-shadow-md mt-2">{costForTwoMessage || "Cost details not available"}</p>
      </div>

      {/* Menu Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Menu</h2>
      <div className="bg-white shadow-md rounded-md p-6">
        <ul className="space-y-4">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <li
                key={item?.id}
                className="border-b pb-4 last:border-none"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium text-gray-800">
                      {item?.name}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      ₹{item?.price / 100 || item.defaultPrice / 100}
                    </p>
                    <p className="text-gray-500 mt-1">
                      {item?.description || "No description available"}
                    </p>
                    <p
                      className={`text-sm font-semibold mt-1 ${
                        item?.itemAttribute?.vegClassifier === "VEG"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item?.itemAttribute?.vegClassifier || "Classification unknown"}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No menu items available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
