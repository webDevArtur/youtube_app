# YouTube_App 🎥

Простое и адаптивное веб-приложение на Vue 3 + TypeScript для поиска и отображения видео с YouTube с возможностью фильтрации и добавления в избранное.

## 🚀 Возможности

- 🔍 Поиск видео по запросу через YouTube Data API v3
- 🧩 Отображение результатов в виде карточек (превью, название, канал, просмотры)
- ⚠️ Обработка ошибок сети и API
- 📭 Сообщение при отсутствии результатов
- 📄 Пагинация — кнопка "Загрузить ещё"
- 🗂️ Фильтрация ( длительности и т.п. )
- ⭐ Система избранного с сохранением в localStorage
- 📱 Полностью адаптивный дизайн

## 🛠️ Технологии

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) — хранилище состояния
- [SCSS](https://sass-lang.com/) — стилизация
- [YouTube Data API v3](https://developers.google.com/youtube/v3)

## 📦 Установка и запуск

**Клонируйте репозиторий:**
```bash
git clone https://github.com/webDevArtur/youtube_app.git
cd youtube_app

npm install // установите зависимости
```

**Создайте .env файл:**
```
VITE_YOUTUBE_API_KEY=ваш_ключ_от_youtube_api
```

🔑 Получить API-ключ можно [здесь](https://developers.google.com/youtube/v3/getting-started?hl=ru)

**Запустите приложение:**
```bash
npm run dev
```

Откройте в браузере: http://localhost:5173