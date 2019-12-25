import ShowMoreButtonComponent from '../components/button-show';
import NoFilmsComponent from '../components/films-no-data';
import FilmsTopRatedComponent from '../components/films-top-rated';
import FilmsMostCommentedComponent from '../components/films-most-commented';
import FilmsListContainerComponent from '../components/films-list';
import SortComponent, {SortType} from '../components/sort';
import MovieController from '../controllers/movie-controller';

import {RenderPosition} from '../const/const';
import {render, remove} from '../utils/render';

const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;
const FILMS_COUNT_AT_FIRST = 5;
const COUNT_FILMS_LOAD_MORE = 5;

// создает список карточек фильмов в соответствии с изменениями внесенными в данные
const renderFilms = (filmsListContainer, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsListContainer, onDataChange, onViewChange);
    movieController.render(film);
    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedFilmControllers = [];
    this._showingFilmsCount = FILMS_COUNT_AT_FIRST;

    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsTopRatedComponent = new FilmsTopRatedComponent();
    this._filmsMostCommentedComponent = new FilmsMostCommentedComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._filmsListContainerComponent = new FilmsListContainerComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this); // привязываем к контексту
    this._onViewChange = this._onViewChange.bind(this);

    this. _onSortTypeChange = this. _onSortTypeChange.bind(this); // привязываем к контексту
    this._sortComponent.setClickOnSortHandler(this. _onSortTypeChange);
  }

  render(films) {
    this._films = films;

    const container = this._container.getElement();
    // отрисовывает блок с фильтрами sort
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    // отрисовывае блок для фильмов films-list
    render(container, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    const filmsContainer = this._filmsListContainerComponent.getElement().querySelector(`.films-list__container`);

    // проверяет отсутствие фильмов в базе, выводит сообщение, скрывает кнопку Show more
    if (films.length <= 0) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      remove(this._showMoreButtonComponent);
    }
    // отрисовывает первый блок с фильмами в количестве this._showingFilmsCount
    const newFilms = renderFilms(filmsContainer, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    // соединяет массив showedFilmControllers с массивом newFilms и перезаписывает его
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._renderShowMoreButton();

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

  // метод отрисовывающий кнопку Show more
  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    const listContainer = this._filmsListContainerComponent.getElement();

    render(listContainer, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    // отрисовывает дополнительные блоки с фильмами на странице при клике на кнопку Show more
    this._showMoreButtonComponent.setClickHandler(() => { // реализует метод показа дополнительного блока фильма при клике на кнопку Show more
      const prevFilmsCount = this._showingFilmsCount;
      const filmsContainer = this._filmsListContainerComponent.getElement().querySelector(`.films-list__container`);

      this._showingFilmsCount = this._showingFilmsCount + COUNT_FILMS_LOAD_MORE;

      const newFilms = renderFilms(filmsContainer, this._films.slice(prevFilmsCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);
      // соединяет массив showedFilmControllers с массивом newFilms и перезаписывает его
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent); // удаляет кнопку Show more если показаны все фильмы
      }
    });
  }

  _onDataChange(movieController, oldData, newData) { // метод замены карточки фильма при изменении данных
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  // метод фильтрует фильмы и отрисовывает на страницу отфильтрованные блоки
  _onSortTypeChange(sortType) {
    let sortedFilms = []; // пустой массив для фильмов

    switch (sortType) { // сортирует и записывает в массив в зависимости от нажатого фильтра
      case SortType.DATE:
        sortedFilms = this._films.slice().sort((a, b) => b.year - a.year);
        break;
      case SortType.RATE:
        sortedFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedFilms = this._films.slice(0, this._showingFilmsCount);
        break;
    }

    const filmsContainer = this._filmsListContainerComponent.getElement().querySelector(`.films-list__container`);

    filmsContainer.innerHTML = ``; // удаляет текущий блок с фильмами

    renderFilms(filmsContainer, sortedFilms, this._onDataChange); // отрисовывает новый отфильтрованный блок с фильмами
    // если выбран любой фильтр кроме дефолтного кнопка Show more удаляется
    if (sortType === SortType.DEFAULT) {
      this._renderShowMoreButton();
    } else {
      remove(this._showMoreButtonComponent);
    }
  }
}
