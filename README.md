# 🚀 Acronelab Portfolio - Full Stack Portfolio Website

Современный портфолио сайт с полным стеком технологий, включающий frontend на Next.js и backend на NestJS.

## 🏗️ Архитектура

```
acronelab-portfolio/
├── packages/
│   ├── frontend/          # Next.js 14 + React 18
│   └── backend/           # NestJS + PostgreSQL + Prisma
├── package.json           # Корневой package.json с workspace
└── README.md
```

## 🛠️ Технологии

### Frontend
- **Next.js 14.2.25** (App Router)
- **React 18.2.0**
- **TypeScript 5.x**
- **Tailwind CSS 3.3.0**
- **Framer Motion 10.18.0**
- **Zustand 4.5.6** (State Management)
- **TanStack React Query 5.75.5**
- **Axios 1.6.0**

### Backend
- **NestJS 10.x**
- **PostgreSQL** (Database)
- **Prisma ORM 5.x**
- **JWT + Passport** (Authentication)
- **Class-validator + Class-transformer**
- **Swagger/OpenAPI**
- **SendGrid** (Email)
- **Stripe** (Payments)

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
# Установка всех зависимостей (frontend + backend)
npm run install:all

# Или по отдельности:
npm install                    # Корневые зависимости
cd packages/frontend && npm install
cd packages/backend && npm install
```

### 2. Настройка окружения
```bash
# Backend
cp packages/backend/env.example packages/backend/.env
# Заполните .env файл реальными значениями
```

### 3. Запуск проекта

#### 🎯 **ОБЪЕДИНЕННЫЙ ЗАПУСК (Рекомендуется)**
```bash
# Запуск frontend + backend одновременно
npm run dev
```

#### 🔧 Запуск по отдельности
```bash
# Frontend (порт 3000)
npm run dev:frontend

# Backend (порт 5000)
npm run dev:backend
```

### 4. Доступ к приложению
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Swagger Docs**: http://localhost:5000/api/docs

## 🔗 API Endpoints

### Frontend API Routes (Next.js)
- `GET /api/projects` - Получить все проекты
- `GET /api/projects/[id]` - Получить проект по ID

### Backend API (NestJS)
- `POST /api/auth/login` - Авторизация
- `POST /api/auth/register` - Регистрация
- `GET /api/users/profile` - Профиль пользователя
- `POST /api/payments/create-checkout` - Создание платежа

## 📁 Структура проекта

### Frontend
```
packages/frontend/
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── page.tsx       # Главная страница
│   │   ├── projects/      # Страницы проектов
│   │   └── api/           # API routes
│   ├── components/        # React компоненты
│   ├── hooks/            # Custom hooks
│   ├── store/            # Zustand store
│   ├── lib/              # Утилиты и конфигурация
│   ├── types/            # TypeScript типы
│   └── data/             # Статические данные
├── public/               # Статические файлы
└── tailwind.config.js    # Tailwind конфигурация
```

### Backend
```
packages/backend/
├── src/
│   ├── auth/             # Аутентификация
│   ├── users/            # Пользователи
│   ├── projects/         # Проекты
│   ├── payments/         # Платежи
│   └── main.ts           # Точка входа
├── prisma/               # Prisma schema и миграции
└── env.example           # Пример переменных окружения
```

## 🌐 Проксирование API

Next.js автоматически проксирует API запросы:
- `/api/backend/*` → `http://localhost:5000/api/*`
- `/api/*` → Next.js API routes

## 🚀 Скрипты

### Корневые команды
```bash
npm run dev              # Запуск frontend + backend
npm run build            # Сборка обоих проектов
npm run start            # Запуск в продакшн режиме
npm run install:all      # Установка всех зависимостей
```

### Frontend команды
```bash
npm run dev:frontend     # Запуск только frontend
npm run build:frontend   # Сборка frontend
npm run start:frontend   # Запуск frontend в продакшн
```

### Backend команды
```bash
npm run dev:backend      # Запуск только backend
npm run build:backend    # Сборка backend
npm run start:backend    # Запуск backend в продакшн
```

## 🔧 Конфигурация

### Next.js (packages/frontend/next.config.js)
- Проксирование API к backend
- Оптимизация изображений
- Rewrites для API маршрутов

### Tailwind CSS
- Кастомные цвета и анимации
- Responsive дизайн
- Dark theme поддержка

### Prisma (packages/backend/prisma/schema.prisma)
- User, Profile, Subscription, Payment модели
- PostgreSQL подключение
- Автоматические миграции

## 🎨 Особенности дизайна

- **Custom Cursor** - Анимированный курсор
- **Parallax Effects** - Эффекты параллакса
- **Light Beams** - Световые лучи
- **Gradient Backgrounds** - Градиентные фоны
- **Responsive Design** - Адаптивный дизайн
- **Dark Theme** - Темная тема

## 🚀 Развертывание

### Frontend (Vercel/Netlify)
```bash
cd packages/frontend
npm run build
# Загрузить .next папку
```

### Backend (Railway/Render)
```bash
cd packages/backend
npm run build
# Настроить переменные окружения
```

## 📝 Лицензия

MIT License

## 🤝 Поддержка

Для вопросов и предложений создавайте issue в репозитории.
