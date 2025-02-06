// import { createSlice } from "@reduxjs/toolkit"

// const cartSlice = createSlice(
//     {
//         name: 'cart',
//         initialState: {
//             items: [],
//         },
//         reducers: {
//             addItem: (state, action) => {
//                 // mutating the state here
//                 state.items.push(action.payload);
//             },
//             removeItem: (state) => {
//                 state.items.pop();
//             },
//             clearCart: (state) => {
//                 state.items.length = 0; // []
//             },
//         }
//     }
// );

// export const {addItem, removeItem, clearCart} = cartSlice.actions;

// export default cartSlice.reducer;


// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {}, // Use an object for quick access and updates
  },
  reducers: {
    addItem: (state, action) => {
      const id = action.payload?.card?.info?.id;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { ...action.payload, quantity: 1 };
      }
    },
    incrementItem: (state, action) => {
      const id = action.payload?.card?.info?.id;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      }
    },
    decrementItem: (state, action) => {
      const id = action.payload?.card?.info?.id;
      if (state.items[id]) {
        if (state.items[id].quantity > 1) {
          state.items[id].quantity -= 1;
        } else {
          delete state.items[id];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, incrementItem, decrementItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
