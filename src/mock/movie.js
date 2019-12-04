import {
  MovieNames,
  MoviePosters,
  MovieDiscription,
  MovieGenres,
  Directors,
  Writers,
  Actors,
  Countries
} from '../const/const';

const MOVIES_COUNT = 15; // количество фильмов

const arrDescription = MovieDiscription.split(`. `); // разбивает общее описание на массив предложений

const getRandomArrayItem = (array) => { // возвращает рандомное количество элементов в array
  const randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
};

const getRandomNumber = (min, max) => { // возвращает рандомное число в заданных рамках
  return min + Math.floor((max + 1 - min) * Math.random());
};

// возвращает рандомно из массива предложений arr элементы  в количестве count
const getRandomArray = (arr, count) => arr.sort(() => Math.random() - 0.5).slice(0, count).join(` `);

const generateMovie = () => {

  return {
    nameMovie: getRandomArrayItem(MovieNames),
    posterMovie: getRandomArrayItem(MoviePosters),
    description: getRandomArray(arrDescription, getRandomNumber(1, 3)),
    rating: getRandomNumber(0, 10),
    year: getRandomNumber(1950, 2019),
    duration: {
      hour: getRandomNumber(0, 1),
      min: getRandomNumber(0, 60)
    },
    genre: getRandomArrayItem(MovieGenres),
    countComments: getRandomNumber(0, 20),
    isFavorite: Math.random() > 0.8,
    isWatched: Math.random() > 0.3,
    isWatchList: Math.random() > 0.4
  };
};

const generateMovies = (count, foo) => {
  return new Array(count)
    .fill(``)
    .map(foo);
};

const moviesBlock = generateMovies(MOVIES_COUNT, generateMovie); // генерирует блок фильмов


const generateMoviePopup = () => { // генерирует данные для Popup

  return {
    nameMovie: getRandomArrayItem(MovieNames),
    posterMovie: getRandomArrayItem(MoviePosters),
    ageRestricted: Math.random() > 0.5 ? `18+` : ``,
    original: getRandomArrayItem(MovieNames),
    director: getRandomArrayItem(Directors),
    writer: getRandomArray(Writers, getRandomNumber(1, 3)),
    actor: getRandomArray(Actors, getRandomNumber(2, 4)),
    year: getRandomNumber(1950, 2019),
    duration: {
      hour: getRandomNumber(0, 1),
      min: getRandomNumber(0, 60)
    },
    country: getRandomArrayItem(Countries),
    genre: getRandomArray(MovieGenres, getRandomNumber(1, 3)),
    description: MovieDiscription,
    rating: getRandomNumber(0, 10),
    countComments: getRandomNumber(0, 20)
  };
};

const moviePopup = generateMoviePopup();// генерирует Popup


export {
  generateMovie,
  generateMovies,
  moviesBlock,
  moviePopup
};
