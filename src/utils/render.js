import {RenderPosition} from '../const/const';

export const render = (container, component, place) => { // вставляет элемент в указанное место
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement()); // вставляет перед первым потомком
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const generateList = (count, elem) => {
  return new Array(count)
    .fill(``)
    .map(elem);
};

export const remove = (component) => {
  component.getElement().remove();
  // component.removeElement();
};
