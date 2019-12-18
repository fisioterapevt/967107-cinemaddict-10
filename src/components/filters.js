import AbstractComponent from '../components/abstract-component';

export const FilterType = {
  DATE: `date`,
  RATE: `rate`,
  DEFAULT: `default`,
};

const createFiltersTemplate = () => {
  return (
    `<ul class="sort">
        <li><a href="#" data-filter-type="${FilterType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" data-filter-type="${FilterType.DATE}" class="sort__button">Sort by date</a></li>
        <li><a href="#" data-filter-type="${FilterType.RATE}" class="sort__button">Sort by rating</a></li>
      </ul>`
  );
};

export default class Filters extends AbstractComponent {
  constructor() {
    super();
    this._currentFilterType = FilterType.DEFAULT;
  }

  getTemplate() { // возвращает разметку
    return createFiltersTemplate();
  }

  setClickOnFilterHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = evt.target.dataset.filterType;

      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;

      handler(this._currentFilterType);
    });
  }
}
