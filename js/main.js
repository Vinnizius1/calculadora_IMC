/* Arquivo PRINCIPAL */
import {
  handleFocus,
  handleBlur,
  formatarPeso,
  formatarAltura,
} from "./inputHandler.js";
import { calcularIMC } from "./imcCalculator.js";
import { kilosParaPesoIdeal, cancelarTimeout } from "./timeoutManager.js";

// Seleção dos elementos
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");
const btnResetar = document.querySelector(".button.resetar");
const inputs = document.querySelectorAll("input");
const form = document.querySelector(".form");
const tituloResultado = document.querySelector(".result-title");
const imcResultado = document.querySelector(".result-numbers");
const mostraResultado = document.querySelector(".result");

// Eventos de foco, blur e teclado
inputs.forEach(input => {
  input.addEventListener("focus", handleFocus);
  input.addEventListener("blur", handleBlur);
  input.addEventListener("keydown", event => {
    if (event.key === "," || event.key === ".") {
      event.preventDefault();
    }
  });
});

// Formatação dos inputs passando o elemento como parâmetro
formatarPeso(inputPeso);
formatarAltura(inputAltura);

// Evento de envio do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Pega os valores de peso e altura diretamente dos inputs
  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

  // Chama a função calcular o IMC passando os valores de peso e altura como parâmetros
  calcularIMC(peso, altura, tituloResultado, imcResultado, mostraResultado);

  // Mensagens de peso ideal
  const mensagemAcimaDoPeso =
    "Você quer saber quanto peso deve perder para chegar ao peso ideal?";
  const mensagemAbaixoDoPeso =
    "Você quer saber quanto peso deve ganhar para chegar ao peso ideal?";

  // Verifica se o peso e altura foram preenchidos e então executa a função de peso ideal
  if (peso && altura) {
    if (peso / Math.pow(altura, 2) < 18.5) {
      kilosParaPesoIdeal(mensagemAbaixoDoPeso, "abaixo", peso, altura);
    } else if (peso / Math.pow(altura, 2) >= 25) {
      kilosParaPesoIdeal(mensagemAcimaDoPeso, null, peso, altura);
    }
  }

  // Focus no botão Resetar
  btnResetar.focus();
});

// Reinicia o formulário
btnResetar.addEventListener("click", function () {
  inputPeso.value = inputAltura.value = "";
  cancelarTimeout();
  mostraResultado.classList.remove("visible");
  inputPeso.focus();
});

// Focus no primeiro input ao carregar o site
inputPeso.focus();
