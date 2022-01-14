import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

function Post(props) {
  return (
    <div className="  px-6 text-white pb-4">
      <Link to={{pathname:'/post/' + props.id, state:{postId:props.id}}} className={"block border border-black  bg-gray-500 p-2 rounded-md " + (props.open ? "":"hover:border-white cursor-pointer ")}>
        <h5 className="text-gray-600 text-sm mb-1">
          Posted By {props.author} <TimeAgo datetime={props.createdAt}/> 
        </h5>
        <h2 className="text-2xl mb-2">{props.title}</h2>
        <div className="text-sm leading-6">{props.body}</div>
      </Link>
    </div>
  );
}

export default Post;
