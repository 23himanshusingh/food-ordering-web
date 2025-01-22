import { CDN_URL } from "../../utils/constants";


const styleCard = {
    backgroundColor:"#f0f0f0"
}

const RestaurantCard = (props) => {

    const {resData} = props;

    const {cloudinaryImageId,name,costForTwo,cuisines,avgRating} = resData?.info;


    return (
        <div className="res-card" style={styleCard}>
            <img className="res-logo" 
            src={CDN_URL + cloudinaryImageId}
            alt="res-logo" />
            <h3>{name}</h3>
            <h4>{avgRating}</h4>
            <h4>{costForTwo}</h4>
            <h4>{cuisines.join(", ")}</h4>
        </div>
    );
};

export default RestaurantCard;