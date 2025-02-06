// MenuItem.js
import { useDispatch, useSelector } from "react-redux";
import { addItem, incrementItem, decrementItem } from "../../utils/cartSlice";
import { CDN_URL } from "../../utils/constants";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const itemId = item?.card?.info?.id;
  const cartItem = cartItems[itemId];
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddItem = () => {
    dispatch(addItem(item));
  };

  const handleIncrement = (item) => {
    dispatch(incrementItem(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementItem(item));
  };

  const info = item?.card?.info || item;
  const name = info.name || "Unnamed Item";
  const price = info.price || info.defaultPrice || 0;
  const imageId = info.imageId || "";
  const isVeg = info?.itemAttribute?.vegClassifier === "VEG";
  const description = info.description || "No description available";

  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-4">
      <div className="w-8/12">
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="text-md font-medium">₹{(price / 100).toFixed(2)}</p>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
      </div>
      <div className="relative w-4/12 flex flex-col items-center">
        {imageId && (
          <img
            src={`${CDN_URL}/${imageId}`}
            alt={name}
            className="w-24 h-24 object-cover rounded-lg mb-2 shadow-sm"/>
        )}
        {quantity === 0 ? (
          <button
            className="absolute bottom-0 p-2 bg-green-500 text-white rounded-md"
            onClick={handleAddItem}
          >
            Add
          </button>
        ) : (
          <div className="absolute bottom-0 flex items-center">
            <button
              className="p-2 bg-gray-300 rounded-l-md"
              onClick={()=>{handleDecrement(item)}}
            >
              -
            </button>
            <span className="p-2 bg-gray-200">{quantity}</span>
            <button
              className="p-2 bg-gray-300 rounded-r-md"
              onClick={()=>{handleIncrement(item)}}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;