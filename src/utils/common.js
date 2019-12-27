import moment from 'moment';
// возвращает время
export const formatTime = (date) => {
  return moment(date).format(`hh:mm A`);
};

// возвращает дату
export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};
