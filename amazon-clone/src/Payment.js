import { AnimatePresence } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const date = new Date();
  const getTimeEpoch = () => {
    return new Date().getTime().toString();
  };
  const handlePay = () => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(getTimeEpoch())
        .set({ basket: basket, amount: getBasketTotal(basket), date: date });
      dispatch({
        type: "EMPTY_BASKET",
      });
      navigate("/orders");
    }
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout ({<Link to="/checkout">{basket?.length}items</Link>})</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 Baker's Street</p>
            <p>London, England</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Reivew Items and delivery</h3>
          </div>
          <div className="payment__items">
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

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details"></div>
        </div>
        <div className="payment__section">
          <div className="payment__confirmation">
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <p>
                    Subtotal ({basket.length} items): <strong>{value}</strong>
                  </p>
                </>
              )}
              decimalScale={2}
              value={getBasketTotal(basket)} // Part of the homework
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            <button onClick={handlePay} className="payment__button">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
