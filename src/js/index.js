const navMenu = document.querySelector('.nav__menu');
const navMenuList = document.querySelector('.nav__menu-settings');
const navUserBtn = document.querySelector('.nav__avatar');
const navMenuItems = document.querySelectorAll('.nav__menu-settings-item');
const navUserImg = document.querySelector('.nav__avatar').firstElementChild;
const navUserName = document.querySelector('.nav__greeting-person');

const mainArea = document.querySelector('main');
const burgerBtn = document.querySelector('.nav__mobile-burger-btn');
const sidebar = document.querySelector('.sidebar');
const nav = document.querySelector('.nav');
const sidebarDescriptions = document.querySelectorAll('.sidebar__description');

const downloadDataFromLocalStorage = () => {
	let userSettings = JSON.parse(
		localStorage.getItem('userSettingsLocalCopy')
	);

	if (userSettings !== null) {
		navUserImg.setAttribute('src', userSettings.avatarSrc);
		navUserName.textContent = userSettings.userName;
	}
};

const slideNavMenu = () => {
	navMenu.classList.toggle('nav__menu--visible');
	navMenuList.classList.toggle('nav__menu-settings--slided');
};

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

downloadDataFromLocalStorage();
navUserBtn.addEventListener('click', slideNavMenu);
navMenuItems.forEach((item) => {
	item.addEventListener('click', slideNavMenu);
});

sidebar.addEventListener('mousemove', openSideBar);
sidebar.addEventListener('mouseleave', hideSideBar);
burgerBtn.addEventListener('click', toggleSidebar);
