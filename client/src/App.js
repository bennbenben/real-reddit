import React from "react";
import "./style.css";
import Header from "./components/Header";
import BoardHeader from "./components/BoardHeader";
import PostForm from "./components/PostForm";
import AuthModal from "./components/AuthModal";
import AuthModalContext from "./components/AuthModalContext";
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from "./components/UserContext";
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"
import Board from "./components/Board";
import CommentPage from "./components/CommentPage";

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get( 'http://localhost:4000/user', {withCredentials: true})
      .then(response => setUser(response.data));
  }, [])

  function logout() {
    axios.post( 'http://localhost:4000/logout', {}, {withCredentials: true})
    .then(() => setUser({}));
  }
  

  return (
    <AuthModalContext.Provider value={{show: showAuthModal, setShow: setShowAuthModal}}>
      <UserContext.Provider value={{...user, logout, setUser}}>
        <Router>
        <Header />
          <Routes>
            <Route exact path="/" element={<Board />}></Route>
            <Route exactpath="/comments/:id" element={<CommentPage />} />
          </Routes>
        </Router>
        <AuthModal />
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
};

export default App;
