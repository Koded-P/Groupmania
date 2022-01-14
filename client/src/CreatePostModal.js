import ClickOutHandler from "react-clickout-handler";
import { useState, useContext } from "react";
import PostFormModalContext from "./PostFormModalContext";
import axios from "axios";
import AuthModalContext from "./AuthModalContext";
import { Redirect } from "react-router-dom";


function CreatePostModal() {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [newPostId, setNewPostId] = useState(null);
  const authModalContext = useContext(AuthModalContext)
  const modalContext = useContext(PostFormModalContext);
  const visibleClass = modalContext.show ? "block" : "hidden";

  function createPost() {
    const data = { title, body };
    axios.post("http://localhost:4000/posts", data,{withCredentials:true})
    .then((res) => {
      setNewPostId(res.data.id)
    })
    .catch(error =>{
        if (error.response.status === 401) {
            authModalContext.setShow('login')
        }
        console.log(error)
    })
  }
  
  if (newPostId) {
      return(<Redirect to={'/post/'+newPostId}></Redirect>)
  }

  return (
    <div
      className={
        "w-screen h-screen fixed top-0 flex  left-0 z-20 " + visibleClass
      }
      style={{ backgroundColor: "rgba(0,0,0,.6)" }}
    >
      <ClickOutHandler onClickOut={() => {}}>
        <div className="border border-gray-700 w-3/4  md:w-2/4 bg-black text-white mx-auto rounded-md self-center p-5">
          <h1 className="text-2xl mb-5">Create A Post</h1>
          <label>
            <span className="text-gray-700 text-sm">Title:</span>
            <input
              className="mb-3 w-full bg-gray-800 border border-black rounded-md block p-2 text-white"
              type="text"
              style={{ borderRadius: "2rem" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder={"Title"}
            />
          </label>
          <label>
            <span className="text-gray-700 text-sm">Body:</span>
            <textarea
              required
              className="w-full bg-gray-800 border border-black text-white px-3 py-2   rounded-lg focus:outline-none"
              rows="4"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={"Body"}
            ></textarea>
          </label>
          <button
            onClick={() => modalContext.setShow(false)}
            className="mx-2 py-2  text-gray-300 border border-gray-300  rounded-full px-3 font-bold"
          >
            Cancel
          </button>
          <button
            onClick={() => createPost()}
            className="mb-3 py-2  mx-2 bg-gray-300 text-black border border-gray-300  rounded-full px-3 font-bold"
          >
            Create Post
          </button>
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default CreatePostModal;
