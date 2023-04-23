import { FavoritesIconTransparent } from "../icons/FavoritesIconTransparent";
import { useFavoritesModal } from "../hooks/useFavoritesModal";
import { FavoritesIconBlue } from "../icons/FavoritesIconBlue";
import { useState } from "react";
import { favouritesStore } from "../favouritesStore";

export const MovieHero = ({ coverSrc, title, year, time, id }) => {
  const { showModal, Modal } = useFavoritesModal();

  const [clicked, setClicked] = useState(true);

  const handleToggleFavorites = () => {
    favouritesStore.addMovie({ id, coverSrc, title, year });
    showModal();
    if (clicked === true) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };
  return (
    <>
      <section className="movie-hero">
        <img
          src={coverSrc ?? "./assets/images/movie-placeholder.jpg"}
          className="movie-hero__img"
          loading="lazy"
          alt={title}
        />
        <div className="movie-info">
          <div className="movie-info__name">
            <h1 className="h1-text text-nowrap">{title}</h1>
            <button onClick={handleToggleFavorites}>
              {clicked ? <FavoritesIconTransparent /> : <FavoritesIconBlue />}
            </button>
          </div>
          <div className="movie-info__description body-text">
            {year ? (
              <div>
                <span>Год производства</span>
                <span>{year}</span>
              </div>
            ) : null}
            <div>
              <span>Жанр</span>
              <span className="text-nowrap">криминал, биография, комедия</span>
            </div>
            {time ? (
              <div>
                <span>Время</span>
                <span>{time} мин.</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <Modal />
    </>
  );
};
