import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <div className="grid place-items-center">
      <div
        className={`h-20 text-white text-3xl w-1/2 bg-black px-2 rounded-lg fixed bottom-4 place-items-center ${
          trackUri ? "grid" : "invisible"
        }`}
      >
        <div className="w-full">
          <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            uris={trackUri ? [trackUri] : []}
            callback={(state) => {
              if (!state.isPlaying) setPlay(false);
            }}
            play={play}
            styles={{
              bgColor: "black",
              color: "white",
              trackNameColor: "white",
              trackArtistColor: "gray",
            }}
          />
        </div>
      </div>
    </div>
  );
}
