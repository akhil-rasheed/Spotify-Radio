import React, { useState } from "react";
import addImage from "./assets/add-image.png";

const UploadAndDisplayImage = ({
  selectedImage,
  setSelectedImage,
  setImageUrib64,
}) => {
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const base64 = await convertBase64(file);
    console.log(base64);
    setImageUrib64(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      {selectedImage ? (
        <div className="grid place-items-center">
          <img
            alt="not found"
            className="h-52 w-52 shadow-xl mx-4 my-4"
            src={URL.createObjectURL(selectedImage)}
          />
          <button
            onClick={() => {
              setSelectedImage(null);
            }}
            className="text-bold rounded-xl border-2 border-white p-1 text-white shadow-2xl hover:bg-red-400"
          >
            Remove
          </button>
        </div>
      ) : (
        <div>
          <label for="showImg">
            <img
              src={addImage}
              alt=""
              className="h-52 w-52 shadow-xl mx-4 my-4 hover:opacity-75 hover:cursor-pointer"
            ></img>
            <p className="text-xl text-bold mx-14 hover:cursor-pointer hover:text-white/60 ">
              Add an image
            </p>
          </label>

          <input
            type="file"
            id="showImg"
            className="invisible hidden"
            onChange={(event) => {
              uploadImage(event);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadAndDisplayImage;
