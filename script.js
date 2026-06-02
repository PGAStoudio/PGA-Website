document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Active Animation ---
    const updateIndicator = () => {
        const activeLink = document.querySelector('nav a.active');
        const indicator = document.querySelector('.nav-indicator');
        
        if (activeLink && indicator) {
            // حساب الأبعاد والمواقع بناءً على اتجاه الصفحة
            const isRTL = document.documentElement.dir === 'rtl';
            indicator.style.width = `${activeLink.offsetWidth}px`;
            indicator.style.left = `${activeLink.offsetLeft}px`;
        }
    };

    // تحديث المؤشر عند التحميل وتغيير حجم الشاشة
    updateIndicator();
    window.addEventListener('resize', updateIndicator);


    // --- 2. Theme Switcher ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // استرجاع الوضع المحفوظ
    if(localStorage.getItem('theme') === 'dark') {
        body.classList.replace('light-mode', 'dark-mode');
    }

    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
        }
    });


    // --- 3. Language Switcher (Localization) ---
    const langBtn = document.getElementById('lang-toggle');
    const storedLang = localStorage.getItem('selectedLang');
    let currentLang = storedLang || document.documentElement.lang || 'en';

    // تحميل/إزالة ملف الخط الخاص بالعربية ديناميكياً
    const arabicLinkId = 'arabic-fonts';
    const ensureArabicFont = (enable) => {
        if (enable) {
            if (!document.getElementById(arabicLinkId)) {
                const link = document.createElement('link');
                link.id = arabicLinkId;
                link.rel = 'stylesheet';
                link.href = 'fonts.css';
                document.head.appendChild(link);
            }
        } else {
            const existing = document.getElementById(arabicLinkId);
            if (existing) existing.remove();
        }
    };

    const setLanguage = (lang) => {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-en][data-ar]').forEach(el => {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        });
        ensureArabicFont(lang === 'ar');
        localStorage.setItem('selectedLang', lang);
        setTimeout(updateIndicator, 50);
    };

    setLanguage(currentLang);

    langBtn.addEventListener('click', () => {
        setLanguage(currentLang === 'en' ? 'ar' : 'en');
    });


    // --- 4. Bottom Sheet Modal ---
    const bottomSheet = document.getElementById('bottom-sheet');
    const closeSheet = document.getElementById('close-sheet');
    const clickableAssets = document.querySelectorAll('.clickable-asset');

    // فتح النافذة عند النقر على أي شعار أو صورة مخصصة
    clickableAssets.forEach(asset => {
        asset.addEventListener('click', () => {
            bottomSheet.classList.add('show');
        });
    });

    // إغلاق النافذة
    closeSheet.addEventListener('click', () => {
        bottomSheet.classList.remove('show');
    });

    // إغلاق النافذة عند النقر خارجها
    bottomSheet.addEventListener('click', (e) => {
        if (e.target === bottomSheet) {
            bottomSheet.classList.remove('show');
        }
    });
});