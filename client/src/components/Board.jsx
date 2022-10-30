import React from 'react'
import BoardHeader from './BoardHeader'
import PostForm from './PostForm'
import PostsListing from './PostsListing'

const Board = () => {
  return (
    <div>
        <BoardHeader />
        <PostForm />
        <PostsListing />
    </div>
  )
}

export default Board