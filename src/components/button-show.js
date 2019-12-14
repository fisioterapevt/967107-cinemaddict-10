import AbstractComponent from '../components/abstract-component';

const createButtonShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ButtonShowMore extends AbstractComponent {
  getTemplate() { // возвращает разметку
    return createButtonShowMoreTemplate();
  }

  onSetClick(evt) {
    this.getElement().addEventListener(`click`, evt);
  }
}

