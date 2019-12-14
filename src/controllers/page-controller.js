
import FilmCardComponent from '../components/film-card';
import FilmDetailsPopupComponent from '../components/film-details';
import ButtonShowMoreComponent from '../components/button-show';
import NoFilmsComponent from '../components/film-no-data';
import FilmsBlockComponent from '../components/film-block';
import FilmsTopRatedComponent from '../components/film-top-rated';
import FilmsMostCommentedComponent from '../components/film-most-commented';

import FilmsListContainerComponent from '../components/films-list';

const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;
const FILMS_COUNT_AT_FIRST = 5;
const COUNT_FILMS_LOAD_MORE = 5;

import {RenderPosition, ECS_KEYCODE} from '../const/const';
import {render, remove} from '../utils/render';

const siteFooterElement = document.querySelector(`.footer`);

// создает карточку фильма, навешивает обработчик клика отрисовывает попап, закрывает попап
const renderFilm = (filmsContainer, film) => {

  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsPopupComponent = new FilmDetailsPopupComponent(film);

  const openPopup = () => { // отрисовывает попап
    render(siteFooterElement, filmDetailsPopupComponent, RenderPosition.BEFOREEND);

    const closePopup = () => { // закрывает попап кликом на крестик
      remove(filmDetailsPopupComponent);
    };

    const onEcsKeyDown = (evt) => { // закрывает попап клавишей Esc
      if (evt.key === ECS_KEYCODE) {
        closePopup();
      }
    };
    document.addEventListener(`keydown`, onEcsKeyDown); // отлавливает событие нажатия на кнопку Esc
    filmDetailsPopupComponent.onSetButtonCloseClick(closePopup); // отлавливает событие нажатия на кнопку закрытия попапа
  };

  filmCardComponent.onSetFilmCardClick(openPopup, `.film-card__poster`); // навешивает обработчик события на картинку фильма
  filmCardComponent.onSetFilmCardClick(openPopup, `.film-card__title`); // навешивает обработчик на название фильма
  filmCardComponent.onSetFilmCardClick(openPopup, `.film-card__comments`); // навешивает обработчик на комментарии фильма

  render(filmsContainer, filmCardComponent, RenderPosition.BEFOREEND); // отрисовывает карточку фильма
};

// создает список карточек фильмов
const renderFilms = (filmsListContainer, films) => { 
  films.forEach((film) => {
    renderFilm(filmsListContainer, film);
  });
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmCardComponent = new FilmCardComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsTopRatedComponent = new FilmsTopRatedComponent();
    this._filmsMostCommentedComponent = new FilmsMostCommentedComponent();
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
    this._filmsBlockComponent = new FilmsBlockComponent();
    this._filmsListContainerComponent = new FilmsListContainerComponent();
  }

  render(films) {
    const container = this._container.getElement();
    // проверяет отсутствие фильмов в базе, выводит сообщение, скрывает кнопку Show more
    if (films.length <= 0) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      remove(this._buttonShowMoreComponent);
    }

    // отрисовывает первый блок с фильмами на странице
    let showingFilmsCount = FILMS_COUNT_AT_FIRST;

    const filmsContainer = this._filmsListContainerComponent.getElement().querySelector(`.films-list__container`);
    // создает первый блок с фильмами
    renderFilms(filmsContainer, films.slice(0, showingFilmsCount));
    // отрисовывает кнопку Show more в блок  film-list
    render(this._filmsListContainerComponent.getElement(), this._buttonShowMoreComponent, RenderPosition.BEFOREEND);

    // отрисовывает первый блок с фильмами  и кнопкой на странице
    render(container, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    // отрисовывает дополнительные блоки с фильмами на странице при клике на кнопку Show more
    this._buttonShowMoreComponent.onSetClick(() => { // слушает клик на кнопку Show more
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + COUNT_FILMS_LOAD_MORE;

      renderFilms(filmsContainer, films.slice(prevFilmsCount, showingFilmsCount));

      if (showingFilmsCount >= films.length) {
        remove(this._buttonShowMoreComponent); // удаляет кнопку Show more если показаны все фильмы
      }
    });

    // отрисовывает фильмы на странице в блок лучший рейтинг
    render(container, this._filmsTopRatedComponent, RenderPosition.BEFOREEND); // отрисовывает блок Top rated

    const topRatedContainer = this._filmsTopRatedComponent.getElement().querySelector(`.films-list__container`);

    const topRatedFilms = films // сортирует и создает массив из фильмов
    .filter((film) => film.rating !== 0)
    .sort((a, b) => b.rating - a.rating)// сортирует массив по убыванию
    .slice(0, TOP_RATED_COUNT); // вырезает количество элементов от 1 до TOP_RATED_COUNT

    renderFilms(topRatedContainer, topRatedFilms); // отрисовывает фильмы в блок Top rated

    if (topRatedFilms.length <= 0) {
      remove(this._filmsTopRatedComponent); // удаляет блок Top rated
    }

    // отрисовывает в блок фильмы c наибольшим количеством комментариев
    render(container, this._filmsMostCommentedComponent, RenderPosition.BEFOREEND); // отрисовывает блок Most сommented

    const mostCommentedContainer = this._filmsMostCommentedComponent.getElement().querySelector(`.films-list__container`);

    const mostCommentedFilms = films
    .filter((film) => film.countComments !== 0)
    .sort((a, b) => b.countComments - a.countComments) // сортирует по убыванию
    .slice(0, MOST_COMMENTED_COUNT); // вырезает количество элементов от 1 до MOST_COMMENTED_COUNT

    if (mostCommentedFilms.length <= 0) {
      remove(this._filmsMostCommentedComponent);
    }

    renderFilms(mostCommentedContainer, mostCommentedFilms); // отрисовывает фильмы в блок Most сommented
  }
}