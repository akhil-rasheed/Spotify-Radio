import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import SearchResultTrack from "./SearchResultTrack";

export default function TrackSearch({ accessToken, setNewTrack }) {
  const spotifyApi = new SpotifyWebApi({
    clientId: "fbe2d6743a13434283678fa7d7e7f934",
  });

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //produce search results
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.searchTracks(search, { limit: 5 }).then((res) => {
      if (cancel) return;
      setSearchResults(res.body.tracks.items);
      console.log(res.body.tracks.items);
    });
    return () => (cancel = true);
  }, [accessToken, search]);

  return (
    <div className="justify-center rounded-xl ">
      <div className=" bg-gray-900 p-2 mb-3 xl:w-96">
        <p className="text-xl text-bold p-1 text-gray-400">Add a new track</p>

        <input
          type="search"
          className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-300
        bg-gray-700 bg-clip-padding
        border border-solid border-gray-900
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-200 focus:bg-gray-600 focus:border-gray-900 focus:outline-none
      "
          placeholder="Search for a track.."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="h-auto p-3 rounded-xl">
        {searchResults.map((track) => {
          return (
            <SearchResultTrack
              track={track}
              key={track.id}
              setNewTrack={setNewTrack}
            />
          );
        })}
      </div>
    </div>
  );
}
