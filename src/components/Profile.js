import React from "react";
import logo from "./assets/logo.png";

export default function Profile({ user }) {
  const userImage = user?.images[0].url;

  return user ? (
    <div className="w-screen bg-black px-12 py-1 flow-root">
      <div className="w-10/12">
        <img src={logo} alt="grapefroot" className="w-60 m-2 float-left"></img>
      </div>
      <div className="top-4 right-4 bg-black  p-3  shadow-2xl h-24 w-24 float-right ">
        <img
          src={userImage}
          alt={user.name}
          className="rounded-full w-3/5 h-3/5"
        ></img>
        <p className="text-bold text-gray-200 text-sm">
          Logged in as <b>{user.display_name}</b>
        </p>
      </div>
    </div>
  ) : (
    <div className="w-screen bg-black h-38 px-12 py-1 flex">
      <div className="grid place-items-center">
        <img src={logo} alt="grapefroot"></img>
      </div>
    </div>
  );
}
