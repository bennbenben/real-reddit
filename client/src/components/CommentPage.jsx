import React from 'react';
import { useParams } from 'react-router-dom';
import Comment from "./Comment";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Post from './Post';

const CommentPage = (props) => {

  const commentId = useParams().id;
  // const [comment, setComment] = useState({});

  // useEffect(() => {
  //   axios.get("http://localhost:8080/comments/" + commentId)
  //       .then(response => setComment(response.data));
  // }, [])
  

  return (
    // <div className="bg-reddit_dark py-4">
    //     {comment && (
    //         <Post {...comment} open={true} />
    //     )}
    // </div>
  <div className="py-4 px-6 bg-reddit_dark">
    <div className="bg-reddit_dark-brighter p-3 rounded-md">
      <Comment id={commentId} />
    </div>
  </div>
  )
}

export default CommentPage