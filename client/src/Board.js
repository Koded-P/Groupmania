import PostForm from "./PostForm";
import PostsListing from "./PostsListing";
function Board(){
    return (
        <div>
            
            <section
            className="subheader h-20 bg-cover"
            style={{ backgroundImage: "url(https://i.imgur.com/yc0v5dy.jpg)" }}
          ></section>
          <PostForm/>
          <PostsListing/>
        </div>
    )
}

export default Board