import {RenderPosition} from '../const/const';

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => { // вставляет элемент в указанное место
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element); // вставляет перед первым потомком
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const generateList = (count, elem) => {
  return new Array(count)
    .fill(``)
    .map(elem);
};

export {
  createElement,
  render,
  generateList
};
