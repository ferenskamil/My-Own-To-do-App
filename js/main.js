import './sidebar.js';
import './nav.js'
import './toDoApp.js';
import './settings.js';

const navMenuItems = document.querySelectorAll('.nav__menu-settings-item');

const app = document.querySelector('.app');
const sidebarItems = document.querySelectorAll('.sidebar__option');
// const sidebarToDoAppItem = sidebarItems[0];
const sidebarSettingsItem = sidebarItems[1];
const settings = document.querySelector('.settings');

const displaySettings = () => {
	app.style.display = 'none';
	settings.style.display = 'flex';
};
navMenuItems.forEach((item) => {
	item.addEventListener('click', displaySettings);
});
sidebarSettingsItem.addEventListener('click', displaySettings);
