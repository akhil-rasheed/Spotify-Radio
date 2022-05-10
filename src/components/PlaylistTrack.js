import React from "react";

export default function PlaylistTrack({ track, setPlayingTrack }) {
  if (track) {
    const thumb = track.album.images.slice(-1);
    const min = Math.floor(track.duration_ms / 60000);
    const sec = (
      "000000" + Math.floor((track.duration_ms % 60000) / 1000 + 1)
    ).slice(-2);

    return (
      <div
        className="h-auto bg-gray-900 hover:bg-gray-800 hover:cursor-pointer my-1 bg-gradient-to-r from-cyan-800 to-gray-500"
        onClick={() => {
          console.log(track);
          setPlayingTrack(track);
        }}
      >
        <div className="flex px-3 py-2">
          <img src={thumb[0].url} alt="" className="h-12 w-12 "></img>
          <div>
            <p className="mx-3">
              {track.artists[0].name} - {track.name}
            </p>
            <p className="mx-3 text-gray-300/75">
              {min}:{sec}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
