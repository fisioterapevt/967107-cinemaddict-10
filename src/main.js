import HeaderProfileComponent from './components/profile';
import FiltersComponent from './components/filters';
import NavComponent from './components/nav';
import FilmsBlockComponent from './components/film-block';
import ButtonShowMoreComponent from './components/button-show';
import FilmsTopRatedComponent from './components/film-top-rated';
import FilmsMostCommentedComponent from './components/film-most-commented';
import FilmCardComponent from './components/film-card';
import FilmDetailsPopupComponent from './components/film-details';
import {generateFilm} from './mock/film';
import {RenderPosition, ECS_KEYCODE} from './const/const';
import {render} from './utils/utils';
import {generateList} from './utils/lists';

const FILMS_COUNT = 15; // количество фильмов
const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;
const FILMS_COUNT_AT_FIRST = 5;
const COUNT_FILMS_LOAD_MORE = 5;

// создает карточку фильма, навешивает обработчик клика отрисовывает попап, закрывает попап
const renderFilm = (siteFilmsContainerElement, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsPopupComponent = new FilmDetailsPopupComponent(film);

  const clickOnPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const clickOnTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const clickOnComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  const openPopup = () => { // отрисовывает попап
    render(siteFooterElement, filmDetailsPopupComponent.getElement(), RenderPosition.BEFOREEND);
    const btnPopupClose = filmDetailsPopupComponent.getElement().querySelector(`.film-details__close-btn`);

    const closePopup = () => { // закрывает попап кликом на крестик
      filmDetailsPopupComponent.getElement().remove();
    };

    const onEcsKeyDown = (evt) => { // закрывает попап клавишей Esc
      if (evt.key === ECS_KEYCODE) {
        closePopup();
      }
    };
    document.addEventListener(`keydown`, onEcsKeyDown); // отлавливает событие нажатия на кнопку Esc
    btnPopupClose.addEventListener(`click`, closePopup); // отлавливает событие нажатия на кнопку закрытия попапа
  };

  clickOnPoster.addEventListener(`click`, openPopup); // отлавливает событие нажатия на картинку
  clickOnTitle.addEventListener(`click`, openPopup); // отлавливает событие нажатия на название
  clickOnComments.addEventListener(`click`, openPopup); // отлавливает событие нажатия на комментарии

  render(siteFilmsContainerElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND); // отрисовывает карточку фильма
};

const films = generateList(FILMS_COUNT, generateFilm);// генерирует блок фильмов

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new HeaderProfileComponent(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavComponent(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);

const filmsBlockComponent = new FilmsBlockComponent();
render(siteMainElement, filmsBlockComponent.getElement(), RenderPosition.BEFOREEND);

const siteFilmsBlock = siteMainElement.querySelector(`.films`);
const siteFilmsListElement = siteFilmsBlock.querySelector(`.films-list`);

// БЛОК ДЕЙСТВИЙ С КАРТОЧКАМИ ФИЛЬМОВ
// отрисовывает первый блок с фильмами на странице
const siteFilmsContainerElement = filmsBlockComponent.getElement().querySelector(`.films-list__container`);

let showingFilmsCount = FILMS_COUNT_AT_FIRST;
films.slice(0, showingFilmsCount)
  .forEach((film) => {
    renderFilm(siteFilmsContainerElement, film);
  });

// отрисовывает фильмы на странице в блок лучший рейтинг
const filmsTopRatedComponent = new FilmsTopRatedComponent();
render(siteFilmsBlock, filmsTopRatedComponent.getElement(), RenderPosition.BEFOREEND); // отрисовывает блок Top rated

const siteFilmsTopRatedContainerElement = filmsTopRatedComponent.getElement().querySelector(`.films-list__container`);

const topRatedFilms = films // сортирует и создает массив из фильмов
  .filter((film) => film.rating !== 0)
  .sort((a, b) => b.rating - a.rating)// сортирует массив по убыванию
  .slice(0, TOP_RATED_COUNT); // вырезает количество элементов от 1 до TOP_RATED_COUNT

if (topRatedFilms.length <= 0) {
  filmsTopRatedComponent.getElement().remove(); // удаляет блок Top rated
}

topRatedFilms.forEach((film) => render(siteFilmsTopRatedContainerElement, new FilmCardComponent(film).getElement(), RenderPosition.BEFOREEND)); // отрисовывает фильмы в блок Top rated

// отрисовывает в блок фильмы c наибольшим количеством комментариев
const filmsMostCommentedComponent = new FilmsMostCommentedComponent();
render(siteFilmsBlock, filmsMostCommentedComponent.getElement(), RenderPosition.BEFOREEND); // отрисовывает блок Most сommented

const siteFilmsMostCommentedContainerElement = filmsMostCommentedComponent.getElement().querySelector(`.films-list__container`);

const mostCommentedFilms = films
  .filter((film) => film.countComments !== 0)
  .sort((a, b) => b.countComments - a.countComments) // сортирует по убыванию
  .slice(0, MOST_COMMENTED_COUNT); // вырезает количество элементов от 1 до MOST_COMMENTED_COUNT

if (mostCommentedFilms.length <= 0) {
  filmsMostCommentedComponent.remove();
}

mostCommentedFilms.forEach((film) => render(siteFilmsMostCommentedContainerElement, new FilmCardComponent(film).getElement(), RenderPosition.BEFOREEND)); // отрисовывает фильмы в блок Most сommented

// отрисовывает дополнительные блоки с фильмами на странице
const buttonShowComponent = new ButtonShowMoreComponent();
render(siteFilmsListElement, buttonShowComponent.getElement(), RenderPosition.BEFOREEND);

buttonShowComponent.getElement().addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + COUNT_FILMS_LOAD_MORE;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderFilm(siteFilmsContainerElement, film));

  if (showingFilmsCount >= films.length) {
    buttonShowComponent.getElement().remove();
  }
});
