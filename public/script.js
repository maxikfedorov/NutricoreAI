document.addEventListener("DOMContentLoaded", function () {
	const loginContainer = document.getElementById("login-container");
	const registerContainer = document.getElementById("register-container");
	const mainContainer = document.getElementById("main-container");
	const resultContainer = document.getElementById("result-container");
	const loadingSpinner = document.getElementById("loading-spinner");
	const container = document.querySelector(".container");

	const loginForm = document.getElementById("loginForm");
	const registrationForm = document.getElementById("registrationForm");

	const registerButton = document.getElementById("register");
	const loginButton = document.getElementById("btn-login");

	const getAIResponseButton = document.getElementById("getAIResponse");
	const infoInput = document.getElementById("infoInput");
	const aiResponse = document.getElementById("aiResponse");

	// Добавьте эту строку для логотипа
	const logo = document.querySelector(".logo img");

	// Проверка токена при загрузке страницы
	const token = localStorage.getItem("token");
	if (token) {
		validateToken(token);
	} else {
		showLoginContainer();
	}

	// Переход к регистрации
	registerButton.addEventListener("click", function () {
		loginContainer.style.display = "none";
		registerContainer.style.display = "block";
	});

	// Переход к логину
	loginButton.addEventListener("click", function () {
		registerContainer.style.display = "none";
		loginContainer.style.display = "block";
	});

	// Обработка формы логина
	loginForm.addEventListener("submit", function (e) {
		e.preventDefault();
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		fetch("http://localhost:3001/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.token) {
					localStorage.setItem("token", data.token);
					showMainContainer();
				} else {
					alert(
						"Ошибка входа. Пожалуйста, проверьте введенные данные и попробуйте снова.",
					);
				}
			});
	});

	// Обработка формы регистрации
	registrationForm.addEventListener("submit", function (e) {
		e.preventDefault();
		const username = document.getElementById("reg-username").value;
		const password = document.getElementById("reg-password").value;

		fetch("http://localhost:3001/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message) {
					alert(data.message); // Сообщение об успешной регистрации
					registerContainer.style.display = "none";
					loginContainer.style.display = "block";
				} else {
					alert("Ошибка регистрации. Пожалуйста, попробуйте снова.");
				}
			})
			.catch((error) => {
				console.error("Ошибка:", error);
				alert("Ошибка регистрации. Пожалуйста, попробуйте снова.");
			});
	});

	// Обработка выхода
	logo.addEventListener("click", function () {
		localStorage.removeItem("token");
		showMainContainer();
	});

	// Получение ответа от AI
	getAIResponseButton.addEventListener("click", function () {
		showLoadingScreen(); // Показываем экран загрузки

		const userInput = infoInput.value; // Считываем значение textarea
		const selectedFocus = document.querySelector(
			".focus-button .focus-button-text",
		).textContent;

		fetch("http://localhost:4000/custom-ai", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ userInput, selectedFocus }),
		})
			.then((response) => response.text())
			.then((data) => {
				typeWriterEffect(data, function () {
					hideLoadingScreen(); // Скрываем экран загрузки после завершения печати
				});
			})
			.catch((error) => {
				console.error("Ошибка:", error);
				hideLoadingScreen();
				aiResponse.innerHTML =
					"Ошибка при получении ответа от AI. Пожалуйста, попробуйте снова.";
			});

		clearFields(); // Очищаем поля
	});

	// Функция для эффекта печати текста
	function typeWriterEffect(text, callback) {
		let i = 0;
		aiResponse.innerHTML = ""; // Очищаем элемент перед началом печати
		function typeWriter() {
			if (i < text.length) {
				aiResponse.innerHTML += text.charAt(i);
				i++;
				setTimeout(typeWriter, 20); // Задержка между символами (20 мс)
			} else {
				if (callback) callback();
			}
		}
		typeWriter();
	}

	// Функция для валидации токена
	function validateToken(token) {
		fetch("http://localhost:3001/validate-token", {
			headers: {
				Authorization: token,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					showMainContainer();
				} else {
					localStorage.removeItem("token");
					showLoginContainer();
				}
			})
			.catch((error) => {
				console.error("Ошибка валидации токена:", error);
				localStorage.removeItem("token");
				showLoginContainer();
			});
	}

	// Функция для отображения контейнера логина
	function showLoginContainer() {
		loadingSpinner.style.display = "none";
		container.style.display = "block";
		loginContainer.style.display = "block";
		registerContainer.style.display = "none";
		mainContainer.style.display = "none";
		resultContainer.style.display = "none";
	}

	// Функция для отображения основного контейнера
	function showMainContainer() {
		loadingSpinner.style.display = "none";
		container.style.display = "block";
		loginContainer.style.display = "none";
		registerContainer.style.display = "none";
		mainContainer.style.display = "block";
		resultContainer.style.display = "none";
	}

	// Функция для отображения экрана загрузки
	function showLoadingScreen() {
		mainContainer.style.display = "none";
		resultContainer.style.display = "block";
		loadingSpinner.style.display = "block";
	}

	// Функция для скрытия экрана загрузки и отображения ответа
	function hideLoadingScreen() {
		const loadingImage = document.querySelector(".loading-image");
		loadingImage.classList.add("fade-out"); // Добавляем класс для плавного исчезновения
		setTimeout(() => {
			loadingImage.style.display = "none"; // Скрываем элемент после завершения анимации
		}, 500); // Время должно совпадать с длительностью анимации в CSS
	}

	// Функция для очистки полей
	function clearFields() {
		infoInput.value = "";
		aiResponse.innerHTML = "";
	}
});

// Функция для отображения экрана загрузки
function showLoadingScreen() {
	mainContainer.style.display = "none";
	resultContainer.style.display = "block";
	document.querySelector(".loading-image").style.display = "block"; // Показываем новый элемент загрузки
}

// Функция для скрытия экрана загрузки и отображения ответа
function hideLoadingScreen(responseText) {
	document.querySelector(".loading-image").style.display = "none"; // Скрываем новый элемент загрузки
	document.getElementById("aiResponse").innerHTML = responseText;
}

const focusButton = document.querySelector(".focus-button");
const popupMenu = document.querySelector(".popup-menu");
const popupMenuContainer = document.querySelector(".popup-menu-container");

focusButton.addEventListener("click", () => {
	popupMenu.style.display =
		popupMenu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", (event) => {
	if (!popupMenuContainer.contains(event.target)) {
		popupMenu.style.display = "none";
	}
});

// Обработчик клика на элементы меню
const menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach((item) => {
	item.addEventListener("click", () => {
		const selectedFocus = item.querySelector(".diet-title").textContent;
		updateFocusButton(selectedFocus);
	});
});

// Функция для обновления текста кнопки ФОКУС
function updateFocusButton(text) {
	const focusButton = document.querySelector(
		".focus-button .focus-button-text",
	);
	focusButton.textContent = text;
	popupMenu.style.display = "none"; // Скрываем меню при клике на элемент
}
