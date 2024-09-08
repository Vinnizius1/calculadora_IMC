/* Funções relacionadas à manipulação dos campos de input (foco e formatação) */

// Função para REMOVER placeholder quando o foco é acionado
export function handleFocus(event) {
  const input = event.target; // Usando event.target para acessar o input correto
  // Recolhe o valor do placeholder e depois remove-o para uma string vazia
  input.dataset.placeholder = input.placeholder;
  input.placeholder = "";
}

// Função para RESTAURAR placeholder quando o foco não é mais acionado
export function handleBlur(event) {
  const input = event.target; // Usando event.target para acessar o input correto
  // Volta ao valor original do placeholder
  input.placeholder = input.dataset.placeholder;
}

// Formatação/Regras para o input PESO
export function formatarPeso(inputPeso) {
  inputPeso.addEventListener("input", function () {
    let peso = inputPeso.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    // Atribui o valor formatado ao campo de peso
    inputPeso.value = peso;
  });
}

// Formatação/Regras para o input ALTURA
export function formatarAltura(inputAltura) {
  inputAltura.addEventListener("input", function (event) {
    let alturaFormatada = inputAltura.value.trim().replace(/[^\d]/g, ""); // Remove caracteres não numéricos

    // Condição para se aplicar a vírgula, ou melhor, ponto após a primeira casa decimal se existir dois ou mais números
    if (alturaFormatada.length >= 2) {
      // Adiciona vírgula após o primeiro dígito
      alturaFormatada =
        alturaFormatada.slice(0, 1) + "." + alturaFormatada.slice(1);
    }

    // Condição que limpa o campo de altura se o primeiro dígito for deletado
    if (event.inputType === "deleteContentBackward") {
      alturaFormatada = "";
    }

    // Atribui o valor formatado ao campo de altura
    inputAltura.value = alturaFormatada;
  });
}
