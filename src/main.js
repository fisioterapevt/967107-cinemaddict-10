'use strict';

const FILM_COUNT = 5;
const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;


const createHeaderProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const createNavTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

const createFiltersTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

const createFilmsBlockTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};

const createButtonShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createFilmsTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};
const createFilmsMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};


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
