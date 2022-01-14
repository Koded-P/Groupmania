import logo from "./icon-above-font.svg";
import avatar from "./avatar.svg";
import {
  SearchIcon,
  PlusIcon,
  ChevronDownIcon,
  LoginIcon,
  UserIcon,
  
} from "@heroicons/react/outline";
import { useState, useEffect, useRef, useContext } from "react";
import AuthModalContext from "./AuthModalContext";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";


function Header() {
  const authModalContext = useContext(AuthModalContext);
  const user = useContext(UserContext);
  const [
    userDropdownVisibilityClass,
    setUserDropdownVisibilityClass,
  ] = useState("hidden");

  function useUserDropdown(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setUserDropdownVisibilityClass("hidden");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const userDropdownRef = useRef(null);
  useUserDropdown(userDropdownRef);
  function toggleUserDropdown() {
    if (userDropdownVisibilityClass === "hidden") {
      setUserDropdownVisibilityClass("block");
    } else {
      setUserDropdownVisibilityClass("hidden");
    }
  }
  //const  userDropdownVisibilityClass = 'hidden'
  return (
    <header className=" w-full bg-black p-2">
      <div className="flex mx-4">
        <Link to={'/'}>
        <img src={logo} alt="" className="w-20 h-10 mr-4" />
        </Link>
        <form
          action=""
          className="bg-gray-800 h-10 p-1 px-3 flex rounded-md border border-gray-700 mx-4 flex-grow"
        >
          <SearchIcon className="text-gray-300 h-7 w-7" />
          <input
            name=""
            id=""
            className="bg-gray-800 text-white text-sm p-1 pl-2 pr-0 focus:outline-none block"
            type="text"
            placeholder="Search..."
          />
        </form>
        
        {user.username && (
          <span className="w-50 text-sm py-2 block text-white">
           Hello, {user.username}!
          </span>
        )}
        {user.username && (
          <button className="px-3 py-1">
            <PlusIcon className="text-gray-500 h-6 w-6  mx-4" />
          </button>
        )}
        {user.username && (
          <div>
            
            
            <button
              className="mx-2 text-gray-300 border border-gray-300 text-sm rounded-full px-3 font-bold"
              onClick={() => user.logout()}
            >
              Logout
            </button>
            
          </div>
        )}
        {!user.username && (
          <div>
            <button
              className="mx-2 text-gray-300 border border-gray-300 text-sm rounded-full px-3 font-bold"
              onClick={() => authModalContext.setShow("login")}
            >
              Login
            </button>
            <button
              className="mx-2 bg-gray-300 text-black border border-gray-300 text-sm rounded-full px-3 font-bold"
              onClick={() => authModalContext.setShow("register")}
            >
              Signup
            </button>
          </div>
        )}

        <button
          className="px-3 py-1 flex"
          onClick={() => toggleUserDropdown()}
          ref={userDropdownRef}
        >
          {!user.username && <UserIcon className="w-6 h-6 text-gray-400 m-1" />}
          {user.username && (
            <div className="w-10  mr-1  h-10">
              <img src={avatar} alt="" className="block" />
            </div>
          )}
          <ChevronDownIcon className="text-gray-500 w-5 h-5 mt-2 ml-1" />
        </button>

        <div
          className={
            "absolute right-0 top-8 bg-black border border-gray-700 z-10 rounded-md text-white overflow-hidden " +
            userDropdownVisibilityClass
          }
        >
          {!user.username && (
            
          <button
            href=""
            className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black"
            onClick={() => authModalContext.setShow(true)}
          >
            <LoginIcon className="w-5 h-5 mr-2"></LoginIcon>
            Login/ Signup
          </button>
          )}
          {/* {user.username && (
            
            <button
              href=""
              className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black"
              onClick={() => user.logout()}
            >
              <LogoutIcon className="w-5 h-5 mr-2"></LogoutIcon>
              Logout
            </button>
            )} */}
            
        </div>
      </div>
    </header>
  );
}

export default Header;
