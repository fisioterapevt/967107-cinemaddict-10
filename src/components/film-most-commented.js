import {createElement} from '../utils/elements';

export const createFilmsMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container"></div>
      </section>`
  );
};

export default class FilmsMostCommented {
  constructor() {
    this._element = null;
  }
  getTemplate() { // возвращает разметку
    return createFilmsMostCommentedTemplate();
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
