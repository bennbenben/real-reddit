import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';
import { Link } from "react-router-dom";

const SearchResultsPage = (props) => {
  const {text} = useParams();
  const [comments, setComments] = useState([]);
  const [communities, setCommunities] = useState([])

  useEffect(() => {
    axios.get(`/search?phrase=${text}`, {withCredentials:true})
    // axios.get(`https://real-reddit-server.onrender.com/search?phrase=${text}`, {withCredentials:true})
      .then(response => {
        setComments(response.data.comments);
        setCommunities(response.data.communities);
      });
  }, []);

  // console.log(('communities',communities))
  // console.log(('comments',comments))

  return (
    <div className="bg-reddit_dark">
      {communities.map(community => (
        <Link 
          className={'block bg-reddit_dark-brighter p-3 mx-6 border-2 border-reddit_border text-reddit_text rounded mb-2 border hover:border-white'}
          to={`/r/${community.name}`}>r/{community.name}</Link>
      ))}
      {comments.map(comment => (
        <Post {...comment} isListing={true} />
      ))}
    </div>
  );
}

export default SearchResultsPage;