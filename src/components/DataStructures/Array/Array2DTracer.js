/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-mixed-operators */
/* eslint-disable arrow-parens */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import Tracer from '../common/Tracer';
import Array2DRenderer from './Array2DRenderer';

class Element {
  constructor(value) {
    this.value = value;
    this.patched = false;
    this.selected = false;
    this.sorted = false;
  }
}

class Array2DTracer extends Tracer {
  getRendererClass() {
    return Array2DRenderer;
  }

  /**
   * @param {array} array2d
   * @param {string} algo used to mark if it is a specific algorithm
   */
  set(array2d = [], algo) {
    this.data = array2d.map(array1d => [...array1d].map(value => new Element(value)));
    this.algo = algo;
    super.set();
  }

  patch(x, y, v = this.data[x][y].value) {
    if (!this.data[x][y]) this.data[x][y] = new Element();
    this.data[x][y].value = v;
    this.data[x][y].patched = true;
  }

  depatch(x, y, v = this.data[x][y].value) {
    this.data[x][y].patched = false;
    this.data[x][y].value = v;
  }

  // used to highlight sorted elements
  sorted(x, y) {
    if (!this.data[x][y]) this.data[x][y] = new Element();
    this.data[x][y].sorted = true;
  }

  select(sx, sy, ex = sx, ey = sy) {
    for (let x = sx; x <= ex; x++) {
      for (let y = sy; y <= ey; y++) {
        this.data[x][y].selected = true;
      }
    }
  }

  select1(sx, sy, ex = sx, ey = sy) {
    for (let x = sx; x <= ex; x++) {
      for (let y = sy; y <= ey; y++) {
        this.data[x][y].selected1 = true;
      }
    }
  }

  selectRow(x, sy, ey) {
    this.select(x, sy, x, ey);
  }

  selectCol(y, sx, ex) {
    this.select(sx, y, ex, y);
  }

  deselect(sx, sy, ex = sx, ey = sy) {
    for (let x = sx; x <= ex; x++) {
      for (let y = sy; y <= ey; y++) {
        this.data[x][y].selected = false;
        this.data[x][y].selected1 = false;
      }
    }
  }

  deselectRow(x, sy, ey) {
    this.deselect(x, sy, x, ey);
  }

  deselectCol(y, sx, ex) {
    this.deselect(sx, y, ex, y);
  }
}

export default Array2DTracer;
