// ملف جافاسكريبت موحد لوظائف الأيقونات في جميع النسخ (الموبايل والكمبيوتر)

document.addEventListener('DOMContentLoaded', function() {
    console.log('تهيئة وظائف الأيقونات...');

    // ---- التهيئة الأساسية ----
    // تهيئة نافذة البحث إذا لم تكن موجودة
    let searchPopupOverlay = document.getElementById('searchPopupOverlay');
    if (!searchPopupOverlay) {
        initializeSearchPopup();
        searchPopupOverlay = document.getElementById('searchPopupOverlay');
    }
    
    // ---- وظائف أيقونة البحث ----
    // تحديد زر البحث في نسخة سطح المكتب - استهداف مباشر
    const desktopSearchBtn = document.querySelector('.main-icons-group .icon-btn.search-btn, .main-icons-group .icon-btn:nth-child(1)');
    if (desktopSearchBtn) {
        console.log('تم العثور على زر البحث في نسخة سطح المكتب');
        desktopSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (searchPopupOverlay) {
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    const searchPopup = document.querySelector('.search-popup');
                    if (searchPopup) {
                        searchPopup.classList.add('active');
                        const searchInput = document.querySelector('.search-popup-input');
                        if (searchInput) searchInput.focus();
                    }
                }, 10);
            }
        });
    }
    
    // تحديد جميع أزرار البحث الأخرى (للموبايل والكمبيوتر)
    const allSearchButtons = document.querySelectorAll('.search-btn, .icon-btn img[src*="search.png"]');
    console.log('تم العثور على أزرار البحث:', allSearchButtons.length);
    
    // إضافة مستمع الحدث لجميع أزرار البحث
    allSearchButtons.forEach(function(searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchPopupOverlay = document.getElementById('searchPopupOverlay');
            if (searchPopupOverlay) {
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    const searchPopup = document.querySelector('.search-popup');
                    if (searchPopup) {
                        searchPopup.classList.add('active');
                        const searchInput = document.querySelector('.search-popup-input');
                        if (searchInput) searchInput.focus();
                    }
                }, 10);
            }
        });
    });
    
    // ---- وظائف أيقونة الإعدادات ----
    const settingsBtn = document.querySelector('.settings-toggle-btn');
    const settingsMenu = document.querySelector('.settings-menu');
    
    if (settingsBtn && settingsMenu) {
        console.log('تم العثور على عناصر القائمة');
        
        // تهيئة حالة التباين المحفوظة
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.documentElement.style.setProperty('--primary-color', '#000000');
            document.documentElement.style.setProperty('--secondary-color', '#000000');
        }
        
        // معالج النقر على زر الإعدادات
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('تم النقر على زر الإعدادات');
            
            // تحديد موضع الزر
            const btnRect = settingsBtn.getBoundingClientRect();
            console.log('موضع الزر:', btnRect);
            
            // تبديل حالة العرض
            const isVisible = settingsMenu.classList.contains('show');
            
            if (!isVisible) {
                // إظهار القائمة
                settingsMenu.style.cssText = `
                    position: fixed !important;
                    top: ${btnRect.bottom}px !important;
                    right: ${btnRect.left}px !important;
                    width: 200px !important;
                    background: #fff !important;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    z-index: 99999 !important;
                    border-radius: 8px !important;
                    padding: 10px !important;
                `;
                settingsMenu.classList.add('show');
            } else {
                // إخفاء القائمة
                settingsMenu.style.cssText = '';
                settingsMenu.classList.remove('show');
            }
            
            console.log('حالة القائمة بعد التحديث:', {
                classes: settingsMenu.className,
                cssText: settingsMenu.style.cssText,
                computedDisplay: getComputedStyle(settingsMenu).display,
                computedVisibility: getComputedStyle(settingsMenu).visibility,
                computedOpacity: getComputedStyle(settingsMenu).opacity
            });
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
                settingsMenu.style.cssText = '';
                settingsMenu.classList.remove('show');
                
                // إغلاق القائمة الفرعية للتباين
                const contrastSubmenu = settingsMenu.querySelector('.contrast-submenu');
                if (contrastSubmenu) {
                    contrastSubmenu.classList.remove('show');
                }
            }
        });
        
        // تهيئة أحداث القائمة
        initializeSettingsMenuListeners(settingsMenu);
    }
    
    // ---- وظائف زر الهامبرغر ----
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileSideMenu = document.querySelector('.mobile-side-menu');
    
    if (hamburgerMenu && mobileMenuOverlay && mobileSideMenu) {
        // فتح/إغلاق القائمة الجانبية
        hamburgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenuOverlay.classList.add('show');
            mobileSideMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        // إغلاق القائمة الجانبية عند النقر خارجها
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });
        
        // روابط القائمة الجانبية
        const sideMenuLinks = document.querySelectorAll('.mobile-side-menu-links a:not(.has-dropdown)');
        sideMenuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                setTimeout(closeMenu, 100);
            });
        });
        
        // القوائم المنسدلة
        const dropdownLinks = document.querySelectorAll('.mobile-side-menu-links a.has-dropdown');
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('open');
            });
        });
    }
    
    // ---- الدوال المساعدة ----
    // دالة إغلاق القائمة الجانبية
    function closeMenu() {
        mobileMenuOverlay.classList.remove('show');
        mobileSideMenu.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // دالة تهيئة نافذة البحث المنبثقة
    function initializeSearchPopup() {
        // إنشاء غلاف النافذة المنبثقة
        searchPopupOverlay = document.createElement('div');
        searchPopupOverlay.id = 'searchPopupOverlay';
        searchPopupOverlay.className = 'search-popup-overlay';
        
        // إنشاء حاوية النافذة المنبثقة
        const searchPopup = document.createElement('div');
        searchPopup.className = 'search-popup';
        
        // إنشاء حاوية للأزرار
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'search-buttons-container';
        searchPopup.appendChild(buttonsContainer);
        
        // إنشاء حقل الإدخال
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-popup-input';
        searchInput.placeholder = 'ابحث في الاحكام و الانظمه ...';
        searchPopup.appendChild(searchInput);
        
        // إضافة النافذة المنبثقة إلى الغلاف
        searchPopupOverlay.appendChild(searchPopup);
        
        // إضافة الغلاف إلى الجسم
        document.body.appendChild(searchPopupOverlay);
        
        // إنشاء زر البحث (الأخضر)
        const searchButton = document.createElement('button');
        searchButton.className = 'search-popup-button search';
        searchButton.textContent = 'بحث';
        buttonsContainer.appendChild(searchButton);
        
        // إنشاء زر محرك البحث (البرتقالي)
        const engineBtn = document.createElement('button');
        engineBtn.className = 'search-popup-button engine';
        engineBtn.textContent = 'محرك البحث';
        buttonsContainer.appendChild(engineBtn);
        
        // إضافة مستمعات الأحداث
        // إغلاق النافذة المنبثقة عند النقر على الغلاف
        searchPopupOverlay.addEventListener('click', function(e) {
            if (e.target === searchPopupOverlay) {
                closeSearchPopup();
            }
        });
        
        // معالجة نموذج البحث
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        // معالجة زر محرك البحث
        engineBtn.addEventListener('click', function() {
            if (window.location.pathname.includes('/pages/')) {
                window.location.href = '../pages/general-search-engine.html';
            } else {
                window.location.href = './pages/general-search-engine.html';
            }
        });
        
        // معالجة مفتاح Enter في حقل الإدخال
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // دالة إغلاق نافذة البحث المنبثقة
    function closeSearchPopup() {
        const searchPopup = document.querySelector('.search-popup');
        if (searchPopup) {
            searchPopup.classList.remove('active');
            setTimeout(() => {
                if (searchPopupOverlay) searchPopupOverlay.style.display = 'none';
            }, 300);
        }
    }
    
    // دالة البحث
    function performSearch() {
        const searchInput = document.querySelector('.search-popup-input');
        if (searchInput) {
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                console.log('إجراء البحث عن:', searchQuery);
                // تنفيذ وظيفة البحث الفعلية هنا
                // حالياً، نقوم فقط بإغلاق النافذة المنبثقة
                closeSearchPopup();
            }
        }
    }
});

// تهيئة قائمة الإعدادات الموحدة
document.addEventListener('DOMContentLoaded', function() {
    // تحديد جميع أزرار الإعدادات
    const settingsButtons = document.querySelectorAll('.settings-toggle-btn');
    
    settingsButtons.forEach(function(settingsBtn) {
        // البحث عن القائمة الأقرب
        let settingsMenu = settingsBtn.closest('.main-icons-group, .mobile-icons')?.querySelector('.settings-menu');
        
        if (!settingsMenu) {
            // إذا لم نجد قائمة، نستخدم أول قائمة موجودة في الصفحة
            settingsMenu = document.querySelector('.settings-menu');
        }
        
        if (settingsBtn && settingsMenu) {
            // نسخ القائمة الأصلية
            const clonedMenu = settingsMenu.cloneNode(true);
            clonedMenu.classList.add('settings-menu');
            document.body.appendChild(clonedMenu);
            
            // تهيئة الأحداث للقائمة
            initializeSettingsMenuListeners(clonedMenu);
            
            // فتح/إغلاق القائمة عند النقر على الزر
            settingsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // إغلاق جميع القوائم الأخرى
                document.querySelectorAll('.settings-menu').forEach(menu => {
                    if (menu !== clonedMenu) {
                        menu.classList.remove('show');
                    }
                });
                
                // تحديد موقع القائمة
                const buttonRect = settingsBtn.getBoundingClientRect();
                clonedMenu.style.top = (buttonRect.bottom + window.scrollY + 5) + 'px';
                clonedMenu.style.right = (window.innerWidth - buttonRect.right) + 'px';
                
                // عرض/إخفاء القائمة
                clonedMenu.classList.toggle('show');
                
                // إغلاق القائمة الفرعية للتباين
                const contrastSubmenu = clonedMenu.querySelector('.contrast-submenu');
                if (contrastSubmenu) {
                    contrastSubmenu.classList.remove('show');
                }
            });
        }
    });
    
    // إغلاق القوائم عند النقر خارجها
    document.addEventListener('click', function(e) {
        const settingsMenus = document.querySelectorAll('.settings-menu');
        const settingsButtons = document.querySelectorAll('.settings-toggle-btn');
        
        let clickedOnMenuOrButton = false;
        
        // التحقق من النقر على زر أو قائمة
        settingsButtons.forEach(button => {
            if (button.contains(e.target)) {
                clickedOnMenuOrButton = true;
            }
        });
        
        settingsMenus.forEach(menu => {
            if (menu.contains(e.target)) {
                clickedOnMenuOrButton = true;
            } else if (!clickedOnMenuOrButton) {
                menu.classList.remove('show');
            }
        });
    });
});

// دالة تهيئة أحداث القائمة
function initializeSettingsMenuListeners(menu) {
    // التباين
    const contrastOption = menu.querySelector('.contrast-option');
    const contrastSubmenu = menu.querySelector('.contrast-submenu');
    
    if (contrastOption && contrastSubmenu) {
        contrastOption.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            contrastSubmenu.classList.toggle('show');
        });
    }
    
    // التباين الفاتح
    const contrastLight = menu.querySelector('.contrast-light');
    if (contrastLight) {
        contrastLight.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            document.documentElement.style.setProperty('--primary-color', '#17a891');
            document.documentElement.style.setProperty('--secondary-color', '#24516c');
            menu.classList.remove('show');
            contrastSubmenu?.classList.remove('show');
        });
    }
    
    // التباين الداكن
    const contrastDark = menu.querySelector('.contrast-dark');
    if (contrastDark) {
        contrastDark.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            document.documentElement.style.setProperty('--primary-color', '#000000');
            document.documentElement.style.setProperty('--secondary-color', '#000000');
            menu.classList.remove('show');
            contrastSubmenu?.classList.remove('show');
        });
    }
    
    // الإحصائيات
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
    
    // تسجيل الخروج
    const logoutOption = menu.querySelector('.logout-option');
    if (logoutOption) {
        logoutOption.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('isLoggedIn');
                alert('تم تسجيل الخروج بنجاح');
                menu.classList.remove('show');
                setTimeout(() => window.location.reload(), 500);
            }
        });
    }
}
