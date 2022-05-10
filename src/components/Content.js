import { useState, useEffect } from "react";
import PlaylistView from "./PlaylistView";
import SinglePlaylistView from "./SinglePlaylistView";
import CreateNewShow from "./CreateNewShow";
import SpotifyWebApi from "spotify-web-api-node";

export default function Content({ accessToken, setPlayingTrack }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [displayModal, setDisplayModal] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState();
  const [newChange, setNewChange] = useState(false);

  const spotifyApi = new SpotifyWebApi({
    clientId: "fbe2d6743a13434283678fa7d7e7f934",
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getUserPlaylists().then((res) => {
      const filtered = res.body.items.filter((playlist) =>
        playlist.name.startsWith("//frootFM")
      );
      setUserPlaylists(filtered);
      setNewChange(false);
    });
  }, [accessToken, newChange]);

  if (displayModal) {
    return (
      <CreateNewShow
        setDisplayModal={setDisplayModal}
        accessToken={accessToken}
        setSelectedPlaylist={setSelectedPlaylist}
        setNewChange={setNewChange}
      />
    );
  }
  if (!selectedPlaylist && userPlaylists) {
    return (
      <div className="h-full w-screen bg-black p-12 text-white">
        <p className="text-3xl font-sans font-bold">Your shows</p>
        <div className="flex flex-wrap">
          <div
            onClick={() => {
              setDisplayModal(true);
            }}
            className="w-80 h-32 my-8 mx-2 grid place-items-center rounded-xl border-gray-500 hover:border-gray-200 hover:cursor-pointer border-2"
          >
            <p className="text-2xl font-sans font-bold">Create a new show...</p>
          </div>
          {userPlaylists.map((playlist) => {
            return (
              <PlaylistView
                playlist={playlist}
                key={playlist.id}
                setSelectedPlaylist={setSelectedPlaylist}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid place-items-centre">
        <SinglePlaylistView
          id={selectedPlaylist}
          accessToken={accessToken}
          setSelectedPlaylist={setSelectedPlaylist}
          setPlayingTrack={setPlayingTrack}
          setNewChange={setNewChange}
        />
      </div>
    );
  }
}
