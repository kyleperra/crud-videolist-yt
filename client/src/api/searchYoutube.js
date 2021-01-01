import React from 'react';
import YT_API_KEY from './youtube-config.js';

const searchYoutube = (params, callback) => {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${params[0]}&q=${params[1]}&key=${YT_API_KEY}`, requestOptions)
    .then(response => response.text())
    .then(result => callback(result))
    .catch(error => console.log('error', error));
};

export default searchYoutube;