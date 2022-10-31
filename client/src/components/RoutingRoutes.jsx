import React from 'react'
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Board from "./Board";
import CommentModal from './CommentModal';
import CommentPage from "./CommentPage";

const RoutingRoutes = () => {
  const [postOpen, setPostOpen] = useState(false);

  let location = useLocation();
  console.log(location)
  
  let commentId = null;

  if (location.state && location.state.commentId) {
    location.pathname = "/";
    if (postOpen) {
      commentId = location.state.commentId;
    } else {
      location.state.commentId = null;
    }
  }

  useEffect(() => {
    setPostOpen(true);
  }, [commentId]);

  useEffect(() => {
    commentId = null;
  }, [postOpen]);

  return (
    <div>
      {commentId && (
        <div>
          <CommentModal id={commentId} open={postOpen} onClickOut={() => setPostOpen(false)} />
        </div>
      )}
      <Routes location={location}>
        <Route path="/" element={<Board />} />
        <Route path="/comments/:id" element={<CommentPage />} />
      </Routes>
    </div>
  )
}

export default RoutingRoutes