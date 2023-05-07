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
      toDoInput = toDoForm.querySelector(".to-do-input"),
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

const model = {
  state: [],
  previousState: []
};

const formController = (e) => {
  e.preventDefault();

  if (toDoInput.value && !toDoInput.dataset.editId) 
    modelMethods.create(toDoInput.value);
  
  else if (toDoInput.dataset.editId !== "") 
    modelMethods.saveEdit(toDoInput.value, toDoInput.dataset.editId);
};

const listController = (e) => {
  if (e.target.classList.contains(editPen)) startTaskEdit(e.target);
  else if (e.target.classList.contains(copyTask)) modelMethods.copy(e.target);
  else if (e.target.classList.contains(done)) modelMethods.markIsDone(e.target);
  else if (e.target.classList.contains(deleteTrash)) modelMethods.delete(e.target);
};

const clearInput = () => toDoInput.value = "";
const clearEditId = () => toDoInput.dataset.editId = "";
const startTaskEdit = (target) => {
  const id = target.closest("LI").dataset.id,
        taskToEdit = model.state.find(task => task.id === id);

  toDoInput.value = taskToEdit.value;
  toDoInput.dataset.editId = id;
  toDoInput.focus();
};

const modelMethods = {
  updateState(thisTask, fn, index) {
    if (fn === "saveEdit" || fn === "markIsDone") fn = "update";

    const updateFunctions = {
      "create": [...model.state, thisTask],
      "delete": model.state.filter(task => task !== thisTask),
      "update": [
        ...model.state.slice(0, index), 
        thisTask, 
        ...model.state.slice(index + 1)
      ]
    };
  
    model.state = updateFunctions[fn] || model.state;
  },

  updatePreviousState() {
    model.previousState = JSON.parse(JSON.stringify(model.state));
  },

  clearPreviousState() {
    model.previousState = JSON.parse(JSON.stringify([]));
  },

  create(value, idFromModel, isDoneFromModel) {
    modelMethods.updatePreviousState();

    const id = (idFromModel) ? idFromModel : String(Date.now()),
          isDone = (isDoneFromModel === true) ? true : false,
          task = new Task(id, value, isDone);

    modelMethods.updateState(task, arguments.callee.name);
    modelMethods.render(id);
    modelMethods.saveToLocalStorage();

    clearInput();
  },

  delete(target, idFromEdit) {
    modelMethods.updatePreviousState();

    const id = (idFromEdit) ? idFromEdit : target.closest("LI").dataset.id,
          taskToDelete = model.state.find(task => task.id === id);

    modelMethods.updateState(taskToDelete, arguments.callee.name);
    modelMethods.render(id);
    modelMethods.saveToLocalStorage();
  },

  saveEdit(value, id) {
    modelMethods.updatePreviousState();

    const fn = arguments.callee.name,
          taskToEdit = model.state.find(task => task.id === id),
          index = model.state.indexOf(taskToEdit);

    if (value) {
      taskToEdit.value = toDoInput.value;
      modelMethods.updateState(taskToEdit, fn, index);
      modelMethods.render(id);
    } else {
      modelMethods.delete(null, id);
    };

    modelMethods.saveToLocalStorage();

    clearEditId();
    clearInput();
  },

  copy(target) {
    modelMethods.updatePreviousState();

    const id = target.closest("LI").dataset.id,
          taskToCopy = model.state.find(task => task.id === id);

    modelMethods.create(taskToCopy.value);
  },

  markIsDone(target) {
    modelMethods.updatePreviousState();

    const fn = arguments.callee.name,
          li = target.closest("LI"),
          id = li.dataset.id,
          taskDone = model.state.find(task => task.id === id),
          index = model.state.indexOf(taskDone);

    taskDone.isDone = target.checked === true;

    modelMethods.updateState(taskDone, fn, index);
    modelMethods.render(id);
    modelMethods.saveToLocalStorage();
  },

  render(id) {
    if (model.previousState.length !== model.state.length) {
      if (model.previousState.length < model.state.length) renderMethods.add(id); 
      if (model.previousState.length > model.state.length) renderMethods.remove(id);
    
    } else {
      const currentStateTask = model.state.find(task => task.id === id),
            previousStateTask = model.previousState.find(task => task.id === id),

            nameChanged = currentStateTask.value !== previousStateTask.value,
            isDoneChanged = currentStateTask.isDone !== previousStateTask.isDone;

      if (nameChanged) renderMethods.submitEdit(id);
      if (isDoneChanged) renderMethods.cross(id);
    };

    modelMethods.clearPreviousState();
  },

  initialRender() {
    const initialModel = JSON.parse(localStorage.getItem("model.state"));
    
    if (initialModel)
      initialModel.forEach(task => {modelMethods.create(task.value, task.id, task.isDone)});
  },

  saveToLocalStorage() {
    localStorage.setItem("model.state", JSON.stringify(model.state));
  }
};

const renderMethods = {
  add(id) {
    const task = model.state.find(task => task.id === id),
          li = document.createElement("li"),
          label = document.createElement("label");

    li.classList.add(toDoItem);

    label.textContent = task.value;
    label.setAttribute("for", task.value);
    li.append(label);
  
    li.dataset.id = id;
    renderMethods.addIcons(li, id);

    toDoList.append(li);

    if (task.isDone === true) renderMethods.cross(id);
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

  cross(id) {
    const task = model.state.find(task => task.id === id),
          li = toDoList.querySelector(`[data-id="${id}"]`),
          input = li.querySelector("input"),
          label = li.querySelector("label");
    
    if (input.checked || task.isDone === true) {
      label.classList.add("is-done");
      label.classList.remove("is-undone");
      input.checked = true;
    } else {
      label.classList.add("is-undone");
      label.classList.remove("is-done");
    };
  },

  submitEdit(id) {

    const task = model.state.find(task => task.id === id),
          li = toDoList.querySelector(`[data-id="${id}"]`),
          label = li.querySelector("label"),
          checkbox = label.previousSibling;

    label.textContent = task.value;
    label.setAttribute("for", task.value);
    checkbox.setAttribute("name", task.value);
  }
};

toDoForm.addEventListener("submit", formController);
toDoList.addEventListener("click", listController);
modelMethods.initialRender();


















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

const filterInput = () => {
  const value = counter.value.split("");
  let cleanValue = value
      .filter(symbol => !isNaN(Number(symbol)))
      .join("");
  counter.value = cleanValue;
  
  counterController.setNumber(cleanValue);
};

const counterController = {
  render(counterStateValue) {
    counter.value = counterStateValue;
  },

  setNumber(value) {
    const areDifferent = value !== counterState.number;
    if (areDifferent) counterState.number = value;

    counterController.render(counterState.number);
  },

  toJSON() {
    const toString = JSON.stringify(counterState),
          counterJSON = JSON.parse(toString);
    return counterJSON;
  },
};

const changeValue = (e) => {
  if (e.target === minus) counterController.setNumber(Number(counter.value) - 1);
  else if (e.target === plus) counterController.setNumber(Number(counter.value) + 1);
};

counter.addEventListener("input", filterInput);
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