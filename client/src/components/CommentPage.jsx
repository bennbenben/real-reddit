import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

const CommentPage = (props) => {

  const commentId = useParams().id;
  const [comment, setComment] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/comments/" + commentId)
        .then(response => setComment(response.data));
  }, [])
  

  return (
    <div className="bg-reddit_dark py-4">
        {comment && (
            <Post {...comment} open={true} />
        )}
    </div>
  )
}

export default CommentPage