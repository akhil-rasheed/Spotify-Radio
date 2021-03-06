import React from "react";
import addImage from "./assets/add-image.png";
export default function PlaylistView({ playlist, setSelectedPlaylist }) {
  const setSingleView = () => {
    setSelectedPlaylist(playlist.id);
  };

  const playlistName = playlist.name.includes("//frootFM")
    ? playlist.name.slice(9)
    : playlist.name;

  let smallest_img;
  if (playlist.images[0]) {
    smallest_img = playlist.images.reduce((smallest, image) => {
      if (image.height < smallest.height) return image;
      return smallest;
    }, playlist.images[0]);
  }

  return (
    <div
      className="w-80 h-32 my-8 mx-2 flex rounded-xl bg-gradient-to-tl from-gray-900 to-purple-900 hover:bg-gray-900 hover:cursor-pointer"
      onClick={setSingleView}
    >
      <div>
        <img
          src={playlist.images[0] ? smallest_img.url : addImage}
          alt={addImage}
          className="w-24 h-24 rounded-xl m-3"
        ></img>
      </div>

      {/* separate out functionality */}
      <div className="w-60 h-32 m-3 text-gray-200 text-bold p-2">
        {playlistName}
        <p className="text-gray-50/50">Tracks: {playlist.tracks.total}</p>
      </div>
    </div>
  );
}
