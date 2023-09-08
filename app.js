require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const SpotifyWebApi = require("spotify-web-api-node");
const axios = require('axios');
const querystring = require('querystring');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(
  new SpotifyStrategy(
    {
      clientID: 'YOUR_SPOTIFY_CLIENT_ID',
      clientSecret: 'YOUR_SPOTIFY_CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      // Save user data into a database or any storage system you're using
      return done(null, profile);
    }
  )
);

app.get('/login', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private'],
  showDialog: true
}));

app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to your desired page.
    res.redirect('/');
  }
);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:3000/callback';

app.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: 'user-read-private user-read-email',
        redirect_uri
      }));
});

app.get('/callback', (req, res) => {
    let code = req.query.code || null;

    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(
          process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
        ).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };

    axios({
      method: 'post',
      url: authOptions.url,
      data: querystring.stringify(authOptions.form),
      headers: authOptions.headers
    }).then(response => {
      var access_token = response.data.access_token;
      var refresh_token = response.data.refresh_token;

      return axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token }
      });
    }).then(response => {
      console.log(response.data);
      res.redirect('/your-redirect-url');
    }).catch(error => {
      console.error('Error:', error);
    });
});

// Set up middleware
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Configure Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
const getToken = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body["access_token"]);
  } catch (error) {
    console.log("There was an error:", error);
  }
};

// Get artist
const getArtist = async (artist) => {
  try {
    const data = await spotifyApi.searchArtists(artist);
    return data;
  } catch (error) {
    console.log("There has been an error:", error);
  }
};

// Initialize the app
const initApp = async () => {
  await getToken();
};

// Call initialization function
initApp();

// Define routes
app.get("/", (req, res) => {
  const pageTitle = "Betterify";
  const pageStyling = "/styles/index.css";
  res.render("index", { pageTitle, pageStyling });
});

app.get("/artist-search", async (req, res) => {
    const artistSearch = req.query["artist-search"];
  
    if (!artistSearch) {
      res.send("No search provided");
      return;
    }
  
    try {
      const data = await getArtist(artistSearch);
      const artists = data.body.artists.items;
      const pageTitle = "Search Results";
      const pageStyling = "/styles/artist-style.css";
      res.render("artist-search-results", {
        artists,
        pageTitle,
        pageStyling,
      });
    } catch (error) {
      console.log("There has been an error:", error);
      res.render("error");
    }
  });
  

app.get("/all-albums/:artistId", async (req, res) => {
  const artistId = req.params.artistId;
  console.log("Artist ID:", artistId);
  const pageTitle = "Albums";
  const pageStyling = "/styles/album-style.css";

  try {
    const data = await spotifyApi.getArtistAlbums(artistId);
    const albums = data.body.items;
    res.render("all-albums", { albums, pageTitle, pageStyling });
  } catch (error) {
    console.log("There has been an error:", error);
  }
});

app.get("/tracks/:albumId", async (req, res) => {
  const albumId = req.params.albumId;
  const pageStyling = "/styles/tracks.css";

  try {
    const data = await spotifyApi.getAlbumTracks(albumId);
    const tracks = data.body.items;
    const pageTitle = "Songs";
    res.render("track-information", { tracks, pageTitle, pageStyling });
  } catch (error) {
    console.log("There has been an error:", error);
  }
});

app.delete('/playlist/:playlistId', async (req, res) => {
  const playlistId = req.params.playlistId;
  try {
      await spotifyApi.unfollowPlaylist(playlistId);
      res.status(200).send({ message: 'Playlist deleted successfully' });
  } catch (error) {
      console.error('Error deleting playlist:', error);
      res.status(500).send({ message: 'Error deleting playlist' });
  }
});

app.put('/playlist/:playlistId', async (req, res) => {
  const playlistId = req.params.playlistId;
  const { name, description } = req.body; // Assuming you send the updated name and description in the request body
  try {
      await spotifyApi.changePlaylistDetails(playlistId, { name, description });
      res.status(200).send({ message: 'Playlist updated successfully' });
  } catch (error) {
      console.error('Error updating playlist:', error);
      res.status(500).send({ message: 'Error updating playlist' });
  }
});


// Start the server
const port = 3000;
app.listen(port, () =>
  console.log(`Betterify Running on ${port} 🎧`)
);


// 