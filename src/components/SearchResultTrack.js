import React from "react";
import addButton from "./assets/add-button.png";

export default function SearchResultTrack({ track, setNewTrack }) {
  if (track) {
    const thumb = track.album.images.slice(-1);

    // logic for finding track length
    // const min = Math.floor(track.duration_ms / 60000);
    // const sec = (
    //   "000000" + Math.floor((track.duration_ms % 60000) / 1000 + 1)
    // ).slice(-2);

    return (
      <div className="h-auto bg-gray-700 hover:bg-gray-600 hover:cursor-pointer my-1 w-96">
        <div className="px-3 py-2 flow-root">
          <img
            src={thumb[0].url}
            alt=""
            className="h-12 w-12  float-left"
          ></img>
          <div className="float-left">
            <p className="mx-3">{track.name}</p>
            <p className="mx-3 text-gray-300/75">{track.artists[0].name}</p>
          </div>
          <img
            src={addButton}
            alt=""
            className="h-8 w-8 my-2 float-right hover:bg-pink-800 rounded-xl p-1"
            onClick={() => {
              setNewTrack(track.uri);
            }}
          ></img>
        </div>
      </div>
    );
  }
}
