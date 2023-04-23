import React from "react";
import { getUrlParam } from "../Router";
import { getMovie } from "../api/api";
import { MovieHero } from "../components/MovieHero";
import { List } from "../components/List";
import { ActorCard } from "../components/ActorCard";
import { PageLayout } from "../components/PageLayout";

class MovieClass extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      movieData: null
    };
  }
  async getMovieData() {
    const MovieId = getUrlParam("id");
    this.setState({ isLoading: true });
    const movieData = await getMovie(MovieId);
    this.setState({
      isLoading: false,
      movieData
    });
  }

  componentDidMount() {
    this.getMovieData();
  }

  render() {
    const { isLoading, movieData } = this.state;
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
}
export { MovieClass };
