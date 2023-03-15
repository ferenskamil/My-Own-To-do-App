const sidebar = document.querySelector('.sidebar');
const nav = document.querySelector('.nav');
const app = document.querySelector('.app');
const settings = document.querySelector('.settings');
const sidebarDescriptions = document.querySelectorAll('.sidebar__description');
const burgerBtn = document.querySelector('.nav__mobile-burger-btn');

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
