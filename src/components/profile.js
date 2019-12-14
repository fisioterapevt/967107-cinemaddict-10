import AbstractComponent from '../components/abstract-component';

const createHeaderProfileTemplate = (films) => {
  const isWatchedCount = films.filter((film) => film.isWatched).length;

  return (
    `<section class="header__profile profile">
        <p class="profile__rating">${isWatchedCount}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

export default class HeaderProfile extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() { // возвращает разметку
    return createHeaderProfileTemplate(this._films);
  }
}
