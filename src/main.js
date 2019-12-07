import {createHeaderProfileTemplate} from './components/profile';
import {createFiltersTemplate} from './components/filters';
import {createNavTemplate} from './components/nav';
import {createFilmsBlockTemplate} from './components/film-block';
import {createButtonShowMoreTemplate} from './components/button-show';
import {createFilmsTopRatedTemplate} from './components/film-top-rated';
import {createFilmsMostCommentedTemplate} from './components/film-most-commented';
import {createFilmCardTemplate} from './components/film-card';
import {createFilmDetailsTemplate} from './components/film-details';
import {generateFilm, generateFilmPopup} from './mock/film';

const FILMS_COUNT = 15; // количество фильмов
const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;
const FILMS_COUNT_AT_FIRST = 5;
const COUNT_FILMS_LOAD_MORE = 5;

const generateFilms = (count, foo) => {
  return new Array(count)
    .fill(``)
    .map(foo);
};

const films = generateFilms(FILMS_COUNT, generateFilm); // генерирует блок фильмов

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createHeaderProfileTemplate(films));
render(siteMainElement, createNavTemplate(films));
render(siteMainElement, createFiltersTemplate());
render(siteMainElement, createFilmsBlockTemplate());

const siteFilmsBlock = siteMainElement.querySelector(`.films`);
const siteFilmsListElement = siteFilmsBlock.querySelector(`.films-list`);
const siteFilmsContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);
render(siteFilmsListElement, createButtonShowMoreTemplate());
render(siteFilmsBlock, createFilmsTopRatedTemplate());
render(siteFilmsBlock, createFilmsMostCommentedTemplate());

const siteFilmsTopRated = siteFilmsBlock.querySelector(`.films-list--extra`);
const siteFilmsMostCommented = siteFilmsBlock.querySelector(`.films-list--extra:last-of-type`);
const siteFilmsTopRatedContainerElement = siteFilmsTopRated.querySelector(`.films-list__container`);
const siteFilmsMostCommentedElement = siteFilmsMostCommented.querySelector(`.films-list__container`);

// БЛОК ДЕЙСТВИЙ С КАРТОЧКАМИ ФИЛЬМОВ
let showingFilmsCount = FILMS_COUNT_AT_FIRST;

// отрисовывает фильмы на странице в основной блок
films.slice(0, showingFilmsCount)
  .forEach((film) => render(siteFilmsContainerElement, createFilmCardTemplate(film)));

const siteFilmCard = siteFilmsContainerElement.querySelectorAll(`.film-card`);

// отрисовывает фильмы на странице в блок лучший рейтинг
const topRatedFilms = films
  .filter((film) => film.rating !== 0)
  .sort((a, b) => b.rating - a.rating)// сортирует массив по убыванию
  .slice(0, TOP_RATED_COUNT); // вырезает количество элементов от 1 до TOP_RATED_COUNT

if (topRatedFilms.length <= 0) {
  siteFilmsTopRated.remove();
}

topRatedFilms.forEach((film) => render(siteFilmsTopRatedContainerElement, createFilmCardTemplate(film)));

// отрисовывает фильмы на странице в блок наибольших комментарий
const mostCommentedFilms = films
  .filter((film) => film.countComments !== 0)
  .sort((a, b) => b.countComments - a.countComments) // сортирует по убыванию
  .slice(0, MOST_COMMENTED_COUNT); // вырезает количество элементов от 1 до MOST_COMMENTED_COUNT

if (mostCommentedFilms.length <= 0) {
  siteFilmsMostCommented.remove();
}

mostCommentedFilms.forEach((film) => render(siteFilmsMostCommentedElement, createFilmCardTemplate(film)));

// отрисовывает COUNT_FILMS_LOAD_MORE количество следующих фильмов
const loadMoreButton = siteFilmsListElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + COUNT_FILMS_LOAD_MORE;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(siteFilmsContainerElement, createFilmCardTemplate(film)));

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});

// БЛОК ДЕЙСТВИЙ С POPUP
const onPopupOpenAndClose = () => { // открывает и закрывает попап
  render(siteFooterElement, createFilmDetailsTemplate(generateFilmPopup()));// отрисовывает попап
  const buttonPopupClose = document.querySelector(`.film-details__close-btn`);
  buttonPopupClose.addEventListener(`click`, () => {
    const closePopup = document.querySelector(`.film-details`);
    closePopup.remove();
  });
};

siteFilmCard.forEach((card) => card.addEventListener(`click`, onPopupOpenAndClose)); // слушатель событий на карточках фильма
