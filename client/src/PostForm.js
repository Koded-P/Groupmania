import avatar from "./avatar.svg";
import { useContext } from "react";
import PostFormModalContext from "./PostFormModalContext";

function PostForm() {
  const modalContext = useContext(PostFormModalContext);
  return (
    <div className="h-20 bg-black px-6 py-4 text-gray-400">
      <div className="border border-gray p-2 rounded-md flex">
        <div className="rounded-full  w-10 h-10">
          <img src={avatar} alt="" className="w-20 h-10 mr-4" />
        </div>

        <form
          action=""
          className="bg-gray-800 h-10 p-1 px-3 flex rounded-md border border-gray-700 ml-4 mr-2 flex-grow"
        >
          {/* <SearchIcon className="text-gray-300 h-7 w-7" /> */}
          <input
            name=""
            id=""
            onClick={(e) =>{e.preventDefault()
              modalContext.setShow(true)}
                }
            className="bg-gray-800 text-white text-sm px-3 focus:outline-none block"
            type="text"
            placeholder="New Post ..."
          />
        </form>
      </div>
    </div>
  );
}

export default PostForm;
