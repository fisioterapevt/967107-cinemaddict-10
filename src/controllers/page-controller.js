import FilmCardComponent from '../components/film-card';
import FilmDetailsPopupComponent from '../components/film-details';
import ShowMoreButtonComponent from '../components/button-show';
import NoFilmsComponent from '../components/film-no-data';
import FilmsBlockComponent from '../components/film-block';
import FilmsTopRatedComponent from '../components/film-top-rated';
import FilmsMostCommentedComponent from '../components/film-most-commented';
import FilmsListContainerComponent from '../components/films-list';
import SortComponent, {SortType} from '../components/sort';

import {RenderPosition, ESC_KEYCODE} from '../const/const';
import {render, remove} from '../utils/render';

const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;
const FILMS_COUNT_AT_FIRST = 5;
const COUNT_FILMS_LOAD_MORE = 5;

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
      if (evt.key === ESC_KEYCODE) {
        closePopup();
      }
    };
    document.addEventListener(`keydown`, onEcsKeyDown); // отлавливает событие нажатия на кнопку Esc
    filmDetailsPopupComponent.setClickOnClosePopupButonHandler(closePopup); // реализует метод закрытия попапа при  клике на кнопку закрытия попапа
  };

  filmCardComponent.setClickOnPosterHandler(openPopup); // реализует метод для открытия попапа при клике на картинку фильма
  filmCardComponent.setClickOnTitleHandler(openPopup); // реализует метод для открытия попапа при клике  на название фильма
  filmCardComponent.setClickOnCommentsHandler(openPopup); // реализует метод для открытия попапа при клике  на комментарии к фильму

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
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsBlockComponent = new FilmsBlockComponent();
    this._filmsListContainerComponent = new FilmsListContainerComponent();
    this._sortComponent = new SortComponent();
  }

  render(films) {
    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }
      render(this._filmsListContainerComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      // отрисовывает дополнительные блоки с фильмами на странице при клике на кнопку Show more
      this._showMoreButtonComponent.setClickHandler(() => { // реализует метод показа дополнительного блока фильма при клике на кнопку Show more
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + COUNT_FILMS_LOAD_MORE;

        renderFilms(filmsContainer, films.slice(prevFilmsCount, showingFilmsCount));

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent); // удаляет кнопку Show more если показаны все фильмы
        }
      });
    };

    const container = this._container.getElement();
    // проверяет отсутствие фильмов в базе, выводит сообщение, скрывает кнопку Show more
    if (films.length <= 0) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      remove(this._showMoreButtonComponent);
    }
    let showingFilmsCount = FILMS_COUNT_AT_FIRST;

    render(container, this._sortComponent, RenderPosition.BEFOREEND); // отрисовывает блок с фильтрами

    const filmsContainer = this._filmsListContainerComponent.getElement().querySelector(`.films-list__container`);
    // отрисовывает первый блок с фильмами в контейнер film-list
    renderFilms(filmsContainer, films.slice(0, showingFilmsCount));
    // отрисовывает кнопку Show more в блок  film-list
    renderShowMoreButton();
    // отрисовывает первый блок с фильмами  и кнопкой на страницу
    render(container, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

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

    // фильтрует фильмы и отрисовывает на страницу отфильтрованные блоки
    this._sortComponent.setClickOnSortHandler((sortType) => {
      showingFilmsCount = FILMS_COUNT_AT_FIRST;

      let sortedFilms = []; // пустой массив для фильмов

      switch (sortType) { // сортирует и записывает в массив в зависимости от нажатого фильтра
        case SortType.DATE:
          sortedFilms = films.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATE:
          sortedFilms = films.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedFilms = films.slice(0, showingFilmsCount);
          break;
      }

      filmsContainer.innerHTML = ``; // удаляет текущий блок с фильмами

      renderFilms(filmsContainer, sortedFilms); // отрисовывает новый отфильтрованный блок с фильмами

      if (sortType === SortType.DEFAULT) { //
        renderShowMoreButton();
      } else {
        remove(this._showMoreButtonComponent);
      }
    });
  }
}
