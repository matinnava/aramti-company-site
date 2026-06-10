# Aramti Website — Full Project Document
> This document is a complete specification for Claude Code to build the Aramti company website from scratch.

---

## 1. Project Overview

**Company Name:** Aramti  
**Tagline:** Secure Technologies for a Carefree Life  
**Type:** Software & Automation Company Website  
**Goal:** Showcase services, display portfolio, and receive project orders online  
**Languages:** Persian (RTL) + English (LTR) — Persian is primary  

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) + TailwindCSS |
| Backend | Django + Django REST Framework |
| Database | PostgreSQL (SQLite for development) |
| Auth | Django built-in + JWT (for admin panel) |
| Email | Django email (SMTP) |
| Deployment | Nginx + Gunicorn on VPS |

---

## 3. Brand & Design System

### Colors (extracted from logo)
```css
--color-bg:         #0A0A0A;   /* Deep black background */
--color-surface:    #111111;   /* Card/section background */
--color-border:     #1E1E1E;   /* Subtle borders */
--color-pink:       #E91E8C;   /* Primary accent — logo pink */
--color-cyan:       #00BCD4;   /* Secondary accent — logo cyan/teal */
--color-white:      #F5F5F5;   /* Primary text */
--color-gray:       #888888;   /* Secondary text */
--color-pink-glow:  rgba(233, 30, 140, 0.15);  /* Glow effects */
--color-cyan-glow:  rgba(0, 188, 212, 0.15);   /* Glow effects */
```

### Typography
```css
/* Display / Hero titles */
font-family: 'Syne', sans-serif;  /* Bold, geometric, modern */

/* Body text (English) */
font-family: 'DM Sans', sans-serif;

/* Persian text */
font-family: 'Vazirmatn', sans-serif;

/* Code snippets / decorative */
font-family: 'JetBrains Mono', monospace;
```
Import from Google Fonts: Syne, DM Sans, JetBrains Mono  
Import Vazirmatn from: https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css

### Design Style
- **Theme:** Dark, tech-forward, premium
- **Feel:** Clean geometry + subtle neon glow + code aesthetics
- **Backgrounds:** Deep black with subtle grid pattern or floating particle effect
- **Cards:** Dark surface (#111) with thin pink or cyan border on hover, glow shadow
- **Buttons:** 
  - Primary: Pink (#E91E8C) with glow on hover
  - Secondary: Outline with cyan (#00BCD4)
- **Animations:** Smooth fade-ins, stagger reveal on scroll, typing effect in hero
- **Icons:** Lucide React or Heroicons

### RTL Support
- All Persian text sections use `dir="rtl"` and `text-align: right`
- Layout components adapt for RTL
- Use `font-family: 'Vazirmatn'` for all Persian text

---

## 4. Site Structure & Pages

```
/                   → Home
/services           → Services
/portfolio          → Portfolio / Work Samples
/order              → Order Wizard (multi-step form)
/contact            → Contact
/admin              → Admin Panel (Django or custom React)
```

---

## 5. Page-by-Page Specifications

---

### 5.1 Navbar
- Logo (Aramti SVG/PNG) on left
- Navigation links: خانه / خدمات / نمونه‌کارها / ثبت سفارش / تماس
- CTA button: «ثبت سفارش» in pink
- Sticky, blur-glass background on scroll (`backdrop-filter: blur`)
- Mobile: hamburger menu with slide-in drawer

---

### 5.2 Home Page `/`

#### Hero Section
- Large headline (Persian): **«ما کد می‌نویسیم، شما رشد می‌کنید»**
- Subheadline (Persian): «تیم متخصص آرمتی آماده‌ست پروژه شما رو از ایده تا اجرا ببره»
- Animated typing effect cycling through services:  
  `["طراحی سایت", "توسعه اپلیکیشن", "هوش مصنوعی", "اتوماسیون", "بات تلگرام"]`
- Two CTA buttons: «ثبت سفارش» (pink) | «نمونه‌کارها» (outline cyan)
- Background: dark with floating code snippets or subtle geometric grid animation

#### Stats Bar
Animated counters (count up on scroll into view):
- پروژه انجام‌شده: 0+ (placeholder, updateable)
- مشتری راضی: 0+
- سال تجربه: 1+
- متخصص فعال: 5+

#### Services Preview (6 cards)
Each card has icon + title + short description + «بیشتر بخوانید» link:
1. 🌐 طراحی سایت — فروشگاهی، شرکتی، خبری، وردپرس
2. 📱 اپلیکیشن موبایل — Flutter برای iOS و Android
3. 🤖 هوش مصنوعی — چت‌بات، تحلیل داده، اتوماسیون هوشمند
4. ⚙️ اتوماسیون — اسکریپت‌نویسی، بات تلگرام، زمان‌بندی کارها
5. 🔒 شبکه و امنیت — راه‌اندازی شبکه، تست نفوذ، امنیت سرور
6. 🖥️ بک‌اند — Django، Go، API طراحی، دیتابیس

Cards: dark surface, hover lifts with pink/cyan glow border

#### Portfolio Preview
Show 3 latest portfolio items (from database).  
Each: image + project name + tags + «مشاهده پروژه» button  
Link to full portfolio page.

#### Why Aramti? (3 columns)
- ✅ تیم متخصص و با تجربه
- ✅ پشتیبانی پس از تحویل
- ✅ قیمت مناسب و شفاف

#### CTA Banner
Full-width dark section:  
«آماده‌ای پروژه‌ات رو شروع کنی؟»  
Button: «همین حالا سفارش بده» → links to /order

#### Footer
- Logo + tagline
- Links: خدمات / نمونه‌کارها / تماس
- Social icons: Telegram, Instagram, LinkedIn, GitHub (links empty for now)
- Copyright: © 1403 آرمتی — تمامی حقوق محفوظ است

---

### 5.3 Services Page `/services`

Six detailed service sections, each with:
- Icon + title
- Full description (3-4 lines)
- Feature list (bullet points)
- Technologies used (badge chips): e.g. React, Django, Python
- «سفارش این خدمت» button → goes to /order with service pre-selected

**Services & their tech badges:**

1. **طراحی سایت**  
   React, Next.js, WordPress, TailwindCSS  
   انواع: فروشگاهی / شرکتی / خبری / شخصی / لندینگ

2. **اپلیکیشن موبایل**  
   Flutter, Dart  
   انواع: iOS / Android / Cross-platform

3. **هوش مصنوعی و یادگیری ماشین**  
   Python, TensorFlow, OpenAI API, LangChain  
   انواع: چت‌بات / تحلیل داده / پیشنهاد محصول

4. **اتوماسیون و اسکریپت‌نویسی**  
   Python, Telegram Bot API, n8n  
   انواع: بات تلگرام / اسکریپت خودکارسازی / زمان‌بند

5. **شبکه و امنیت**  
   Linux, Nginx, Firewall, VPN  
   انواع: راه‌اندازی شبکه / امنیت سرور / تست نفوذ

6. **بک‌اند و API**  
   Django, Go, PostgreSQL, REST API  
   انواع: طراحی API / مدیریت دیتابیس / سرویس‌های ابری

---

### 5.4 Portfolio Page `/portfolio`

#### Filter Bar
Filter buttons: همه | سایت | اپلیکیشن | هوش مصنوعی | بات | اتوماسیون  
Filtering is animated (fade/scale transition)

#### Portfolio Grid
Responsive grid (3 cols desktop, 2 tablet, 1 mobile)  
Each card:
- Project image (16:9)
- Project title
- Category badge (colored chip)
- Short description
- Tech stack tags
- «مشاهده جزئیات» button → modal or detail page

Data comes from Django API endpoint: `GET /api/portfolio/`

#### Portfolio Item Fields (Django Model)
```python
class PortfolioItem(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image = models.ImageField(upload_to='portfolio/')
    technologies = models.JSONField(default=list)  # ["React", "Django"]
    live_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)
```

---

### 5.5 Order Page `/order` — Multi-Step Wizard

This is the most important page. A clean multi-step form with progress bar.

#### Progress Bar
Shows steps: نوع خدمت ← جزئیات ← بودجه ← اطلاعات تماس ← تأیید

---

#### Step 1: نوع خدمت (Service Type)
Large clickable cards with icon + title:
- 🌐 طراحی سایت
- 📱 اپلیکیشن موبایل
- 🤖 هوش مصنوعی
- ⚙️ اتوماسیون / بات
- 🔒 شبکه و امنیت
- 🖥️ بک‌اند / API
- 📦 سایر

---

#### Step 2: جزئیات (Sub-type & Features)
**Dynamic based on Step 1 selection:**

If "طراحی سایت" selected:
- Sub-type (radio): فروشگاهی | شرکتی | خبری | شخصی | لندینگ‌پیج | وردپرس
- Features (checkboxes): 
  - درگاه پرداخت
  - پنل مدیریت محتوا
  - چندزبانه
  - بهینه‌سازی SEO
  - فرم‌های تماس
  - گالری تصاویر
  - وبلاگ
  - نقشه گوگل

If "اپلیکیشن موبایل" selected:
- Platform: iOS | Android | هر دو
- Features: لاگین کاربر | پرداخت درون‌برنامه | نوتیفیکیشن | آفلاین | چت

If "هوش مصنوعی" selected:
- Type: چت‌بات | تحلیل داده | پیشنهاددهنده | OCR | صوت به متن | سایر

If "اتوماسیون / بات" selected:
- Platform: تلگرام | واتس‌اپ | اینستاگرام | وب‌سایت | سیستم داخلی
- Features: پاسخ خودکار | مدیریت سفارش | گزارش‌گیری | اتصال به دیتابیس

---

#### Step 3: بودجه و زمان‌بندی
- Budget range (radio buttons):
  - زیر ۵ میلیون تومان
  - ۵ تا ۱۵ میلیون تومان
  - ۱۵ تا ۳۰ میلیون تومان
  - ۳۰ تا ۵۰ میلیون تومان
  - بیش از ۵۰ میلیون تومان
  - هنوز مطمئن نیستم
- Deadline (radio):
  - فوری (کمتر از ۲ هفته)
  - ۱ ماه
  - ۲ تا ۳ ماه
  - بدون محدودیت زمانی
- Extra notes textarea: «توضیحات بیشتر در مورد پروژه» (optional)
- File upload: «بارگذاری فایل یا مستندات» (optional, max 10MB)

---

#### Step 4: اطلاعات تماس
- نام و نام خانوادگی (required)
- شماره موبایل (required, Iranian format validation)
- آدرس ایمیل (optional)
- نام شرکت / سازمان (optional)
- How did you find us? (radio): اینستاگرام | تلگرام | گوگل | معرفی دوست | سایر

---

#### Step 5: تأیید نهایی
Summary card showing all selected options.  
Checkbox: «شرایط و قوانین را می‌پذیرم»  
Submit button: «ثبت سفارش» (pink, large)

**On submit:**
- POST to `/api/orders/` 
- Show success screen: «سفارش شما با موفقیت ثبت شد! کد پیگیری: #XXXX»
- Send confirmation email to customer (if email provided)
- Send notification to admin email

---

### 5.6 Contact Page `/contact`

- **Contact form:** نام / موبایل / ایمیل / موضوع / پیام → POST `/api/contact/`
- **Info cards:**
  - 📱 تلگرام: @AramtiDev (placeholder)
  - 📧 ایمیل: info@aramti.ir (placeholder)
  - 🕐 ساعات پاسخگویی: شنبه تا چهارشنبه، ۹ تا ۱۸
- Simple map embed (optional)

---

## 6. Django Backend

### Project Setup
```bash
django-admin startproject aramti_backend
cd aramti_backend
python manage.py startapp orders
python manage.py startapp portfolio
python manage.py startapp contact
```

### Required Packages
```
django
djangorestframework
django-cors-headers
Pillow
python-decouple
psycopg2-binary
```

### Apps & Models

#### orders/models.py
```python
class Order(models.Model):
    SERVICE_CHOICES = [
        ('website', 'طراحی سایت'),
        ('mobile', 'اپلیکیشن موبایل'),
        ('ai', 'هوش مصنوعی'),
        ('automation', 'اتوماسیون و بات'),
        ('network', 'شبکه و امنیت'),
        ('backend', 'بک‌اند و API'),
        ('other', 'سایر'),
    ]
    STATUS_CHOICES = [
        ('new', 'جدید'),
        ('reviewing', 'در حال بررسی'),
        ('in_progress', 'در حال انجام'),
        ('delivered', 'تحویل داده شده'),
        ('cancelled', 'لغو شده'),
    ]
    tracking_code = models.CharField(max_length=10, unique=True)
    service_type = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    sub_type = models.CharField(max_length=100, blank=True)
    features = models.JSONField(default=list)
    budget_range = models.CharField(max_length=100)
    deadline = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    attachment = models.FileField(upload_to='orders/', blank=True)
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    company = models.CharField(max_length=200, blank=True)
    referral = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.tracking_code:
            import random, string
            self.tracking_code = 'AR' + ''.join(random.choices(string.digits, k=6))
        super().save(*args, **kwargs)
```

#### portfolio/models.py
```python
class PortfolioItem(models.Model):
    CATEGORY_CHOICES = [
        ('website', 'سایت'),
        ('mobile', 'اپلیکیشن'),
        ('ai', 'هوش مصنوعی'),
        ('bot', 'بات'),
        ('automation', 'اتوماسیون'),
    ]
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image = models.ImageField(upload_to='portfolio/')
    technologies = models.JSONField(default=list)
    live_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
```

#### contact/models.py
```python
class ContactMessage(models.Model):
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
```

### API Endpoints
```
POST   /api/orders/           → Submit new order
GET    /api/orders/<tracking_code>/  → Check order status (public)
GET    /api/portfolio/         → List portfolio items
GET    /api/portfolio/?category=website  → Filter by category
POST   /api/contact/          → Submit contact message

# Admin endpoints (JWT auth required)
GET    /api/admin/orders/      → List all orders
PATCH  /api/admin/orders/<id>/ → Update order status
GET    /api/admin/contacts/    → List contact messages
```

### CORS Settings (settings.py)
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",   # Vite dev server
    "https://aramti.ir",       # Production domain
]
```

### Email Notification
After order submission, send email to admin:
- Subject: «سفارش جدید دریافت شد — کد پیگیری: #XXXX»
- Body: all order details
- Use Django's `send_mail` with SMTP settings in `.env`

---

## 7. React Frontend Structure

```
src/
├── assets/
│   └── logo.png
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ServiceCard.jsx
│   ├── PortfolioCard.jsx
│   └── AnimatedCounter.jsx
├── pages/
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── Portfolio.jsx
│   ├── Order.jsx
│   └── Contact.jsx
├── hooks/
│   └── useScrollAnimation.js
├── utils/
│   └── api.js           ← axios base config pointing to Django
├── styles/
│   └── globals.css      ← CSS variables, RTL base styles
├── App.jsx
└── main.jsx
```

### API utility (utils/api.js)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
```

---

## 8. Order Wizard — React State Structure

```javascript
const [orderData, setOrderData] = useState({
  // Step 1
  service_type: '',
  // Step 2
  sub_type: '',
  features: [],
  // Step 3
  budget_range: '',
  deadline: '',
  description: '',
  attachment: null,
  // Step 4
  full_name: '',
  phone: '',
  email: '',
  company: '',
  referral: '',
});
const [currentStep, setCurrentStep] = useState(1);
const [isSubmitting, setIsSubmitting] = useState(false);
const [trackingCode, setTrackingCode] = useState('');
```

---

## 9. Admin Panel

Use **Django Admin** (built-in) with customization:

```python
# orders/admin.py
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['tracking_code', 'full_name', 'service_type', 'status', 'created_at']
    list_filter = ['status', 'service_type', 'created_at']
    search_fields = ['full_name', 'phone', 'tracking_code']
    list_editable = ['status']
    readonly_fields = ['tracking_code', 'created_at']
```

Customize Django Admin theme using `django-jazzmin` package for better UI:
```bash
pip install django-jazzmin
```

---

## 10. Environment Variables

### Backend (.env)
```
SECRET_KEY=your-django-secret-key
DEBUG=True
DATABASE_URL=postgres://user:pass@localhost/aramti_db
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ADMIN_EMAIL=admin@aramti.ir
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

---

## 11. Development Setup Commands

### Backend
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install django djangorestframework django-cors-headers Pillow python-decouple psycopg2-binary django-jazzmin

# Setup
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
npm create vite@latest aramti-frontend -- --template react
cd aramti-frontend
npm install tailwindcss @tailwindcss/vite axios lucide-react
npm run dev
```

---

## 12. Animations & Micro-interactions

- **Hero typing effect:** use `useEffect` with `setInterval` to cycle through service names
- **Scroll reveal:** use `IntersectionObserver` for fade-in + slide-up on scroll
- **Counter animation:** count up from 0 when stats section enters viewport
- **Wizard step transitions:** slide left/right between steps with CSS transition
- **Card hover:** `transform: translateY(-4px)` + box-shadow glow
- **Navbar:** `backdrop-filter: blur(12px)` + `background: rgba(10,10,10,0.8)` on scroll
- **Button hover:** scale(1.03) + stronger glow

---

## 13. Responsive Breakpoints

```css
/* Mobile first */
/* sm: 640px — tablet portrait */
/* md: 768px — tablet landscape */
/* lg: 1024px — desktop */
/* xl: 1280px — wide desktop */
```

All sections must be fully responsive. 
Portfolio grid: 1 col mobile → 2 cols tablet → 3 cols desktop
Service cards: 1 col mobile → 2 cols tablet → 3 cols desktop

---

## 14. SEO & Performance

- React Helmet for `<title>` and `<meta>` tags per page
- Lazy load images with `loading="lazy"`
- Compress images before upload
- Persian page titles:
  - Home: «آرمتی | تکنولوژی‌های امن برای زندگی بی‌دغدغه»
  - Services: «خدمات آرمتی | طراحی سایت، اپ، هوش مصنوعی»
  - Order: «ثبت سفارش | آرمتی»

---

## 15. Initial Data (Seed)

Create a Django management command to seed initial data:
- 6 service entries
- 3 placeholder portfolio items (with placeholder images)

---

## 16. What to Build First (Priority Order)

```
Phase 1 — Core (build this first):
  1. Django project setup + all models + admin
  2. API endpoints (orders, portfolio, contact)
  3. React project setup + routing + Navbar + Footer
  4. Home page (hero + services preview + CTA)
  5. Order wizard (all 5 steps + submit)

Phase 2 — Content:
  6. Services page
  7. Portfolio page with filter
  8. Contact page
  9. Animations and scroll effects

Phase 3 — Polish:
  10. Email notifications
  11. Mobile responsive fixes
  12. SEO meta tags
  13. Loading states and error handling
```

---

## 17. Notes for Claude Code

- Always use Persian text for user-facing content (RTL)
- Component names and code in English
- All forms validate on frontend before API call
- Show loading spinner during API requests
- Show toast notifications for success/error (use react-hot-toast)
- Phone number validation: must start with 09 and be 11 digits
- All API errors should show user-friendly Persian messages
- Use `axios` for all API calls, not `fetch`
- TailwindCSS for all styling — no separate CSS files except globals.css for variables
- Install `react-hot-toast` for notifications
- Install `react-router-dom` for routing

---

*Document prepared for Aramti — Ready to pass to Claude Code*
