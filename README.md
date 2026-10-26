# Tasks

Веб-приложение для списка задач. У задачи есть название, описание и статус: «в планах», «в работе» или «сделано». Через интерфейс можно создать задачу, изменить её, удалить и отфильтровать список по статусу.

Стек:

- **API** — FastAPI, SQLAlchemy, Alembic, PostgreSQL
- **Интерфейс** — React, TypeScript, Vite
- **Запуск API и базы** — Docker Compose

Эндпоинты (`/api/tasks`): создание, список с фильтром по статусу, получение одной задачи, обновление и удаление. Схема запросов — в Swagger на `/docs`.

---

### Переменные окружения (Backend)
- `POSTGRES_HOST` (default: `localhost`)
- `POSTGRES_PORT` (default: `5432`)
- `POSTGRES_DB` (default: `tasks_db`)
- `POSTGRES_USER` (default: `tasks_user`)
- `POSTGRES_PASSWORD` (default: `tasks_password`)
- `APP_PORT` (default: `8000`)

Для фронтенда:
- `VITE_API_BASE_URL` (default: `http://localhost:8000`)

---
1)
```bash
docker compose up -d --build
docker compose ps
```

2) Alembic 
```bash
docker compose exec api alembic upgrade head
# или
docker compose exec -e PYTHONPATH=/app api alembic upgrade head
# либо
docker compose exec -w /app api alembic upgrade head
```

3) 
```bash
docker compose exec db psql -U ${POSTGRES_USER:-tasks_user} -d ${POSTGRES_DB:-tasks_db} -c "\dt"
curl -i http://localhost:8000/api/tasks  
```

4) Запустите фронтенд:
```bash
cd frontend
npm install
VITE_API_BASE_URL=http://localhost:8000 npm run dev
# откройте http://localhost:5173
```

5) Документация API:
```
http://localhost:8000/docs
```

---
Docker:
```bash
docker compose up -d --build
docker compose exec api alembic upgrade head
docker compose logs -f api
```

Frontend:
```bash
cd frontend
npm run dev
```