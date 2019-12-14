import AbstractComponent from '../components/abstract-component';

export const createFilmsMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container"></div>
      </section>`
  );
};

export default class FilmsMostCommented extends AbstractComponent {
  getTemplate() { // возвращает разметку
    return createFilmsMostCommentedTemplate();
  }
}
