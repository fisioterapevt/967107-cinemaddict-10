import AbstractComponent from '../components/abstract-component';

const createNavTemplate = (films) => {
// фильтруем и создаем array из фильмов помеченных как favorites, получем количество фильмов
  const isFavoriteCount = films.filter((film) => film.isFavorite).length;
  const isWatchedCount = films.filter((film) => film.isWatched).length;
  const isWatchListCount = films.filter((film) => film.isWatchList).length;

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

export default class Nav extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() { // возвращает разметку
    return createNavTemplate(this._films);
  }
}
