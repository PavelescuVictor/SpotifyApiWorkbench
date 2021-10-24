import authorization from './authorization.js';

const loginButton = document.querySelector('button.login-button');
loginButton.addEventListener('click', function () {
  console.log(authorization());
  authorization().verifyAuthorization();
});

const userDataButton = document.querySelector('button.user-data');
userDataButton.addEventListener('click', function () {
  fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
});
