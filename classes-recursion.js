// ! Классы
/*
Реализуйте класс Student, 
который будет наследовать от класса User. 
Этот класс должен иметь следующие свойства: 
name (имя, наследуется от User), 
surname (фамилия, наследуется от User), 
year (год поступления в вуз, не наследуется от User).

Класс должен иметь метод getFullName() (наследуется от User), 
с помощью которого можно вывести одновременно имя и фамилию студента.

Также класс должен иметь метод getCourse() (не наследуется от User), 
который будет выводить текущий курс студента (от 1 до 5). 

Курс вычисляется так: нужно от текущего года отнять год поступления в вуз. 
Текущий год получите самостоятельно.
*/

class User {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  };

  getFullName() {
    return (`${this.name} ${this.surname}`);
  };
};

class Student extends User {
  constructor(name, surname, year) {
    super();
    this.name = name;
    this.surname = surname;
    this.year = year;
  };

  getCourse() {
    const currentYear = new Date().getFullYear(),
          currentCourse = currentYear - this.year,
          isCorrect = currentCourse >= 1 && currentCourse <= 5;

    if (!isCorrect) throw new Error ("wrong year entered");
    return `Current course: ${currentCourse}`;
  };
};

let student = new Student('Иван', 'Иванов', 2020);
console.log(student.name); //выведет 'Иван'
console.log(student.surname); //выведет 'Иванов'
console.log(student.getFullName()); //выведет 'Иван Иванов'
console.log(student.year); //выведет 2020
console.log(student.getCourse()); //выведет 3 - третий курс, так как текущий год 2023





// ! Рекурсия
// Найти максимальное число в массиве, содержащем числа или другие массивы чисел
// Решите это итеративно (через цикл) и отдельно затем рекурсивно.

let numbers = [2, 4, 10, [12, 4, [100, 99], 4], [3, 2, 99], 0];

const findMaxNumByMath = (arr) => {
  return Math.max(...arr.flat(Infinity));
};

const findMaxNumByLoop = (arr) => {
  const flattenArr = arr.flat(Infinity);
  let max = -Infinity;

  for (let i = 0; i < flattenArr.length; i++) {
    let element = flattenArr[i];
    max = (element > max) ? element : max;
  };

  return max;
};

const findMaxNumByRecursion = (arr) => {
  let max = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    if (Array.isArray(element)) element = findMaxNumByRecursion(element);
    max = (element > max) ? element : max;
  };

  return max;
};

// console.log(findMaxNumByRecursion(numbers));



// Рассчитать сумму элементов массива чисел
const sumNumsByRecursion = (arr) => {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    if (Array.isArray(element)) element = sumNumsByRecursion(element);
    sum += element;
  };

  return sum;
};

// console.log(sumNumsByRecursion(numbers));



// Рассчитать сумму натуральных чисел до n
const sumNumsTo = (n) => {
  return (n === 1) ? 1 : n + sumNumsTo(n - 1);
};

// console.log(sumNumsTo(13));