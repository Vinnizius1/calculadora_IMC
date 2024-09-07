/* ELEMENTOS */
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");

const btnCalcular = document.querySelector(".button");
const btnResetar = document.querySelector(".button.resetar");

const mostraResultado = document.querySelector(".result");
const tituloResultado = document.querySelector(".result-title");
const imcResultado = document.querySelector(".result-numbers");
const inputs = document.querySelectorAll("input");
const form = document.querySelector(".form");

// Armazena o timeout em uma variável global
let timeoutId;

/* FUNÇÕES AUXILIARES */
// Função para verificar se os campos de peso e altura foram preenchidos
function verificaDados() {
  let altura = inputAltura.value;
  let peso = inputPeso.value;

  // Condição para verificar se os campos de peso e altura foram preenchidos
  if (peso === "" || altura === "") {
    alert("Preencha os campos!");
    return true;
  }
  // Retorna falso se os campos de peso e altura estiverem vazios
  return false;
}

// Prevenindo que seja digitado "," ou "." no campo de peso e altura respectivamente
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

// Verifica se já existe o display de resultado
function tornarResultadoInvisivel() {
  if (mostraResultado.classList.contains("visible")) {
    mostraResultado.classList.remove("visible");
  }
}

// Class para manipular o placeholder
class InputHandler {
  // Função para remover placeholder quando o foco é acionado
  static handleFocus(event) {
    // Armazena o evento que foi disparado
    const input = event.target; // Usando event.target para acessar o input correto

    // Armazena o valor do placeholder
    input.dataset.placeholder = input.placeholder;
    input.placeholder = "";
    cancelarTimeout();
    tornarResultadoInvisivel();
  }

  // Função para adicionar placeholder quando o foco é perdido
  static handleBlur(event) {
    const input = event.target; // Usando event.target para acessar o input correto
    input.placeholder = input.dataset.placeholder;
  }
}

// Adicionar event listeners a cada campo de input
inputs.forEach(input => {
  input.addEventListener("focus", InputHandler.handleFocus);
  input.addEventListener("blur", InputHandler.handleBlur);
});

// Formatação/Regras para o input PESO
inputPeso.addEventListener("input", function () {
  let peso = inputPeso.value.replace(/\D/g, ""); // Remove qualquer caractere que não seja número

  // Atribui o valor formatado ao campo de peso
  inputPeso.value = peso;
});

// Formatação/Regras para o input ALTURA
inputAltura.addEventListener("input", function (event) {
  let alturaFormatada = inputAltura.value.trim();

  // Remove qualquer caractere que não seja um número
  alturaFormatada = alturaFormatada.replace(/[^\d]/g, "");

  // Condição para se aplicar a vírgula, ou melhor, ponto após a primeira casa decimal se existir dois ou mais números
  if (alturaFormatada.length >= 2) {
    // Adiciona vírgula após o primeiro dígito
    alturaFormatada =
      alturaFormatada.slice(0, 1) + "." + alturaFormatada.slice(1);

    // Condição para limpar o campo de altura se o primeiro dígito for deletado
    if (event.inputType === "deleteContentBackward") {
      alturaFormatada = "";
    }
  }

  // Atribui o valor formatado ao campo de altura
  inputAltura.value = alturaFormatada;
});

/* FUNÇÕES PRINCIPAIS */
// Evento de envio do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Chama a função calcular o IMC
  calcularIMC();

  // Foca no botão resetar após calcular o IMC
  btnResetar.focus();
});

// Função para calcular o IMC
function calcularIMC() {
  // Condição para verificar se os campos de peso e altura foram preenchidos
  if (verificaDados()) {
    inputPeso.focus();
    return;
  }

  // Remove o display de resultado se existir
  tornarResultadoInvisivel();

  // Armazenam peso e altura digitada pelo usuário
  let peso = Number(inputPeso.value);
  let altura = Number(inputAltura.value);

  // Calcula o IMC
  let imc = +(peso / Math.pow(altura, 2)).toFixed(2);

  // Armazenam a classificação do IMC e a sua cor de acordo com o grau de obesidade
  let classificacao;
  let corClassificacao;

  // Cálculo do peso ideal
  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
    corClassificacao = "amarelo";
  } else if (imc >= 18.5 && imc < 25) {
    classificacao = "Peso normal";
    corClassificacao = "verde";
  } else if (imc >= 25 && imc < 30) {
    classificacao = "Acima do peso";
    corClassificacao = "amarelo";
  } else if (imc >= 30 && imc < 35) {
    classificacao = "Obesidade 1";
    corClassificacao = "vermelho1";
  } else if (imc >= 35 && imc < 40) {
    classificacao = "Obesidade 2";
    corClassificacao = "vermelho2";
  } else if (imc >= 40) {
    classificacao = "Obesidade 3";
    corClassificacao = "vermelho3";
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
    kilosParaPesoIdeal(mensagemAbaixoDoPeso, "abaixo", peso, altura);
  }

  // Condição para "acima do peso ideal"
  if (imc >= 25) {
    kilosParaPesoIdeal(mensagemAcimaDoPeso, null, peso, altura);
  }
}

// Função responsável pelo setTimeout() e a mensagem sobre quanto peso ganhar ou perder
function kilosParaPesoIdeal(mensagem, identificador, peso, altura) {
  // Cria o temporizador
  timeoutId = setTimeout(() => {
    let pesoIdealMin = +(18.5 * Math.pow(altura, 2)).toFixed(2);
    let pesoIdealMax = +(24.9 * Math.pow(altura, 2)).toFixed(2);

    // Variável com a resposta de acordo com o argumento "identificador" (se peso acima ou se peso abaixo)
    let resposta;

    // Variável para guardar a confirmação se o usuário quer ou não ver a recomendação para se chegar ao peso ideal
    const querSaberPesoIdeal = confirm(mensagem);

    if (querSaberPesoIdeal && identificador === "abaixo") {
      resposta = `Você precisa ganhar pelo menos ${(
        pesoIdealMin - Number(peso)
      ).toFixed(2)} kg para atingir o peso ideal.`;
    } else if (querSaberPesoIdeal) {
      resposta = `Você precisa perder pelo menos ${Math.abs(
        Number(peso) - pesoIdealMax
      ).toFixed(2)} kg para atingir o peso ideal.`;
    }

    // Mostra a resposta sobre quanto peso deve ganhar ou perder ao usuário via "alert"
    if (resposta) {
      alert(resposta);
    }
  }, 2000);
}

// Função para cancelar o temporizador de 2 segundos
function cancelarTimeout() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
}

// Botão para limpar o formulário
btnResetar.addEventListener("click", function () {
  inputPeso.value = inputAltura.value = "";
  cancelarTimeout();
  tornarResultadoInvisivel();

  inputPeso.focus();
});

// Focus no campo de peso ao iniciar o projeto
inputPeso.focus();
