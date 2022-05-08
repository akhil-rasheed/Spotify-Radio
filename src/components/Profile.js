import React from "react";
import logo from "./assets/logo.png";

export default function Profile({ user }) {
  const userImage = user?.images[0].url;

  return user ? (
    <div className="w-screen bg-black px-12 py-1 flex">
      <div className="w-10/12">
        <img src={logo} alt="grapefroot" className="w-3/12"></img>
      </div>
      <div className="top-4 right-4 bg-gray-900 shadow-2xl h-30 w-30 rounded-lg p-4 m-2">
        <img
          src={userImage}
          alt={user.name}
          className="rounded-full w-16 h-16"
        ></img>
        <p className="text-bold text-gray-200">
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
