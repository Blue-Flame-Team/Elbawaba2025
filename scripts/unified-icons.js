// ملف جافاسكريبت موحد لوظائف الأيقونات في جميع النسخ (الموبايل والكمبيوتر)

document.addEventListener('DOMContentLoaded', function() {
    console.log('بدء تهيئة الأيقونات');
    
    // تهيئة أزرار البحث
    initializeSearchButtons();
    
    // تهيئة أزرار الموقع
    initializeLocationButtons();
    
    // تهيئة أزرار الاتصال
    initializeCallButtons();
    
    // تهيئة أزرار الإعدادات
    initializeSettingsButtons();
    
    // تهيئة قائمة الهامبرغر
    initializeHamburgerMenu();
    
    // تهيئة أزرار تغيير حجم الخط
    const zoomInButtons = document.querySelectorAll('.zoom-in-btn');
    const zoomOutButtons = document.querySelectorAll('.zoom-out-btn');
    
    // القيم الافتراضية
    let currentSize = parseInt(localStorage.getItem('fontSize')) || 100;
    
    // تطبيق الحجم المحفوظ
    if (currentSize !== 100) {
        document.body.style.zoom = currentSize + '%';
    }
    
    // زر التكبير
    zoomInButtons.forEach(btn => {
        // إزالة الـ onclick من HTML
        btn.removeAttribute('onclick');
        
        btn.addEventListener('click', function(e) {
            // منع السلوك الافتراضي للزر
            // e.preventDefault();
            // e.stopPropagation();
            
            if (currentSize < 150) {
                currentSize += 10;
                document.body.style.zoom = currentSize + '%';
                localStorage.setItem('fontSize', currentSize);
                console.log('تم تكبير النص: ' + currentSize + '%');
            }
        });
    });
    
    // زر التصغير
    zoomOutButtons.forEach(btn => {
        // إزالة الـ onclick من HTML
        btn.removeAttribute('onclick');
        
        btn.addEventListener('click', function(e) {
            // منع السلوك الافتراضي للزر
            e.preventDefault();
            e.stopPropagation();
            
            if (currentSize > 80) {
                currentSize -= 10;
                document.body.style.zoom = currentSize + '%';
                localStorage.setItem('fontSize', currentSize);
                console.log('تم تصغير النص: ' + currentSize + '%');
            }
        });
    });

    // زر الموقع
    const locationButtons = document.querySelectorAll('.location-btn');
    locationButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const contactSection = document.querySelector('#contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// تهيئة أزرار البحث
function initializeSearchButtons() {
    const searchButtons = document.querySelectorAll('.search-btn');
    searchButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const searchOverlay = document.querySelector('.search-overlay');
            if (searchOverlay) {
                searchOverlay.classList.add('show');
                const searchInput = searchOverlay.querySelector('input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    });
}

// تهيئة أزرار الموقع
function initializeLocationButtons() {
    const locationButtons = document.querySelectorAll('.icon-btn[onclick*="contact"]');
    locationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// تهيئة أزرار الاتصال
function initializeCallButtons() {
    const callButtons = document.querySelectorAll('.icon-btn:not(.search-btn):not([onclick]):not(.settings-toggle-btn):not(.profile-btn)');
    callButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = window.location.pathname.includes('/pages/') ? 
                                '../index.html#contact-section' : 
                                '#contact-section';
        });
    });
}

// تهيئة أزرار الإعدادات
function initializeSettingsButtons() {
    const settingsButtons = document.querySelectorAll('.settings-toggle-btn');
    const mainSettingsMenu = document.querySelector('.settings-menu');
    
    // إضافة مستمعي الأحداث لجميع الأزرار
    settingsButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // تحديد القائمة المناسبة
            const isMobile = btn.closest('.mobile-icons') !== null;
            let targetMenu;
            
            if (isMobile) {
                // الحفاظ على كود الموبايل كما هو
                targetMenu = document.querySelector('.mobile-settings-menu');
                if (!targetMenu && mainSettingsMenu) {
                    targetMenu = document.createElement('div');
                    targetMenu.className = 'mobile-settings-menu';
                    targetMenu.innerHTML = mainSettingsMenu.innerHTML;
                    document.body.appendChild(targetMenu);
                    initializeSettingsMenuListeners(targetMenu);
                }
            } else {
                // كود الكمبيوتر - بسيط وواضح
                targetMenu = this.nextElementSibling;
                if (targetMenu) {
                    initializeSettingsMenuListeners(targetMenu);
                }
            }
            
            if (targetMenu) {
                // إغلاق جميع القوائم الأخرى
                const allMenus = document.querySelectorAll('.settings-menu, .mobile-settings-menu');
                allMenus.forEach(menu => {
                    if (menu !== targetMenu) {
                        menu.classList.remove('show');
                        const submenu = menu.querySelector('.contrast-submenu');
                        if (submenu) submenu.classList.remove('show');
                    }
                });
                
                // إعادة تعيين حالة جميع الأزرار
                settingsButtons.forEach(button => button.classList.remove('active'));
                
                // تبديل حالة القائمة والزر الحالي
                targetMenu.classList.toggle('show');
                this.classList.toggle('active');
                
                // تحديد موضع القائمة المتنقلة للموبايل فقط
                if (isMobile) {
                    positionMobileMenu(targetMenu, this);
                }
            }
        });
    });
    
    // إغلاق القوائم عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.settings-toggle-btn') && !e.target.closest('.settings-menu') && !e.target.closest('.mobile-settings-menu')) {
            const allMenus = document.querySelectorAll('.settings-menu, .mobile-settings-menu');
            allMenus.forEach(menu => {
                menu.classList.remove('show');
                const submenu = menu.querySelector('.contrast-submenu');
                if (submenu) submenu.classList.remove('show');
            });
            
            settingsButtons.forEach(btn => btn.classList.remove('active'));
        }
    });
}
    
// تهيئة قائمة الهامبرغر
function initializeHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileSideMenu = document.querySelector('.mobile-side-menu');
    
    if (hamburgerMenu && mobileMenuOverlay && mobileSideMenu) {
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('show');
            mobileSideMenu.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });
        
        mobileMenuOverlay.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            this.classList.remove('show');
        mobileSideMenu.classList.remove('show');
            document.body.classList.remove('menu-open');
        });
    }
}

// تهيئة مستمعي الأحداث لقائمة الإعدادات
function initializeSettingsMenuListeners(menu) {
    if (!menu) return;

    // معالجة خيار التباين
    const contrastOption = menu.querySelector('.contrast-option');
    const contrastSubmenu = menu.querySelector('.contrast-submenu');
    
    if (contrastOption && contrastSubmenu) {
        contrastOption.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            contrastSubmenu.classList.toggle('show');
        });
    }
    
    // معالجة خيار التباين الفاتح
    const contrastLight = menu.querySelector('.contrast-light');
    if (contrastLight) {
        contrastLight.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            closeAllMenus();
        });
    }
    
    // معالجة خيار التباين الداكن
    const contrastDark = menu.querySelector('.contrast-dark');
    if (contrastDark) {
        contrastDark.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            closeAllMenus();
        });
    }
    
    // معالجة خيار الإحصائيات
    const statsOption = menu.querySelector('.stats-option');
    if (statsOption) {
        statsOption.addEventListener('click', function(e) {
            e.preventDefault();
            const isHomePage = window.location.pathname === '/' || 
                           window.location.pathname === '/index.html' || 
                           window.location.pathname.endsWith('/index.html') ||
                           window.location.pathname === '';
                           
            window.location.href = isHomePage ? 'pages/analytics.html' : '../pages/analytics.html';
        });
    }
    
    // معالجة خيار تسجيل الخروج
    const logoutOption = menu.querySelector('.logout-option');
    if (logoutOption) {
        logoutOption.addEventListener('click', function(e) {
            e.preventDefault();
            alert('تم تسجيل الخروج بنجاح');
            closeAllMenus();
        });
    }
}

// تحديد موضع قائمة الإعدادات المتنقلة
function positionMobileMenu(menu, button) {
    if (!menu || !button) return;
    
    const buttonRect = button.getBoundingClientRect();
    const menuWidth = 200; // عرض ثابت للقائمة
    
    // تعيين الموضع الأولي
    menu.style.position = 'fixed';
    menu.style.top = (buttonRect.bottom + window.scrollY + 5) + 'px';
    
    // معالجة تخطيط RTL - وضع القائمة مباشرة تحت الزر
    if (document.dir === 'rtl' || getComputedStyle(document.body).direction === 'rtl') {
        const rightPosition = window.innerWidth - buttonRect.right - (buttonRect.width / 2) + (menuWidth / 2);
        menu.style.right = rightPosition + 'px';
        menu.style.left = 'auto';
    } else {
        const leftPosition = buttonRect.left + (buttonRect.width / 2) - (menuWidth / 2);
        menu.style.left = leftPosition + 'px';
        menu.style.right = 'auto';
    }
    
    // تعديل الموضع إذا كانت القائمة ستخرج عن حدود الشاشة
    const menuRect = menu.getBoundingClientRect();
    
    // التحقق من التجاوز الرأسي
    if (menuRect.bottom > window.innerHeight) {
        menu.style.top = (buttonRect.top + window.scrollY - menuRect.height - 5) + 'px';
    }
    
    // التحقق من التجاوز الأفقي وتصحيحه
    if (menuRect.right > window.innerWidth) {
        const overflow = menuRect.right - window.innerWidth;
        if (document.dir === 'rtl') {
            menu.style.right = (parseFloat(menu.style.right) + overflow + 10) + 'px';
        } else {
            menu.style.left = (parseFloat(menu.style.left) - overflow - 10) + 'px';
        }
    } else if (menuRect.left < 0) {
        if (document.dir === 'rtl') {
            menu.style.right = (parseFloat(menu.style.right) + menuRect.left - 10) + 'px';
        } else {
            menu.style.left = '10px';
        }
    }
}

// إغلاق جميع القوائم
function closeAllMenus() {
    const allMenus = document.querySelectorAll('.settings-menu, .mobile-settings-menu');
    allMenus.forEach(menu => {
        menu.classList.remove('show');
        const submenu = menu.querySelector('.contrast-submenu');
        if (submenu) submenu.classList.remove('show');
    });
    
    const allButtons = document.querySelectorAll('.settings-toggle-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
}
