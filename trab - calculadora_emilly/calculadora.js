
let display = document.getElementsByClassName("display")[0];
let currentinput = ""
let currentoperator = ""

function appendNumber(value){
  currentinput += value 
  display.textContent = currentinput
}
function appendOperador(operador){
  if(currentinput === "" && operador !== ".") return 
  currentinput += operador;
  display.textContent = currentinput;
}

function calcular(){
  try{ 
    let expressao = currentinput.replace(/÷/g, "/");
    let resultado = eval(expressao);
    if(!Number.isInteger(resultado)){
      resultado = resultado.toFixed(2)
    }
    currentinput = resultado;
    display.textContent = currentinput;
  }
  catch(error){
    display.textContent = "Erro";
    currentinput = "";
  }
}

function limpaDisplay(){
  currentinput = "";
  display.textContent = currentinput;

}
function apagarUltimo() {
  if (currentinput.length > 0) {
    currentinput = currentinput.slice(0, -1);
    display.textContent = currentinput;
  }
}

const btnBotoes = document.querySelectorAll("[btn-numero]");
const btnOperacoes = document.querySelectorAll("[btn-operador]");
const btnIgual = document.querySelector("[btn-igual]");
const btnDelete = document.querySelector("[btn-delete]");
const btnAC = document.querySelector("[btn-ac]");

// As divs que vão exibir os valores da calculadora
const bufferElemento = document.querySelector("[txt-buffer]");
const displayElemento = document.querySelector("[txt-display]");

// Objeto que irá representar e armazenar os dados da calculadora
const calculadora = {
  operandoAnterior: "",
  operandoAtual: "",
  operador: "",
  bufferTextoElemento: bufferElemento, // DIV buffer
  displayTextoElemento: displayElemento, // DIV display
};

/****************************************************************
 * Associar funções aos eventos dos elementos HTML
 ****************************************************************/
// Botão AC
btnAC.addEventListener("click", () => {
  limpaDisplay(calculadora);
});

// Botão Delete
btnDelete.addEventListener("click", () => {
  apagarUltimo(calculadora);
});

btnIgual.addEventListener("click", () => {
  executaCalculo(calculadora);
});

