import {createHeaderProfileTemplate} from './components/profile';
import {createFiltersTemplate} from './components/filters';
import {createNavTemplate} from './components/nav';
import {createFilmsBlockTemplate} from './components/film-block';
import {createButtonShowMoreTemplate} from './components/button-show';
import {createFilmsTopRatedTemplate} from './components/film-top-rated';
import {createFilmsMostCommentedTemplate} from './components/film-most-commented';
import {createFilmCardTemplate} from './components/film-card';


const FILM_COUNT = 5;
const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createHeaderProfileTemplate());
render(siteMainElement, createNavTemplate());
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


new Array(FILM_COUNT)
  .fill(``)
  .forEach(() => render(siteFilmsContainerElement, createFilmCardTemplate()));

new Array(TOP_RATED_COUNT)
  .fill(``)
  .forEach(() => render(siteFilmsTopRatedContainerElement, createFilmCardTemplate()));

new Array(MOST_COMMENTED_COUNT)
  .fill(``)
  .forEach(() => render(siteFilmsMostCommentedElement, createFilmCardTemplate()));
