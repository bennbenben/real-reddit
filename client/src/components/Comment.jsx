import Post from "./Post";
import CommentForm from "./CommentForm";
import RootCommentContext from "./RootCommentContext";
import Comments from "./Comments";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "./Button";

function Comment(props) {

  const [comment,setComment] = useState({});
  const [comments,setComments] = useState([]);
  const [commentsTotals, setCommentsTotals] = useState(null);
  const [userVotes, setUserVotes] = useState(null);

  function refreshComments() {
    axios.get('http://localhost:8080/comments/root/'+props.id)
    // axios.get('https://real-reddit-server.onrender.com/comments/root/'+props.id)
      .then(response => {
        setComments(response.data);
      });
  }

  function refreshVotes() {
    const commentsIds = [comment._id, ...comments.map(c => c._id) ];
    axios.post('http://localhost:8080/votes', {commentsIds}, {withCredentials:true})
    // axios.post('https://real-reddit-server.onrender.com/votes', {commentsIds}, {withCredentials:true})
      .then(response => {
        setCommentsTotals(response.data.commentsTotals);
        setUserVotes(response.data.userVotes);
      })
  }

  const deletePost = () => {
    // console.log("this is props:" + props.id)
    axios.post("http://localhost:8080/deletepost",{postId:props.id}, {withCredentials:true})
      .then();
  }

  useEffect(() => {
    if (props.comment) {
      setComment(props.comment);
    } else {
      axios.get('http://localhost:8080/comments/'+props.id)
      // axios.get('https://real-reddit-server.onrender.com/comments/'+props.id)
        .then(response => {
          setComment(response.data);
        });
    }
    refreshComments();
  }, [props.id, props.comment]);

  useEffect(() => {
    refreshVotes();
  }, [comments.length]);

  return (
    <>
      {comment && (
        <>
          <Post {...comment} open={true} />
          <Button onClick={deletePost}>Delete Post</Button>
        </>
      )}
      {!!comment && !!comment._id && (
        <>
          <hr className="border-reddit_border my-4"/>
          <CommentForm onSubmit={() => refreshComments()}
                       rootId={comment._id} parentId={comment._id} showAuthor={true} />
          <hr className="border-reddit_border my-4"/>
          <RootCommentContext.Provider value={{refreshComments,refreshVotes,commentsTotals,userVotes}}>
            <Comments parentId={comment._id} rootId={comment._id} comments={comments} />
          </RootCommentContext.Provider>
        </>
      )}
    </>
  );
}

export default Comment;