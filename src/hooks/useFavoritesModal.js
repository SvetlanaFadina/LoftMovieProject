import { useState } from "react";
import { createPortal } from "react-dom";
import { FavoritesModal } from "../components/FavoritesModal";

export function useFavoritesModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);

  return {
    showModal,
    Modal: () =>
      isModalOpen
        ? createPortal(
            <FavoritesModal close={() => setIsModalOpen(false)} />,
            document.getElementById("overlay")
          )
        : null
  };
}
