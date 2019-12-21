import AbstractComponent from '../components/abstract-component';

const createFilmCardTemplate = (film) => {
  const {name, poster, description, rating, year, duration, genre, countComments} = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration.hour}h ${duration.min}m</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${countComments} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() { // возвращает разметку
    return createFilmCardTemplate(this._film);
  }

  _setClickHandler(path, handler) { // приватный метод
    this.getElement().querySelector(path)
    .addEventListener(`click`, handler);
  }

  setClickOnPosterHandler(handler) { //  публичный метод
    this._setClickHandler(`.film-card__poster`, handler);
  }

  setClickOnTitleHandler(handler) {
    this._setClickHandler(`.film-card__title`, handler);
  }

  setClickOnCommentsHandler(handler) {
    this._setClickHandler(`.film-card__comments`, handler);
  }

  setClickOnAddToWatchList(handler) {
    this._setClickHandler(`.film-card__controls-item--add-to-watchlist`, handler);
  }

  setClickOnMarkAsWatchedHandler(handler) {
    this._setClickHandler(`.film-card__controls-item--mark-as-watched`, handler);
  }

  setClickOnControlsItemFavoriteHandler(handler) {
    this._setClickHandler(`.film-card__controls-item--favorite`, handler);
  }
}
