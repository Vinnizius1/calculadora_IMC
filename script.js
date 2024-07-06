// Elementos
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");
const btnCalcular = document.querySelector(".button");

/* Manipulando o placeholder dos inputs */
const inputs = document.querySelectorAll("input");

// Função para remover placeholder no foco
function handleFocus() {
  this.dataset.placeholder = this.placeholder;
  this.placeholder = "";
}

// Função para restaurar placeholder quando o foco é perdido
function handleBlur() {
  this.placeholder = this.dataset.placeholder;
}

// Adicionar event listeners a cada campo de input
inputs.forEach(input => {
  input.addEventListener("focus", handleFocus);
  input.addEventListener("blur", handleBlur);
});

/* Gerenciador de evento */
btnCalcular.addEventListener("click", function (e) {
  e.preventDefault();

  inputPeso.value = inputAltura.value = "";
});
