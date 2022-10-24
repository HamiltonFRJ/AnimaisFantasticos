export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);

    // Bind do objeto da classe aos callbacks
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  // Move a tooltip com base em seus estilos de acordo com a posição do mouse
  onMouseMove(event) {
    this.tooltipBox.style.top = `${event.pageY + 20}px`;
    if (event.pageX + 100 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 100}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
    }
  }

  // event usando destructuring - usando apenas o currentTarget
  // Remove a tooltip e os eventos de mousemove e mouseleave
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener("mouseleave", this.onMouseLeave);
    currentTarget.removeEventListener("mousemove", this.onMouseMove);
  }

  // Cria a tooltip box e coloca ela no body
  criarTooltipBox(element) {
    const tooltipBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    tooltipBox.classList.add("tooltip");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  // event usando destructuring - usando apenas o currentTarget
  // cria a tooltip e adiciona os eventos de mousemove e mouseleave ao target
  onMouseOver({ currentTarget }) {
    // Cria a tooltip box e coloca em um propriedade
    this.criarTooltipBox(currentTarget);
    currentTarget.addEventListener("mousemove", this.onMouseMove);
    currentTarget.addEventListener("mouseleave", this.onMouseLeave);
  }

  // Adiciona os eventos de mouseOver a cada tooltip
  addTooltipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener("mouseover", this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.lenght) {
      this.addTooltipsEvent();
    }
    return this;
  }
}
