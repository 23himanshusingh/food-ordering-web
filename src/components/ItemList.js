import { CDN_URL } from "../../utils/constants";

const ItemList = ({ items }) => {
  return (
    <div className="p-4 space-y-4">
      {items.map((item, index) => {
        const info = item?.card?.info || {};
        const name = info.name || "Unnamed Item";
        const price = info.price || info.defaultPrice || 0;
        const description = info.description || "No description available";
        const imageId = info.imageId || "";
        const isVeg = info?.itemAttribute?.vegClassifier === "VEG";

        return (
          <div
            key={info.id || index}
            className="flex items-center border-b border-gray-300 pb-4"
          >
            <div className="w-9/12 pr-4">
              <div className="flex items-center mb-2">
                <h2 className="font-semibold text-lg mr-2">{name}</h2>
                <p className="text-md font-medium"> - ₹{(price / 100).toFixed(2)}</p>
                <span
                  className={`ml-2 w-4 h-4 rounded-b-sm ${
                    isVeg ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
              </div>
              <p className="text-sm text-gray-600 mb-2 text-left">{description}</p>
            </div>
            <div className="w-3/12 flex flex-col items-center relative">
              {imageId && (
                <img
                  src={`${CDN_URL}/${imageId}`}
                  alt={name}
                  className="w-32 h-32 object-cover rounded-lg mb-2 shadow-sm"
                />
              )}
              <button className="absolute top-0 p-2 rounded-lg bg-black text-white shadow-lg hover:bg-gray-800 transition z-10">
                Add +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
