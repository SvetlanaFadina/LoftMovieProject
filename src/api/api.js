import { stall } from "../utils/stall";
import {
  searchResponse,
  actorResponse,
  movieResponse,
  movieDataResponse,
  movieActorsResponse
} from "../api/dummyData";
import { convertSearchResults } from "../api/convertSearchResults";
import {
  convertActorBio,
  convertActorMovies
} from "../api/convertActorResults";
import {
  convertMovieResults,
  convertActorsResults
} from "../api/convertMovieResults";

const isDummyResponse = true;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "74a378ee5bmsh7eedf21981d4ffdp139f79jsn79d4fd870148",
    "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
  }
};

export async function getSearchResults(searchText) {
  if (isDummyResponse) {
    await stall();
    return convertSearchResults(searchResponse);
  }

  return fetch(
    `https://imdb8.p.rapidapi.com/auto-complete?q=${encodeURI(searchText)}`,
    options
  )
    .then((response) => response.json())
    .then((response) => convertSearchResults(response))
    .catch((err) => console.error(err));
}

export async function ActorInfo(actorId) {
  return Promise.all([getActorBio(actorId), getActorMovies(actorId)]).then(
    (response) => {
      return {
        bio: response[0],
        movies: response[1]
      };
    }
  );
}

async function getActorBio(actorId) {
  if (isDummyResponse) {
    await stall();
    return convertActorBio(actorResponse);
  }

  return fetch(
    `https://imdb8.p.rapidapi.com/actors/get-bio?nconst=${actorId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => convertActorBio(response))
    .catch((err) => console.error(err));
}

async function getActorMovies(actorId) {
  if (isDummyResponse) {
    await stall();
    return convertActorMovies(movieResponse);
  }

  return fetch(
    `https://imdb8.p.rapidapi.com/actors/get-all-filmography?nconst=${actorId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => convertActorMovies(response))
    .catch((err) => console.error(err));
}

export async function getMovie(movieId) {
  const movie = await getMovieData(movieId);
  const actors = await getMovieActors(movieId, movie.actors);
  return {
    ...movie,
    id: movieId,
    actors
  };
}

async function getMovieData(movieId) {
  if (isDummyResponse) {
    await stall();
    return convertMovieResults(movieDataResponse);
  }
  return fetch(`https://imdb8.p.rapidapi.com/title/find?q=${movieId}`, options)
    .then((response) => response.json())
    .then((response) => convertMovieResults(response))
    .catch((err) => console.error(err));
}

async function getMovieActors(movieId, actorIds) {
  if (isDummyResponse) {
    await stall();
    return convertActorsResults(movieActorsResponse);
  }
  const ids = actorIds.join("&id=");

  return fetch(
    `https://imdb8.p.rapidapi.com/title/get-charname-list?id=${ids}&tconst=${movieId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => convertActorsResults(response))
    .catch((err) => console.error(err));
}
