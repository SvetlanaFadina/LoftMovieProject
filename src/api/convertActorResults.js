import { convertMovieId, getActorId } from "./convertId";

export function convertActorBio(Actor) {
  return {
    imgSrc: Actor?.image?.url,
    name: Actor.name,
    id: getActorId(Actor.id),
    text: Actor?.miniBios[0]?.text
  };
}

function convertActorMovie(Movie) {
  return {
    coverSrc: Movie?.image?.url,
    movieTitle: Movie.title,
    year: Movie.year,
    id: convertMovieId(Movie.id)
  };
}

export function convertActorMovies(Movies) {
  return Movies.filmography.map(convertActorMovie);
}
