import { FavoritesIconTransparent } from "../icons/FavoritesIconTransparent";
import { useFavoritesModal } from "../hooks/useFavoritesModal";
import { useState } from "react";
import { FavoritesIconBlue } from "../icons/FavoritesIconBlue";
import { getUrlParam } from "../Router";
import { favouritesStore } from "../favouritesStore";

export const ActorHero = ({ imgSrc, name, text, id }) => {
  const { showModal, Modal } = useFavoritesModal();

  const [clicked, setClicked] = useState(true);

  const handleToggleFavorites = () => {
    favouritesStore.addActor({ name, imgSrc, id });
    showModal();
    if (clicked === true) {
      setClicked(false);
    } else {
      setClicked(true);
    }
    const actorId = getUrlParam("id");
    localStorage.setItem("actorId", actorId);
  };

  return (
    <>
      <section className="actor-hero">
        <img
          src={imgSrc ?? "./assets/images/actor-placeholder.png"}
          className="actor-hero__img"
          loading="lazy"
          alt={name}
        />
        <div className="actor-info">
          <div className="actor-info__name">
            <h1 className="h1-text text-nowrap">{name}</h1>
            <button onClick={handleToggleFavorites}>
              {clicked ? <FavoritesIconTransparent /> : <FavoritesIconBlue />}
            </button>
          </div>
          {text ? (
            <div className="actor-info__description">
              <p className="body-text">{text}</p>
              <button className="tag-text">Подробнее</button>
            </div>
          ) : null}
        </div>
      </section>
      <Modal />
    </>
  );
};
