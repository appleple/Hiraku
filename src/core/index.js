import { getUniqId, getWindowWidth, hasClass, addClass } from '../lib';

const defaults = {
  direction: 'right',
  breakpoint: -1,
  btn: '.js-hiraku-offcanvas-btn',
  btnLabel: 'Menu',
  closeLabel: 'Close',
  // fixedHeader: '.js-hiraku-fixed-header',
  focusableElements: 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]'
}

export default class Hiraku {

  constructor(selector, opt) {
    this.body = document.querySelector('body');
    this.opt = Object.assign({}, defaults, opt);
    this.side = document.querySelector(selector);
    this.btn = document.querySelector(opt.btn);
    this.fixed = document.querySelector(opt.fixedHeader);
    this.windowWidth = getWindowWidth();
    this.id = getUniqId();
    window.addEventListener('resize', () => {
      if ('requestAnimationFrame' in window) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = requestAnimationFrame(resizeHandler);
      } else {
        this.resizeHandler();
      }
    });
    this._setHirakuSideMenu(this.side, this.id);
    this._setHirakuBtn(this.btn, this.id);
    this._setHirakuBody(this.body);
    if (this.fixed) {
      addClass(this.fixed, 'js-hiraku-header-fixed');
    }
  }

  _setHirakuSideMenu(side, id) {
    const { closeLabel, direction } = this.opt;
    let parent = side.parentElement;
    if (!hasClass(parent, 'js-hiraku-offcanvas')) {
      const div = document.createElement('div');
      addClass(div, 'js-hiraku-offcanvas');
      div.appendChild(side);
      parent = side.parentElement;
    }
    if (direction === 'right') {
      addClass(side, 'js-hiraku-offcanvas-sidebar-right');
    } else {
      addClass(side, 'js-hiraku-offcanvas-sidebar-left');
    }
    parent.setAttribute('aria-hidden', true);
    parent.setAttribute('aria-labelledby', `hiraku-offcanvas-btn-${id}`);
    parent.setAttribute('id', id);
    parent.setAttribute('aria-label', closeLabel);
    this.parent = parent;
    parent.addEventListener('click', (e) => {
      this.offcanvasClickHandler(e);
    });
    parent.addEventListener('touchstart', (e) => {
      this.offcanvasClickHandler(e);
    });
    parent.addEventListener('keyup', (e) => {
      this.offcanvasClickHandler(e);
    });
  }

  _setHirakuBtn(btn, id) {
    const { btnLabel } = this.opt;
    addClass(btn, 'js-hiraku-offcanvas-btn');
    btn.setAttribute('aria-expanded', false);
    btn.setAttribute('aria-label', btnLabel);
    btn.setAttribute('aria-controls', id);
    btn.setAttribute('id', `hiraku-offcanvas-btn-${id}`);
    btn.addEventListener('click', (e) => {
      this.clickHandler(e);
    });
  }

  _setHirakuBody(body) {
    const { direction } = this.opt;
    addClass(body, 'js-hiraku-offcanvas-body');
  }

  clickHandler(e) {
    const { side, btn, fixed, parent, body } = this;
    const { position, focusableElements } = this.opt;
    const elements = side.querySelectorAll(focusableElements);
    const first = elements[0];
    const last = elements[elements.length - 1];
    const lastFocus = (e) => {
      if (e.which === 9 && e.shiftKey) {
        last.focus();
      }
    }
    const firstFocus = (e) => {
      if (e.which === 9 && !e.shiftKey) {
        first.focus();
      }
    }

    first.removeEventListener('keydown', lastFocus);
    first.addEventListener('keydown', lastFocus);
    last.removeEventListener('keydown', firstFocus);
    last.addEventListener('keydown', firstFocus);
    btn.setAttribute('aria-expanded', true);
    addClass(btn, 'js-hiraku-offcanvas-btn-active');
    parent.setAttribute('aria-hidden', false);
    if (position === 'right') {
      addClass(body, 'js-hiraku-offcanvas-body-right');
    } else {
      addClass(body, 'js-hiraku-offcanvas-body-left');
    }
    first.focus();
  }

  offcanvasClickHandler(e) {
    const { parent, body } = this;
    const { position } = this.opt;
		if (e.type === 'keyup' && e.keyCode !== 27) {
			return;
    }
    if (e.target !== parent) {
      return;
    }
    if (position === 'right') {
      removeClass(body, 'js-hiraku-offcanvas-body-right');
    } else {
      removeClass(body, 'js-hiraku-offcanvas-body-left');
    }
  }
  
  resizeHandler() {
    const windowWidth = getWindowWidth();
    const {breakpoint} = this.opt;
    const ele = this.ele;
    if (windowWidth === this.windowWidth) {
      return;
    }
    this.windowWidth = windowWidth;
    if (hasClass(ele, 'js-hiraku-offcanvas-open') && (breakpoint === 1 || breakpoint >= windowWidth)) {
      return;
    }
    if (breakpoint === -1 || breakpoint >= windowWidth) {
      addClass(ele, 'js-hiraku-offcanvas-active');
      ele.setAttribute('aria-hidden', true);
    } else {
      removeClass(ele, 'js-hiraku-offcanvas-active');
      ele.setAttribute('aria-hidden', false);
      ele.click();
    }
  }

}