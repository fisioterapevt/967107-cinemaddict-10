import AbstractSmartComponent from './abstract-smart-component';
import {remove} from '../utils/render';
// блок с рейтингом фильма
const createFilmRatingBlock = () => {
  return (
    `  <div class="form-details__middle-container">
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
            <label class="film-details__user-rating-label" for="rating-1">1</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
            <label class="film-details__user-rating-label" for="rating-2">2</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
            <label class="film-details__user-rating-label" for="rating-3">3</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
            <label class="film-details__user-rating-label" for="rating-4">4</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
            <label class="film-details__user-rating-label" for="rating-5">5</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
            <label class="film-details__user-rating-label" for="rating-6">6</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
            <label class="film-details__user-rating-label" for="rating-7">7</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
            <label class="film-details__user-rating-label" for="rating-8">8</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
            <label class="film-details__user-rating-label" for="rating-9">9</label>
          </div>
        </section>
      </div>
    </section>
  </div>`
  );
};

const createFilmDetailsPopupTemplate = (film, options = {}) => {
  const {name, ageRestricted, poster, director, writer, actor, duration, country, genre, rating, description, countComments} = film;
  const {isWatchlist, isWatched, isFavorite, path, pluralGenres} = options;

  // выбрать состояние фильма
  const isWatchlistClass = isWatchlist ? `checked` : ``;
  const isWatchedClass = isWatched ? `checked` : ``;
  const isFavoriteClass = isFavorite ? `checked` : ``;

  const pathToEmoji = path;

  const countGenres = pluralGenres;

  // добавляет и убирает блок с рейтингом в зависимости от просмотрен фильм или нет
  const filmRatingBlock = createFilmRatingBlock();
  const isFilmRatingBlock = isWatched ? filmRatingBlock : null;
  return (
    `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
            <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
            <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

                <p class="film-details__age">${ageRestricted}</p>
            </div>
            <div class="film-details__info">
                <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${name}</h3>
                    <p class="film-details__title-original">Original: ${name}</p>
                </div>

                <div class="film-details__rating">
                    <p class="film-details__total-rating">${rating}</p>
                </div>
                </div>

                <table class="film-details__table">
                <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${writer}</td>
                </tr>
                <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${actor}</td>
                </tr>
                <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">30 March 1945</td>
                </tr>
                <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${duration}h ${duration}m</td>
                </tr>
                <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                    <td class="film-details__term">${countGenres ? pluralGenres : `Genre`}</td>
                    <td class="film-details__cell">
                    <span class="film-details__genre">${genre}</span>
                </tr>
                </table>

                <p class="film-details__film-description">${description}</p>
            </div>
            </div>

            <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" ${isWatchlistClass} name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to
                watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" ${isWatchedClass} name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already
                watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" ${isFavoriteClass} name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to
                favorites</label>
            </section>
        </div>
        ${isFilmRatingBlock}
        <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span
                class="film-details__comments-count">${countComments}</span></h3>

            <ul class="film-details__comments-list"></ul>

            <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">
                <img src="images/emoji/${pathToEmoji ? path : `smile`}.png" width="55" height="55" alt="emoji">
                </div>

                <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                    name="comment">Great movie!</textarea>
                </label>

                <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile"
                    value="sleeping">
                <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                    id="emoji-sleeping" value="neutral-face">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke"
                    value="grinning">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry"
                    value="grinning">
                <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
                </div>
            </div>
            </section>
        </div>
        </form>
    </section>`
  );
};

export default class FilmDetailsPopup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._subscribeOnEvents();
  }

  getTemplate() { // возвращает разметку
    return createFilmDetailsPopupTemplate(this._film, {
      isWatchlist: this._isWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
      isSmile: this._isSmile,
      isSleeping: this._isSleeping,
      isGpuke: this._isGpuke,
      isAngry: this._isAngry,
      pluralGenres: this._pluralGenres,
      path: this._path
    });
  }

  recoveryListeners() { // публичный метод вызываемый в AbstractSmartComponent
    this._subscribeOnEvents(); // метод восстанавливает обработчики событий
  }

  rerender() {
    super.rerender();
  }

  _setChangeGenre(genreCount, MAX_GENRE_COUNT) { // проверяет количество жанров фильма и меняет Genre на Genres
    if (genreCount._film.genre.length > MAX_GENRE_COUNT) {
      this._pluralGenres = `Genres`;

      this.rerender();
    }
  }

  _subscribeOnEvents() { // восстанавливает обработчики событий

    const element = this.getElement();

    element.querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        this._isWatchlist = !this._isWatchlist;

        this.rerender();
      });

    element.querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        this._isWatched = !this._isWatched;

        this.rerender();
      });

    element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;

        this.rerender();
      });

    const emoji = element.querySelectorAll(`.film-details__emoji-item`); // коллекция emoji
    emoji.forEach((em) => { // устанавливает обработчик клика на все emoji
      em.addEventListener(`click`, () => {
        switch (em.id) {
          case `emoji-smile`:
            this._path = `smile`;
            this.rerender();
            break;
          case `emoji-sleeping`:
            this._path = `sleeping`;
            this.rerender();
            break;
          case `emoji-gpuke`:
            this._path = `puke`;
            this.rerender();
            break;
          case `emoji-angry`:
            this._path = `angry`;
            this.rerender();
            break;
        }
      });
    });

    element.querySelector(`.film-details__close-btn`) // обработчик клика на кнопку закрытия Попапа
    .addEventListener(`click`, () => {
      remove(this);
    });
  }
}
