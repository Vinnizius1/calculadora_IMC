# Atividade de JavaScript: Cálculo do Índice de Massa Corporal (IMC)

## Objetivo

Desenvolver uma aplicação em JavaScript que calcule o Índice de Massa Corporal (IMC) de um usuário. O foco principal da atividade é a implementação da lógica de cálculo em JavaScript. A utilização de HTML e CSS para a interface é opcional, mas recomendada para uma melhor apresentação.

## Instruções

### 1. Implementação JavaScript

- Crie um arquivo `script.js` que conterá toda a lógica de cálculo do IMC.
- Implemente uma função que:
  - Receba o peso (em quilogramas) e a altura (em metros ou centímetros) como parâmetros.
  - Calcule o IMC utilizando a fórmula: `IMC = peso / (altura * altura)`.
  - Determine a classificação do IMC de acordo com os seguintes critérios:
    - **Abaixo do peso**: IMC < 18.5
    - **Peso normal**: 18.5 ≤ IMC < 24.9
    - **Sobrepeso**: 25 ≤ IMC < 29.9
    - **Obesidade**: IMC ≥ 30
  - Retorne ou exiba o resultado do IMC e a classificação correspondente.

### 2. Teste da Função

- Inclua exemplos de testes da função de cálculo do IMC no próprio arquivo `script.js`.
- Garanta que a função seja chamada com diferentes valores de peso e altura e que os resultados sejam exibidos no console do navegador.

### 3. Interface Opcional (HTML e CSS)

- Se optar por adicionar uma interface, crie um arquivo `index.html` e inclua o `script.js`.
- Adicione um formulário com campos de entrada para o peso e a altura, e um botão para acionar o cálculo do IMC.
- Crie um espaço na página para exibir o resultado do IMC e a classificação.
- Estilize a página utilizando um arquivo `styles.css` para melhorar a apresentação.
