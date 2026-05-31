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
    let currentLang = 'en'; // الافتراضي

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        // تحديث جميع النصوص التي تحتوي على data-ar و data-en
        const translatableElements = document.querySelectorAll('[data-en][data-ar]');
        translatableElements.forEach(el => {
            el.innerHTML = el.getAttribute(`data-${currentLang}`);
        });

        // تحديث مؤشر الـ Navbar بعد تغيير اتجاه الصفحة
        setTimeout(updateIndicator, 50); 
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