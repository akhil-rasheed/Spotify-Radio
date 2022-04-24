import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import PlaylistTrack from "./PlaylistTrack";
import TrackSearch from "./TrackSearch";
import ImportFromPlaylist from "./ImportFromPlaylist";

export default function SinglePlaylistView({
  id,
  accessToken,
  setSelectedPlaylist,
}) {
  const spotifyApi = new SpotifyWebApi({
    clientId: "fbe2d6743a13434283678fa7d7e7f934",
  });

  const [playlist, setPlaylist] = useState();
  const [newTrack, setNewTrack] = useState("");
  const [newImportPlaylist, setNewImportPlaylist] = useState("");

  //instantiates api and fetches playlist
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getPlaylist(id).then((data) => {
      console.log("this gets called again");
      setPlaylist(data.body);
    });
  }, [id, newTrack, newImportPlaylist]);

  useEffect(() => {
    if (!newTrack) return;
    if (!accessToken) return;
    spotifyApi.addTracksToPlaylist(playlist.id, [...newTrack]).then((res) => {
      console.log("track successfully added");
      setNewTrack("");
    });
  }, [newTrack]);

  useEffect(() => {
    if (!newImportPlaylist) return;
    if (!accessToken) return;

    spotifyApi.getPlaylist(newImportPlaylist).then((res) => {
      const tracksToBeAdded = res.body.tracks.items.map(
        (track) => track.track.uri
      );
      setNewTrack(tracksToBeAdded);
    });
  }, [newImportPlaylist]);

  if (playlist) {
    return (
      <div className="h-auto w-screen bg-black p-12 text-white">
        {/* back button  */}
        <p
          className="text-gray-500 hover:text-white hover:cursor-pointer w-28"
          onClick={() => {
            setSelectedPlaylist();
          }}
        >
          back to shows
        </p>

        {/* Heading  */}
        <p className="text-3xl font-sans font-bold">{playlist.name.slice(9)}</p>

        {/* Top portion: image and desc */}
        <div className="flex flex-wrap my-4 ">
          <div className="flex flex-wrap mb-10 w-full ">
            {/* Playlist image */}
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className="h-60 w-60 bg-gray-800 rounded-xl p-2 shadow-white"
            ></img>

            {/* Show notes */}
            <div className="bg-gray-800 rounded-xl px-4 py-2 w-1/3 mx-8 text-gray-200">
              <p className="text-2xl text-bold text-white py-2">Show Notes</p>
              {playlist.description.toString().replaceAll("&#x27;", "'") || (
                <div>Add show notes...</div>
              )}
            </div>
          </div>

          {/* Tracks */}
          <div className="my-4 w-1/3">
            {playlist.tracks.items.map((track) => (
              <PlaylistTrack
                track={track.track}
                key={track.track.id}
                theme="playlist"
              />
            ))}
          </div>

          {/* Add or import tracks section */}
          <div className="h-auto bg-gray-900 mx-4 my-5">
            <TrackSearch accessToken={accessToken} setNewTrack={setNewTrack} />
            <ImportFromPlaylist
              accessToken={accessToken}
              setNewImportPlaylist={setNewImportPlaylist}
            />
          </div>
          {/* Search bar */}
        </div>
      </div>
    );
  }
}
