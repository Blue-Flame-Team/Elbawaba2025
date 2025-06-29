// Unified Settings Menu Functionality

document.addEventListener('DOMContentLoaded', function() {
    // تحديد العناصر الرئيسية
    const settingsBtn = document.querySelector('.settings-toggle-btn');
    const settingsMenu = document.querySelector('.settings-menu');
    const contrastOption = document.querySelector('.contrast-option');
    const contrastSubmenu = document.querySelector('.contrast-submenu');
    const contrastDark = document.querySelector('.contrast-dark');
    const contrastLight = document.querySelector('.contrast-light');

    // التحقق من وجود العناصر
    if (settingsBtn && settingsMenu) {
        console.log('تم العثور على عناصر القائمة');

        // تهيئة حالة التباين المحفوظة
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            applyDarkContrast();
        }

        // معالج النقر على زر الإعدادات
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('تم النقر على زر الإعدادات');
            
            // تبديل عرض القائمة
            settingsMenu.classList.toggle('show');
            
            // تحديث موضع القائمة في نسخة الموبايل
            if (window.innerWidth <= 768) {
                const btnRect = settingsBtn.getBoundingClientRect();
                console.log('موضع الزر:', btnRect);
                
                settingsMenu.style.position = 'fixed';
                settingsMenu.style.top = (btnRect.bottom + window.scrollY) + 'px';
                settingsMenu.style.right = '10px';
                settingsMenu.style.left = 'auto';
                settingsMenu.style.transform = 'none';
                settingsMenu.style.zIndex = '9999';
            }
        });

        // معالج النقر على خيار التباين
        if (contrastOption && contrastSubmenu) {
            contrastOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('تم النقر على خيار التباين');
                contrastSubmenu.classList.toggle('show');
            });
        }

        // معالج النقر على خيار التباين الداكن
        if (contrastDark) {
            contrastDark.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('تم النقر على التباين الداكن');
                applyDarkContrast();
                closeMenus();
            });
        }

        // معالج النقر على خيار التباين الفاتح
        if (contrastLight) {
            contrastLight.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('تم النقر على التباين الفاتح');
                removeDarkContrast();
                closeMenus();
            });
        }

        // إغلاق القوائم عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!settingsMenu.contains(e.target) && !settingsBtn.contains(e.target)) {
                closeMenus();
            }
        });
    }

    // دالة تطبيق التباين الداكن
    function applyDarkContrast() {
        console.log('جاري تطبيق التباين الداكن');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        
        // تطبيق الفلتر على جميع الصور
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.setProperty('filter', 'brightness(0)', 'important');
            img.style.setProperty('-webkit-filter', 'brightness(0)', 'important');
        });

        // تطبيق الخلفية السوداء على الأزرار
        const buttons = document.querySelectorAll('.hover-overlay a, .btn-primary');
        buttons.forEach(btn => {
            btn.style.setProperty('background-color', '#000000', 'important');
            btn.style.setProperty('color', '#ffffff', 'important');
        });

        // تحديث متغيرات CSS
        document.documentElement.style.setProperty('--primary-color', '#000000', 'important');
        document.documentElement.style.setProperty('--secondary-color', '#000000', 'important');
    }

    // دالة إزالة التباين الداكن
    function removeDarkContrast() {
        console.log('جاري إزالة التباين الداكن');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        
        // إزالة الفلتر من جميع الصور
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.removeProperty('filter');
            img.style.removeProperty('-webkit-filter');
        });

        // إعادة الألوان الأصلية للأزرار
        const buttons = document.querySelectorAll('.hover-overlay a, .btn-primary');
        buttons.forEach(btn => {
            btn.style.removeProperty('background-color');
            btn.style.removeProperty('color');
        });

        // إعادة متغيرات CSS الأصلية
        document.documentElement.style.setProperty('--primary-color', '#17a891', 'important');
        document.documentElement.style.setProperty('--secondary-color', '#24516c', 'important');
    }

    // دالة إغلاق القوائم
    function closeMenus() {
        if (settingsMenu) {
            settingsMenu.classList.remove('show');
        }
        if (contrastSubmenu) {
            contrastSubmenu.classList.remove('show');
        }
    }
}); 