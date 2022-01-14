import Post from "./Post"
import { useState ,useEffect } from "react"
import axios from "axios";


function PostsListing(){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        axios
      .get("http://localhost:4000/posts", { withCredentials: true })
      .then((res) => {
        setPosts(res.data);
      });
    },[])
    return (
        <div className="bg-black">
          {posts.map((post) => (
            <Post {...post} />
          ))}
        </div>
    )
}


export default PostsListing