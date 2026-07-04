import { createContext, useContext, useState } from 'react'

const CONTENT = {
  fa: {
    dir: 'rtl',
    navLinks: ['خدمات', 'نمونه‌کارها', 'ثبت سفارش', 'تماس'],
    navCta: 'ثبت سفارش رایگان',
    heroStatus: 'سیستم آنلاین — آماده پروژه شما',
    heroLine1: 'ما کد می‌نویسیم',
    heroLine2: 'شما رشد می‌کنید',
    heroDesc: 'تیم متخصص آرمتی آماده‌ست پروژه شما رو از ایده تا اجرا ببره — با تکنولوژی‌های روز دنیا',
    heroBtn1: 'ثبت سفارش رایگان ←',
    heroBtn2: 'نمونه‌کارها',
    statLabels: ['پروژه انجام‌شده', 'مشتری راضی', 'متخصص فعال', 'رضایت مشتری'],
    sectionTags: ['خدمات ما', 'نمونه‌کارها', 'ثبت سفارش', 'تماس با ما'],
    sectionTitles: [
      <>هر چیزی که برای <span className="grad-text">دیجیتال شدن</span> نیاز داری</>,
      <><span className="grad-text">نمونه‌ای</span> از کارهای ما</>,
      <>پروژه‌ات رو <span className="grad-text">شروع کن</span></>,
      <>باهامون <span className="grad-text">در تماس باش</span></>,
    ],
    words: ['طراحی سایت', 'توسعه اپلیکیشن', 'هوش مصنوعی', 'اتوماسیون', 'بات تلگرام', 'شبکه و امنیت'],
    services: [
      { icon: '🌐', title: 'طراحی سایت', desc: 'فروشگاهی، شرکتی، خبری و وردپرس با بهترین تکنولوژی‌های روز', tags: ['React', 'Next.js', 'WordPress'] },
      { icon: '📱', title: 'اپلیکیشن موبایل', desc: 'Flutter برای iOS و Android — یک کد، دو پلتفرم، عملکرد بی‌نظیر', tags: ['Flutter', 'Dart', 'iOS/Android'] },
      { icon: '🤖', title: 'هوش مصنوعی', desc: 'چت‌بات هوشمند، تحلیل داده، اتوماسیون با AI برای کسب‌وکارت', tags: ['Python', 'OpenAI', 'LangChain'] },
      { icon: '⚡', title: 'اتوماسیون و بات', desc: 'ربات تلگرام و اسکریپت‌های خودکارسازی برای صرفه‌جویی در زمان', tags: ['Python', 'Telegram API', 'n8n'] },
      { icon: '🔒', title: 'شبکه و امنیت', desc: 'راه‌اندازی شبکه، امنیت سرور و تست نفوذ حرفه‌ای', tags: ['Linux', 'Nginx', 'VPN'] },
      { icon: '🖥️', title: 'بک‌اند و API', desc: 'Django، Go و طراحی دیتابیس حرفه‌ای برای پروژه‌های بزرگ', tags: ['Django', 'Go', 'PostgreSQL'] },
    ],
    filterBtns: ['همه', 'سایت', 'اپلیکیشن', 'هوش مصنوعی', 'بات'],
    portfolio: [
      { icon: '🛒', cat: 'سایت فروشگاهی', title: 'فروشگاه آنلاین نمونه', tags: ['React', 'Django', 'PostgreSQL'] },
      { icon: '📱', cat: 'اپلیکیشن موبایل', title: 'اپ سفارش‌گیری', tags: ['Flutter', 'Firebase'] },
      { icon: '🤖', cat: 'هوش مصنوعی', title: 'چت‌بات پشتیبانی', tags: ['Python', 'OpenAI', 'FastAPI'] },
    ],
    wizardTitle: 'نوع خدمت مورد نیاز رو انتخاب کن',
    wizardSteps: ['نوع خدمت', 'جزئیات', 'بودجه', 'تماس', 'تأیید'],
    stypes: ['🌐 طراحی سایت', '📱 اپلیکیشن', '🤖 هوش مصنوعی', '⚡ اتوماسیون', '🔒 شبکه/امنیت', '🖥️ بک‌اند', '📦 سایر'],
    budgets: ['زیر ۵ میلیون', '۵ تا ۱۵ میلیون', '۱۵ تا ۳۰ میلیون', '۳۰ تا ۵۰ میلیون', 'بیش از ۵۰ میلیون', 'مطمئن نیستم'],
    descLabel: 'توضیحات پروژه',
    descPlaceholder: 'پروژه‌ات رو کوتاه توضیح بده...',
    nameLabel: 'نام و نام خانوادگی', namePlaceholder: 'نام شما',
    phoneLabel: 'شماره موبایل', phonePlaceholder: '09xxxxxxxxx',
    emailLabel: 'ایمیل (اختیاری)', emailPlaceholder: 'email@example.com',
    confirmTitle: 'آماده ثبت سفارش!',
    confirmDesc: 'اطلاعات شما دریافت شد. با کلیک روی ثبت سفارش، تیم ما در اسرع وقت باهاتون تماس میگیره.',
    successTitle: 'سفارش ثبت شد!',
    successDesc: 'کد پیگیری شما:',
    prev: '← قبلی', next: 'بعدی ←', submit: 'ثبت سفارش ✓',
    sendMsg: 'ارسال پیام',
    msgLabel: 'پیام', msgPlaceholder: 'پیام شما...',
    subjectLabel: 'موضوع', subjectPlaceholder: 'موضوع پیام',
    contactItems: [
      { icon: '📱', label: 'تلگرام', val: '@AramtiDev' },
      { icon: '📧', label: 'ایمیل', val: 'info@aramti.ir' },
      { icon: '🕐', label: 'ساعات پاسخگویی', val: 'شنبه تا چهارشنبه، ۹ تا ۱۸' },
    ],
    ctaTitle: 'آماده‌ای پروژه‌ات رو شروع کنی؟',
    ctaDesc: 'همین حالا سفارشت رو ثبت کن — تیم آرمتی در کمترین زمان باهات تماس میگیره',
    ctaBtn: 'ثبت سفارش رایگان ←',
    footerCopy: '© ۱۴۰۴ آرمتی — تمامی حقوق محفوظ است',
    logoSub: 'SECURE TECH',
  },
  en: {
    dir: 'ltr',
    navLinks: ['Services', 'Portfolio', 'Order', 'Contact'],
    navCta: 'Get Started Free',
    heroStatus: 'System Online — Ready for Your Project',
    heroLine1: 'We Write Code,',
    heroLine2: 'You Scale Up.',
    heroDesc: "Aramti's expert team takes your project from idea to launch with cutting-edge technology",
    heroBtn1: 'Get Started Free →',
    heroBtn2: 'Our Work',
    statLabels: ['Projects Done', 'Happy Clients', 'Active Experts', 'Satisfaction'],
    sectionTags: ['Our Services', 'Portfolio', 'Place Order', 'Contact Us'],
    sectionTitles: [
      <>Everything you need to <span className="grad-text">go digital</span></>,
      <>Some of <span className="grad-text">our work</span></>,
      <><span className="grad-text">Start</span> your project</>,
      <>Get in <span className="grad-text">touch</span></>,
    ],
    words: ['Web Design', 'Mobile Apps', 'Artificial Intelligence', 'Automation', 'Telegram Bots', 'Security'],
    services: [
      { icon: '🌐', title: 'Web Design', desc: 'E-commerce, corporate, news & WordPress with the best technologies', tags: ['React', 'Next.js', 'WordPress'] },
      { icon: '📱', title: 'Mobile App', desc: 'Flutter for iOS & Android — one codebase, two platforms', tags: ['Flutter', 'Dart', 'iOS/Android'] },
      { icon: '🤖', title: 'AI & Machine Learning', desc: 'Smart chatbots, data analysis, AI automation for your business', tags: ['Python', 'OpenAI', 'LangChain'] },
      { icon: '⚡', title: 'Automation & Bots', desc: 'Telegram bots & automation scripts to save your time', tags: ['Python', 'Telegram API', 'n8n'] },
      { icon: '🔒', title: 'Network & Security', desc: 'Network setup, server security and professional penetration testing', tags: ['Linux', 'Nginx', 'VPN'] },
      { icon: '🖥️', title: 'Backend & API', desc: 'Django, Go and professional database design for large projects', tags: ['Django', 'Go', 'PostgreSQL'] },
    ],
    filterBtns: ['All', 'Website', 'App', 'AI', 'Bot'],
    portfolio: [
      { icon: '🛒', cat: 'E-commerce Website', title: 'Sample Online Store', tags: ['React', 'Django', 'PostgreSQL'] },
      { icon: '📱', cat: 'Mobile App', title: 'Order Management App', tags: ['Flutter', 'Firebase'] },
      { icon: '🤖', cat: 'Artificial Intelligence', title: 'Support Chatbot', tags: ['Python', 'OpenAI', 'FastAPI'] },
    ],
    wizardTitle: 'Select the service type you need',
    wizardSteps: ['Service', 'Details', 'Budget', 'Contact', 'Confirm'],
    stypes: ['🌐 Web Design', '📱 Mobile App', '🤖 AI', '⚡ Automation', '🔒 Network', '🖥️ Backend', '📦 Other'],
    budgets: ['Under $150', '$150–$500', '$500–$1000', '$1000–$2000', 'Over $2000', 'Not Sure'],
    descLabel: 'Project Description',
    descPlaceholder: 'Briefly describe your project...',
    nameLabel: 'Full Name', namePlaceholder: 'Your name',
    phoneLabel: 'Mobile Number', phonePlaceholder: '09xxxxxxxxx',
    emailLabel: 'Email (optional)', emailPlaceholder: 'email@example.com',
    confirmTitle: 'Ready to submit!',
    confirmDesc: 'Your info is ready. Click submit and our team will contact you shortly.',
    successTitle: 'Order Placed!',
    successDesc: 'Your tracking code:',
    prev: '← Prev', next: 'Next →', submit: 'Submit Order ✓',
    sendMsg: 'Send Message',
    msgLabel: 'Message', msgPlaceholder: 'Your message...',
    subjectLabel: 'Subject', subjectPlaceholder: 'Message subject',
    contactItems: [
      { icon: '📱', label: 'Telegram', val: '@AramtiDev' },
      { icon: '📧', label: 'Email', val: 'info@aramti.ir' },
      { icon: '🕐', label: 'Working Hours', val: 'Sat to Wed, 9AM–6PM' },
    ],
    ctaTitle: 'Ready to start your project?',
    ctaDesc: 'Place your order now — the Aramti team will contact you as soon as possible',
    ctaBtn: 'Get Started Free →',
    footerCopy: '© 2025 Aramti — All rights reserved',
    logoSub: 'SECURE TECH',
  }
}

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('fa')
  const c = CONTENT[lang]

  const toggleLang = (l) => {
    setLang(l)
    document.documentElement.dir = CONTENT[l].dir
    document.documentElement.lang = l
    document.body.className = l
  }

  return (
    <LangContext.Provider value={{ lang, toggleLang, c }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)