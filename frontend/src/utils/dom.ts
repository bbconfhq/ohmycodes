import {setHash} from "./navigator";

export const findNearestLineNumberElement = (el: Element): Element | null => {
  const lineNumberEls = document.querySelectorAll('.line-number');
  let nearestEl: Element | null  = null;
  let minDistance = Infinity;

  const binarySearchNearest = (arr, value, start, end) => {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const distance = Math.abs(arr[mid].offsetTop - value.offsetTop);

    if (distance < minDistance) {
      minDistance = distance;
      nearestEl = arr[mid];
    }

    if (arr[mid].offsetTop > value.offsetTop) {
      return binarySearchNearest(arr, value, start, mid - 1);
    } else if (arr[mid].offsetTop < value.offsetTop) {
      return binarySearchNearest(arr, value, mid + 1, end);
    } else {
      return arr[mid];
    }
  };

  binarySearchNearest(Array.from(lineNumberEls), el, 0, lineNumberEls.length - 1);

  return nearestEl;
};

export const highlightLines = (startElement, endElement) => {
  let currentElement = startElement;
  while (currentElement && currentElement !== endElement.nextSibling) {
    if (currentElement.nodeType === Node.ELEMENT_NODE) {
      currentElement.classList.add('highlight');
    }
    currentElement = currentElement.nextSibling;
  }
  const start = startElement.getAttribute('data-line');
  const end = endElement.getAttribute('data-line');
  setHash({ start, end });
};

