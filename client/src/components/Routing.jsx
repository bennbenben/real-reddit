import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import RoutingRoutes from "./RoutingRoutes";


const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <RoutingRoutes />
    </BrowserRouter>
  );
};

export default Routing;
