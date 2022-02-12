// <tooltip></tooltip>
class Tooltip extends HTMLElement {
  constructor() {
    super(); // always call super() first in the ctor.
    this._tooltipContainer = undefined;
    this._tooltipText = "dummy test";
    this.attachShadow({ mode: "open" });
    // const template = document.querySelector('#tooltip-template')
    // this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.innerHTML = `
        <style>
            div {
                background-color: black;
                color: white;
                position: absolute;
                z-index:10;
            }
        </style>
        <slot>Some default</slot>
        <span> (?)</span>
    `;
  }
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }

    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?)";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }
  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.backgroundColor = "black";
    this._tooltipContainer.style.color = "white";
    this._tooltipContainer.style.position = "absolute";
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }

  disconnectedCallback() {}
  attributeChangedCallback(attrName, oldVal, newVal) {}
}

window.customElements.define("css-tooltip", Tooltip);
