const tasks = [];
(function (arrOfTasks) {
  //Creat an object where the key is id
  let objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--completed-btn-bg': '#00a445',
      '--completed-btn-text-color': '#fff',
      '--completed-btn-hover-bg': '#00a445',
      '--completed-btn-border-color': '#00a445',
      '--reject-btn-bg': '#dbdb42',
      '--reject-btn-text-color': '#fff',
      '--reject-btn-hover-bg': '#dbdb42',
      '--reject-btn-border-color': '#dbdb42',
      '--allTask-btn-bg': '#02a2b1',
      '--allTask-btn-text-color': '#fff',
      '--allTask-btn-hover-bg': '#02a2b1',
      '--allTask-btn-border-color': '#02a2b1',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--completed-btn-bg': '#00481e',
      '--completed-btn-text-color': '#fff',
      '--completed-btn-hover-bg': '#00481e',
      '--completed-btn-border-color': '#00481e',
      '--reject-btn-bg': '#7c7c04',
      '--reject-btn-text-color': '#fff',
      '--reject-btn-hover-bg': '#7c7c04',
      '--reject-btn-border-color': '#7c7c04',
      '--allTask-btn-bg': '#00656e',
      '--allTask-btn-text-color': '#fff',
      '--allTask-btn-hover-bg': '#00656e',
      '--allTask-btn-border-color': '#00656e',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--completed-btn-bg': '#fff',
      '--completed-btn-text-color': '#212529',
      '--completed-btn-hover-bg': '#00bf4f',
      '--completed-btn-border-color': '#00bf4f',
      '--reject-btn-bg': '#fff',
      '--reject-btn-text-color': '#212529',
      '--reject-btn-hover-bg': '#ffff60',
      '--reject-btn-border-color': '#ffff60',
      '--allTask-btn-bg': '#fff',
      '--allTask-btn-text-color': '#212529',
      '--allTask-btn-hover-bg': '#5ef2ff',
      '--allTask-btn-border-color': '#5ef2ff',
      '--danger-btn-bg': '#fff',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };

  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';


  //Elements UI 
  const listContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask'];
  const inputTittel = form.elements['title'];
  const inputBody = form.elements['body'];
  const unfinishedTask = document.querySelector('#unfinished-tasks');
  const allTasks = document.querySelector('#all-task');
  const emptyList = document.querySelector('#emtylist');
  const completedEmpty = document.querySelector('#completedempty');
  const themeSelect = document.querySelector('#themeSelect')

  //Events
  if (localStorage.getItem('tasks')) {
    objOfTasks = JSON.parse(localStorage.getItem('tasks'));
    if (Object.keys(objOfTasks).length > 0) {
      emptyList.classList.add('d-none')
    }
  }
  setThem(lastSelectedTheme);
  readAlltasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHadler);
  listContainer.addEventListener('click', deletTask);
  listContainer.addEventListener('click', completedTask);
  unfinishedTask.addEventListener('click', filterUnfinishedTasks);
  allTasks.addEventListener('click', showAllTasks);
  themeSelect.addEventListener('change', onThemeSelectHandler)

  function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(objOfTasks))
  }

  function showAllTasks() {
    const li = document.querySelectorAll('li');
    li.forEach(item => item.classList.remove('d-none'));
    completedEmpty.classList.add('d-none')
  }

  function filterUnfinishedTasks() {
    completedEmpty.classList.add('d-none');
    const li = document.querySelectorAll('li');
    li.forEach(item => {
      if (item.classList.contains('done')) {
        item.classList.add('d-none');
      }
    })
    if (li.length > 0) {
      const arrLi = Array.from(li);
      const m = arrLi.filter(item => item.classList.contains('undone'));
      if (m.length === 0) {
        completedEmpty.classList.remove('d-none');
      }
    }
  }

  function readAlltasks(tasklist) {
    if (!tasklist) return;

    const fragment = document.createDocumentFragment();
    Object.values(tasklist).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    })

    listContainer.appendChild(fragment);
  }


  function onFormSubmitHadler(e) {
    e.preventDefault();
    const titleValue = inputTittel.value;
    const bodyValue = inputBody.value;
    console.log(titleValue)

    if (!titleValue || !bodyValue) {
      alert('Please enter both values');
      return;
    }

    const task = creatNewtask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterBegin', listItem);

    form.reset();
    inputTittel.focus();

    if (listContainer.children.length > 0) {
      emptyList.classList.add('d-none');
    }
    saveToLocalStorage()
  }

  function creatNewtask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `taks-${Math.random()}`
    }
    objOfTasks[newTask._id] = newTask

    return { ...newTask };
  }

  function listItemTemplate({ _id, body, title, completed } = {}) {
    const li = document.createElement('li')
    if (completed) {
      li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'done');
    } else {
      li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'undone');
    }
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.classList.add('fw-bold', 'fs-3');

    const textTasks = document.createElement('p');
    textTasks.textContent = body;
    textTasks.classList.add('mt-2', 'w-100');

    const completedBtn = document.createElement('button');
    if (completed) {
      li.style.background = '#D3D3D3';
      completedBtn.textContent = 'Reject-completed';
      completedBtn.classList.add('btn', 'btn-warning', 'me-auto', 'reject-btn');
    } else {
      li.style.background = '#FFFFFF';
      completedBtn.textContent = 'Completed';
      completedBtn.classList.add('btn', 'btn-success', 'me-auto', 'completed-btn');
    }


    const deletBtn = document.createElement('button');
    deletBtn.textContent = 'Delete';
    deletBtn.classList.add('btn', 'btn-danger', 'ms-auto', 'delete-btn');

    li.appendChild(span);
    li.appendChild(textTasks);
    li.appendChild(completedBtn);
    li.appendChild(deletBtn);

    return li;
  }

  function completTask(id) {
    const { title } = objOfTasks[id];
    const isConfirmCompleted = confirm(`Are you completed: '${title}' ?`);
    if (!isConfirmCompleted) return;
    return isConfirmCompleted;
  }

  function completedAction(confirmedCompleted, el, button, id) {
    if (!confirmedCompleted) return;
    objOfTasks[id].completed = true
    el.style.background = '#D3D3D3';
    button.textContent = 'Reject completed';
    el.classList.add('done');
    el.classList.remove('undone');
    button.classList.remove('btn-success', 'completed-btn');
    button.classList.add('btn-warning', 'reject-btn');
    listContainer.insertAdjacentElement('beforeend', el)
  }

  function revertStatusConfirm(id) {
    const { title } = objOfTasks[id];
    const isConfirmReturn = confirm(`Return: '${title}' ?`);
    if (!isConfirmReturn) return;
    return isConfirmReturn;
  }

  function revertStatus(confirmedReturn, el, button, id) {
    if (!confirmedReturn) return;
    objOfTasks[id].completed = false;
    el.style.background = '#ffffff';
    button.textContent = 'Completed';
    completedEmpty.classList.add('d-none')
    el.classList.add('undone');
    el.classList.remove('done');
    button.classList.remove('btn-warning', 'reject-btn');
    button.classList.add('btn-success', 'completed-btn');
    listContainer.insertAdjacentElement('afterbegin', el);
    saveToLocalStorage()
  }


  function completedTask({ target }) {
    if (target.classList.contains('completed-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmedCompleted = completTask(id);
      completedAction(confirmedCompleted, parent, target, id);
    } else if (target.classList.contains('reject-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmedReturn = revertStatusConfirm(id);
      revertStatus(confirmedReturn, parent, target, id);
    }
    saveToLocalStorage()
  }

  function deleTask(id) {
    const { title } = objOfTasks[id];
    const isConfirmDelet = confirm(`Are you what sure you want to delete: '${title}'?`);
    if (!isConfirmDelet) return;
    return isConfirmDelet;
  }

  function deletTaskFromHTML(confirmedDeleted, el) {
    if (!confirmedDeleted) return;
    el.remove();
  }



  function deleteTaskFromObj(id) {
    delete objOfTasks[id]
  }

  function deletTask({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmedDeleted = deleTask(id);
      deletTaskFromHTML(confirmedDeleted, parent);
      deleteTaskFromObj(id)
      saveToLocalStorage()
    }

    if (listContainer.children.length == 0) {
      emptyList.classList.remove('d-none');
    }


    const li = document.querySelectorAll('li');
    if (li.length > 0) {
      const arrLi = Array.from(li);
      const m = arrLi.filter(item => item.classList.contains('undone'));
      if (m.length === 0) {
        completedEmpty.classList.remove('d-none');
      }
    }
  }

  function onThemeSelectHandler(e) {
    const selectTheme = themeSelect.value;
    const isConfirm = confirm(`You want to set the theme: ${selectTheme}`)
    if (!isConfirm) {
      themeSelect.value = lastSelectedTheme;
      return;
    };
    setThem(selectTheme);
    lastSelectedTheme = selectTheme
    localStorage.setItem('app_theme', selectTheme)
  }

  function setThem(name) {
    const selectedThemObj = themes[name];
    Object.entries(selectedThemObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
})(tasks);
