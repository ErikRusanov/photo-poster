# Photo Poster

Сервис для генерации постов в Telegram с использованием ИИ для создания подписей к изображениям.

![Preview Image](docs/photo-poster-preview.gif)

## Возможности

- Загрузка изображений через drag-and-drop
- Генерация подписей к изображениям с помощью ИИ
- Возможность добавления пользовательского описания
- Несколько стилей постов (формальный, повседневный, юмористический)
- Функция предварительного просмотра
- Современный, адаптивный интерфейс

## Технологии

### Backend:
- FastAPI
- Ollama
- Python Image Processing

### Frontend:
- React
- Material-UI
- Axios
- React Dropzone

## Требования

- Docker
- Docker Compose

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone [https://gitlab.com/erik.rusanov.03/photo-poster.git](https://github.com/ErikRusanov/photo-poster.git)
cd photo-poster
```

2. Запустите приложение с помощью Docker Compose:
```bash
docker-compose up --build
```

После запуска сервисы будут доступны по следующим адресам:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Ollama API: http://localhost:11434

## Использование

1. Откройте браузер и перейдите по адресу `http://localhost:3000`
2. Перетащите изображение или нажмите для выбора файла
3. (Опционально) Добавьте собственное описание
4. Выберите желаемый стиль поста
5. Нажмите "Сгенерировать пост" для создания поста в Telegram
6. Просмотрите и отредактируйте сгенерированный пост при необходимости

## API Endpoints

- `POST /api/generate-post`
  - Принимает multipart form data с параметрами:
    - `image`: Файл изображения
    - `description` (опционально): Пользовательское текстовое описание

## Разработка

### Структура проекта:
```
photo-poster/
├── frontend/          # React приложение
├── backend/           # FastAPI сервер
├── docker-compose.yml # Docker Compose конфигурация
└── docs/             # Документация и медиафайлы
```

### Локальная разработка

Для разработки без Docker можно запустить сервисы локально:

1. Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # На Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

2. Frontend:
```bash
cd frontend
npm install
npm start
```

## Вклад в проект

1. Создайте форк репозитория
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в репозиторий (`git push origin feature/amazing-feature`)
5. Создайте Pull Request
