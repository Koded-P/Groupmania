import { useState, useContext, useRef,useEffect } from "react";
import axios from "axios";
import AuthModalContext from "./AuthModalContext";
import UserContext from "./UserContext";


function AuthModal() {
  const [modalType, setModalType] = useState("login");
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const user =useContext(UserContext)

  const modalContext = useContext(AuthModalContext);
  const visibleClass = modalContext.show !== false ? "block" : "hidden";
  if (modalContext.show && modalContext.show !== modalType) {
    setModalType(modalContext.show)
  }

  function useCloseModal(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          modalContext.setShow(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const closeModalRef = useRef(null);
  useCloseModal(closeModalRef)
  
  
  function register(e) {
    e.preventDefault();
    const data = { email, password, username };
    axios
      .post("http://localhost:4000/register", data, { withCredentials: true })
      .then(()=>{
        user.setUser({username})
        modalContext.setShow(false)
        setEmail('')
        setPassword('')
        setUsername('')
      });
  }
  
  function login(e){
    e.preventDefault()
    const data = {  password, username };
    axios
    .post("http://localhost:4000/login", data, { withCredentials: true })
    .then(()=>{
      user.setUser({username})
      modalContext.setShow(false)
    }).catch(e=>{
      if (e.response.status === 403) {
        
        alert('Invalid Username or Password')
    }
    })
  }
  return (
    <div
      className={
        "w-screen h-screen fixed top-0 flex  left-0 z-30 " + visibleClass
      }
      style={{ backgroundColor: "rgba(0,0,0,.6)" }}
    >
      <div  className="border border-gray-700 w-3/4 sm:w-1/2 md:w-1/4 bg-black text-white mx-auto rounded-md self-center p-5" ref={closeModalRef}>
        {modalType === "login" && <h1 className="text-2xl mb-5">Login</h1>}
        {modalType === "register" && (
          <h1 className="text-2xl mb-5">Register</h1>
        )}
        {modalType === "register" && (
          <label>
            <span className="text-gray-700 text-sm">Email:</span>
            <input
              className="mb-3 w-full bg-gray-800 border border-black rounded-md block p-2 text-white"
              type="email"
              style={{ borderRadius: "2rem" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        )}
        <label>
          <span className="text-gray-700 text-sm">Username:</span>
          <input
            className="mb-3 w-full bg-gray-800 border border-black rounded-md block p-2 text-white"
            type="text"
            style={{ borderRadius: "2rem" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <span className="text-gray-700 text-sm">Password:</span>

          <input
            className="mb-3  w-full bg-gray-800 border border-black rounded-md block p-2 text-white"
            style={{ borderRadius: "2rem" }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {modalType === "login" && (
          <button className="mb-3 py-2 w-full mx-2 bg-gray-300 text-black border border-gray-300  rounded-full px-3 font-bold"
          onClick={(e) => login(e)}
          >
            Login
          </button>
        )}
        {modalType === "register" && (
          <button
            className="mb-3 py-2 w-full mx-2 bg-gray-300 text-black border border-gray-300  rounded-full px-3 font-bold"
            onClick={(e) => register(e)}
          >
            Register
          </button>
        )}
        {modalType === "login" && (
          <div>
            New to Groupmania?{" "}
            <button
              className="text-blue-700"
              onClick={() => {
                modalContext.setShow("register");
              }}
            >
              Sign Up
            </button>
          </div>
        )}
        {modalType === "register" && (
          <div>
            ALraedy have an account?{" "}
            <button
              className="text-blue-700"
              onClick={() => {
                modalContext.setShow("login");
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
