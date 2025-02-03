import RestaurantCard, { withDiscountInfo } from "./RestaurantCard";
import { useState, useEffect } from "react";
import resList from "../../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../../utils/useOnline";


const Body = () => {
  const [restaurants, setRestaurants] = useState(resList);
  const [filteredRestaurants, setFilteredRestaurants] = useState(resList);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardWithDiscount = withDiscountInfo(RestaurantCard);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const data = await fetch(
              "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=12.842446573558883&lng=80.15457578731436&carousel=true&third_party_vendor=1"
          );
          const json = await data.json();

          const restaurantList =
              json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

          setRestaurants(restaurantList);
          setFilteredRestaurants(restaurantList);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  if (!restaurants.length) return <Shimmer />;

  return (
      <div>
          <div className="flex my-3 p-5 bg-pink-200">
              <input
                  type="text"
                  className="bg-white p-2 hover:scale-105 
              transition-transform duration-200 rounded-md"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                  className="py-3 px-1 m-2 bg-purple-400 rounded-md font-semibold hover:scale-105 
              transition-transform duration-200 cursor-pointer"
                  onClick={() => {
                      const filtered = restaurants.filter((res) =>
                          res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
                      );
                      setFilteredRestaurants(filtered);
                  }}
              >
                  Search
              </button>
              <button
                  className="p-2 m-2 bg-purple-400 rounded-md font-semibold hover:scale-105 
              transition-transform duration-200 cursor-pointer"
                  onClick={() => {
                      const filtered = restaurants.filter((res) => res?.info?.avgRating > 4);
                      setFilteredRestaurants(filtered);
                  }}
              >
                  Top Rated
              </button>
          </div>
          <div className="flex flex-wrap">
              {filteredRestaurants.map((res) => (
                  <Link key={res?.info?.id} to={"/restaurants/" + res?.info?.id}>
                      <RestaurantCardWithDiscount resData={res} />
                  </Link>
              ))}
          </div>
      </div>
  );
};

export default Body;