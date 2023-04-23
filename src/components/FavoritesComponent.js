const filters = [
  { value: "all", label: "Все" },
  { value: "actors", label: "Актёры" },
  { value: "movies", label: "Фильмы" }
];

export const FavoritesComponent = ({ activeFilter = "all", changeFilter }) => {
  const activeClass = "filter-list__item--active";
  return (
    <section class="favourites-filter">
      <h1 class="h1-text">Избранное</h1>
      <ul class="filter-list">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          return (
            <li key={filter.value}>
              <button
                onClick={() => changeFilter(filter.value)}
                class={`body-3-text filter-list__item ${
                  isActive ? activeClass : ""
                }`}
              >
                {filter.label}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
