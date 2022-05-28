import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Profile from "./Profile";
import Content from "./Content";
import Player from "./Player";
import NavBar from "./NavBar";

export default function Dashboard({ code }) {
  const [currentUser, setCurrentUser] = useState();
  const [playingTrack, setPlayingTrack] = useState();
  const [value, setValue] = useState(0);

  const accessToken = useAuth(code);
  const spotifyApi = new SpotifyWebApi({
    clientId: "fbe2d6743a13434283678fa7d7e7f934",
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe().then((res) => {
      setCurrentUser(res.body);
    });
  }, [accessToken]);

  return currentUser ? (
    <div className="h-fit bg-gradient-to-tr from-black to-slate-900">
      <Profile user={currentUser} />
      <NavBar value={value} setValue={setValue} />
      <Content accessToken={accessToken} setPlayingTrack={setPlayingTrack} />
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </div>
  ) : (
    <div className="bg-black h-screen">
      <Profile />
      <div className="grid place-items-center">
        <p className="text-3xl text-white m-4">Loading...</p>
      </div>
    </div>
  );
}
