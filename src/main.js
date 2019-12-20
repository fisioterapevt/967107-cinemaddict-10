import HeaderProfileComponent from './components/profile';
import NavComponent from './components/nav';
import FilmsBlockComponent from './components/film-block';
import PageController from './controllers/page-controller';

import {generateFilm} from './mock/film';
import {RenderPosition} from './const/const';
import {render} from './utils/render';
import {generateList} from './utils/lists';

const FILMS_COUNT = 15; // количество фильмов

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateList(FILMS_COUNT, generateFilm);// генерирует блок фильмов

render(siteHeaderElement, new HeaderProfileComponent(films), RenderPosition.BEFOREEND);
render(siteMainElement, new NavComponent(films), RenderPosition.BEFOREEND);

const filmsBlockComponent = new FilmsBlockComponent();
render(siteMainElement, filmsBlockComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsBlockComponent);
pageController.render(films);
