import { useEffect, useState } from "react";
import { ActorInfo } from "../api/api";
import { getUrlParam } from "../Router";
import { ActorHero } from "../components/ActorHero";
import { List } from "../components/List";
import { MovieCard } from "../components/MovieCard";
import { PageLayout } from "../components/PageLayout";

export function Actor() {
  const [isLoading, setIsLoading] = useState(false);
  const [actorData, setActorData] = useState(null);

  const getActorData = async () => {
    const actorId = getUrlParam("id");
    setIsLoading(true);
    const actorData = await ActorInfo(actorId);
    setActorData(actorData);
    console.log(actorData);

    setIsLoading(false);
  };

  useEffect(() => {
    getActorData();
  }, []);

  return (
    <PageLayout>
      {isLoading || actorData === null ? (
        <p>Загружаем...</p>
      ) : (
        <>
          <ActorHero {...actorData.bio}></ActorHero>
          <List variant="grid" title="Фильмы и сериалы">
            {actorData.movies.map((movie) => {
              return <MovieCard key={movie.id} {...movie}></MovieCard>;
            })}
          </List>
        </>
      )}
    </PageLayout>
  );
}
