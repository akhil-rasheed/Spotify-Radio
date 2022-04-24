import React from "react";
import logo from "./assets/logo.png";
import Profile from "./Profile";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fbe2d6743a13434283678fa7d7e7f934&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20ugc-image-upload%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private%20";

export default function Login() {
  return (
    <div className="bg-black h-screen ">
      <Profile />
      <p className="text-3xl text-white">Get started...</p>
      <button className="bg-green-500 hover:bg-black hover:text-white text-white font-bold py-2 px-4 rounded-full fixed top-2/3">
        <a href={AUTH_URL}>Login with Spotify</a>
      </button>
    </div>
  );
}
