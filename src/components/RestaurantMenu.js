import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useRestaurant from "../../utils/useRestaurant";
import { CDN_URL } from "../../utils/constants";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const params = useParams();
  const resInfo = useRestaurant(params.resid);
  const [showIndex, setShowIndex] = useState(-1);

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
        (<RestaurantCategory key={index}
          showItems = {index === showIndex ? true : false}
          setShowIndex = {() => setShowIndex(index)}
          data={category?.card?.card}/>)
      )}
    </div>
  );
};

export default RestaurantMenu;
