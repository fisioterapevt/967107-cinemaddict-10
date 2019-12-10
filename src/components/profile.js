import {createElement} from '../utils/utils';


const createHeaderProfileTemplate = (films) => {
  const isWatchedCount = films.filter((film) => film.isWatched).length;

  return (
    `<section class="header__profile profile">
        <p class="profile__rating">${isWatchedCount}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

export default class HeaderProfile {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() { // возвращает разметку
    return createHeaderProfileTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}