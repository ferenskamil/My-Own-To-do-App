import './sidebar.js';
import './toDoApp.js';
import './settings.js';

const navAvatar = document.querySelector('.nav__avatar');
const navMenu = document.querySelector('.nav__menu');
const navMenuList = document.querySelector('.nav__menu-settings');
const navMenuItems = document.querySelectorAll('.nav__menu-settings-item');

const app = document.querySelector('.app');
const sidebarItems = document.querySelectorAll('.sidebar__option');
// const sidebarToDoAppItem = sidebarItems[0];
const sidebarSettingsItem = sidebarItems[1];
const settings = document.querySelector('.settings');

const slideNavMenu = () => {
	navMenu.classList.toggle('nav__menu--visible');
	navMenuList.classList.toggle('nav__menu-settings--slided');
};

const displaySettings = () => {
	app.style.display = 'none';
	settings.style.display = 'flex';
};
navAvatar.addEventListener('click', slideNavMenu);
navMenuItems.forEach((item) => {
	item.addEventListener('click', displaySettings);
});
navMenuItems.forEach((item) => {
	item.addEventListener('click', slideNavMenu);
});
sidebarSettingsItem.addEventListener('click', displaySettings);
