import { CDN_URL } from "../../utils/constants";


const styleCard = {
    backgroundColor:"#f0f0f0"
}

const RestaurantCard = (props) => {

    const {resData} = props;

    const {cloudinaryImageId,name,costForTwo,cuisines,avgRating} = resData?.info;


    return (
        <div className="w-56 p-3 m-3 shadow-lg bg-pink-100 hover:scale-105 
        transition-transform duration-200 cursor-pointer">
            <img className="res-logo" 
            src={CDN_URL + cloudinaryImageId}
            alt="res-logo" />
            <h3 className="font-bold text-xl">{name}</h3>
            <h4 className="font-semibold">{avgRating}</h4>
            <h4 className="font-semibold">{costForTwo}</h4>
            <h4 className="font-semibold">{cuisines.join(", ")}</h4>
        </div>
    );
};

export default RestaurantCard;