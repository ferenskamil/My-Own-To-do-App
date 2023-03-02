const sidebar = document.querySelector('.sidebar');
const sidebarDescriptions = document.querySelectorAll('.sidebar__description');
const sidebarShadow = document.querySelector('.sidebar__shadow');
const nav = document.querySelector('.nav');
const app = document.querySelector('.app');
const burgerBtn = document.querySelector('.nav__mobile-burger-btn');

const openSideBar = () => {
	sidebar.classList.remove('sidebar--short');
	nav.classList.remove('nav--wide');
	app.classList.remove('app--wide');

	setTimeout(() => {
		sidebarDescriptions.forEach((el) => {
			el.classList.remove('sidebar__description--hide');
		});
	}, 500);
};

const hideSideBar = () => {
	sidebar.classList.add('sidebar--short');
	nav.classList.add('nav--wide');
	app.classList.add('app--wide');
	sidebarDescriptions.forEach((el) => {
		el.classList.add('sidebar__description--hide');
	});
};

const toggleSidebar = () => {
	if (!sidebar.classList.contains('sidebar--short')) {
		hideSideBar();
	} else {
		openSideBar();
	}
};

sidebar.addEventListener('click', toggleSidebar);
burgerBtn.addEventListener('click', toggleSidebar);
