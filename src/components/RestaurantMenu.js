import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurant from "../../utils/useRestaurant";
import { CDN_URL } from "../../utils/constants";
import RestaurantCategory from "./RestaurantCategory";

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

  

  const categories = menuCards.filter((c) => {
    return c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
  });

  // console.log(categories);


  return (

    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/** categories accordian */}
      {categories.map((category,index) =>
        (<RestaurantCategory key={index} data={category?.card?.card}/>)
      )}
    </div>
  );
};

export default RestaurantMenu;
