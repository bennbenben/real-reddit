import React, { useState, useEffect } from "react";
import "./style.css";
import AuthModalContext from "./components/AuthModalContext";
import UserContext from "./components/UserContext";
import axios from "axios";
import Routing from "./components/Routing";
import PostFormModalContext from "./components/PostFormModalContext";

const App = () => {

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostFormModal, setShowPostFormModal] = useState(false);
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
      <PostFormModalContext.Provider value={{show: showPostFormModal, setShow: setShowPostFormModal}}>
        <UserContext.Provider value={{...user, logout, setUser}}>
          <Routing />
        </UserContext.Provider>
      </PostFormModalContext.Provider>
    </AuthModalContext.Provider>
  );
};

export default App;
