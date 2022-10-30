import React, { useState, useEffect } from "react";
import "./style.css";
import AuthModal from "./components/AuthModal";
import AuthModalContext from "./components/AuthModalContext";
import UserContext from "./components/UserContext";
import axios from "axios";
import Routing from "./components/Routing";

const App = () => {

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState({});
  

  useEffect(() => {
    axios.get("http://localhost:8080/user", {withCredentials: true})
      .then(response => {
        setUser(response.data);
      });
    

  }, []);

  function logout () {
    axios.post("http://localhost:8080/logout", {withCredentials: true})
      .then(setUser({}));
  }


  return (
    <AuthModalContext.Provider value={{show: showAuthModal, setShow: setShowAuthModal}}>
      <UserContext.Provider value={{...user, logout, setUser}}>
        <Routing />
        <AuthModal />
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
};

export default App;
