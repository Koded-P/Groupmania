import { useContext, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

function CommentForm(props) {
  const [commentBody, setCommentBody] = useState('')
  const userInfo = useContext(UserContext);
  
  function createComment(e){
    e.preventDefault()
    const data = {body:commentBody,parentId:props.parentId, rootId:props.rootId}
    axios.post('http://localhost:4000/posts',data,{withCredentials:true})
    .then(res =>{
      setCommentBody('')
      if(props.onSubmit){
        props.onSubmit()
      }
    })
  }
  return (
    <div>
      {userInfo.username && props.showAuthor && ( <div className="mb-2">Comment as {userInfo.username}</div>)}
      <form onSubmit={e => createComment(e)}>
        
        <textarea className="w-full bg-gray-800 border border-black text-white px-3 py-2   rounded-lg focus:outline-none"
        onChange={e => setCommentBody(e.target.value)}
        value={commentBody}
        ></textarea>
        <div className="text-right">
          {!!props.onCancel && (
            <button className="p-2 mr-2" onClick={e => props.onCancel()}>Cancel</button>
          )}
          <button className="mx-2 py-2  text-gray-300 border border-gray-300  rounded-full px-3 font-bold">Comment</button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
