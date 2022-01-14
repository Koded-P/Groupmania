import Board from "./Board";
import PostPage from "./PostPage";
import { Switch, Route, useLocation } from "react-router-dom";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
function RoutingSwitch() {
  const [postOpen, setPostOpen] = useState(false);
  // const [postId, setPostId] = useState(null)
  const location = useLocation();

  let postId = null;
  if (location.state && location.state.postId) {
    location.pathname = "/";
    if (postOpen) {
      
      postId = location.state.postId;
    }else{
      location.state.postId = null
    }
  }

  useEffect(() => {
    setPostOpen(true);
  }, [postId]);
  
  useEffect(() => {
    postId = null
  }, [postOpen]);
  return (
    <div>
      {postId && (
        <div>
          <PostModal
            id={postId}
            open={postOpen}
            onClickOut={() => setPostOpen(false)}
          />
        </div>
      )}

      <Switch location={location}>
        <Route exact path="/" component={Board}></Route>
        <Route exact path="/post/:id" component={PostPage}></Route>
      </Switch>
    </div>
  );
}

export default RoutingSwitch;
