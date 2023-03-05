const nav = document.querySelector('.nav');
const app = document.querySelector('.app');
const sidebar = document.querySelector('.sidebar');
const sidebarDescriptions = document.querySelectorAll('.sidebar__description');
const burgerBtn = document.querySelector('.nav__mobile-burger-btn');

const addInput = document.querySelector('.app__add-input');
const addBtn = document.querySelector('.app__add-btn');
const tasksInfo = document.querySelector('.app__tasks-area-info');
const tasksList = document.querySelector('.app__tasks-list');
const tasksItems = document.getElementsByClassName('app__tasks-item');
const sidebarItems = document.querySelectorAll('.sidebar__option');

// to refactoring or delete1
// const taskText = document.getElementsByClassName('app__tasks-item-text');
// const checkBtn = document.getElementsByClassName('check-btn');
// const editBtn = document.getElementsByClassName('edit-btn');
// const saveBtn = document.getElementsByClassName('save-btn');
// const deleteBtn = document.getElementsByClassName('delete-btn');

const openSideBar = () => {
	sidebar.classList.add('sidebar--open');
	nav.classList.add('nav--wide');
	app.classList.add('app--wide');
	sidebarDescriptions.forEach((el) => {
		el.classList.add('sidebar__description--visible');
	});
};

const hideSideBar = () => {
	sidebar.classList.remove('sidebar--open');
	nav.classList.remove('nav--wide');
	app.classList.remove('app--wide');

	sidebarDescriptions.forEach((el) => {
		el.classList.remove('sidebar__description--visible');
	});
};

const toggleSidebar = () => {
	sidebar.classList.toggle('sidebar--open');
	nav.classList.toggle('nav--wide');
};

const updateNoneTasksInfo = () => {
	if (tasksItems.length === 0) {
		tasksInfo.style.display = 'block';
	} else {
		tasksInfo.style.display = 'none';
	}
};

const createNewTaskItem = () => {
	const newTask = document.createElement('li');
	newTask.classList.add('app__tasks-item');

	const newTaskText = document.createElement('p');
	newTaskText.classList.add('app__tasks-item-text');
	newTaskText.textContent = addInput.value;

	const newTaskSettingsDiv = document.createElement('div');
	newTaskSettingsDiv.classList.add('app__tasks-item-settings');

	const newDoneBtn = document.createElement('button');
	newDoneBtn.classList.add('done-btn');
	newDoneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

	const newEditBtn = document.createElement('button');
	newEditBtn.classList.add('edit-btn');
	newEditBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

	const newSaveBtn = document.createElement('button');
	newSaveBtn.classList.add('save-btn');
	newSaveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';

	const newDeleteBtn = document.createElement('button');
	newDeleteBtn.classList.add('delete-btn');
	newDeleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

	newTaskSettingsDiv.append(newDoneBtn, newEditBtn, newSaveBtn, newDeleteBtn);
	newTask.append(newTaskText, newTaskSettingsDiv);
	tasksList.append(newTask);
};

const addNewTask = () => {
	if (addInput.value !== '') {
		createNewTaskItem();
		addInput.value = '';
	}

	updateNoneTasksInfo();
};

const deleteTask = (e) => {
	const taskItem = e.target.closest('.app__tasks-item');

	taskItem.outerHTML = '';
	updateNoneTasksInfo();
};

const checkTaskAsDone = (e) => {
	const taskItem = e.target.closest('.app__tasks-item');
	const closestItemText = taskItem.firstChild;

	closestItemText.classList.toggle('app__tasks-item-text--done');
};

const startEditText = (e) => {
	const taskItem = e.target.closest('.app__tasks-item');
	const closestItemText = taskItem.firstChild;
	const closestDoneBtn = e.target.closest('div').childNodes[0];
	const closestDeleteBtn = e.target.closest('div').childNodes[3];
	const closestEditBtn = e.target.closest('div').childNodes[1];
	const closestSaveBtn = e.target.closest('div').childNodes[2];

	closestItemText.setAttribute('contenteditable', 'true');
	closestDoneBtn.style.visibility = 'hidden';
	closestDeleteBtn.style.visibility = 'hidden';
	closestEditBtn.style.display = 'none';
	closestSaveBtn.style.display = 'block';
};

const saveEditedText = (e) => {
	const taskItem = e.target.closest('.app__tasks-item');
	const closestItemText = taskItem.firstChild;
	const closestDoneBtn = e.target.closest('div').childNodes[0];
	const closestDeleteBtn = e.target.closest('div').childNodes[3];
	const closestEditBtn = e.target.closest('div').childNodes[1];
	const closestSaveBtn = e.target.closest('div').childNodes[2];

	closestItemText.setAttribute('contenteditable', 'false');
	closestDoneBtn.style.visibility = 'visible';
	closestDeleteBtn.style.visibility = 'visible';
	closestEditBtn.style.display = 'block';
	closestSaveBtn.style.display = 'none';
};

const closestTaskSettings = (e) => {
	if (e.target.classList.contains('fa-trash')) {
		deleteTask(e);
	}

	if (e.target.classList.contains('fa-check')) {
		checkTaskAsDone(e);
	}

	if (e.target.classList.contains('fa-pen-to-square')) {
		startEditText(e);
	}

	if (e.target.classList.contains('fa-floppy-disk')) {
		saveEditedText(e);
	}
};

const keyShortcuts = (e) => {
	if (e.key === 'Enter') {
		addNewTask();
	}
};

sidebar.addEventListener('mousemove', openSideBar);
sidebar.addEventListener('mouseleave', hideSideBar);
burgerBtn.addEventListener('click', toggleSidebar);
sidebarItems.forEach((item) => {
	item.addEventListener('click', hideSideBar);
});
addBtn.addEventListener('click', addNewTask);
document.addEventListener('keydown', (e) => keyShortcuts(e));
document.addEventListener('click', (e) => closestTaskSettings(e));
