import { useEffect, useState } from "react";
import { getUrlParam } from "../Router";
import { getMovie } from "../api/api";
import { MovieHero } from "../components/MovieHero";
import { List } from "../components/List";
import { ActorCard } from "../components/ActorCard";
import { PageLayout } from "../components/PageLayout";

export function Movie() {
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState(null);

  const getMovieData = async () => {
    const MovieId = getUrlParam("id");
    setIsLoading(true);
    const movieData = await getMovie(MovieId);
    setMovieData(movieData);
    console.log(movieData);

    setIsLoading(false);
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <PageLayout>
      {isLoading || movieData === null ? (
        <p>Загружаем...</p>
      ) : (
        <>
          <MovieHero {...movieData}></MovieHero>
          <List variant="column" title="Актёры">
            {movieData.actors.map((actor) => {
              return <ActorCard key={actor.id} {...actor}></ActorCard>;
            })}
          </List>
        </>
      )}
    </PageLayout>
  );
}
