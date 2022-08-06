import React, { useState, useEffect } from "react";
import "./App.scss";
import Home from "./pages/Home/Home";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import HotelRoom from "./components/hotels-room/hotels-room";
import RoomBooking from "./components/room-booking/room-booking";
import ContextProvider from "./context-api/context-provider";
import LoginModal from "./components/login-modal/login-modal";
import ContextApi from "./context-api/context-api";
import Invoice from "./components/invoice/invoice";
import bookingHistory from "./components/booking-history/bookingHistory";
import { Loader } from "./components/loader/loader";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  // loader
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
      console.clear();
    }, 1000);
  }, []);

  return (
    <ContextProvider>
      <div className="app">
        {loader ? (
          <Loader />
        ) : (
          <Router>
            <Header />
            <Switch>
              <Route exact path="/hotels" component={HotelRoom} />
              <Route exact path="/booking" component={RoomBooking} />
              <Route exact path="/invoice" component={Invoice} />
              <Route exact path="/history" component={bookingHistory} />
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
            <Footer />
          </Router>
        )}
      </div>
    </ContextProvider>
  );
}

export default App;
