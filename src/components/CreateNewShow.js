import { useState, useEffect } from "react";
import addImage from "./assets/add-image.png";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import SpotifyWebApi from "spotify-web-api-node";

export default function CreateNewShow({ setDisplayModal, accessToken }) {
  const [showName, setShowName] = useState("");
  const [showDescription, setShowDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrib64, setImageUrib64] = useState("");

  const spotifyApi = new SpotifyWebApi({
    clientId: "fbe2d6743a13434283678fa7d7e7f934",
  });

  const submitDetails = () => {
    if (!showName) return;
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken).then(() => {
      spotifyApi
        .createPlaylist(showName, {
          description: showDescription,
        })
        .then((response) => {
          spotifyApi
            .uploadCustomPlaylistCoverImage(response.body.id, imageUrib64)
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {});
        });
    });
  };

  return (
    <div className="grid bg-black h-auto justify-items-center">
      <div className="bg-gray-900 w-auto rounded-xl text-white my-40 p-4">
        {/* heading and close button*/}
        <div className="flow-root">
          <p className="text-3xl text-bold float-left mx-4">
            Create a new show...
          </p>
        </div>

        {/* playlist image and form */}
        <div className="flex p-2">
          <UploadAndDisplayImage
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setImageUrib64={setImageUrib64}
          />

          <div className="mx-12 my-6">
            <input
              type="text"
              className="
        form-control
        block
        px-3
        py-1.5
        text-lg
        font-normal
        h-12
        w-80
        text-gray-300
        bg-gray-700 bg-clip-padding
        border border-solid border-gray-900
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-200 focus:bg-gray-600 focus:border-gray-900 focus:outline-none
      "
              value={showName}
              placeholder="Name your show..."
              onChange={(e) => {
                setShowName(e.target.value);
              }}
            />
            <textarea
              type="search"
              value={showDescription}
              onChange={(e) => {
                setShowDescription(e.target.value);
              }}
              className="
        form-control
        text-lg
        block
        px-3
        font-normal
        my-2
        h-40
        w-full
        text-gray-300
        bg-gray-700 bg-clip-padding
        border border-solid border-gray-900
        rounded
        transition
        ease-in-out
        focus:text-gray-200 focus:bg-gray-600 focus:border-gray-900 focus:outline-none
      "
              placeholder="Add a description...(Optional)"
            />
          </div>
        </div>

        {/* submit buttons */}
        <div className="flow-root text-bold text-md text-white">
          <button
            className="text-bold rounded-xl border-2 border-white p-1 text-white float-right mx-2 hover:bg-gray-400"
            onClick={() => {
              setDisplayModal(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-bold rounded-xl border-2 border-white p-1 text-white  float-right mx-2 hover:bg-green-400"
            onClick={submitDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
