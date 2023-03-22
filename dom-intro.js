/* Домашнее задание
1)	
	Создайте input type text и три кнопки
	кнопки должны иметь следующий функционал (должны запускать соотвествующие функции)
	1. Кнопка "Очистить input" (удалять содержимое value тега input)
	2. Кнопка заблокировать инпут (disabled setAttribute)
	3. Кнопка разблокировать инпут (disabled removeAttribute)
	или input.disabled = true/false;

2) 
	Создайте в HTML два текстовых инпута и кнопку
	Напишите функцию, которая будет по нажатию на кнопку
	менять содержимое инпутов (value) местами.
*/

const buttonClean1 = document.querySelector('.button-clean1'),
      buttonBlock = document.querySelector('.button-block'),
      buttonUnblock = document.querySelector('.button-unblock'),
      buttonSwap = document.querySelector('.button-swap'),
      buttonClean2 = document.querySelector('.button-clean2'),
      input1 = document.querySelector('.input1'),
      input2 = document.querySelector('.input2'),
      input3 = document.querySelector('.input3');
      buttonHide = document.querySelector('.button-hide'),
      box1 = document.querySelector('.box1');

buttonClean1.addEventListener('click', cleanField1);
buttonBlock.addEventListener('click', blockField);
buttonUnblock.addEventListener('click', unblockField);
buttonSwap.addEventListener('click', swapValues);
buttonClean2.addEventListener('click', cleanField23);
buttonHide.addEventListener('click', hideBox1);
let blue = "#4444ffee";
let grey = "#ababab";

function fieldCleaning(...inputs) {
  for (const input of inputs) {
    input.value = "";
  }
};

function cleanField1(event) {
  fieldCleaning(input1);
};

function cleanField23(event) {
  fieldCleaning(input2, input3);
};

function blockField(event) {
  input1.setAttribute("disabled", true);
  input1.value = "";
  input1.placeholder = "no type here";
};

function unblockField(event) {
  input1.removeAttribute("disabled");
  input1.placeholder = "wanna type something?";
};

function swapValues(event) {
  let tempValue = input2.value;
  input2.value = input3.value;
  input3.value = tempValue;
};

function hideBox1(event){
  box1.classList.toggle('hidden-block');
  if (buttonHide.textContent == "hide") {
    buttonHide.textContent = "show";
    buttonHide.classList.remove("blue");
    buttonHide.classList.add("grey");
  } else {
    buttonHide.textContent = "hide";
    buttonHide.classList.add("blue");
    buttonHide.classList.remove("grey");
  };
};