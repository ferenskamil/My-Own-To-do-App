// import * as sidebar from './_sidebar.min.js';
// import * as nav from './_nav.min.js';

const navUserNameSpan = document.querySelector('.nav__greeting-person');
const currentNameSpan = document.querySelector('.user-name');
const navAvatar = document.querySelector('.nav__avatar');
const navAvatarImg = navAvatar.firstElementChild;

const changeNameInput = document.querySelector('.settings__name-input');
const changeNameValidateInfo = document.querySelector('.new-name-input-error');

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
		currentNameSpan.textContent = userSettings.userName;
	}
};

const updateLocalStorage = () => {
	let settingsStr = JSON.stringify(userSettings);
	localStorage.setItem('userSettingsLocalCopy', settingsStr);
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
avatarsForm.addEventListener('click', markAvatarAsChecked);
settingsSaveBtn.addEventListener('click', updateUserNameInNav);
settingsSaveBtn.addEventListener('click', updateUserAvatar);
settingsSaveBtn.addEventListener('click', updateLocalStorage);
