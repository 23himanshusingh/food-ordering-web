import { useState,useEffect } from "react";
import { MENU_API } from "./constants";

const useRestaurant = (resid) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + resid);
      const json = await data.json();

      setResInfo(json?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return resInfo;
};

export default useRestaurant;
