import './sidebar.js';
import './toDoApp.js';

// const nav = document.querySelector('.nav');
const navUserNameSpan = document.querySelector('.nav__greeting-person');
const navAvatar = document.querySelector('.nav__avatar');
const navAvatarImg = navAvatar.firstElementChild;
const navMenu = document.querySelector('.nav__menu');
const navMenuList = document.querySelector('.nav__menu-settings');
const navMenuItems = document.querySelectorAll('.nav__menu-settings-item');

const app = document.querySelector('.app');
// const burgerBtn = document.querySelector('.nav__mobile-burger-btn');
// const sidebar = document.querySelector('.sidebar');
// const sidebarTitle = document.querySelector('.sidebar__title');
// const sidebarDescriptions = document.querySelectorAll('.sidebar__description');
const sidebarItems = document.querySelectorAll('.sidebar__option');
// const sidebarToDoAppItem = sidebarItems[0];
const sidebarSettingsItem = sidebarItems[1];

const settings = document.querySelector('.settings');
const currentNameSpan = document.querySelector('.user-name');
const changeNameInput = document.querySelector('.settings__name-input');
const changeNameValidateInfo = document.querySelector('.new-name-input-error');
// const avatars = document.querySelectorAll('.settings__avatar-item');
const avatarsForm = document.querySelector('.settings__avatar-list');
const settingsSaveBtn = document.querySelector('.settings__btn');

let userSettings = {
	userName: '',
	avatarSrc: '',
};

const downloadUserSettingsFromLocalStorage = () => {
	let parsedArr = JSON.parse(localStorage.getItem('userSettingsLocalCopy'));

	if (parsedArr !== null) {
		userSettings = parsedArr;
		navAvatarImg.setAttribute('src', userSettings.avatarSrc);
		navUserNameSpan.textContent = userSettings.userName;
	}
};

const updateLocalStorage = () => {
	// let tasksStr = JSON.stringify(taskArr);
	// localStorage.setItem('tasksLocalCopy', tasksStr);

	let settingsStr = JSON.stringify(userSettings);
	localStorage.setItem('userSettingsLocalCopy', settingsStr);
};

const slideNavMenu = () => {
	navMenu.classList.toggle('nav__menu--visible');
	navMenuList.classList.toggle('nav__menu-settings--slided');
};

const displaySettings = () => {
	app.style.display = 'none';
	settings.style.display = 'flex';
};

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

downloadUserSettingsFromLocalStorage();
markAvatarAsChecked();
navAvatar.addEventListener('click', slideNavMenu);
navMenuItems.forEach((item) => {
	item.addEventListener('click', displaySettings);
});
navMenuItems.forEach((item) => {
	item.addEventListener('click', slideNavMenu);
});
sidebarSettingsItem.addEventListener('click', displaySettings);
avatarsForm.addEventListener('click', markAvatarAsChecked);
settingsSaveBtn.addEventListener('click', updateUserNameInNav);
settingsSaveBtn.addEventListener('click', updateUserAvatar);
settingsSaveBtn.addEventListener('click', updateLocalStorage);
