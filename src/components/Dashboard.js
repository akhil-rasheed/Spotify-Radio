import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Profile from "./Profile";
import Content from "./Content";
import logo from "./assets/logo.png";

export default function Dashboard({ code }) {
  const [currentUser, setCurrentUser] = useState();
  const [userPlaylists, setUserPlaylists] = useState();

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
    spotifyApi.getUserPlaylists().then((res) => {
      const filtered = res.body.items.filter((playlist) =>
        playlist.name.startsWith("//frootFM")
      );
      setUserPlaylists(filtered);
    });
  }, [accessToken]);

  return currentUser && userPlaylists ? (
    <div className="h-screen bg-black">
      <Profile user={currentUser} />
      <Content playlists={userPlaylists} accessToken={accessToken} />
    </div>
  ) : (
    <div>
      <div className="h-screen bg-black text-center p-24 text-white text-bold text-3xl grid place-items-center">
        <img src={logo} alt="loading"></img>
        loading...
      </div>
    </div>
  );
}
