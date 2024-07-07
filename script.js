// Elementos
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");
const btnCalcular = document.querySelector(".button");
const resultadoTitulo = document.querySelector(".result-title");
const resultadoNumeros = document.querySelector(".result-numbers");

////

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

////

/* Gerenciadores de evento */
// Formatação do input tipo "texto" da altura
inputAltura.addEventListener("input", function () {
  let alturaFormatada = inputAltura.value.trim();

  // Remove qualquer caractere que não seja um número
  alturaFormatada = alturaFormatada.replace(/[^\d]/g, "");

  if (alturaFormatada.length >= 2) {
    // Adiciona vírgula após o primeiro dígito
    alturaFormatada =
      alturaFormatada.slice(0, 1) + "," + alturaFormatada.slice(1);
  }

  inputAltura.value = alturaFormatada;
});

// Botão calcular
btnCalcular.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputAltura.value === "" || inputPeso.value === "") {
    alert("Por favor preencha os 2 campos para fazer o cálculo!");
    return;
  }

  // elementos para o display do resultado
  const bgResultado = document.querySelector(".result");
  const tituloResultado = document.querySelector(".result-title");
  const imcResultado = document.querySelector(".result-numbers");

  // confere se alguém já calculou IMC e então remove novamente a tela de resultado
  if (bgResultado.classList.contains("visible")) {
    bgResultado.classList.remove("visible");
  }

  // Remove a vírgula e converte a altura para tipo "number" e então faz o cálculo do IMC
  const altura = parseFloat(inputAltura.value.replace(",", "."));
  const imc = (inputPeso.value / Math.pow(altura, 2)).toFixed(2);

  // lógica do cálculo
  let classificacao;
  let corClassificacao;
  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
    corClassificacao = "amarelo";
  } else if (imc >= 18.5 && imc < 24.9) {
    classificacao = "Peso normal";
    corClassificacao = "verde";
  } else if (imc >= 25 && imc < 29.9) {
    classificacao = "Sobrepeso";
    corClassificacao = "amarelo";
  } else {
    classificacao = "Obesidade";
    corClassificacao = "vermelho";
  }

  // display do resultado
  tituloResultado.textContent = classificacao;
  imcResultado.textContent = `IMC= ${imc}`;

  // alterações na cor do background e na visibilidade do IMC
  bgResultado.className = `result ${corClassificacao}`;
  bgResultado.classList.add("visible");

  // zera os campos
  inputPeso.value = inputAltura.value = "";
});
