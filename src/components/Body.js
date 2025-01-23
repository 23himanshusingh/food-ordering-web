import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import resList from "../../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../../utils/useOnline";

const Body = () => {
  //local state variable
  const [restaurants, setRestaurants] = useState(resList);
  const [filteredRestaurants, setFilteredRestaurants] = useState(resList);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=12.89960&lng=80.22090&carousel=true&third_party_vendor=1"
      );
      const json = await data.json();

      console.log(json);

      setRestaurants(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      setFilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isOnline = useOnline();

  if (!isOnline){
    return (
      <div className="container"><h1>Oops! You are Offline</h1></div>
    )
  }

  if (restaurants.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={() => {
            const filtered = restaurants.filter((res) => {
              return res?.info?.name?.toLowerCase().includes(searchText.toLowerCase());
            });
            setFilteredRestaurants(filtered);
          }
          }>
          Search</button>
        </div>

        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = restaurants.filter(
              (res) => res?.info?.avgRating > 4
            );
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
    
      </div>
      <div className="res-container">
        {filteredRestaurants.map((res) => (
          <Link key={res?.info?.id} to={"/restaurants/"+res?.info?.id}>
            <RestaurantCard resData={res} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
