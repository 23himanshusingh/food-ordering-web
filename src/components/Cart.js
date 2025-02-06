// import ItemList from "./ItemList.js";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { clearCart } from "../../utils/cartSlice";

// const Cart = () => {
//   // make sure to subscribe to the exact portion of the redux store
//   // for better performance
//   // since we don't want to subscribe to whole store data
//   // like below we didn't subscribe to whole store instead only items in the cart
//   const cartItems = useSelector((store) => store.cart.items);

//   const dispatch = useDispatch();

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <div className="text-center m-4 p-4 ">
//       <h1 className="text-2xl font-bold">Cart</h1>
//       {/* display cart items */}
//       <div className="w-6/12 m-auto">
//         <button
//           className="p-2 m-2 bg-black text-white rounded-lg"
//           onClick={handleClearCart}
//         >
//           Clear Cart
//         </button>
//         {cartItems.length === 0 && (
//           <h1>Cart is empty. Add items to the cart!</h1>
//         )}
//         <ItemList items={cartItems} />
//       </div>
//     </div>
//   );
// };

// export default Cart;


// Cart.js
import ItemList from "./ItemList";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => Object.values(store.cart.items));
  const dispatch = useDispatch();
//   console.log(cartItems);
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;
    return total + price * item?.quantity;
  }, 0);

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <h1>Cart is empty. Add items to the cart!</h1>
      ) : (
        <div className="w-6/12 m-auto">
          <button
            className="p-2 m-2 bg-black text-white rounded-lg"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <ItemList items={cartItems} />
          <h2 className="text-xl font-semibold mt-4">
            Total Amount: ₹{(totalAmount / 100).toFixed(2)}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Cart;

