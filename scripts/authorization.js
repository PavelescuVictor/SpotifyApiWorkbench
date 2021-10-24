import config from '../config.js';

const spotifyApiConfig = config.spotifyAppConfig;

const authorization = function () {
  const CLIENT_ID = spotifyApiConfig.CLIENT_ID;
  const REDIRECT_URI = spotifyApiConfig.REDIRECT_URI;
  const AUTHORIZATION_URL = 'https://accounts.spotify.com/authorize';
  const scopes = [];
  const popupWindowWidth = 800;
  const popupWindowHeight = 600;
  const leftOffset = screen.width / 2 - popupWindowWidth / 2;
  const topOffset = screen.height / 2 - popupWindowHeight / 2;

  window.addEventListener(
    'message',
    (event) => {
      let hash = JSON.parse(event.data);
      console.log('da');
      if (hash.type === 'access_token') callback(hash.access_token);
    },
    false
  );

  const generateAuthorizationURL = function () {
    return `${AUTHORIZATION_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scopes=${scopes.join(
      ' '
    )}&show_dialog=true`;
  };

  return {
    loginWithPopup: function () {
      const authorizationURL = generateAuthorizationURL();
      let popupWindow = window.open(
        authorizationURL,
        'Login with Spotify',
        `width=${popupWindowWidth}, height=${popupWindowHeight}, left=${leftOffset}, top=${topOffset}`
      );
      window.authorizeSpotifyCallback = (payload) => {
        popupWindow.close();
        console.log(payload);
        localStorage.setItem('access_token', payload);
      };
    },

    verifyAuthorization: function () {
      const token = window.location.hash.substr(1).split('&')[0].split('=')[1];

      if (token) {
        window.opener.authorizeSpotifyCallback(token);
      } else {
        console.log(this);
        this.loginWithPopup();
      }
    },

    // checkIfLoggedIn: function () {
    //   if (localStorage.getItem('access_token'))
    // }
  };
};

export default authorization;
