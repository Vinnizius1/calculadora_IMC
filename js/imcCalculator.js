// Exporta a função calcularIMC que contém APENAS A LÓGICA DO CALCULO DO IMC E EXIBE O RESULTADO
export function calcularIMC(
  peso,
  altura,
  tituloResultado,
  imcResultado,
  mostraResultado
) {
  // Calcula o IMC
  let imc = +(peso / Math.pow(altura, 2)).toFixed(2);

  // Clasifica o IMC
  let classificacao, corClassificacao;
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
  } else {
    classificacao = "Obesidade 3";
    corClassificacao = "vermelho3";
  }

  // Alterações na cor do background e na visibilidade do IMC
  tituloResultado.textContent = classificacao;
  imcResultado.textContent = `IMC= ${imc}`;
  mostraResultado.className = `result ${corClassificacao}`;
  mostraResultado.classList.add("visible");
}
