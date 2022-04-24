import React from "react";
import logo from "./assets/logo.png";

export default function Profile({ user }) {
  const userImage = user?.images[0].url;

  return user ? (
    <div className="w-screen bg-slate-900 px-12 py-1 flex">
      <div className="top-4 left-4 shadow-2xl h-30 w-30 rounded-lg p-4 m-2">
        <img
          src={userImage}
          alt={user.name}
          className="rounded-full w-16 h-16"
        ></img>
        <p className="text-bold text-gray-700">
          Logged in as <b>{user.display_name}</b>
        </p>
      </div>
      <div className="grid w-10/12 place-items-center">
        <img src={logo} alt="grapefroot"></img>
      </div>
    </div>
  ) : (
    <div className="w-screen bg-black h-38 px-12 py-1 flex">
      <div className="grid w-10/12 place-items-center">
        <img src={logo} alt="grapefroot"></img>
      </div>
    </div>
  );
}
