import React from "react";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthModal from "./AuthModal";
import { CustomNavigate } from "./CustomNavigate";
import Header from "./Header";
import PostFormModal from "./PostFormModal";
import RedirectContext from "./RedirectContext";
import RoutingRoutes from "./RoutingRoutes";


const Routing = () => {
  const {redirect, setRedirect} = useContext(RedirectContext);

  // if (redirect) {
  //   return (<CustomNavigate to={redirect} />);
  // }

  return (
    <BrowserRouter>
      {redirect && (
        <CustomNavigate to={redirect} />
      )}
      {!redirect && (
        <>
          <Header />
          <RoutingRoutes />
          <PostFormModal />
          <AuthModal />
        </>
      )}
      
    </BrowserRouter>
  );
};

export default Routing;
