import {createHeaderProfileTemplate} from './components/profile';
import {createFiltersTemplate} from './components/filters';
import {createNavTemplate} from './components/nav';
import {createMoviesBlockTemplate} from './components/film-block';
import {createButtonShowMoreTemplate} from './components/button-show';
import {createMoviesTopRatedTemplate} from './components/film-top-rated';
import {createMoviesMostCommentedTemplate} from './components/film-most-commented';
import {createMovieCardTemplate} from './components/film-card';
import {createMovieDetailesTemplate} from './components/film-detailes';
import {moviesBlock} from './mock/movie';
import {moviePopup} from './mock/movie';


const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;
const MOVIES_COUNT_AT_FIRST = 5;
const COUNT_MOVIES_LOAD_MORE = 5;


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createHeaderProfileTemplate());
render(siteMainElement, createNavTemplate());
render(siteMainElement, createFiltersTemplate());
render(siteMainElement, createMoviesBlockTemplate());

const siteMoviesBlock = siteMainElement.querySelector(`.films`);
const siteMoviesListElement = siteMoviesBlock.querySelector(`.films-list`);
const siteMoviesContainerElement = siteMoviesListElement.querySelector(`.films-list__container`);
render(siteMoviesListElement, createButtonShowMoreTemplate());
render(siteMoviesBlock, createMoviesTopRatedTemplate());
render(siteMoviesBlock, createMoviesMostCommentedTemplate());

const siteMoviesTopRated = siteMoviesBlock.querySelector(`.films-list--extra`);
const siteMoviesMostCommented = siteMoviesBlock.querySelector(`.films-list--extra:last-of-type`);
const siteMoviesTopRatedContainerElement = siteMoviesTopRated.querySelector(`.films-list__container`);
const siteMoviesMostCommentedElement = siteMoviesMostCommented.querySelector(`.films-list__container`);

// БЛОК ДЕЙСТВИЙ С КАРТОЧКАМИ ФИЛЬМОВ

let showingMoviesCount = MOVIES_COUNT_AT_FIRST;

// отрисовывает фильмы на странице в основной блок
moviesBlock.slice(0, showingMoviesCount)
  .forEach((movie) => render(siteMoviesContainerElement, createMovieCardTemplate(movie)));

const siteMovieCard = siteMoviesContainerElement.querySelectorAll(`.film-card`);

// отрисовывает фильмы на странице в блок лучший рейтинг
const arrTopRatedlist = moviesBlock
  .filter((mov) => mov.rating !== 0)
  .sort((a, b) => b.rating - a.rating)// сортирует массив по убыванию
  .slice(0, TOP_RATED_COUNT); // вырезает количество элементов от 1 до TOP_RATED_COUNT

if (arrTopRatedlist.length <= 0) {
  siteMoviesTopRated.remove();
}

arrTopRatedlist.forEach((movie) => render(siteMoviesTopRatedContainerElement, createMovieCardTemplate(movie)));

// отрисовывает фильмы на странице в блок наибольших комментарий
const arrMostCommented = moviesBlock
  .filter((mov) => mov.countComments !== 0)
  .sort((a, b) => b.countComments - a.countComments) // сортирует по убыванию
  .slice(0, MOST_COMMENTED_COUNT); // вырезает количество элементов от 1 до MOST_COMMENTED_COUNT

if (arrMostCommented.length <= 0) {
  siteMoviesMostCommented.remove();
}

arrMostCommented.forEach((movie) => render(siteMoviesMostCommentedElement, createMovieCardTemplate(movie)));

// отрисовывает COUNT_MOVIES_LOAD_MORE количество следующих фильмов
const loadMoreButton = siteMoviesListElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevMoviesCount = showingMoviesCount;
  showingMoviesCount = showingMoviesCount + COUNT_MOVIES_LOAD_MORE;

  moviesBlock.slice(prevMoviesCount, showingMoviesCount)
    .forEach((movie) => render(siteMoviesContainerElement, createMovieCardTemplate(movie)));

  if (showingMoviesCount >= moviesBlock.length) {
    loadMoreButton.remove();
  }
});

// БЛОК ДЕЙСТВИЙ С POPUP

const onPopupOpenAndClose = () => { // открывает и закрывает попап
  render(siteFooterElement, createMovieDetailesTemplate(moviePopup));// отрисовывает попап
  const buttonPopupClose = document.querySelector(`.film-details__close-btn`);
  buttonPopupClose.addEventListener(`click`, () => {
    const Close = document.querySelector(`.film-details`);
    Close.remove();
  });
};

siteMovieCard.forEach((card) => card.addEventListener(`click`, onPopupOpenAndClose)); // слушатель событий на карточках фильма
