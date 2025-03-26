import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between rounded-md bg-blue-900 p-2 px-20 items-center max-w-[1200px] mx-auto">
      <div>
        <h1 className="font-extrabold text-2xl text-white">
          <span className="text-black">&lt;</span>
          <span>Pass</span>
          <span className="text-black">Op</span>
          <span className="text-white">&gt;</span>
        </h1>
      </div>

      <button className="flex bg-white rounded-full px-1 p-1 justify-between items-center invert">
        <img className=" " src={"../public/icons8-github.svg"} alt="github" />
        <span className="font-extrabold">GitHub</span>
      </button>
     
    </nav>
  );
};

export default Navbar;
