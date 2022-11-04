import React from 'react'
import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import BoardHeader from './BoardHeader'
import CommunityContext from './CommunityContext'
import PostForm from './PostForm'
import PostsListing from './PostsListing'

const Board = () => {
  const { community: communityFromUrl } = useParams();
  const { setCommunity } = useContext(CommunityContext);

  useEffect(() => {
    setCommunity(communityFromUrl);
    // return () => {}
  }, [communityFromUrl])
  

  return (
    <div>
        <BoardHeader />
        <PostForm />
        <PostsListing />
    </div>
  )
}

export default Board