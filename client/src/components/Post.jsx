import React from "react";
import { Link } from "react-router-dom";
import PostContent from "./PostContent";

const Post = (props) => {
  let postClasses =
    "block border border-reddit_border bg-reddit_dark-brighter p-2 rounded-md " +
    (props.open ? "" : "hover:border-reddit_text cursor-pointer");
  if (props.isListing) {
    postClasses += " bg-reddit_dark-brighter p-3 mx-6 border-2 border-reddit_border";
  } else {
    postClasses += " border-none";
  }
  // console.log("props._id is: "+props._id)

  return (
    <div className="text-reddit_text pb-4">
      {props.open && (
        <div className={postClasses}>
          <PostContent {...props} />
        </div>
      )}

      {!props.open && (
        <Link to={"/comments/" + (props.rootId || props._id)} 
        state={{ commentId: (props.rootId || props._id) }} 
        className={postClasses}>
          <PostContent {...props} />
        </Link>
      )}
    </div>
  );
};

export default Post;
