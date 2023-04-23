import { getUrlParam } from "../Router";
import { useEffect } from "react";
import { List } from "../components/List";
import { ActorCard } from "../components/ActorCard";
import { MovieCard } from "../components/MovieCard";
import { useSearch } from "../hooks/useSearch";
import { PageLayout } from "../components/PageLayout";

export function SearchResults() {
  const searchText = getUrlParam("searchText");
  const { getResults, isLoading, data: searchResults, error } = useSearch();

  const actors = searchResults.filter(
    (searchResult) => !("year" in searchResult)
  );
  const movies = searchResults.filter((searchResult) => "year" in searchResult);

  useEffect(() => {
    getResults(searchText);
  }, []);

  return (
    <PageLayout>
      <h2 className="h2-text search-results__title">Вы искали, а мы нашли:</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <List title="Актёры" variant="column">
            {actors.map((actor) => (
              <ActorCard {...actor} key={actor.id}></ActorCard>
            ))}
          </List>
          <List title="Фильмы и сериалы" variant="grid">
            {movies.map((movie) => (
              <MovieCard {...movie} key={movie.id}></MovieCard>
            ))}
          </List>
        </>
      )}
    </PageLayout>
  );
}
