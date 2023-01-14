import { useState } from "react";
import { db } from "./firebase";
export const initialState = {
  basket: [],
  user: null,
};

//Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      let newBasket1 = [...state.basket];
      action.item.id += newBasket1.length;
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product(id:${action.id}) becase it is not in the basket`
        );
      }
      return { ...state, basket: newBasket };
    case "EMPTY_BASKET":
      return { ...state, basket: [] };
    case "SET_USER":
      var b = db
        .collection("users")
        .doc(action.user?.uid)
        .collection("basket")
        .doc("123");
      console.log(b.get());
      return { ...state, user: action.user };
    case "SET_BASKET":
      if (action.basket) {
        return { ...state, basket: action.basket };
      }
      return { ...state };

    default:
      return state;
  }
};
export default reducer;
