import { FavoritesComponent } from "../components/FavoritesComponent";
import { PageLayout } from "../components/PageLayout";
import { List } from "../components/List";
import { ActorCard } from "../components/ActorCard";
import { MovieCard } from "../components/MovieCard";
import { favouritesStore } from "../favouritesStore";
import { useState } from "react";

export function Favourites() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { actors, movies } = favouritesStore.getFavourites();

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
  };

  const showActors = ["actors", "all"].includes(activeFilter);
  const showMovies = ["movies", "all"].includes(activeFilter);

  return (
    <>
      <PageLayout>
        <FavoritesComponent
          changeFilter={handleFilterChange}
          activeFilter={activeFilter}
        />

        {showActors ? (
          <List variant="column" title="Актёры">
            {actors.map((actor) => {
              return <ActorCard key={actor.id} {...actor}></ActorCard>;
            })}
          </List>
        ) : null}
        {showMovies ? (
          <List variant="grid" title="Фильмы и сериалы">
            {movies.map((movie) => {
              return <MovieCard key={movie.id} {...movie}></MovieCard>;
            })}
          </List>
        ) : null}
      </PageLayout>
    </>
  );
}
