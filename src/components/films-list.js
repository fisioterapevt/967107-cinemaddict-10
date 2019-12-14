import AbstractComponent from '../components/abstract-component';

const createFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All films. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsListContainer extends AbstractComponent {
  getTemplate() { // возвращает разметку
    return createFilmsListTemplate();
  }

  onSetClick(evt) {
    this.getElement().addEventListener(`click`, evt);
  }
}
