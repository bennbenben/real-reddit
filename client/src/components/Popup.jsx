import React from "react";
import ClickOutHandler from "react-clickout-handler";

function Popup({children, open, onClickOut}) {
    const visibleClass = open ? 'block' : 'hidden';
  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-20 flex content-center " +
        visibleClass
      }
      style={{ backgroundColor: "rgba(0,0,0,.8" }}
    >
      <ClickOutHandler onClickOut={() => {onClickOut()}}>
        <div className="border border-reddit_dark-brightest w-3/4 sm:w-1/2 md:1/4 bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-xl">
            {children}
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default Popup;
