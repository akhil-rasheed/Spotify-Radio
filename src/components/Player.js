import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <div
      className={`h-24 text-white text-3xl w-screen fixed bottom-0 place-items-center ${
        trackUri ? "grid" : "invisible"
      }`}
    >
      <div className="h-24 rounded-t-xl w-8/12">
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          uris={trackUri ? [trackUri] : []}
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          styles={{
            bgColor: "gray",
            color: "black",
            trackArtistColor: "white",
          }}
        />
      </div>
    </div>
  );
}
