import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
function PostPage(props){
    const postId = props.match.params.id
    const [post, setPost] =useState({})
    useEffect(()=>{
        axios.get('http://localhost:4000/posts/'+postId)
        .then(res => setPost(res.data))
    },[postId])
    
    return (
    <div className="bg-black py-4">
        
        {post && (
            <Post {...post} open={true}/>
        )}
    </div>
    )
}

export default PostPage