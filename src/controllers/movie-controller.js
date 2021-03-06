import FilmCardComponent from '../components/film-card';
import FilmDetailsPopupComponent from '../components/film-details';

import {RenderPosition} from '../const/const';

import {render, remove, replace} from '../utils/render';

const siteFooterElement = document.querySelector(`.footer`);

const MAX_GENRE_COUNT = 1;

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(film);

    this._filmCardComponent.setClickOnPosterHandler(() => {
      this._openPopup();
    });

    this._filmCardComponent.setClickOnTitleHandler(() => { // реализует метод для открытия попапа при клике  на название фильма
      this._openPopup();
    });

    this._filmCardComponent.setClickOnCommentsHandler(() => { // реализует метод для открытия попапа при клике  на комментарии к фильму
      this._openPopup();
    });

    this._filmCardComponent.setAddWatchListButtonClickHandler(() => { // WatchList добавляет или убирает фильм
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist
      }));
    });

    this._filmCardComponent.setWatchedButtonClickHandler(() => { // Watched добавляет или убирает фильм
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }));
    });

    this._filmCardComponent.setFavoriteButtonClickHandler(() => { // Favorite добавляет или убирает фильм
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite
      }));
    });

    if (this._oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  _openPopup() { // метод отрисовывает попап
    this._filmDetailsPopupComponent._setChangeGenre(this._filmDetailsPopupComponent, MAX_GENRE_COUNT); // вызывает метод проверки на количество жанров

    render(siteFooterElement, this._filmDetailsPopupComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopup() { // метод закрывает попап кликом на кнопку закрытия
    remove(this._filmDetailsPopupComponent);
    document.removeEventListener(`click`, this._closePopup);

  }

  _onEscKeyDown(evt) { // метод отлавливает событие нажатия на кнопку Esc
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

