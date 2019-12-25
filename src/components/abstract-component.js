import {createElement} from '../utils/elements';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`); // создавать объекты напрямую из этого класса нельзя От него можно только наследоваться
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`); // У наследников должен быть обязательно реализован метод getTemplate
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  
  removeElement() {
    this._element = null;
  }
}
