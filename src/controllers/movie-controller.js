import FilmCardComponent from '../components/film-card';
import FilmDetailsPopupComponent from '../components/film-details';

import {RenderPosition} from '../const/const';

import {render, remove} from '../utils/render';


const siteFooterElement = document.querySelector(`.footer`);

export default class MovieController {
  constructor(container, onDataChange) {
    this.container = container;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsPopupComponent = new FilmDetailsPopupComponent(film);

    render(this.container, this._filmCardComponent, RenderPosition.BEFOREEND); // отрисовывает карточку фильма

    this._filmCardComponent.setClickOnPosterHandler(() => {
      this._openPopup();
    });

    this._filmCardComponent.setClickOnTitleHandler(() => { // реализует метод для открытия попапа при клике  на название фильма
      this._openPopup();
    });

    this._filmCardComponent.setClickOnCommentsHandler(() => { // реализует метод для открытия попапа при клике  на комментарии к фильму
      this._openPopup();
    });

    this._filmDetailsPopupComponent.setClickOnClosePopupButonHandler(() => { // реализует метод закрытия попапа при  клике на кнопку закрытия попапа
      this._closePopup();
    });

    this._filmCardComponent.setClickOnAddToWatchList(() => {

    });

    this._filmCardComponent.setClickOnMarkAsWatchedHandler(() => {

    });

    this._filmCardComponent.setClickOnControlsItemFavoriteHandler(() => {

    });
  }

  _openPopup() { // метод отрисовывает попап
    render(siteFooterElement, this._filmDetailsPopupComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopup() { // метод закрывает попап кликом на кнопку закрытия
    remove(this._filmDetailsPopupComponent);
  }

  _onEscKeyDown(evt) { // метод отлавливает событие нажатия на кнопку Esc
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(this._filmDetailsPopupComponent);
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

