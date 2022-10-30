import React from 'react'
import Post from './Post';
import axios from 'axios';
import { useState, useEffect } from "react";



function PostsListing() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get( 'http://localhost:4000/comments', {withCredentials: true})
    .then(response => setComments(response.data));
  }, [])

  return (
    <div className="bg-reddit_dark">
        {comments.map(comment => (
            <Post {...comment} />
        ))}
    </div>
  );
}

export default PostsListing