/** Задача №1	

	Напишите следующий небольшой тест
	Он выглядит как один блок с вопросом и тремя вариантами ответа

	варианты ответа реализованы через радио-кнопку (выбрать можно только один)
	radioButton.checked может быть true или false

	После выбора становится доступна кнопка "проверить" (до этого она disabled)

	После нажатия на кнопку вы скрываете предыдущий вопрос и показываете следующий.

	В конце после последнего вопроса вы должны отобразить текст, который сообщит 
	на сколько вопросов пользователь ответил правильно.

	Это ознает, что вы должны собирать ответы пользователя, например в массив, и затем
	сравнить его с правильными ответами и показать сколько правильно, сколько нет.

	JavaScript это Java?
		Нет.
		Да.
		Возможно.

	проверить

	Сколько параментров можно передать в фукнцию?
		Сколько указано при ее создании.
		Минимум один.
		Сколько угодно.

	проверить

	Массивы это объекты?
		Не совсем.
		Нет.
		Да, это спископодобные объекты.

	проверить
 */

const boxes = document.querySelectorAll('.box'),
      buttons = document.querySelectorAll('.button'),

      question1 = document.querySelectorAll('.question1'),
      question2 = document.querySelectorAll('.question2'),
      question3 = document.querySelectorAll('.question3'),
      questions = [question1, question2, question3],

      rightAnswers = [1, 3, 3],
      userAnswers = [],
      results = document.querySelector('.results');

for (let i = 0; i < questions.length; i++) {
  const question = questions[i],
        button = buttons[i];
  for (let j = 0; j < question.length; j++) {
    const responseOption = question[j];
    responseOption.addEventListener("click", () => removeDisabled(question, button));
  };
};

for (let i = 0; i < buttons.length; i++) {
  const question = questions[i],
        button = buttons[i],
        thisBox = boxes[i],
        nextBox = boxes[i+1];
  button.addEventListener("click", () => getAnswerMoveFurther(question, thisBox, nextBox));
};

function removeDisabled(question, button) {
  if (question.checked)
    button.removeAttribute("disabled");
    button.removeAttribute("disabled");
    // Не знаю почему, но в Хроме и Фаерфоксе работает только если дважды написать
};

function getAnswerMoveFurther(question, thisBox, nextBox) {
  let userAnswer
  for (let i = 0; i < question.length; i++) {
    if (question[i].checked)
      userAnswer = question[i].value;
  };
  userAnswers.push(userAnswer);
  thisBox.classList.add("hidden");
  nextBox.classList.remove("hidden");

  const lastButton = document.querySelector('.button3');
  lastButton.addEventListener("click", getResults);
};

function getResults() {
  let howMuchRightAnswers = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] == rightAnswers[i])
      howMuchRightAnswers += 1;
  };

  if (howMuchRightAnswers == 1) {
    results.innerText = "Вы дали только 1 правильный ответ 🤔";
  } else if (howMuchRightAnswers == 2) {
    results.innerText = "Вы дали 2 правильных ответа 😏";
  } else if (howMuchRightAnswers == 3) {
    results.innerText = "Вы ответили на все вопросы правильно 😎";
  } else {
    results.innerText = "Вы ответили на все вопросы неправильно 😔";
  };
};

/** first version of code
const box1 = document.querySelector('.box1'),
      box2 = document.querySelector('.box2'),
      box3 = document.querySelector('.box3'),
      results = document.querySelector('.results'),
      boxes = [box1, box2, box3, results],

      question1 = document.querySelectorAll('.question1'),
      question2 = document.querySelectorAll('.question2'),
      question3 = document.querySelectorAll('.question3'),
      questions = [question1, question2, question3],

      button1 = document.querySelector('.button1'),
      button2 = document.querySelector('.button2'),
      button3 = document.querySelector('.button3'),
      buttons = [button1, button2, button3],

      rightAnswers = [1, 3, 3],
      userAnswers = [];

for (let i = 0; i < questions.length; i++) {
  const question = questions[i],
        button = buttons[i];
  for (let j = 0; j < question.length; j++) {
    const responseOption = question[j];
    responseOption.addEventListener("click", () => removeDisabled(question, button));
  };
};

for (let i = 0; i < buttons.length; i++) {
  const question = questions[i],
        button = buttons[i],
        thisBox = boxes[i],
        nextBox = boxes[i+1];
  button.addEventListener("click", () => getAnswerMoveFurther(question, thisBox, nextBox));
};

button3.addEventListener("click", getResults);

function removeDisabled(question, button) {
  if (question.checked)
    button.removeAttribute("disabled");
    button.removeAttribute("disabled");
    // Не знаю почему, но в Хроме и Фаерфоксе работает только если дважды написать
};

function getAnswerMoveFurther(question, thisBox, nextBox) {
  let userAnswer
  for (let i = 0; i < question.length; i++) {
    if (question[i].checked)
      userAnswer = question[i].value;
  };
  userAnswers.push(userAnswer);
  thisBox.classList.add("hidden");
  nextBox.classList.remove("hidden");
};

function getResults() {
  let howMuchRightAnswers = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] == rightAnswers[i])
      howMuchRightAnswers += 1;
  };

  if (howMuchRightAnswers == 1) {
    results.innerText = "Вы дали только 1 правильный ответ 🤔";
  } else if (howMuchRightAnswers == 2) {
    results.innerText = "Вы дали 2 правильных ответа 😏";
  } else if (howMuchRightAnswers == 3) {
    results.innerText = "Вы ответили на все вопросы правильно 😎";
  } else {
    results.innerText = "Вы ответили на все вопросы неправильно 😔";
  };
};
*/


/** Задача №2 
Задача на развитие планирования написания интерфейсов и понимание механики приложений:

	Напишем логическую структуру для игры "крестики-нолики"

	Вы можете реализовать саму игру (в описании, сам код писать НЕ нужно), 
	а так же модальное окно с результатом партии - победа крестиков, победа ноликов, ничья
	кроме того нужно сбрасывать результаты игры после уведомления о том, что игра окончена

	Продумайте какие требуются шаги для разработки игры крестики-нолики,
	в отношении логических шагов связанных с планированием разработки,
	так и в связи с кодом, постарайтесь описать каждый шаг, максимально развернуто,
	помогайте себе рисуя на бумаге или просто размышляя

	например (можно продолжить, или написать самому/самой): 

	1. Нужно сверстать макет для игры из девяти блоков
		- нужно написать html структуру
		- у html блоков, которые будут служить как места для клика (заполнения Х или O)
		нужно задать доп. атрибуты data-x data-y(соотвественно матрице), чтобы получать их потом
		при клике через dataset
		- нужно задать css стили html элементам
	2. В js нужно получить и сохранить в переменные для дальнейшего использования html элементы.
		- потребуется родительский элемент блоков для манипуляций и использовать event.target
		- или же нужно использовать сами блоки и прослушивать события на них через перебор массива
	2. Нужно создать матрицу, для инициализации данных игры при старте
		- для этого нужно создать массив из трех вложенных массивов в каждом из которых будет по три элемента
	3. Эта матрица будет изменятся при нажатии на соотвествующий пустой блок
		- необходимо прослушивать событие click и проверять по какому именно элементу кликнули
		- нужно обновлять состояние матрицы, заполняя её соотвественно тому элементу на который нажали
	4. ...
*/

/** Ответ
1. HTML
  1.1. Создать элемент div с классом game-board.
  1.2. Внутри элемента game-board создать table/tr/td. 3 строки, в каждой 3 ячейки. 
  Каждому td присвоить классы cell и cellN, где N — порядковый номер от 1 до 9.
  1.3. Создать кнопку button с классом reset для принудительного сброса ячеек 
  и начала новой игры.

2. CSS
  2.1. Стилизовать ячейки: сделать их квадратными, добавить подсветку при наведении, 
  добавить класс chosen для перекрашивания при выборе ячейки.
  2.2. Стилизовать кнопку.

3. JavaScript
  3.1. Создать массив cells для представления игрового поля с 9 значениями null. 
  Связать каждый элемент массива с соответствующим cellN.
  3.2. Создать 16 массивов с выигрышными ситуациями: 8 для крестиков и 8 для ноликов. 
  Объединить их в 2 массива соответственно, чтобы использовать цикл for для сравнения 
  результатов на игровом поле с каждым из них.
  3.3. Добавить eventListener к каждому элементу ячейки по событию "click".
  3.4. При нажатии на ячейку обновлять через push массив игрового поля, 
  меняя значение ячейки на "X" по нечетному клику и на "O" по четному клику. То же 
  самое отображать на экране, меняя соответствующий td в HTML через обращение к cellN.
  3.5. После каждого клика запускать функцию, сравнивающую текущий массив игрового поля
  со всеми массивами с выигрышными ситуациями.
  3.6. Когда один из игроков выигрывает, вывести alert «Выиграли крестики» или «Выиграли
  нолики» соответственно, после чего сбросить все ячейки игрового поля обратно к null.
  3.7. Если игровое поле заполнено, и нет пересечения ни с одной выигрышной комбинацией,
  вывести alert «Ничья!», после чего сбросить все ячейки игрового поля обратно к null.
  3.8. Добавить eventListener к кнопке с классом reset для принудительного сброса ячеек 
  и начала новой игры.

4. Функции для JavaScript
  updateBoard(cells)
  Обновляет массив игрового поля с учетом хода игрока и обновляет 
  отображение элемента ячейки
  
  checkWin(cells)
  Проверяет, выиграл ли кто-то партию, сравнивая массив игрового поля 
  со всеми возможными выигрышными комбинациями.
  
  displayWinner()
  Выводит alert о победителе.
  
  displayTie()
  Выводит alert о ничьей.
  
  resetBoard(cells)
  Сбрасывает массив игрового поля на значения null 
  и отображение ячеек в HTML на пустые поля.
*/