import React from "react";
import "../style.css";
import Logo from "../logo.png";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Avatar from "../avatar.png";

const Header = () => {
  return (
    <header className="w-full bg-reddit_dark p-2">
      <div className="flex mx-4">

        <img src={Logo} alt="" className="w-8 h-8 mr-4" />
        <form action="" className="bg-reddit_dark-brighter px-3 flex rounded-md border border-reddit_border mx-4 flex-grow">
          <MagnifyingGlassIcon className="text-gray-300 h-6 w-6 mt-1" />
          <input type="text" className="bg-reddit_dark-brighter text-sm p-1 pl-2 pr-0 block focus:outline-none text-white" placeholder="Search" />
        </form>

        <button className="px-2 py-1">
          <ChatBubbleLeftEllipsisIcon className="text-gray-400 w-6 h-6 mx-2" />
        </button>
        <button className="px-2 py-1">
          <BellIcon className="text-gray-400 w-6 h-6 mx-2" />
        </button>
        <button className="px-2 py-1">
          <PlusIcon className="text-gray-400 w-6 h-6 mx-2" />
        </button>

        <button className="rounded-md flex ml-4">
          <div className="bg-gray-600 w-8 h-8 rounded-md">
            <img src={Avatar} alt="" style={{ filter: "invert(100%)" }} className="block" />
          </div>
          <ChevronDownIcon className="text-gray-500 w-5 h-5 mt-2 ml-1" />
        </button>

      </div>
    </header>
  );
};

export default Header;
