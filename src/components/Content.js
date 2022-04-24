import { useState } from "react";
import PlaylistView from "./PlaylistView";
import SinglePlaylistView from "./SinglePlaylistView";
import CreateNewShow from "./CreateNewShow";

export default function Content({ playlists, accessToken }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [displayModal, setDisplayModal] = useState(false);

  if (displayModal) {
    return (
      <CreateNewShow
        setDisplayModal={setDisplayModal}
        accessToken={accessToken}
      />
    );
  }
  if (!selectedPlaylist) {
    return (
      <div className="h-screen w-screen bg-slate-800 p-12 text-white">
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
      <SinglePlaylistView
        id={selectedPlaylist}
        accessToken={accessToken}
        setSelectedPlaylist={setSelectedPlaylist}
      />
    );
  }
}
