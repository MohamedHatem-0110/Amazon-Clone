import React from "react";
import { useStateValue } from "./StateProvider";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();
  const isPresent = useIsPresent();
  const removeFromBasket = () => {
    //remove item from basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  const animations = {
    style: { position: isPresent ? "static" : "absolute" },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { stiffness: 500, damping: 50 },
  };
  return (
    <motion.div {...animations} layout className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} />
      <motion.div className="checkoutProduct__info">
        <motion.p className="checkoutProduct__title">{title}</motion.p>
        <motion.div className="checkoutProduct__price">
          <motion.small>$</motion.small>
          <motion.strong>{price}</motion.strong>
        </motion.div>
        <motion.div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </motion.div>
        {!hideButton && (
          <motion.button onClick={removeFromBasket}>
            Remove from Basket
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default CheckoutProduct;
