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
// import { CommunityContextProvider } from "./components/CommunityContext";
import CommunityContext from "./components/CommunityContext";

// axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.baseURL = "https://real-reddit-server.onrender.com/";

const App = () => {

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);

  // Subreddit
  const [show, setShow] = useState(false);
  const [community, setCommunity] = useState();
  const [communityInfo, setCommunityInfo] = useState({});

  useEffect( () => {
    if (!community) {
      setCommunityInfo({});
      return;
    }
    axios.get(`/communities/${community}`, {withCredentials: true})
    // axios.get(`https://real-reddit-server.onrender.com/communities/${community}`, {withCredentials: true})
      .then(response => {
        setCommunityInfo(response.data);
      })
  }, [community])

  useEffect(() => {
    axios.get("/user", {withCredentials: true})
    // axios.get("https://real-reddit-server.onrender.com/user", {withCredentials: true})
      .then(response => {
        setUser(response.data);
      });
    

  }, []);

  function logout () {
    axios.post("/logout", {withCredentials: true})
    // axios.post("https://real-reddit-server.onrender.com/logout", {withCredentials: true})
      .then(setUser({}));
  }


  return (
    <AuthModalContext.Provider value={{show: showAuthModal, setShow: setShowAuthModal}}>
      <PostFormModalContext.Provider value={{show: showPostFormModal, setShow: setShowPostFormModal}}>
        <CommunityContext.Provider value={{show,setShow, community, setCommunity, ...communityInfo}}>
          <UserContext.Provider value={{...user, logout, setUser}}>
              <RedirectContext.Provider value={{redirect, setRedirect}}>
                <Routing />
              </RedirectContext.Provider>
          </UserContext.Provider>
        </CommunityContext.Provider>
      </PostFormModalContext.Provider>
    </AuthModalContext.Provider>
  );
};

export default App;
