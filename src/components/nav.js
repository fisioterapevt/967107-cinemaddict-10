
export const createNavTemplate = (films) => {
// фильтруем и создаем array из фильмов помеченных как favorites, получем количество фильмов
  const isFavoriteCount = films.filter((film) => film.isFavorite === true).length;
  const isWatchedCount = films.filter((film) => film.isWatched === true).length;
  const isWatchListCount = films.filter((film) => film.isWatchList === true).length;

  return (
    `<nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All films</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${isWatchListCount}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${isWatchedCount}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${isFavoriteCount}</span></a>
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>`
  );
};
