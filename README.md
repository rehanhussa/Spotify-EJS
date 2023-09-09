# BETTERIFY (SPOTIFY)



## Project Description: 

The application I will be making here is a better version of spotify.
I will be using the spotify API to get the data and display it on my website.


## Technologies Used

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)


## Getting Started

[Deployed Heroku Application](https://spotify-ejs-82ff054271ab.herokuapp.com/)

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
2. Search up your favorite Artist on Spotify.
3. Click the Artist to view their albums.
4. Click the album to view the songs.
5. Enjoy Music!


## BUGS 
1. Login with spotify button does not work.
2. Occasionally error will occur when searching for an artist.


## Next Steps
* Fixing Bugs
* Adding more features
* Adding more styling
* Adding more functionality

## Credits

* [Rehan Hussain](www.linkedin.com/in/garehan)
* [Spotify API](https://developer.spotify.com/documentation/web-api/)
* [Spotify](https://www.spotify.com/us/)
* [Ian for Insipration](https://github.com/lschmidtfellner/Unit-2-API)