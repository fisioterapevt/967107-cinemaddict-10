import {RenderPosition} from '../const/const';

export const render = (container, element, place) => { // вставляет элемент в указанное место
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element); // вставляет перед первым потомком
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
