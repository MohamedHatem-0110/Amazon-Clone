import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { motion, AnimatePresence } from "framer-motion";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://www.helium10.com/app/uploads/2018/12/Banner-Amazon-Advertising-Marketing-Guide-01.png"
          alt=""
          className="checkout__ad"
        />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>
          <AnimatePresence>
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
