import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TextField from "@mui/material/TextField";

export default function CreateNewShow({
  setDisplayModal,
  accessToken,
  setSelectedPlaylist,
  setNewChange,
}) {
  const spotifyApi = new SpotifyWebApi({
    clientId: "fbe2d6743a13434283678fa7d7e7f934",
  });
  const [showName, setShowName] = useState("");

  const submitDetails = () => {
    if (!showName) return;
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .createPlaylist(`//frootFM ${showName}`, { public: false })
      .then((response) => {
        console.log(response);
        setSelectedPlaylist(response.body.id);
        setDisplayModal(false);
        setNewChange(true);
      })
      .catch((err) => {});
  };

  return (
    <div className="grid bg-black h-auto justify-items-center">
      <div className="bg-gray-900 w-auto rounded-xl text-white my-40 p-4">
        {/* heading and close button*/}
        <div className="flow-root">
          <p className="text-3xl text-bold float-left mx-4">
            Give your show a name
          </p>
        </div>

        <div className="mx-12 my-6">
          <TextField
            id="outlined-basic"
            label="Name"
            className="text-gray-300"
            variant="standard"
            maxRows={4}
            value={showName}
            onChange={(e) => {
              setShowName(e.target.value);
            }}
          />
        </div>

        {/* Save and cancel buttons  */}
        <div className=" mx-8 text-bold text-md text-white">
          <button
            className="text-bold rounded-xl border-2 border-white p-1 text-white  mx-2 hover:bg-gray-400"
            onClick={() => {
              setDisplayModal(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-bold rounded-xl border-2 border-white p-1 text-white  mx-2 hover:bg-green-400"
            onClick={submitDetails}
          >
            Save
          </button>
        </div>
      </div>

      {/* submit buttons */}
    </div>
  );
}
