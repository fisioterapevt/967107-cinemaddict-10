import AbstractComponent from '../components/abstract-component';

const createFilmsBlockTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsBlock extends AbstractComponent {
  getTemplate() {
    return createFilmsBlockTemplate();
  }
}
