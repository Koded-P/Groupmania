import { BrowserRouter as Router} from 'react-router-dom'
import Header from "./header";

import RoutingSwitch from './RoutingSwitch';
import AuthModal from './authmodal';
import CreatePostModal from './CreatePostModal';
function Routing (){
    return (
        <Router>
        <Header />
         <RoutingSwitch/>
        <CreatePostModal></CreatePostModal>
         <AuthModal />
        
       
        </Router>
    )
}


export default Routing