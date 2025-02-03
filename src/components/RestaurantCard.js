import { CDN_URL } from "../../utils/constants";


const styleCard = {
    backgroundColor:"#f0f0f0"
}

const RestaurantCard = (props) => {

    const {resData} = props;

    const {cloudinaryImageId,name,costForTwo,cuisines,avgRating} = resData?.info;

    return (
        <div className="">
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

// Higher order component

// input - RestaurantCard => RestaurantCardPromoted

export const withDiscountInfo = (RestaurantCard) => {
    return (props) => {
        const { resData } = props;
        const discountInfo = resData?.info?.aggregatedDiscountInfoV3;

        return (
            <div className="relative w-56 p-3 m-3 shadow-lg bg-pink-100 hover:scale-105 
        transition-transform duration-200 cursor-pointer">
                {/* Conditionally render the discount info */}
                {discountInfo && (
                    <label
                        className="absolute top-2 left-2 bg-black text-white font-bold p-2 rounded-md text-xs"
                    >
                        {discountInfo.header} {discountInfo.subHeader}
                    </label>
                )}
                <RestaurantCard {...props} />
            </div>
        );
    };
};


export default RestaurantCard;