import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthModal from "./AuthModal";
import Header from "./Header";
import PostFormModal from "./PostFormModal";
import RoutingRoutes from "./RoutingRoutes";


const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <RoutingRoutes />
      <PostFormModal />
      <AuthModal />
    </BrowserRouter>
  );
};

export default Routing;
