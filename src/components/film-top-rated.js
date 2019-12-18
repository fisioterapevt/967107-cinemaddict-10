import AbstractComponent from '../components/abstract-component';

const createFilmsTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container"></div>
      </section>`
  );
};

export default class FilmsTopRated extends AbstractComponent {
  getTemplate() { // возвращает разметку
    return createFilmsTopRatedTemplate();
  }
}
