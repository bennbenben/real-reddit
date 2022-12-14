import React from 'react';
import ClickOutHandler from 'react-clickout-handler';
import { useState, useContext } from 'react';
import axios from 'axios';
import PostFormModalContext from './PostFormModalContext';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import AuthModalContext from './AuthModalContext';
import { CustomNavigate } from './CustomNavigate';
import CommunityContext from './CommunityContext';

const PostFormModal = () => {

  const modalContext = useContext(PostFormModalContext);
  const authModalContext = useContext(AuthModalContext);
  const {community} = useContext(CommunityContext);

  const visibleClass = modalContext.show ? "block" : "hidden";
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [newPostId, setNewPostId] = useState(null);

  const createPost = () => {
    const data = {title, body, community};
    axios.post("/comments", data, {withCredentials: true})
    // axios.post("https://real-reddit-server.onrender.com/comments", data, {withCredentials: true})
      .then(response => {
        setNewPostId(response.data._id);
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
            authModalContext.setShow("login");
        }
      });
  }

  if (newPostId) {
    return (<CustomNavigate to={"/comments/" + newPostId} />);
  }

  return (
    <div className={"w-screen h-screen fixed top-0 left-0 z-20 flex content-center " + visibleClass} style={{backgroundColor:'rgba(0,0,0,.8'}}>
      <ClickOutHandler onClickOut={() => {}}>
        <div className="border border-reddit_dark-brightest w-3/4 sm:w-1/2 md:1/4 bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-xl">
          
          <h1 className={"text-2xl mb-5"}>Create a post</h1>
          <Input className={"w-full mb-3"} placeholder={"Title"} onChange={e => setTitle(e.target.value)} value={title} />
          <TextArea className={"w-full mb-3"} placeholder={"Post text (you can use markdown)"} onChange={e => setBody(e.target.value)} value={body} />
          
          <div className={"text-right"}>
            <Button onClick={() => modalContext.setShow(false)} outline className={"px-4 py-2 mr-3"}>Cancel</Button>
            <Button onClick={() => createPost()} className={"px-4 py-2"}>POST</Button>
          </div>

        </div>
      </ClickOutHandler>
    </div>
  )
}

export default PostFormModal