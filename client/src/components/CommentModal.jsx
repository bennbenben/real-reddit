import PostContent from "./PostContent";
import {useEffect, useState} from "react";
import axios from "axios";
import ClickOutHandler from 'react-clickout-handler';
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const CommentModal = (props) => {

  const [comment,setComment] = useState({});
  const [comments,setComments] = useState([]);
  const visibleClass = props.open ? 'block' : 'hidden';

  useEffect(() => {
    axios.get('http://localhost:8080/comments/'+props.id)
      .then(response => {
        setComment(response.data);
      });
    axios.get('http://localhost:8080/comments/root/'+props.id)
      .then(response => {
        setComments(response.data);
      });
  }, [props.id]);

  const close = () => {
    setComment({});
    props.onClickOut();
  }

  return (
    <div className={"w-screen h-screen fixed top-0 left-0 z-20 flex "+visibleClass} style={{backgroundColor:'rgba(0,0,0,.8)'}}>
      <ClickOutHandler onClickOut={() => close()}>
        <div className="border my-4 border-reddit_dark-brightest w-3/4 md:w-1/2 bg-reddit_dark-brighter text-reddit_text self-center p-4 mx-auto rounded-md">
          <div className="block overflow-scroll" style={{maxHeight:"calc(100vh - 50px)"}}>
            <PostContent open={true} {...comment} />
            {!!comment && !!comment._id && (
              <>
                <hr className="border-reddit_border my-4" />
                <CommentForm rootId={comment._id} parentId={comment._id} showAuthor={true} />
                <hr className="border-reddit_border my-4" />
                <Comments comments={comments} parentId={comment._id} />
              </>
            )}
            
          </div>
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default CommentModal;