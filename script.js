/* Elementos */
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");

const btnCalcular = document.querySelector(".button");
const btnResetar = document.querySelector(".button.resetar");

const mostraResultado = document.querySelector(".result");
const tituloResultado = document.querySelector(".result-title");
const imcResultado = document.querySelector(".result-numbers");

const inputs = document.querySelectorAll("input");

const form = document.querySelector(".form");

/* */

// Cria a variável com escopo fora da próxima função "if"
let timeoutId;

function verificaDados() {
  const altura = inputAltura.value;
  const peso = inputPeso.value;

  if (peso === "" || altura === "") {
    alert("Preencha os campos!");
    return true;
  }

  return false;
}

inputPeso.addEventListener("keydown", event => {
  if (event.key === "," || event.key === ".") {
    event.preventDefault();
  }
});
inputAltura.addEventListener("keydown", event => {
  if (event.key === "," || event.key === ".") {
    event.preventDefault();
  }
});

//

// Verifica se já existe o display de resultado
function displayResultado() {
  if (mostraResultado.classList.contains("visible")) {
    mostraResultado.classList.remove("visible");
  }
}

// Função para remover placeholder no foco
function handleFocus() {
  this.dataset.placeholder = this.placeholder;
  this.placeholder = "";
  cancelarTimeout();
  displayResultado();
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
inputPeso.addEventListener("input", function () {
  let peso = inputPeso.value.replace(/\D/g, ""); // Remove qualquer caractere que não seja número

  inputPeso.value = peso;
});

// Formatação do input tipo "texto" da altura (na verdade, agora é do tipo "number"... está funcionando)
inputAltura.addEventListener("input", function (event) {
  let alturaFormatada = inputAltura.value.trim();

  // Remove qualquer caractere que não seja um número
  alturaFormatada = alturaFormatada.replace(/[^\d]/g, "");

  //
  if (alturaFormatada.length >= 2) {
    // Adiciona vírgula após o primeiro dígito
    alturaFormatada =
      alturaFormatada.slice(0, 1) + "." + alturaFormatada.slice(1);

    //
    if (event.inputType === "deleteContentBackward") {
      alturaFormatada = "";
    }
  }

  inputAltura.value = alturaFormatada;
});

////
////

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Chama a função calcular o IMC
  calcularIMC();

  //
  btnResetar.focus();
});

// Botão calcular
function calcularIMC() {
  //
  if (verificaDados()) {
    inputPeso.focus();
    return;
  }

  // Confere se alguém já calculou IMC e então remove novamente a tela de resultado
  displayResultado();

  //
  let peso = inputPeso.value;
  let altura = inputAltura.value;
  const imc = +(peso / Math.pow(altura, 2)).toFixed(2);

  // Lógica do cálculo
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

  // Display do resultado
  tituloResultado.textContent = classificacao;
  imcResultado.textContent = `IMC= ${imc}`;

  // Alterações na cor do background e na visibilidade do IMC
  mostraResultado.className = `result ${corClassificacao}`;
  mostraResultado.classList.add("visible");

  // Zera os campos
  inputPeso.value = inputAltura.value = "";

  // Pergunta ao usuário se ele quer saber quanto peso deve perder ou ganhar para chegar no PESO IDEAL
  const mensagemAcimaDoPeso =
    "Você quer saber quanto peso deve perder para chegar ao peso ideal ?";
  const mensagemAbaixoDoPeso =
    "Você quer saber quanto peso deve ganhar para chegar ao peso ideal ?";

  // Condição para "abaixo do peso ideal"
  if (imc < 18.5) {
    kilosParaPesoIdeal(mensagemAbaixoDoPeso, "abaixo");
  }

  // Condição para "abaixo do peso ideal"
  if (imc > 24.9) {
    kilosParaPesoIdeal(mensagemAcimaDoPeso, "acima");
  }
}

// Função responsável pelo setTimeout() e a mensagem sobre quanto peso ganhar ou perder
function kilosParaPesoIdeal(mensagem, identificador) {
  timeoutId = setTimeout(() => {
    let pesoIdealMin = +(18.5 * Math.pow(altura, 2)).toFixed(2);
    let pesoIdealMax = +(24.9 * Math.pow(altura, 2)).toFixed(2);

    // Variável com a resposta de acordo com o argumento "identificador" (se peso acima ou se peso abaixo)
    let resposta;

    // Variável para guardar a confirmação se o usuário quer ou não ver a recomendação para se chegar ao peso ideal
    const querSaberPesoIdeal = confirm(mensagem);

    if (querSaberPesoIdeal && identificador === "abaixo") {
      resposta = `Você precisa ganhar pelo menos ${(
        pesoIdealMin - peso
      ).toFixed(2)} kg para atingir o peso ideal.`;
    } else if (querSaberPesoIdeal && identificador === "acima") {
      resposta = `Você precisa perder pelo menos ${Math.abs(
        peso - pesoIdealMax
      ).toFixed(2)} kg para atingir o peso ideal.`;
    } else {
      inputPeso.focus();
    }

    // Mostra a resposta ao usuário
    if (resposta) {
      alert(resposta);
    }
  }, 2000);
}

// Função para cancelar o setTimeout
function cancelarTimeout() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
}

// Botão resetar
btnResetar.addEventListener("click", function () {
  inputPeso.value = inputAltura.value = "";
  cancelarTimeout();
  displayResultado();

  inputPeso.focus();
});

inputPeso.focus();
