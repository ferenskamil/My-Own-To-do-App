const nav = document.querySelector('.nav');
const navAvatar = document.querySelector('.nav__avatar');
const navMenu = document.querySelector('.nav__menu');
const navMenuList = document.querySelector('.nav__menu-settings');

const app = document.querySelector('.app');
const burgerBtn = document.querySelector('.nav__mobile-burger-btn');
const sidebar = document.querySelector('.sidebar');
const sidebarDescriptions = document.querySelectorAll('.sidebar__description');
const sidebarItems = document.querySelectorAll('.sidebar__option');

const addInput = document.querySelector('.app__add-input');
const addBtn = document.querySelector('.app__add-btn');

const tasksInfo = document.querySelector('.app__tasks-area-info');
const tasksList = document.querySelector('.app__tasks-list');
const tasksItems = document.getElementsByClassName('app__tasks-item');

let taskArr = [];
class Task {
	constructor(textValue) {
		this.id = Date.now();
		this.text = textValue;
		this.isDone = false;
	}
}

const downloadTasksFromLocalStorage = () => {
	let parsedArr = JSON.parse(localStorage.getItem('TasksLocalCopy'));

	if (parsedArr !== null) {
		parsedArr.forEach((obj) => createNewTaskItem(obj));
		taskArr = parsedArr;
	}
};

const updateLocalStorage = () => {
	let tasksStr = JSON.stringify(taskArr);

	localStorage.setItem('TasksLocalCopy', tasksStr);
};

const slideNavMenu = () => {
	navMenu.classList.toggle('nav__menu--visible');
	navMenuList.classList.toggle('nav__menu-settings--slided');
};

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

const createNewTaskItem = ({ text, id, isDone }) => {
	const newTask = document.createElement('li');
	newTask.classList.add('app__tasks-item');
	newTask.setAttribute('id', id);

	const newTaskText = document.createElement('p');
	newTaskText.classList.add('app__tasks-item-text');
	newTaskText.textContent = text;

	if (isDone === true) {
		newTaskText.classList.add('app__tasks-item-text--done');
	}

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
		const newTask = new Task(addInput.value);

		taskArr.push(newTask);
		createNewTaskItem(newTask);

		addInput.value = '';
	}

	updateLocalStorage();
	updateNoneTasksInfo();
};

const deleteTask = (taskItem) => {
	const clickedId = parseInt(taskItem.getAttribute('id'));

	taskArr = taskArr.filter((obj) => obj.id !== clickedId);

	taskItem.outerHTML = '';
	updateLocalStorage();
	updateNoneTasksInfo();
};

const checkTaskAsDone = (taskItem, closestItemText) => {
	closestItemText.classList.toggle('app__tasks-item-text--done');

	const clickedId = parseInt(taskItem.getAttribute('id'));
	testArr = taskArr.map((obj) => {
		if (obj.id === clickedId) {
			if (obj.isDone === true) {
				obj.isDone = false;
			} else {
				obj.isDone = true;
			}
		}
	});

	updateLocalStorage();
};

const startEditText = (
	closestItemText,
	closestDoneBtn,
	closestDeleteBtn,
	closestEditBtn,
	closestSaveBtn
) => {
	closestItemText.contentEditable = 'true';
	closestItemText.focus();
	closestDoneBtn.style.visibility = 'hidden';
	closestDeleteBtn.style.visibility = 'hidden';
	closestEditBtn.style.display = 'none';
	closestSaveBtn.style.display = 'block';
};

const saveEditedText = (
	taskItem,
	closestItemText,
	closestDoneBtn,
	closestDeleteBtn,
	closestEditBtn,
	closestSaveBtn
) => {
	closestItemText.contentEditable = 'false';
	closestDoneBtn.style.visibility = 'visible';
	closestDeleteBtn.style.visibility = 'visible';
	closestEditBtn.style.display = 'block';
	closestSaveBtn.style.display = 'none';

	const clickedId = parseInt(taskItem.getAttribute('id'));
	const editedText = closestItemText.textContent;

	testArr = taskArr.map((obj) => {
		if (obj.id === clickedId) {
			obj.text = editedText;
		}
	});

	updateLocalStorage();
};

const closestTaskSettings = (e) => {
	const taskItem = e.target.closest('.app__tasks-item');
	const closestItemText = taskItem.firstElementChild;
	const closestDoneBtn = e.target.closest('div').childNodes[0];
	const closestDeleteBtn = e.target.closest('div').childNodes[3];
	const closestEditBtn = e.target.closest('div').childNodes[1];
	const closestSaveBtn = e.target.closest('div').childNodes[2];

	if (e.target.classList.contains('fa-trash')) {
		deleteTask(taskItem);
	}

	if (e.target.classList.contains('fa-check')) {
		checkTaskAsDone(taskItem, closestItemText);
	}

	if (e.target.classList.contains('fa-pen-to-square')) {
		startEditText(
			closestItemText,
			closestDoneBtn,
			closestDeleteBtn,
			closestEditBtn,
			closestSaveBtn
		);
	}

	if (e.target.classList.contains('fa-floppy-disk')) {
		saveEditedText(
			taskItem,
			closestItemText,
			closestDoneBtn,
			closestDeleteBtn,
			closestEditBtn,
			closestSaveBtn
		);
	}
};

const keyShortcuts = (e) => {
	if (e.key === 'Enter') {
		addNewTask();
	}
};

const displaySettings() => {

}


downloadTasksFromLocalStorage();
updateNoneTasksInfo();
navAvatar.addEventListener('click', slideNavMenu);
sidebar.addEventListener('mousemove', openSideBar);
sidebar.addEventListener('mouseleave', hideSideBar);
burgerBtn.addEventListener('click', toggleSidebar);
sidebarItems.forEach((item) => {
	item.addEventListener('click', hideSideBar);
});
addBtn.addEventListener('click', addNewTask);
document.addEventListener('keydown', (e) => keyShortcuts(e));
document.addEventListener('click', (e) => closestTaskSettings(e));
