const nav = document.querySelector('.nav');
const app = document.querySelector('.app');
const sidebar = document.querySelector('.sidebar');
const sidebarDescriptions = document.querySelectorAll('.sidebar__description');
const burgerBtn = document.querySelector('.nav__mobile-burger-btn');

const addInput = document.querySelector('.app__add-input');
const addBtn = document.querySelector('.app__add-btn');
const tasksInfo = document.querySelector('.app__tasks-area-info');
const tasksList = document.querySelector('.app__tasks-list');

// consider if necessary
const taskItem = document.getElementsByClassName('app__tasks-item');
const taskText = document.getElementsByClassName('app__tasks-item-text');
const checkBtn = document.getElementsByClassName('check-btn');
const editBtn = document.getElementsByClassName('edit-btn');
const saveBtn = document.getElementsByClassName('save-btn');
const deleteBtn = document.getElementsByClassName('delete-btn');

// console.log(taskItem);
// console.log(taskText[0].textContent);

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
	if (!sidebar.classList.contains('sidebar--open')) {
		openSideBar();
	} else {
		hideSideBar();
	}
};

const updateNoneTasksInfo = () => {
	if (tasksList.length === 0) {
		tasksInfo.style.display = 'block';
	} else {
		tasksInfo.style.display = 'none';
	}
};

const addNewTask = () => {
	console.log(addInput.value);

	updateNoneTasksInfo()
};

sidebar.addEventListener('mousemove', openSideBar);
sidebar.addEventListener('mouseleave', hideSideBar);
burgerBtn.addEventListener('click', toggleSidebar);
addBtn.addEventListener('click', addNewTask);
document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		addNewTask();
	}
});
