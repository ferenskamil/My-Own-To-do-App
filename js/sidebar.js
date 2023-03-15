const app = document.querySelector('.app');
const burgerBtn = document.querySelector('.nav__mobile-burger-btn');
const sidebar = document.querySelector('.sidebar');
const nav = document.querySelector('.nav');
const sidebarDescriptions = document.querySelectorAll('.sidebar__description');
const sidebarItems = document.querySelectorAll('.sidebar__option');
const settings = document.querySelector('.settings');

const openSideBar = () => {
	sidebar.classList.add('sidebar--open');
	nav.classList.add('nav--wide');
	app.classList.add('app--wide');
	settings.classList.add('settings--wide');
	sidebarDescriptions.forEach((el) => {
		el.classList.add('sidebar__description--visible');
	});
};

const hideSideBar = () => {
	sidebar.classList.remove('sidebar--open');
	nav.classList.remove('nav--wide');
	app.classList.remove('app--wide');
	settings.classList.remove('settings--wide');
	sidebarDescriptions.forEach((el) => {
		el.classList.remove('sidebar__description--visible');
	});
};

const toggleSidebar = () => {
	sidebar.classList.toggle('sidebar--open');
	nav.classList.toggle('nav--wide');
};

sidebar.addEventListener('mousemove', openSideBar);
sidebar.addEventListener('mouseleave', hideSideBar);
burgerBtn.addEventListener('click', toggleSidebar);
sidebarItems.forEach((item) => {
	item.addEventListener('click', hideSideBar);
});