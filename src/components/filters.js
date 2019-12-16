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

  onSetFilterFilmsClick(evt) {
    this.getElement().addEventListener(`click`, evt);
  }

  // onSetFilterFilmsClick(evt) {
    // const filterType = evt.target.dataset.filterType; // записывает в переменную  data-атрибут

      // evt.preventDefault();

      // this._currentFilterType = filterType;
      // const filterType = evt.target.dataset.filterType; // записывает в переменную  data-атрибут
      // const filterType = evt.target; // записывает в переменную  data-атрибут

// console.log(filterType);

      // this._currentFilterType = filterType;

      // if (this.this._currentFilterType === filterType) { // проверяет если текущий фильтр совпадает с фильтром по умолчанию ничего не возвращает
      //   return;
      // }

      // prop(this._currentFilterType);
    // });
  // }

  // onSetFilterFilmsClick(prop) {
  //   this.getElement().addEventListener(`click`, (evt) => {
  //     evt.preventDefault();
  //     // alert(`click`);


  //     // if (evt.target.tagName !== `A`) { // проверяет  имя тега(если не ссылка ничего не возвращает)
  //     //   return;
  //     // }

  //     // const filterType = evt.target.dataset.filterType; // записывает в переменную  data-атрибут

  //     // if (this.this._currentFilterType === filterType) { // проверяет если текущий фильтр совпадает с фильтром по умолчанию ничего не возвращает
  //     //   return;
  //     // }

  //     // this._currentSortType = filterType;

  //     // prop(this.this._currentFilterType);
  //   });
  // }
}
