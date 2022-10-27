export default class AnimaNumeros {
  constructor(numeros, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = this.observerClass;

    // Bind o this do objeto ao callback da mutação
    this.handleMutation = this.handleMutation.bind(this);
  }

  // Recebe um elemento do DOM com número no texto.
  // Incrementa a partir de 0 até o número total
  static incrementarNumero(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  // Ativa o incremento de número para cada um
  animaNumeros() {
    this.numeros.forEach((numero) =>
      this.constructor.incrementarNumero(numero)
    );
  }

  // Função que ocorre quando a mutação ocorrer
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // Adiciona o mutationObserver para verificar quando a classe ativo é adicionada ao elemento target, para acionar a função
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
