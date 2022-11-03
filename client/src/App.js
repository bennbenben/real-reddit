import React, { useState, useEffect } from "react";
import "./style.css";
import AuthModal from "./components/AuthModal";
import AuthModalContext from "./components/AuthModalContext";
import UserContext from "./components/UserContext";
import axios from "axios";
import Routing from "./components/Routing";
import PostFormModal from "./components/PostFormModal";
import PostFormModalContext from "./components/PostFormModalContext";
import RedirectContext from "./components/RedirectContext";

const App = () => {

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/user", {withCredentials: true})
    // axios.get("https://real-reddit-server.onrender.com/user", {withCredentials: true})
      .then(response => {
        setUser(response.data);
      });
    

  }, []);

  function logout () {
    axios.post("http://localhost:8080/logout", {withCredentials: true})
    // axios.post("https://real-reddit-server.onrender.com/logout", {withCredentials: true})
      .then(setUser({}));
  }


  return (
    <AuthModalContext.Provider value={{show: showAuthModal, setShow: setShowAuthModal}}>
      <PostFormModalContext.Provider value={{show: showPostFormModal, setShow: setShowPostFormModal}}>
        <UserContext.Provider value={{...user, logout, setUser}}>
            <RedirectContext.Provider value={{redirect, setRedirect}}>
              <Routing />
            </RedirectContext.Provider>
        </UserContext.Provider>
      </PostFormModalContext.Provider>
    </AuthModalContext.Provider>
  );
};

export default App;
