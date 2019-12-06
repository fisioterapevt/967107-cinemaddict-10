import {
  FilmNames,
  FilmPosters,
  FilmDiscription,
  FilmGenres,
  Directors,
  Writers,
  Actors,
  Countries
} from '../const/const';

const arrDescription = FilmDiscription.split(`. `); // разбивает общее описание на массив предложений

const getRandomArrayItem = (array) => { // возвращает рандомное количество элементов в array
  const randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
};

const getRandomNumber = (min, max) => { // возвращает рандомное число в заданных рамках
  return min + Math.floor((max + 1 - min) * Math.random());
};

// возвращает рандомно из массива предложений arr элементы  в количестве count
const getRandomArray = (arr, count) => arr.sort(() => Math.random() - 0.5).slice(0, count).join(` `);

const generateFilm = () => {

  return {
    name: getRandomArrayItem(FilmNames),
    poster: getRandomArrayItem(FilmPosters),
    description: getRandomArray(arrDescription, getRandomNumber(1, 3)),
    rating: getRandomNumber(0, 10),
    year: getRandomNumber(1950, 2019),
    duration: {
      hour: getRandomNumber(0, 1),
      min: getRandomNumber(0, 60)
    },
    genre: getRandomArrayItem(FilmGenres),
    countComments: getRandomNumber(0, 20),
    isFavorite: Math.random() > 0.8,
    isWatched: Math.random() > 0.3,
    isWatchList: Math.random() > 0.4
  };
};

const generateFilms = (count, foo) => {
  return new Array(count)
    .fill(``)
    .map(foo);
};

const generateFilmPopup = () => { // генерирует данные для Popup
  return {
    nameFilm: getRandomArrayItem(FilmNames),
    posterFilm: getRandomArrayItem(FilmPosters),
    ageRestricted: Math.random() > 0.5 ? `18+` : ``,
    original: getRandomArrayItem(FilmNames),
    director: getRandomArrayItem(Directors),
    writer: getRandomArray(Writers, getRandomNumber(1, 3)),
    actor: getRandomArray(Actors, getRandomNumber(2, 4)),
    year: getRandomNumber(1950, 2019),
    duration: {
      hour: getRandomNumber(0, 1),
      min: getRandomNumber(0, 60)
    },
    country: getRandomArrayItem(Countries),
    genre: getRandomArray(FilmGenres, getRandomNumber(1, 3)),
    description: FilmDiscription,
    rating: getRandomNumber(0, 10),
    countComments: getRandomNumber(0, 20)
  };
};

export {
  generateFilm,
  generateFilms,
  generateFilmPopup
};
