const dom = {
  new: document.getElementById('new'),
  add: document.getElementById('add'),
  tasks: document.getElementById('tasks')
}

const tasks = [];

//Отслеживаем клик по кнопке добавить
dom.add.onclick = () => {
  const newTaskText = dom.new.value;
  if (newTaskText && isNotHaveTask(newTaskText, tasks)) {
    addTask(newTaskText, tasks);
    dom.new.value = '';
    tasksRender(tasks);
   
  }
}

// функция добавления задачи
function addTask(text, list) {
  const timestamp = Date.now();
  const task = {
    id: timestamp,
    text,
    isComplete: false
}
  list.push(task);
}

// Проверка такая задача уже существует

function isNotHaveTask(text, list) {
  let isNotHave = true;

  list.forEach((task) => {
    if(task.text === text) {
      alert('Задача уже существует');
      isNotHave = false;
    }
  });

  return isNotHave;
  
}

function tasksRender(list) {
  let htmlList = '';

  list.forEach((task) => {
    const cls = task.isComplete 
    ? 'todo__task todo__task_complete' 
    : 'todo__task'
    
    const checked = task.isComplete ? 'checked' : '';

    const taskHtml = `
    <div id="${task.id}" class="${cls}">
    <label  class="todo__checkbox">
        <input type="checkbox" ${checked}>
        <div class="todo__checkbox-div"></div>
    </label>
    <div class="todo_task-text">${task.text}</div>
    <div class="todo__task-delete">-</div>
</div>
    `

    htmlList = htmlList + taskHtml;
  })

  dom.tasks.innerHTML = htmlList;
}

// Отслеживаем клик по чекбоксу
dom.tasks.onclick = (event) => {
  const target = event.target;
  const isCheckboxEl = target.classList.contains( 'todo__checkbox-div' );
  const isDeleteEl = target.classList.contains( 'todo__task-delete' );

  if (isCheckboxEl) {
    const task = target.parentElement.parentElement;
    const taskId = task.getAttribute('id');
    changeTaskStatus(taskId, tasks);
    tasksRender(tasks);
  }
  if (isDeleteEl) {
    const task = target.parentElement;
    const taskId = task.getAttribute('id');
    deleteTask(taskId, tasks);
    tasksRender(tasks);
  }
}

// Функция изменения статуса задачи
function changeTaskStatus( id, list ) {
  list.forEach((task) => {
    if ( task.id == id ) {
      task.isComplete = !task.isComplete;
    }
  })
}

//функция удаления задачи
function deleteTask(id, list) {
  list.forEach((task, idx) => {
    if (task.id == id) {
      list.splice(idx, 1);
    }
  })
}