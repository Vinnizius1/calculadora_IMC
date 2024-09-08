// Armazenará o valor do temporizador de 2 segundos com escopo global por causa da função cancelarTimeout
let timeout;

// Exporta a função kilosParaPesoIdeal que contém APENAS A LÓGICA DO CALCULO DO IMC E EXIBE O RESULTADO
export function kilosParaPesoIdeal(
  mensagemDePesoIdeal,
  identificador,
  peso,
  altura
) {
  // Calcula os valores de peso ideal fora do setTimeout
  const pesoIdealMin = +(18.5 * Math.pow(altura, 2)).toFixed(2);
  const pesoIdealMax = +(24.9 * Math.pow(altura, 2)).toFixed(2);

  // Armazenará a mensagem com o valor necessário para chegar ao peso ideal
  let resposta;

  // Cria o temporizador
  timeout = setTimeout(() => {
    // Armazena a resposta do usuário se quer saber o peso ideal
    const querSaberPesoIdeal = confirm(mensagemDePesoIdeal);

    if (querSaberPesoIdeal && identificador === "abaixo") {
      resposta = `Você precisa ganhar ${(pesoIdealMin - peso).toFixed(
        2
      )} kg para atingir o peso ideal.`;
    } else if (querSaberPesoIdeal) {
      resposta = `Você precisa perder ${(peso - pesoIdealMax).toFixed(
        2
      )} kg para atingir o peso ideal.`;
    }

    // Exibe a mensagem se existir
    if (resposta) {
      alert(resposta);
    }
  }, 2000);
}

// Cancela o temporizador e limpa a variável timeout
export function cancelarTimeout() {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
}
