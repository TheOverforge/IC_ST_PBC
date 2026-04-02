# IntelClinic AI — Медицинская цифровая платформа

Презентационный сайт медицинской цифровой платформы **IntelClinic AI**.

🌐 **Сайт:** [intel-clinic.ru](https://intel-clinic.ru)

---

## Скриншоты

### Главная страница
![Hero](docs/screen-hero.png)

### О платформе
![About](docs/screen-about.png)

### Модули системы
![Modules](docs/screen-modules.png)

### Свидетельство о регистрации ПО
![Patent](docs/screen-patent.png)

### Контакты
![Contacts](docs/screen-contacts.png)

---

## Стек

| | Технологии |
|---|---|
| UI | React 19, TypeScript |
| Сборка | Vite |
| Стили | SCSS |
| Анимации | Framer Motion |
| Формы | React Hook Form, Zod |

---

## Структура проекта

```
├── src/          # Исходный код (React + TypeScript)
│   ├── app/      # Корневой компонент, стили
│   ├── pages/    # Страницы (лендинг, блог, 404)
│   ├── widgets/  # Секции страницы (header, footer, hero и др.)
│   ├── features/ # Фичи (форма заявки, отслеживание секций)
│   ├── entities/ # Бизнес-сущности (посты блога)
│   └── shared/   # UI-компоненты, утилиты, конфиг
├── public/       # Статические файлы
└── docs/         # Скриншоты для README
```

---

## Функциональность

- Лендинг с разделами: главная, о платформе, модули, патент, блог, контакты
- Форма обратной связи
- Блог с постами, получаемыми из API
- SEO: мета-теги, canonical, sitemap, robots.txt
- Адаптивная вёрстка

---

## Запуск локально

```bash
npm install
npm run dev
```

Сайт запустится на [http://localhost:5173](http://localhost:5173).

Для работы блога и формы нужен запущенный API-сервер. URL задаётся через переменную окружения:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```
