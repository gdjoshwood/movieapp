import {MOVIE_DB_API_ROOT, MOVIE_DB_API_KEY} from 'react-native-dotenv';

export function popularData (page) {
  return fetch(`${MOVIE_DB_API_ROOT}movie/popular?api_key=${MOVIE_DB_API_KEY}&page=${page}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}


export function detailData (movieId) {
  return fetch(`${MOVIE_DB_API_ROOT}movie/${movieId}?api_key=${MOVIE_DB_API_KEY}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}