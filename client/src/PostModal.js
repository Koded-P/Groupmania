import Post from "./Post";
import axios from "axios";
import { useState, useEffect} from "react";
import ClickoutHandler from "react-clickout-handler";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import RootCommentContext from "./RootCommentContext";


function PostModal(props) {
 
  const postId = props.id;
  const visibleClass = props.open ? "block" : "hidden";
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  
  function refreshComments(){
    axios.get('http://localhost:4000/comments/root/' + postId)
    .then(res=>{
      setComments(res.data)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:4000/posts/" + postId).then((res) => {
      setPost(res.data);
    });
    
    refreshComments()
    
  }, [postId]);

  function close() {
    setPost({});
    props.onClickOut();
  }
  return (
    <div
      className={
        "w-screen h-screen fixed top-0 flex bottom-0  left-0 z-20 " +
        visibleClass
      }
      style={{ backgroundColor: "rgba(0,0,0,.9)" }}
    >
      <ClickoutHandler onClickOut={() => close()}>
        <div className="border border-gray-700 w-3/4 my-4  md:w-1/2 bg-black text-white mx-auto rounded-md self-center p-5">
          <div
            className=" block overflow-auto"
            style={{ maxHeight: "calc(100vh - 50px)" }}
          >
            <Post {...post} open={true} />
            {!!post && !!post.id && (
              <>
                <hr className="border-gray my-4" />
                <CommentForm onSubmit={()=>refreshComments()} rootId={post.id} parentId={post.id} showAuthor={true}></CommentForm>
                <hr className="border-gray my-4" />
                <RootCommentContext.Provider value={{refreshComments}}>
                  
                <Comments parentId={post.id} rootId={post.id} comments={comments} />
                </RootCommentContext.Provider>
              </>
            )}
          </div>
        </div>
      </ClickoutHandler>
    </div>
  );
}

export default PostModal;
