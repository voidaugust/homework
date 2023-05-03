const navTabs = document.querySelector(".nav-tabs"),
      tabs = navTabs.querySelectorAll(".nav-link"),
      sections = document.querySelectorAll(".section");

const chooseClass = (elements, targetElem, classElem, inverse) => {
  if (inverse) {
    elements.forEach(elem => {elem.classList.add(classElem)});
    targetElem.classList.remove(classElem);  
  } else {
    elements.forEach(elem => {elem.classList.remove(classElem)});
    targetElem.classList.add(classElem);
  }
};

const tabSwitch = (event) => {
  let tab;

  if (event.target.classList.contains("nav-tabs")) {
    return false;
  } else if (event.target.classList.contains("nav-item")) {
    tab = event.target.querySelector(".nav-link");
  } else {
    tab = event.target;
  };

  let section;
  sections.forEach(item => {
    if (item.dataset.tab === tab.dataset.tab)
      section = item;
  });

  chooseClass(tabs, tab, "active");
  chooseClass(sections, section, "d-none", true);
};

navTabs.addEventListener("click", tabSwitch);

/*
	3*) напишите todoList используя localStorage + JSON
	функции todoList - добавление, удаление ( * необязательно - вычеркивание, редактирование)

	Должна быть кнопка **сохранить todo list**
	Данные должны храниться в браузере и при перезагрузки страницы 
	загружаться актуальные с последнего сохранения (инициализация всего списка)
*/

const toDoForm = document.querySelector(".to-do-form"),
      toDoInput = document.querySelector(".to-do-input"),
      toDoList = document.querySelector(".to-do-list"),
      toDoItem = "to-do-item",
      editPen = "fa-pen",
      copyTask = "fa-paste",
      done = "done",
      deleteTrash = "fa-trash";

const Task = class {
  constructor(id, value, isDone) {
    this.id = id;
    this.value = value; 
    this.isDone = isDone;
  };
};

const formController = (e) => {
  e.preventDefault();

  if (toDoInput.value && !toDoInput.dataset.editId) 
    tasksModel.create(toDoInput.value);
  
  else if (toDoInput.dataset.editId !== "") 
    tasksModel.saveEdit(toDoInput.value, toDoInput.dataset.editId);
};

const listController = (e) => {
  if (e.target.classList.contains(editPen)) tasksModel.edit(e.target);
  if (e.target.classList.contains(copyTask)) tasksModel.copy(e.target);
  if (e.target.classList.contains(done)) tasksModel.isDone(e.target);
  if (e.target.classList.contains(deleteTrash)) tasksModel.delete(e.target);
};

const tasksModel = {
  state: [],

  create(value, idFromModel, isDoneFromModel) {
    const id = (idFromModel) ? idFromModel : Date.now(),
          isDone = (isDoneFromModel === true) ? true : false,
          task = new Task(id, value, isDone);
    
    tasksModel.state.push(task);
    tasksModel.render(id, value, isDoneFromModel);

    toDoInput.value = "";
  },
  
  delete(target) {
    const li = target.closest("LI"),
          id = li.dataset.id;
          taskToDelete = tasksModel.state.find(task => task.id === +id);

    tasksModel.state = tasksModel.state.filter(task => task !== taskToDelete);
    tasksModel.render(id);
  },
  
  edit(target) {
    const li = target.closest("LI"),
          id = li.dataset.id,
          taskToEdit = tasksModel.state.find(task => task.id === +id);

    toDoInput.value = taskToEdit.value;
    toDoInput.dataset.editId = id;
    toDoInput.focus();
  },

  saveEdit(value, id) {
    const taskToEdit = tasksModel.state.find(task => task.id === +id);

    if (value) {
      taskToEdit.value = toDoInput.value;
      tasksList.submitEdit(value, id);
    } else {
      tasksModel.state = tasksModel.state.filter(task => task !== taskToEdit);
    };

    tasksModel.render(id, taskToEdit.value);

    toDoInput.value = "";
    toDoInput.dataset.editId = "";
  },

  copy(target) {
    const li = target.closest("LI"),
          id = li.dataset.id,
          taskToCopy = tasksModel.state.find(task => task.id === +id);

    tasksModel.create(taskToCopy.value);
  },

  isDone(target) {
    const li = target.closest("LI"),
          id = li.dataset.id,
          taskDone = tasksModel.state.find(task => task.id === +id);

    taskDone.isDone = (target.checked) ? true : false;
    tasksModel.render(id);

    tasksList.cross(li);
  },

  render(id, value, isDone) {
    localStorage.setItem("tasksModel.state", JSON.stringify(tasksModel.state));

    tasksList.view = Array.from(toDoList.children);

    if (JSON.stringify(tasksList.view) !== JSON.stringify(tasksModel.state)) {
      if (tasksList.view.length < tasksModel.state.length) tasksList.add(id, value, isDone);  
      if (tasksList.view.length > tasksModel.state.length) tasksList.remove(id);
    };
  },

  initialRender() {
    const taskModelView = JSON.parse(localStorage.getItem("tasksModel.state"));
    
    if (taskModelView)
      taskModelView.forEach(task => {tasksModel.create(task.value, task.id, task.isDone);});
  }
};

const tasksList = {
  view: [],

  add(id, value, isDone) {
    const li = document.createElement("li"),
          label = document.createElement("label");

    li.classList.add(toDoItem);

    label.textContent = value;
    label.setAttribute("for", value);
    li.append(label);
  
    li.dataset.id = id;
    tasksList.addIcons(li, id);
    if (isDone === true) tasksList.cross(li, isDone);

    toDoList.append(li);
  },
  
  addIcons(li, id) {
    const checkbox = document.createElement("input"),
          editIcon = document.createElement("i"),
          copyIcon = document.createElement("i"),
          deleteIcon = document.createElement("i");
  
    checkbox.type = "checkbox";
    checkbox.name = li.textContent;
    checkbox.id = id;
  
    checkbox.classList.add("done");
    editIcon.classList.add("fa-solid", "fa-pen");
    copyIcon.classList.add("fa-solid", "fa-paste");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    
    li.prepend(checkbox);
    li.append(editIcon);
    li.append(copyIcon);
    li.append(deleteIcon);
  },

  remove(id) {
    const li = toDoList.querySelector(`[data-id="${id}"]`);
    li.remove();
    toDoInput.focus();
  },

  cross(li, wasDone) {
    const input = li.querySelector("input"),
          label = li.querySelector("label");

    if (input.checked || wasDone) {
      label.classList.add("is-done");
      label.classList.remove("is-undone");
    } else {
      label.classList.add("is-undone");
      label.classList.remove("is-done");
    };

    if (!input.checked && wasDone) input.checked = true;
  },

  submitEdit(value, id) {
    const li = toDoList.querySelector(`[data-id="${id}"]`),
          label = li.querySelector("label");

    label.textContent = value;
    label.setAttribute("for", value);
    label.previousSibling.setAttribute("name", value);
  }
};

toDoForm.addEventListener("submit", formController);
toDoList.addEventListener("click", listController);
tasksModel.initialRender();





/*
  1) Преобразуйте user в JSON и сохраните (выведите в console.log), 
	затем прочитайте JSON и сохраните в другую переменную (выведите в console.log)
*/

let user = {
  name: "Василий Иванович",
  age: 35
};

let userString = JSON.stringify(user);
// console.log(userString);

let userObj = JSON.parse(userString)
// console.log(userObj);

/*
	2) напишем счетчик на localStorage - + / -
  пусть в компоненте будет сам счетчик 
  и будут кнопки имитирующие интерфейс localStorage (функция к каждой кнопке)
  Все кнопки должны выводить в консоль сообщения. _Например
	setItem будет выводить в консоль что произошло сохранение и что именно сохранено._
	
        setItem(key, value) – сохранить пару ключ/значение.
        getItem(key) – получить данные по ключу key.
        removeItem(key) – удалить данные с ключом key.
        clear() – удалить всё.
        key(index) – получить ключ на заданной позиции.
        length – количество элементов в хранилище.
*/

const counterBox = document.querySelector(".counter-box"),
      counterButtonsBox = document.querySelector(".counter-buttons-box"),
      counter = counterBox.querySelector(".counter"),
      minus = counterBox.querySelector(".counter-btn-minus"),
      plus = counterBox.querySelector(".counter-btn-plus"),
      storageSetItem = counterButtonsBox.querySelector(".storage-set-item"),
      storageGetItem = counterButtonsBox.querySelector(".storage-get-item"),
      storageRemoveItem = counterButtonsBox.querySelector(".storage-remove-item"),
      storageClear = counterButtonsBox.querySelector(".storage-clear");

let counterState = {
  number: 0
};

const clearInput = () => {
  const value = counter.value;
  let cleanValue = "";

  for (let i = 0; i < value.length; i++) {
    let symbol = value[i];
    if (!isNaN(Number(symbol))) cleanValue += symbol;
  };
  
  counter.value = cleanValue;
  
  counterController.setState(cleanValue);
};

const counterController = {
  render(value) {
    const areDifferent = value !== counterState.number;
    if (areDifferent) counter.value = value;
  },

  setState(value) {
    counterController.render(value);
    counterState.number = value;
  },

  toJSON() {
    const toString = JSON.stringify(counterState),
          counterJSON = JSON.parse(toString);
    return counterJSON;
  },
};

const changeValue = (e) => {
  if (e.target === minus) counterController.setState(Number(counter.value) - 1);
  else if (e.target === plus) counterController.setState(Number(counter.value) + 1);
};

counter.addEventListener("input", clearInput);
counterBox.addEventListener("click", changeValue);

const storageButtons = {
  setItem(key, value) {
    localStorage.setItem(key, value);
  },

  getItem(key) {
    const item = localStorage.getItem(key);
    console.log(item);
  },

  removeItem(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
}

const counterButtonsController = (e) => {
  if (e.target === storageSetItem) 
    storageButtons.setItem("counter", counterController.toJSON().number);

  if (e.target === storageGetItem) 
    storageButtons.getItem("counter");

  if (e.target === storageRemoveItem) 
    storageButtons.removeItem("counter");

  if (e.target === storageClear) storageButtons.clear();
};

counterButtonsBox.addEventListener("click", (e) => counterButtonsController(e));