import {createElement} from '../utils/utils';

const createNoDataFilmsTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class NoData {
  constructor() {
    this.element = null;
  }
  getTemplate() { // возвращает разметку
    return createNoDataFilmsTemplate();
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
