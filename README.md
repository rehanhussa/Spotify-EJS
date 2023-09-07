# BETTERIFY (SPOTIFY)



## Project Description: 

The application I will be making here is a better version of spotify.
I will be using the spotify API to get the data and display it on my website.


## Technologies Used

![Node](https://img.shields.io/badge/-Node-05122A?style=flat&logo=node.js)
![MongooseDB](https://img.shields.io/badge/-MongoDB-05122A?style=flat&logo=mongodb)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Heroku](https://img.shields.io/badge/-Heroku-05122A?style=flat&logo=heroku)



## Getting Started

(LINK TO DEPLOYED HEROKU APP)

## Screenshots

![image](https://github.com/rehanhussa/Betterify/blob/main/Betterify.png)

![image](https://github.com/rehanhussa/Betterify/blob/main/mqdefault.jpg)

## Trello

https://trello.com/b/ge0bcOvv/project-2-spotify-application

## Code Examples

```app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email';

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});
```


## Motivation

I wanted to reinvent a application I use everyday and make it better and more user friendly. I also wanted to learn more about the spotify API and how to use it.

## How to Use
1. Launch up the application by clicking the link.
2. ???
3. ???
4. ???
5. Enjoy Music!


## BUGS 
1. 

## Next Steps
* 


## Betterify (Spotify) Wireframe: 

1. Header/Footer:

Navigation links (Home, Search, Library, etc.)
User profile and settings

2. Home Page:

Featured playlists and albums
Recently played
Recommendations based on user preferences

3. Search Page:

Search bar
Filter options (Artists, Albums, Playlists, etc.)
Search results list/grid

4. Library Page:

Saved playlists, albums, and songs
Recently played history
User-created playlists


5. Artist/Album Page:

Artist/album cover and information
List of songs or tracks
Option to play, add to playlist, or save

6. Player Bar:

Current playing song's album cover
Play/pause button
Seek bar and time indicators
Volume control

7. User Profile Page:

User's profile picture and information
User's playlists and followed artists
Account settings

8. Authentication and Sign-Up:

Sign-up form with fields for username, email, and password
Login form with fields for email and password
Social media login options

9. Modal Dialogs/Pop-ups:

Add to playlist dialog
Confirmation dialogs (e.g., when deleting a playlist)
