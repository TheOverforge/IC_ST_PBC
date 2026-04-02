<p align="center">
  <img src="src/shared/assets/images/logo/logo-horizontal.png" alt="IntelClinic AI" height="60" />
</p>

<h1 align="center">IntelClinic AI — Медицинская цифровая платформа</h1>

<p align="center">
  Презентационный сайт медицинской цифровой платформы IntelClinic AI
</p>

<p align="center">
  <a href="https://intel-clinic.ru"><img src="https://img.shields.io/badge/Сайт-intel--clinic.ru-7c3aed?style=for-the-badge&logo=vercel&logoColor=white" alt="Сайт" /></a>
  <img src="https://img.shields.io/badge/React-19-7c3aed?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-7c3aed?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-7c3aed?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

---

## Скриншоты

| Главная | О платформе | Модули |
|---------|-------------|--------|
| ![Hero](docs/screen-hero.png) | ![About](docs/screen-about.png) | ![Modules](docs/screen-modules.png) |

| Патент | Контакты |
|--------|----------|
| ![Patent](docs/screen-patent.png) | ![Contacts](docs/screen-contacts.png) |

---

## Стек

| Слой | Технологии |
|---|---|
| UI | React 19, TypeScript |
| Сборка | Vite 8 |
| Стили | SCSS |
| Анимации | Framer Motion |
| Формы | React Hook Form + Zod |
| Роутинг | React Router v7 |

---

## Структура проекта

```bash
src/
├── app/        # Корневой компонент, глобальные стили
├── pages/      # Лендинг, список блога, пост, 404
├── widgets/    # Секции — header, footer, hero, about, modules и др.
├── features/   # Форма заявки, отслеживание активной секции
├── entities/   # Типы и API-вызовы для постов блога
└── shared/     # UI-компоненты, утилиты, конфиг, ассеты
```

Архитектура построена по принципу **Feature-Sliced Design (FSD)**.

---

## Функциональность

- Лендинг с разделами: главная, о платформе, модули, патент, блог, контакты
- Форма заявки на демо
- Блог с постами из headless CMS API
- SEO: мета-теги, canonical URL, sitemap.xml, robots.txt
- Анимации появления при скролле
- Адаптивная вёрстка

---

## Что не включено в репозиторий

Репозиторий содержит только **публичную часть фронтенда**.

Полная платформа дополнительно включает:

- **CMS Админ-панель** — редактор постов с планировщиком публикаций, медиабиблиотека, входящие заявки, ролевой доступ (superadmin / editor), лог активности, аналитика
- **Backend API** — Node.js + Express, REST API, SQLite, JWT-аутентификация, загрузка файлов

Эти части не опубликованы, так как содержат проприетарную бизнес-логику и внутреннюю инфраструктуру. Фронтенд спроектирован для работы с любым совместимым API.

---

## Запуск локально

```bash
npm install
npm run dev
# → http://localhost:5173
```

URL API задаётся через переменную окружения:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

---

> English version: [README.md](README.md)
