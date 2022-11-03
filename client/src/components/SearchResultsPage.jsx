import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

const SearchResultsPage = (props) => {
  const {text} = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/comments?search=' + text, {withCredentials:true})
      .then(response => setComments(response.data));
  }, []);


  return (
    <div className="bg-reddit_dark">
      {comments.map(comment => (
        <Post {...comment} isListing={true} />
      ))}
    </div>
  );
}

export default SearchResultsPage;