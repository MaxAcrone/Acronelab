# 📧 Настройка EmailJS для отправки писем

## 🚀 Быстрая настройка (5 минут)

### 1. Регистрация в EmailJS
1. Перейдите на [emailjs.com](https://www.emailjs.com/)
2. Зарегистрируйтесь или войдите в аккаунт
3. Создайте новый сервис (Gmail, Outlook, etc.)

### 2. Создание шаблонов писем

#### Шаблон для контактной формы:
- **Template ID**: `template_contact`
- **Subject**: `Новое сообщение от {{from_name}}`
- **Content**:
```
Имя: {{from_name}}
Email: {{from_email}}
Тема: {{subject}}

Сообщение:
{{message}}

---
Отправлено с сайта AcroneLab
```

#### Шаблон для формы брифа:
- **Template ID**: `template_brief`
- **Subject**: `Новый бриф проекта: {{project_type}}`
- **Content**:
```
Тип проекта: {{project_type}}
Цели проекта: {{project_goals}}
Целевая аудитория: {{target_audience}}
Дизайн предпочтения: {{design_preferences}}
Технические требования: {{technical_requirements}}
Контент и ресурсы: {{content_assets}}
Бюджет: {{budget}}
Временные рамки: {{timeline}}
Метрики успеха: {{success_metrics}}

Контактный email: {{from_email}}

---
Отправлено с сайта AcroneLab
```

### 3. Получение ключей
1. В панели EmailJS найдите:
   - **Service ID** (например: `service_abc123`)
   - **Template IDs** (например: `template_contact`, `template_brief`)
   - **Public Key** (например: `user_xyz789`)

### 4. Обновление конфигурации
Откройте файл `src/lib/emailService.ts` и замените:

```typescript
const EMAILJS_SERVICE_ID = 'service_your_service_id'; // Замените на ваш Service ID
const EMAILJS_TEMPLATE_ID_CONTACT = 'template_contact'; // Замените на ваш Template ID для контактов
const EMAILJS_TEMPLATE_ID_BRIEF = 'template_brief'; // Замените на ваш Template ID для брифа
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // Замените на ваш Public Key
```

### 5. Тестирование
1. Запустите сайт: `npm run dev`
2. Отправьте тестовое сообщение через контактную форму
3. Отправьте тестовый бриф через модальное окно
4. Проверьте почту `acroneprod@gmail.com`

## 🔧 Альтернативные варианты

### Resend (рекомендуется для продакшена)
```bash
npm install resend
```

### Nodemailer + Gmail SMTP
```bash
npm install nodemailer
```

## 📊 Лимиты EmailJS
- **Бесплатно**: 200 писем/месяц
- **Платно**: от $15/месяц за 1000 писем

## 🛡️ Безопасность
- Public Key безопасен для использования в клиентском коде
- EmailJS автоматически защищает от спама
- Все письма проходят через их серверы

## ✅ Готово!
После настройки все письма с форм будут приходить на `acroneprod@gmail.com`
