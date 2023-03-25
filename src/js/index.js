// import * as sidebar from './_sidebar.min.js';
// import * as nav from './_nav.min.js';
// import * as toDoApp from './_toDoApp.min.js';
// import * as settings from './settings.min.js';
import Task from './_classes.min.js';

// Nav variables
const navMenu = document.querySelector('.nav__menu');
const navMenuList = document.querySelector('.nav__menu-settings');
const navAvatar = document.querySelector('.nav__avatar');
const navMenuItems = document.querySelectorAll('.nav__menu-settings-item');

// sidebar events
const mainArea = document.querySelector('main');
const burgerBtn = document.querySelector('.nav__mobile-burger-btn');
const sidebar = document.querySelector('.sidebar');
const nav = document.querySelector('.nav');
const sidebarDescriptions = document.querySelectorAll('.sidebar__description');

// Task variables
const addInput = document.querySelector('.app__add-input');
const addBtn = document.querySelector('.app__add-btn');
const tasksInfo = document.querySelector('.app__tasks-area-info');
const tasksItems = document.getElementsByClassName('app__tasks-item');
const tasksList = document.querySelector('.app__tasks-list');

let taskArr = [];

// Settings variables
const navUserNameSpan = document.querySelector('.nav__greeting-person');
const currentNameSpan = document.querySelector('.user-name');
// const navAvatar = document.querySelector('.nav__avatar');
const navAvatarImg = navAvatar.firstElementChild;

const changeNameInput = document.querySelector('.settings__name-input');
const changeNameValidateInfo = document.querySelector('.new-name-input-error');

const avatarsForm = document.querySelector('.settings__avatar-list');
const settingsSaveBtn = document.querySelector('.settings__btn');

let userSettings = {
	userName: '',
	avatarSrc: '',
};

// Nav functions
const slideNavMenu = () => {
	navMenu.classList.toggle('nav__menu--visible');
	navMenuList.classList.toggle('nav__menu-settings--slided');
};

// Sidebar functions
const openSideBar = () => {
	sidebar.classList.add('sidebar--open');
	nav.classList.add('narrowed');
	mainArea.classList.add('narrowed');
	sidebarDescriptions.forEach((el) => {
		el.classList.add('sidebar__description--visible');
	});
};

const hideSideBar = () => {
	sidebar.classList.remove('sidebar--open');
	nav.classList.remove('narrowed');
	mainArea.classList.remove('narrowed');
	sidebarDescriptions.forEach((el) => {
		el.classList.remove('sidebar__description--visible');
	});
};

const toggleSidebar = () => {
	sidebar.classList.toggle('sidebar--open');
	nav.classList.toggle('nav--wide');
};

// Task functions
const downloadTasksFromLocalStorage = () => {
	let parsedArr = JSON.parse(localStorage.getItem('tasksLocalCopy'));

	if (parsedArr !== null) {
		parsedArr.forEach((obj) => createNewTaskItem(obj));
		taskArr = parsedArr;
	}
};

const updateLocalStorage = () => {
	let tasksStr = JSON.stringify(taskArr);
	localStorage.setItem('tasksLocalCopy', tasksStr);

	let settingsStr = JSON.stringify(userSettings);
	localStorage.setItem('userSettingsLocalCopy', settingsStr);
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

const checkTaskAsDone = (taskItem, closestItemText) => {
	closestItemText.classList.toggle('app__tasks-item-text--done');

	const clickedId = parseInt(taskItem.getAttribute('id'));
	taskArr.map((obj) => {
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

const deleteTask = (taskItem) => {
	const clickedId = parseInt(taskItem.getAttribute('id'));

	taskArr = taskArr.filter((obj) => obj.id !== clickedId);

	taskItem.outerHTML = '';
	updateLocalStorage();
	updateNoneTasksInfo();
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

	taskArr.map((obj) => {
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

// Settings functions
const downloadUserSettingsFromLocalStorage = () => {
	let parsedArr = JSON.parse(localStorage.getItem('userSettingsLocalCopy'));

	if (parsedArr !== null) {
		userSettings = parsedArr;
		navAvatarImg.setAttribute('src', userSettings.avatarSrc);
		navUserNameSpan.textContent = userSettings.userName;
		currentNameSpan.textContent = userSettings.userName;
	}
};

// const updateLocalStorage = () => {
// 	let settingsStr = JSON.stringify(userSettings);
// 	localStorage.setItem('userSettingsLocalCopy', settingsStr);
// };

const updateUserNameInNav = () => {
	const newName = changeNameInput.value;

	if (newName.length <= 3) {
		changeNameValidateInfo.style.display = 'block';
	} else {
		changeNameValidateInfo.style.display = 'none';
		userSettings.userName = newName;
		currentNameSpan.textContent = newName;
		navUserNameSpan.textContent = newName;
	}
};

const markAvatarAsChecked = () => {
	[...avatarsForm].forEach((input) => {
		const avatarItem = input.parentNode;

		if (input.checked) {
			avatarItem.classList.add('settings__avatar-item--checked');
		} else {
			avatarItem.classList.remove('settings__avatar-item--checked');
		}
	});
};

const updateUserAvatar = () => {
	[...avatarsForm].forEach((input) => {
		const avatarItem = input.parentNode;
		const checkedAvatarImg = input.previousElementSibling.lastElementChild;

		if (avatarItem.classList.contains('settings__avatar-item--checked')) {
			const avatarFilePath = checkedAvatarImg.getAttribute('src');

			navAvatarImg.setAttribute('src', avatarFilePath);
			userSettings.avatarSrc = avatarFilePath;
		}
	});
};

// Nav events
navAvatar.addEventListener('click', slideNavMenu);
navMenuItems.forEach((item) => {
	item.addEventListener('click', slideNavMenu);
});

// Sidebar events
sidebar.addEventListener('mousemove', openSideBar);
sidebar.addEventListener('mouseleave', hideSideBar);
burgerBtn.addEventListener('click', toggleSidebar);

// Task events
downloadTasksFromLocalStorage();
updateNoneTasksInfo();
addBtn.addEventListener('click', addNewTask);
document.addEventListener('click', (e) => closestTaskSettings(e));
document.addEventListener('keydown', (e) => keyShortcuts(e));

// Settings events
downloadUserSettingsFromLocalStorage();
markAvatarAsChecked();
avatarsForm.addEventListener('click', markAvatarAsChecked);
settingsSaveBtn.addEventListener('click', updateUserNameInNav);
settingsSaveBtn.addEventListener('click', updateUserAvatar);
settingsSaveBtn.addEventListener('click', updateLocalStorage);
