import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import PlaylistViewForImport from "./PlaylistViewForImport";

export default function ImportFromPlaylist({
  accessToken,
  setNewImportPlaylist,
}) {
  const spotifyApi = new SpotifyWebApi({
    clientId: "fbe2d6743a13434283678fa7d7e7f934",
  });

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.searchPlaylists(search, { limit: 5 }).then((res) => {
      if (cancel) return;
      setSearchResults(res.body.playlists.items);
    });
    return () => (cancel = true);
  }, [accessToken, search]);

  return (
    <div className="p-2">
      <p className="text-xl text-bold text-gray-400 p-1">
        Import songs from playlist
      </p>

      {/* search bar */}
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
        placeholder="Search for a playlist.."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {/* Playlists */}
      {searchResults.map((playlist) => {
        return (
          <PlaylistViewForImport
            playlist={playlist}
            setNewImportPlaylist={setNewImportPlaylist}
            key={playlist.id}
          />
        );
      })}
    </div>
  );
}
