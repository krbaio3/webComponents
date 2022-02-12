// <confimr-link></confimr-link>
class ConfimrLink extends HTMLElement {
  constructor() {
    super(); // always call super() first in the ctor.
    ...
  }
  connectedCallback() {
    ...
  }
  disconnectedCallback() {
    ...
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    ...
  }
}

window.customElements.define('confimr-link', ConfimrLink);