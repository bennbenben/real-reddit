import React, { useState, useEffect } from "react";
import "./style.css";
import Header from "./components/Header";
import BoardHeader from "./components/BoardHeader";
import PostForm from "./components/PostForm";
import AuthModal from "./components/AuthModal";
import AuthModalContext from "./components/AuthModalContext";
import UserContext from "./components/UserContext";
import axios from "axios";

const App = () => {

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    
    axios.get("http://localhost:8080/user", {withCredentials: true})
      .then(response => {
        console.log("response.data.username is: " + response.data.username);
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

        <Header />
        <AuthModal />
        <BoardHeader />
        <PostForm />

        <div className="px-6 bg-reddit_dark text-reddit_text">
          <div className="border border-reddit_border bg-reddit_dark-brighter p-2 rounded-md">
            <h5 className="text-reddit_text-darker text-sm">Posted by u/generalassembly 500 hours ago</h5>
            <h2 className="text-xl mb-3">Some header text here</h2>
            <div className="text-sm leading-6">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
};

export default App;
