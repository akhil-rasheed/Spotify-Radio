import React from "react";
import addButton from "./assets/add-button.png";
import addImage from "./assets/add-image.png";

export default function PlaylistViewForImport({
  playlist,
  setNewImportPlaylist,
}) {
  //remove tag from show playlists
  const playlistName = playlist.name.includes("//frootFM")
    ? playlist.name.slice(9)
    : playlist.name;

  //find smallest image
  let smallest_img;
  if (playlist.images[0]) {
    smallest_img = playlist.images.reduce((smallest, image) => {
      if (image.height < smallest.height) return image;
      return smallest;
    }, playlist.images[0]);
  }

  return (
    <div className="h-32 my-8 mx-2 flex rounded-sm bg-gray-800 shadow-2xl hover:bg-gray-800/75">
      <div>
        <img
          src={playlist.images[0] ? smallest_img.url : addImage}
          alt=""
          className="w-24 h-24 rounded-xl m-3"
        ></img>
      </div>

      {/* separate out functionality */}
      <div className="w-60 h-32 m-3 text-gray-200 text-bold p-2">
        {playlistName}
        <p className="text-gray-50/50">Tracks: {playlist.tracks.total}</p>
        <img
          src={addButton}
          alt=""
          className="h-8 w-8 my-2 float-right hover:bg-pink-800 hover:cursor-pointer rounded-xl p-1"
          onClick={() => {
            setNewImportPlaylist(playlist.id);
          }}
        />
      </div>
    </div>
  );
}
