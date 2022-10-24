import React from "react";
import { useState } from 'react';
import ClickOutHandler from 'react-clickout-handler';
import "../style.css";
import Logo from "../logo.png";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  PlusIcon,
  ChevronDownIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Avatar from "../avatar.png";
import Button from "./Button";

const Header = () => {
  const [userDropDownVisibilityClass, setUserDropDownVisibilityClass] = useState('hidden');
  
  const toggleUserDropDown = () => {
    if (userDropDownVisibilityClass === 'hidden') {
      setUserDropDownVisibilityClass('block');
    } else {
      setUserDropDownVisibilityClass('hidden');
    }
  }
  
  return (
    <header className="w-full bg-reddit_dark p-2">
      <div className="flex mx-4 relative">

        <img src={Logo} alt="" className="w-8 h-8 mr-4" />
        <form action="" className="bg-reddit_dark-brighter px-3 flex rounded-md border border-reddit_border mx-4 flex-grow">
          <MagnifyingGlassIcon className="text-gray-300 h-6 w-6 mt-1" />
          <input type="text" className="bg-reddit_dark-brighter text-sm p-1 pl-2 pr-0 block focus:outline-none text-white" placeholder="Search" />
        </form>

        {/* <button className="px-2 py-1">
          <ChatBubbleLeftEllipsisIcon className="text-gray-400 w-6 h-6 mx-2" />
        </button>
        <button className="px-2 py-1">
          <BellIcon className="text-gray-400 w-6 h-6 mx-2" />
        </button>
        <button className="px-2 py-1">
          <PlusIcon className="text-gray-400 w-6 h-6 mx-2" />
        </button> */}

        <div className="mx-2 hidden sm:block">
          <Button className="mr-1">Log in</Button>
          <Button className="mr-2">Sign up</Button>
        </div>

        <ClickOutHandler onClickOut={() => setUserDropDownVisibilityClass('hidden')}>

          <button className="rounded-md flex ml-4 border border-gray-700" onClick={() => toggleUserDropDown()}>
            <UserIcon className="w-6 h-6 text-gray-400 m-1" />
            {/* <div className="bg-gray-600 w-8 h-8 rounded-md"> */}
              {/* <img src={Avatar} alt="" style={{ filter: "invert(100%)" }} className="block" /> */}
            {/* </div> */}
            <ChevronDownIcon className="text-gray-500 w-5 h-5 mt-2 m-1" />
          </button>

        </ClickOutHandler>

        <div className={"absolute right-0 top-8 bg-reddit_dark border border-gray-700 z-10 rounded-md text-reddit_text overflow-hidden " + userDropDownVisibilityClass}>
          <button className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm">
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
            Log In/ Sign Up
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
