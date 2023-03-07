// Сделайте функцию getDigitsSum (digit - это цифра), которая параметром 
// принимает целое число и возвращает сумму его цифр.

let getDigitsSum = number => {
  if (isNaN(number)) {
    return "That's not a number!";
  } else {
    const stringToDigits = (String(number)).split("");
    let digitsSum = 0;
    for (let i = 0; i < stringToDigits.length; i++) {
      const element = Number(stringToDigits[i]);
      digitsSum += element;
      };
    return digitsSum;
  }
};



// console.log(getDigitsSum("zhopa"));
// console.log(getDigitsSum(2025345345113));

// Найдите все года от 1 до 2022, сумма цифр которых равна 13. 
// Для этого используйте вспомогательную функцию getDigitsSum из предыдущей задачи.

let yearsWithSum13 = [];
for (let year = 1; year < 2023; year++) {
  getDigitsSum(year) === 13 && yearsWithSum13.push(year);
};

console.log(yearsWithSum13);



// 1) Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» 
// в «myShortString».

// 		То есть дефисы удаляются, а все слова после них получают заглавную букву.

// Примеры:

// camelize("background-color") == 'backgroundColor';
// camelize("list-style-image") == 'listStyleImage';
// camelize("-webkit-transition") == 'WebkitTransition';

camelize = str => {
  const strToWords = String(str).split("-");
  const words = [];

  strToWords.forEach(
    (item, i) => {
      if (i > 0)
      words.push(item[0]
                  .toUpperCase()
                  .concat("", strToWords[i].slice(1)));
    }
  );

  const camelizeResult = `${strToWords[0]}${words}`.replaceAll(",", "")

  console.log(camelizeResult);
}

camelize("background-color"); 
camelize("list-style-image");
camelize("-webkit-transition");



// 2)  Задача: написать функцию, принимающую массив чисел
// 		и возвращающую сумму всех его положительных элементов и отрицательных 
// 		чисел отдельно в виде нового массива

// 		например функция принимает как аргумент следующий массив
// 		arr = [1, -2, 3, 4, -9]

// 		и должна вернуть [8, -11]
// 		Сохраняйте вызов этой функции через деструктурирующее присваивание

summy = (values) => {
  const positiveValues = [];
  const negativeValues = [];

  values.forEach(
    (item) => {
      (item > 0)
        ? positiveValues.push(item)
        : negativeValues.push(item);
      }
  );

  let getSum = (values) => {
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      sum += element;
    } 
    return sum;
  };

  let result = [getSum(positiveValues), getSum(negativeValues)];
  let [positiveSum, negativeSum] = result;

  console.log(`Sum of positive values: ${positiveSum}. Sum of negative values: ${negativeSum}.`);
};

summy([1, -2, 3, 4, -9]);