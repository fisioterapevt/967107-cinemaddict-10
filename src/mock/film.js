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

import {formatDate, formatTime} from '../utils/common';

const descriptionSentences = FilmDiscription.split(`. `); // разбивает общее описание на массив предложений

const getRandomArrayItem = (array) => { // возвращает рандомный элемент в array
  const randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
};

const getRandomNumber = (min, max) => { // возвращает рандомное число в заданных рамках
  return min + Math.floor((max + 1 - min) * Math.random());
};

const getRandomDate = () => { // возвращает рандомную дату
  const targetDate = new Date();
  const randomValue = getRandomNumber(0, 31);

  targetDate.setDate(targetDate.getDate() + randomValue);
  targetDate.setMonth(targetDate.getMonth() - randomValue);
  targetDate.setFullYear(targetDate.getFullYear() - randomValue);

  return targetDate;
};

// возвращает рандомно из массива предложений arr элементы  в количестве count
const getRandomArray = (arr, count) => arr.sort(() => Math.random() - 0.5).slice(0, count);

export const generateFilm = () => {

  return {
    name: getRandomArrayItem(FilmNames),
    poster: getRandomArrayItem(FilmPosters),
    description: getRandomArray(descriptionSentences, getRandomNumber(1, 3)),
    rating: getRandomNumber(0, 10),
    year: formatDate(getRandomDate()),
    duration: formatTime(),
    genre: getRandomArray(FilmGenres, getRandomNumber(1, 3)),
    countComments: getRandomNumber(0, 20),
    isFavorite: false,
    isWatched: false,
    isWatchList: false,
    ageRestricted: Math.random() > 0.5 ? `18+` : ``,
    original: getRandomArrayItem(FilmNames),
    director: getRandomArrayItem(Directors),
    writer: getRandomArray(Writers, getRandomNumber(1, 3)),
    actor: getRandomArray(Actors, getRandomNumber(2, 4)),
    country: getRandomArrayItem(Countries),
    genreInf: getRandomArray(FilmGenres, getRandomNumber(1, 3)),
    descriptionFull: FilmDiscription
  };
};
