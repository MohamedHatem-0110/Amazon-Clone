import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import Orders from "./Orders";
import { db } from "./firebase";

function App() {
  const [{}, dispatch] = useStateValue();
  const [basket, setBasket] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      //console.log("User is ", authUser);
      if (authUser) {
        //the user is/was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the use is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
      if (authUser) {
        db.collection("users")
          .doc(authUser?.uid)
          .collection("basket")
          .doc("123")
          .onSnapshot((snapshot) => {
            setBasket(snapshot);
          });
        console.log(basket);
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
