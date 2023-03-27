const selectors = {
  form: document.getElementById("form"),
  inputText: document.getElementById("inputText"),
  submitButton: document.getElementById("submitButton"),
  checkTask: document.getElementById("checkTask"),
  taskText: document.getElementById("taskText"),
  editTask: document.getElementById("editTask"),
  deleteTask: document.getElementById("deleteTask"),
  taskNumbers: document.getElementById("taskNumbers"),
  removeCheck: document.getElementById("removeCheck"),
  checkAll: document.getElementById("checkAll"),
  taskTemplate: document.getElementById("template"),
  list: document.getElementById("list"),
  doneTasks: document.getElementById("doneTasks"),
  colorBar: document.getElementById("color-bar"),
};

let tasks = [];

class Task {
  constructor(name) {
    this.name = name;
    this.id = Math.random();
    this.done = false;
  }
}

const renderTasks = () => {
  while (selectors.list.firstChild) {
    selectors.list.removeChild(selectors.list.firstChild);
  }
  tasks.forEach((task) => {
    let taskItem = selectors.taskTemplate.content.cloneNode(true);
    let taskItemName = taskItem.getElementById("taskText");
    let taskItemCheck = taskItem.getElementById("checkTask");
    let taskItemDelete = taskItem.getElementById("deleteTask");
    let taskItemEdit = taskItem.getElementById("editTask");
    taskItemName.textContent = task.name;
    taskItemCheck.checked = task.done;
    taskItemCheck.addEventListener("click", (e) => {
      task.done = e.target.checked;
      updateCount();
    });
    taskItemDelete.setAttribute("onclick", `deleteTask(${task.id})`);
    taskItemEdit.addEventListener("click", () => {
      taskItemName.toggleAttribute("contenteditable");
      console.log(tasks);
    });
    taskItemName.addEventListener("keypress", (e) => {
      task.name = e.target.innerText;
    });
    selectors.list.appendChild(taskItem);
  });
  updateCount();
};

selectors.form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (selectors.inputText.value === "" || selectors.inputText.value === null) {
    return;
  }
  let task = new Task(selectors.inputText.value);
  tasks.push(task);
  selectors.inputText.value = "";
  console.log(tasks);
  renderTasks();
});

const checkAll = () => {
  for (let i = 0; i <= tasks.length - 1; i++) {
    tasks[i].done = true;
  }
  console.log(tasks);
  renderTasks();
};

const unCheckAll = () => {
  for (let i = 0; i <= tasks.length - 1; i++) {
    tasks[i].done = false;
  }
  console.log(tasks);
  renderTasks();
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
  console.log(tasks);
};

const updateCount = () => {
  let tasksDone = tasks.filter((task) => {
    return task.done;
  }).length;
  let countOfTasks = tasks.length;
  console.log(countOfTasks);
  console.log(tasksDone);
  doneTasks.textContent = `${tasksDone} out of ${countOfTasks} tasks done`;
  if (tasksDone <= (33 / 100) * countOfTasks) {
    selectors.colorBar.style.backgroundColor = "#dc35468a";
    selectors.colorBar.style.width = "33%";
  } else if (tasksDone > (33 / 100) * countOfTasks && tasksDone <= (66 / 100) * countOfTasks) {
    selectors.colorBar.style.backgroundColor = "#fbff008a";
    selectors.colorBar.style.width = "66%";
  } else if (tasksDone > (66 / 100) * countOfTasks) {
    selectors.colorBar.style.backgroundColor = "#00ff4c8a";
    selectors.colorBar.style.width = "100%";
  }
};
