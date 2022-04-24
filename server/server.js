const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fbe2d6743a13434283678fa7d7e7f934",
    clientSecret: "d8e3a8a00755472f870453632789c730",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fbe2d6743a13434283678fa7d7e7f934",
    clientSecret: "d8e3a8a00755472f870453632789c730",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.post("/create", (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fbe2d6743a13434283678fa7d7e7f934",
    clientSecret: "d8e3a8a00755472f870453632789c730",
    accessToken: req.body.accessToken,
  });

  const imageUrib64 = req.body.imageUrib64;
  spotifyApi
    .createPlaylist(req.body.showName, {
      description: req.body.showDescription,
    })
    .then((response) => {
      spotifyApi
        .uploadCustomPlaylistCoverImage(response.body.id, imageUrib64)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          res.sendStatus(400);
        });
    });
  res.sendStatus(200);
});

app.listen(3001);
