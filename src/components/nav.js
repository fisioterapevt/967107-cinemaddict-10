import {moviesBlock} from '../mock/movie';// импорт блока фильмов

// фильтруем и создаем array из фильмов помеченных как favorites, получем количество фильмов
const arrIsFavorite = moviesBlock.filter((mov) => mov.isFavorite === true).length;
const arrIsWatchlist = moviesBlock.filter((mov) => mov.isWatchList === true).length;
export const arrIsWatched = moviesBlock.filter((mov) => mov.isWatched === true).length;

export const createNavTemplate = () => {
  return (
    `<nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${arrIsWatchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${arrIsWatched}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${arrIsFavorite}</span></a>
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>`
  );
};
