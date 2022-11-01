import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import UserContext from "./UserContext";
import TextArea from "./TextArea";
import Button from "./Button";
import axios from 'axios';

const CommentForm = (props) => {
  const userInfo = useContext(UserContext);
  const [commentBody, setCommentBody] = useState("");

  const postComment = (e) => {
    e.preventDefault();
    const data = {body:commentBody, parentId:props.parentId, rootId:props.rootId};
    axios.post("http://localhost:8080/comments", data, {withCredentials:true})
      .then(response => {
        setCommentBody("");
      });
  }

  return (
    <div>
      {userInfo.username && props.showAuthor && (
        <div className="mb-2">
          Comment as {userInfo.username}
        </div>
      )}
      
      <form onSubmit={e => postComment(e)}>
        <TextArea className="w-full mb-3" 
          onChange={e => setCommentBody(e.target.value)} 
          value={commentBody} 
          placeholder={"Your comment. You can use markdown here"} 
        />
        <div className="text-right">
          {!!props.onCancel && (
            <Button outline className="p-2 mr-2" onClick={e => props.onCancel()}>Cancel</Button>
          )}
          <Button className="p-2">Comment</Button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm;