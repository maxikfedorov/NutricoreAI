# NutricoreAI 

## Общее описание проекта

Diet-Microservice представляет собой микросервисное приложение для составления диетических планов с использованием искусственного интеллекта. Приложение разработано с использованием современных технологий и архитектурных решений.

## Функционал

-   Регистрация и авторизация пользователей
-   Составление диетических планов на основе запросов пользователя
-   Сохранение диетических планов в базе данных
-   Отображение сгенерированных диетических планов в удобном формате

## Используемые модели ИИ

Для генерации диетических планов используется модель Perplexity с настройками:

| Model                          | Parameter Count | Context Length | Model Type      |
| ------------------------------ | --------------- | -------------- | --------------- |
| mistral-7b-instruct            | 7B              | 16384          | Chat Completion |
| gpt-4-32k                      | 175B            | 32768          | Chat Completion |
| llama-3-70b-instruct           | 70B             | 8192           | Chat Completion |
| llama-3-sonar-small-32k-chat   | 8B              | 32768          | Chat Completion |
| llama-3-sonar-small-32k-online | 8B              | 28000          | Chat Completion |
| llama-3-sonar-large-32k-chat   | 70B             | 32768          | Chat Completion |
| llama-3-sonar-large-32k-online | 70B             | 28000          | Chat Completion |

## Технологии разработки

-   Node.js
-   Express.js
-   MongoDB
-   Axios
-   Bcrypt
-   JSON Web Token (JWT)
-   Perplexity API

## Архитектура

Приложение использует микросервисную архитектуру, состоящую из следующих компонентов:

-   **Gateway Service**: отвечает за маршрутизацию запросов между клиентом и микросервисами
-   **Authentication Service**: отвечает за регистрацию и авторизацию пользователей
-   **Chado Service**: отвечает за обработку запросов пользователя и генерацию диетических планов с помощью Perplexity API
-   **Perplexity Service**: отвечает за взаимодействие с Perplexity API для генерации диетических планов

Структура проекта:

```
Diet-Microservice/
├── database/
│   └── dbConnect.js
├── mc-auth/
│   ├── authController.js
│   ├── tokenModel.js
│   ├── userModel.js
│   └── userService.js
├── mc-chado/
│   ├── chadoController.js
│   ├── chadoModel.js
│   └── chadoService.js
├── mc-perplexity/
│   ├── perplexityController.js
│   ├── perplexityModel.js
│   ├── perplexityPromt.js
│   └── perplexityService.js
├── public/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── icons/
├── gatewayService.js
├── package.json
└── README.md
```

## Запуск программы

1. Клонируйте репозиторий:

```bash
git clone https://github.com/your-username/Diet-Microservice.git
```

2. Перейдите в директорию проекта:

```bash
cd Diet-Microservice
```

3. Установите зависимости:

```bash
npm install
```

4. Создайте файл `.env` в корневой директории проекта и добавьте необходимые переменные окружения:

```
DB_CONNECTION_STRING=mongodb://localhost:27017/diet-microservice
PERPLEXITY_API_URL=https://api.perplexity.ai/v1/chat
PERPLEXITY_API_KEY=your-perplexity-api-key
```

5. Запустите приложение:

```bash
npm start
```

Приложение будет доступно по адресу `http://localhost:3000`.

Для запуска в режиме разработки используйте команду:

```bash
npm run dev
```

Это позволит автоматически перезапускать приложение при изменении файлов.
