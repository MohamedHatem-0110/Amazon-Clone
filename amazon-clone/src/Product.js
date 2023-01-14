import { MotionConfig } from "framer-motion";
import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "./firebase";
function Product({ id, title, image, price, rating }) {
  const [{ basket, user }, dispatch] = useStateValue();
  //console.log(basket);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
    db.collection("users")
      .doc(user?.uid)
      .collection("basket")
      .doc("123")
      .set({ basket: basket });
  };
  return (
    <motion.div
      className="product"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 0px 3px rgb(0,0,0)",
        zIndex: 2,
      }}
    >
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <p className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </p>
      </div>
      <img src={image} alt="" />
      <motion.button whileHover={{ scale: 1.2 }} onClick={addToBasket}>
        Add to Basket
      </motion.button>
    </motion.div>
  );
}

export default Product;
