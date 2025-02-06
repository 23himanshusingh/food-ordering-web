import { useDispatch } from "react-redux";
import { incrementItem, decrementItem } from "../../utils/cartSlice";
import { CDN_URL } from "../../utils/constants";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleIncrementItem = (item) => {
    dispatch(incrementItem(item));
  };

  const handleDecrementItem = (item) => {
    dispatch(decrementItem(item));
  };

  return (
    <div className="p-4 space-y-4">
      {items.map((item) => {
        const info = item?.card?.info || item;
        const name = info.name || "Unnamed Item";
        const price = info.price || info.defaultPrice || 0;
        const imageId = info.imageId || "";
        const isVeg = info?.itemAttribute?.vegClassifier === "VEG";
        const quantity = item.quantity;
        const id = info?.id;

        return (
          <div
            key={id}
            className="flex items-center border-b border-gray-300 pb-4"
          >
            <div className="w-9/12 pr-4">
              <div className="flex items-center mb-2">
                <h2 className="font-semibold text-lg mr-2">{name}</h2>
                <p className="text-md font-medium">
                  - ₹{((price * quantity) / 100).toFixed(2)}
                </p>
                <span
                  className={`ml-2 w-4 h-4 rounded-b-sm ${
                    isVeg ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
              </div>
              <div className="flex items-center">
                <button
                  className="p-2 bg-gray-300 rounded-l-md"
                  onClick={() => handleDecrementItem(item)}
                >
                  -
                </button>
                <span className="px-4 border-t border-b border-gray-300">
                  {quantity}
                </span>
                <button
                  className="p-2 bg-gray-300 rounded-r-md"
                  onClick={() => handleIncrementItem(item)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="w-3/12 flex flex-col items-center">
              {imageId && (
                <img
                  src={`${CDN_URL}/${imageId}`}
                  alt={name}
                  className="w-24 h-24 object-cover rounded-lg mb-2 shadow-sm"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;

