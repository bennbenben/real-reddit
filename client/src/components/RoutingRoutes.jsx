import React from 'react'
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Board from "./Board";
import CommentModal from './CommentModal';
import CommentPage from "./CommentPage";
import SearchResultsPage from './SearchResultsPage';

const RoutingRoutes = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [commentId, setCommentId] = useState(null);
  
  // console.log('location.state.source', location.state)

  if (location?.state?.commentId) {
    if (location?.state?.source) {
      location.pathname =`/r/${location.state.source}`;
    } else {
      location.pathname = '/';
    }
    if (!commentId) {
      setCommentId(location.state.commentId)
    }
  }

  const close = () => {
    navigate(`${location.pathname}`)
    setCommentId(null);

  }


  // const [postOpen, setPostOpen] = useState(false);

  // let location = useLocation();
  // console.log(location)
  
  // let commentId = null;
  
  // if (location.state && location.state.commentId) {
  //   location.pathname = "/";
  //   if (postOpen) {
  //     commentId = location.state.commentId;
  //   } else {
  //     location.state.commentId = null;
  //   }
  // }

  // useEffect(() => {
  //   setPostOpen(true);
  // }, [commentId]);

  // useEffect(() => {
  //   commentId = null;
  // }, [postOpen]);

  return (
    <div>
      {commentId && (
        <div>
          <CommentModal 
            id={commentId} 
            open={!!commentId} 
            onClickOut={() => close()} />
        </div>
      )}
      <Routes location={location}>
        <Route path="/" element={<Board />} />
        <Route path="/r/:community" element={<Board />} />
        <Route path="/comments/:id" element={<CommentPage />} />
        <Route path="/search/:text" element={<SearchResultsPage />} />
      </Routes>
    </div>
  )
}

export default RoutingRoutes;