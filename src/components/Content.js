import { useState, useEffect } from "react";
import PlaylistView from "./PlaylistView";
import SinglePlaylistView from "./SinglePlaylistView";
import CreateNewShow from "./CreateNewShow";

export default function Content({ playlists, accessToken, setPlayingTrack }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [displayModal, setDisplayModal] = useState(false);
  const [newChange, setNewChange] = useState(false);

  useEffect(() => {
    console.log("MAIN UPDAYE");
    setNewChange(false);
  }, [newChange]);

  if (displayModal) {
    return (
      <CreateNewShow
        setDisplayModal={setDisplayModal}
        accessToken={accessToken}
        setSelectedPlaylist={setSelectedPlaylist}
      />
    );
  }
  if (!selectedPlaylist) {
    return (
      <div className="h-screen w-screen bg-black p-12 text-white">
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
          {playlists.map((playlist) => {
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
