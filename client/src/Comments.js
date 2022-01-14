import TimeAgo from "timeago-react";
import CommentForm from "./CommentForm";
import { useState,useContext } from "react";
import RootCommentContext from "./RootCommentContext";


function Comments(props) {
    const [showForm, setShowForm] = useState(false)
   
  const comments = props.comments.filter(
    (comment) => props.parentId === comment.parentId
  );
  
  const rootCommentInfo = useContext(RootCommentContext)
  
//   function fetchReplys(parentId){
//      axios.get('http://localhost:4000/comments/parent/' + parentId) 
//      .then(res =>{
//         setFetchedReplies(res.data)
//      })
//   }
  
 
//   let replies = comments.filter(c => c.parentId === comment.id)
  return (
    <div className="my-2">
      {comments.map((comment) =>{ 
          
          const replies = props.comments.filter(c => c.parentId === comment.id)
          return(
        <div className="mb-2">
          <div className="flex mb-2">
            <div className="bg-blue-500 w-12 mr-2 h-12 rounded-full"></div>
            <div className="py-1 px-2 pr-2 text-sm">{comment.author}</div>
            <div className="py-1 px-2 text-sm">
              <TimeAgo datetime={comment.createdAt} />{" "}
            </div>
          </div>
          <div className="border-l-2  border-gray p-3 pb-0 ml-6">
              
          <div className="pl-4">
              <div>
                  
          {comment.body}
              </div>
          <button onClick={()=> setShowForm(comment.id)}  className="mb-3 py-2  mx-2 bg-gray-300 text-black border border-gray-300  rounded-full px-3 font-bold">Reply</button>
          
          {comment.id === showForm && (
              
            <CommentForm onSubmit={()=>{setShowForm(false);rootCommentInfo.refreshComments() }} parentId={comment.id} rootId={props.rootId} showAuthor={false} onCancel={e => setShowForm(false)}/>
          )}
          
          {replies.length > 0 && (
              <Comments comments ={props.comments} parentId={comment.id} rootId={props.rootId}/>
          )}
          </div>
        </div>
        </div>
      )
      
      })}
    </div>
  );
}

export default Comments;
