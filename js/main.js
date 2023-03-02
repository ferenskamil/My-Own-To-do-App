const sidebar = document.querySelector('.sidebar');
const nav = document.querySelector('.nav');
const app = document.querySelector('.app');

sidebar.addEventListener('click', () => {
	sidebar.classList.toggle('sidebar--short');
	nav.classList.toggle('nav--wide');
	app.classList.toggle('app--wide');
});
