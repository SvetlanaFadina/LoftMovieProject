import { getActorId } from "./convertId";

export function convertMovieResults(MovieData) {
  const movie = MovieData.results[0];
  return {
    coverSrc: movie?.image?.url,
    title: movie.title,
    year: movie?.year,
    time: movie?.runningTimeInMinutes,
    actors: movie.principals.map(convertActor)
  };
}

function convertActor(ActorData) {
  return getActorId(ActorData.id);
}

export function convertActorsResults(ActorsData) {
  return Object.values(ActorsData).map((actor) => {
    return {
      name: actor.name.name,
      imgSrc: actor?.name?.image?.url,
      id: getActorId(actor.name.id)
    };
  });
}
