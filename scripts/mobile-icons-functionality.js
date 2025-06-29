// Icons Functionality for both Mobile and Desktop devices
document.addEventListener('DOMContentLoaded', function() {
    // ---- وظائف الموبايل ----
    // Fix for the search button in mobile
    const mobileSearchBtn = document.querySelector('.logo .mobile-icons .search-btn');
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchPopupOverlay = document.getElementById('searchPopupOverlay');
            if (searchPopupOverlay) {
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    document.querySelector('.search-popup').classList.add('active');
                    document.querySelector('.search-popup-input').focus();
                }, 10);
            } else {
                // If search popup doesn't exist yet, initialize it
                initializeSearchPopup();
            }
        });
    }
    
    // ---- وظائف سطح المكتب ----
    // Add support for desktop search button
    const desktopSearchBtn = document.querySelector('.main-icons-group .icon-btn:nth-child(1)');
    if (desktopSearchBtn) {
        desktopSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchPopupOverlay = document.getElementById('searchPopupOverlay');
            if (searchPopupOverlay) {
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    document.querySelector('.search-popup').classList.add('active');
                    document.querySelector('.search-popup-input').focus();
                }, 10);
            } else {
                // If search popup doesn't exist yet, initialize it
                initializeSearchPopup();
            }
        });
    }
    
    // Add support for desktop settings button
    const desktopSettingsBtn = document.querySelector('.main-icons-group .icon-btn:nth-child(4)');
    const desktopSettingsMenu = document.querySelector('.main-icons-group .settings-menu');
    
    if (desktopSettingsBtn && desktopSettingsMenu) {
        // Initialize event listeners for desktop settings menu
        initializeSettingsMenuListeners(desktopSettingsMenu);
        
        desktopSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            desktopSettingsMenu.classList.toggle('show');
            
            // Close contrast submenu if open
            const contrastSubmenu = desktopSettingsMenu.querySelector('.contrast-submenu');
            if (contrastSubmenu) {
                contrastSubmenu.classList.remove('show');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!desktopSettingsBtn.contains(e.target) && !desktopSettingsMenu.contains(e.target)) {
                desktopSettingsMenu.classList.remove('show');
            }
        });
    }
    
    // ---- وظائف الزوم لتكبير وتصغير النصوص ----
    console.log('تهيئة وظائف الزوم...');
    
    // تهيئة المتغيرات والقيم الافتراضية
    let textSize = 100;
    const minSize = 70;
    const maxSize = 200;
    const sizeStep = 10;
    
    // استرجاع الحجم المحفوظ من التخزين المحلي
    if (localStorage.getItem('textSize')) {
        textSize = parseInt(localStorage.getItem('textSize'));
        setTextSize(textSize);
    }
    
    // وظيفة لتعيين حجم النص
    function setTextSize(size) {
        textSize = size;
        localStorage.setItem('textSize', size);
        
        // تعيين قيمة متغير CSS للاستخدام في التنسيقات
        document.documentElement.style.setProperty('--text-size', size + '%');
        
        // إضافة سمة data-font-size إلى عنصر body لتطبيق التنسيقات بشكل أفضل
        document.body.setAttribute('data-font-size', size);
        
        // إنشاء أو تحديث عنصر النمط
        let styleElement = document.getElementById('text-size-style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'text-size-style';
            document.head.appendChild(styleElement);
        }
        
        // إضافة قواعد CSS محسنة لتحجيم جميع النصوص بشكل متناسق
        styleElement.textContent = `
            body {
                font-size: ${size}% !important;
            }
            
            /* تطبيق حجم الخط على العناصر المختلفة مع مراعاة التناسب */
            p, span, a, li, td, th, input, button, label, div, h1, h2, h3, h4, h5, h6 {
                font-size: inherit;
            }
            
            /* تحسين القراءة للنصوص الكبيرة */
            body[data-font-size="${size}"] p, 
            body[data-font-size="${size}"] .card-desc {
                line-height: 1.5;
            }
        `;
        
        // إضافة تأثير بصري لتنبيه المستخدم بالتغيير
        addVisualFeedback();

        console.log('تم تغيير حجم النص إلى:', size + '%');
    }
    
    // إضافة تأثير بصري عند تغيير حجم الخط
    function addVisualFeedback() {
        // إضافة فئة للإشارة إلى أن حجم الخط قد تغير
        document.body.classList.add('font-size-changed');
        
        // إزالة الفئة بعد انتهاء التأثير
        setTimeout(function() {
            document.body.classList.remove('font-size-changed');
        }, 300);
    }
    
    // للعثور على أزرار الزوم
    console.log('تفقد أزرار التكبير والتصغير...');
    const zoomInBtns = document.querySelectorAll('.zoom-in-btn');
    const zoomOutBtns = document.querySelectorAll('.zoom-out-btn');
    
    // إذا كانت وظيفة changeFontSize موجودة بالفعل (معرفة في النافذة)
    if (typeof window.changeFontSize === 'function') {
        console.log('تم العثور على وظيفة changeFontSize، سيتم استخدامها بدلاً من الوظيفة الداخلية');
        
        // لا نقوم بأي إجراء هنا لأن الأزرار تم تعيينها مع وظيفة onclick
    } else {
        console.log('لم يتم العثور على وظيفة changeFontSize، سيتم استخدام الوظيفة الداخلية');
        
        // تعريف وظيفة تغيير حجم الخط للنافذة
        window.changeFontSize = function(change) {
            if (change > 0 && textSize < maxSize) {
                setTextSize(textSize + sizeStep);
            } else if (change < 0 && textSize > minSize) {
                setTextSize(textSize - sizeStep);
            }
        };
        
        // لا نقوم باستبدال الأزرار بل نضيف فقط خاصية onclick للأزرار التي لا تملكها
        zoomInBtns.forEach(function(btn) {
            if (!btn.hasAttribute('onclick')) {
                btn.setAttribute('onclick', 'changeFontSize(10)');
            }
        });
        
        zoomOutBtns.forEach(function(btn) {
            if (!btn.hasAttribute('onclick')) {
                btn.setAttribute('onclick', 'changeFontSize(-10)');
            }
        });
    }
    
    // إنشاء أزرار الزوم إذا لم تكن موجودة
    if (zoomInBtns.length === 0 || zoomOutBtns.length === 0) {
        console.log('إنشاء أزرار الزوم...');
        const mainIconsGroup = document.querySelector('.main-icons-group');
        if (mainIconsGroup) {
            // إنشاء حاوية الزوم
            const zoomGroup = document.createElement('div');
            zoomGroup.className = 'zoom-group';
            zoomGroup.style.display = 'flex';
            
            // إنشاء زر التكبير
            const zoomInBtn = document.createElement('button');
            zoomInBtn.className = 'icon-btn zoom-in-btn';
            zoomInBtn.title = 'تكبير النصوص';
            const zoomInImg = document.createElement('img');
            zoomInImg.src = 'assets/icons/search-zoom-in.png';
            zoomInImg.alt = 'تكبير';
            zoomInBtn.appendChild(zoomInImg);
            zoomGroup.appendChild(zoomInBtn);
            
            // إضافة حدث التكبير
            zoomInBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (textSize < maxSize) {
                    setTextSize(textSize + sizeStep);
                }
            });
            
            // إنشاء زر التصغير
            const zoomOutBtn = document.createElement('button');
            zoomOutBtn.className = 'icon-btn zoom-out-btn';
            zoomOutBtn.title = 'تصغير النصوص';
            const zoomOutImg = document.createElement('img');
            zoomOutImg.src = 'assets/icons/search-zoom-out.png';
            zoomOutImg.alt = 'تصغير';
            zoomOutBtn.appendChild(zoomOutImg);
            zoomGroup.appendChild(zoomOutBtn);
            
            // إضافة حدث التصغير
            zoomOutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (textSize > minSize) {
                    setTextSize(textSize - sizeStep);
                }
            });
            
            // إضافة مجموعة الزوم إلى الصفحة
            if (mainIconsGroup.parentNode) {
                mainIconsGroup.parentNode.insertBefore(zoomGroup, mainIconsGroup);
            }
        }
    }


    // معالجة قائمة الإعدادات للموبايل
    const mobileSettingsBtn = document.querySelector('.mobile-icons .settings-toggle-btn');
    const mobileSettingsMenu = document.querySelector('.mobile-icons .settings-menu');
    const mobileContrastOption = mobileSettingsMenu ? mobileSettingsMenu.querySelector('.contrast-option') : null;
    const mobileContrastSubmenu = mobileSettingsMenu ? mobileSettingsMenu.querySelector('.contrast-submenu') : null;
    const mobileContrastDark = mobileSettingsMenu ? mobileSettingsMenu.querySelector('.contrast-dark') : null;
    const mobileContrastLight = mobileSettingsMenu ? mobileSettingsMenu.querySelector('.contrast-light') : null;

    // التحقق من وجود العناصر
    if (mobileSettingsBtn && mobileSettingsMenu) {
        console.log('تم العثور على عناصر الموبايل');

        // معالج النقر على زر الإعدادات
        mobileSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('تم النقر على زر إعدادات الموبايل');

            // تبديل عرض القائمة
            mobileSettingsMenu.classList.toggle('show');
            
            // تحديث موضع القائمة
            const btnRect = mobileSettingsBtn.getBoundingClientRect();
            mobileSettingsMenu.style.position = 'fixed';
            mobileSettingsMenu.style.top = '60px';
            mobileSettingsMenu.style.right = '10px';
            mobileSettingsMenu.style.width = '200px';
            mobileSettingsMenu.style.display = 'block';
            mobileSettingsMenu.style.zIndex = '99999';
        });

        // معالج النقر على خيار التباين
        if (mobileContrastOption && mobileContrastSubmenu) {
            mobileContrastOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                mobileContrastSubmenu.classList.toggle('show');
            });
        }

        // معالج النقر على التباين الداكن
        if (mobileContrastDark) {
            mobileContrastDark.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                applyDarkContrast();
                closeMobileMenus();
            });
        }

        // معالج النقر على التباين الفاتح
        if (mobileContrastLight) {
            mobileContrastLight.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                removeDarkContrast();
                closeMobileMenus();
            });
        }

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!mobileSettingsMenu.contains(e.target) && !mobileSettingsBtn.contains(e.target)) {
                closeMobileMenus();
            }
        });
    }

    // دالة إغلاق القوائم
    function closeMobileMenus() {
        if (mobileSettingsMenu) {
            mobileSettingsMenu.classList.remove('show');
            mobileSettingsMenu.style.display = 'none';
        }
        if (mobileContrastSubmenu) {
            mobileContrastSubmenu.classList.remove('show');
        }
    }

    // دوال التباين
    function applyDarkContrast() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        
        // تطبيق الفلتر على الصور
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.setProperty('filter', 'brightness(0)', 'important');
            img.style.setProperty('-webkit-filter', 'brightness(0)', 'important');
        });

        // تطبيق الألوان على الأزرار
        const buttons = document.querySelectorAll('.hover-overlay a, .btn-primary');
        buttons.forEach(btn => {
            btn.style.setProperty('background-color', '#000000', 'important');
            btn.style.setProperty('color', '#ffffff', 'important');
        });
    }

    function removeDarkContrast() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        
        // إزالة الفلتر من الصور
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
    }

    // Initialize event listeners for settings menu options
    function initializeSettingsMenuListeners(menu) {
        // Handle contrast option
        const contrastOption = menu.querySelector('.contrast-option');
        const contrastSubmenu = menu.querySelector('.contrast-submenu');
        
        if (contrastOption && contrastSubmenu) {
            contrastOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                contrastSubmenu.classList.toggle('show');
            });
        }
        
        // Handle light contrast option
        const contrastLight = menu.querySelector('.contrast-light');
        if (contrastLight) {
            contrastLight.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                document.documentElement.style.setProperty('--primary-color', '#17a891');
                document.documentElement.style.setProperty('--secondary-color', '#24516c');
                menu.classList.remove('show');
                contrastSubmenu.classList.remove('show');
            });
        }
        
        // Handle dark contrast option
        const contrastDark = menu.querySelector('.contrast-dark');
        if (contrastDark) {
            contrastDark.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                document.documentElement.style.setProperty('--primary-color', '#000000');
                document.documentElement.style.setProperty('--secondary-color', '#000000');
                menu.classList.remove('show');
                contrastSubmenu.classList.remove('show');
            });
        }
        
        // Handle stats option
        const statsOption = menu.querySelector('.stats-option');
        if (statsOption) {
            statsOption.addEventListener('click', function(e) {
                e.preventDefault();
                // Determine if we're on the home page or a subpage
                const isHomePage = window.location.pathname === '/' || 
                               window.location.pathname === '/index.html' || 
                               window.location.pathname.endsWith('/index.html') ||
                               window.location.pathname === '';
                               
                if (isHomePage) {
                    window.location.href = 'pages/analytics.html';
                } else {
                    window.location.href = '../pages/analytics.html';
                }
            });
        }
        
        // Handle logout option
        const logoutOption = menu.querySelector('.logout-option');
        if (logoutOption) {
            logoutOption.addEventListener('click', function(e) {
                e.preventDefault();
                alert('تم تسجيل الخروج بنجاح');
                menu.classList.remove('show');
            });
        }
    }

    // Initialize search popup if it doesn't exist
    function initializeSearchPopup() {
        // Create the overlay
        const searchPopupOverlay = document.createElement('div');
        searchPopupOverlay.id = 'searchPopupOverlay';
        searchPopupOverlay.className = 'search-popup-overlay';
        
        // Create the search popup container
        const searchPopup = document.createElement('div');
        searchPopup.className = 'search-popup';
        
        // Create a container for the buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'search-buttons-container';
        searchPopup.appendChild(buttonsContainer);
        
        // Create the input field
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-popup-input';
        searchInput.placeholder = 'ابحث في الاحكام و الانظمه ...';
        searchPopup.appendChild(searchInput);
        
        // Add the popup to the overlay
        searchPopupOverlay.appendChild(searchPopup);
        
        // Add the overlay to the body
        document.body.appendChild(searchPopupOverlay);
        
        // Create the search button (green button)
        const searchButton = document.createElement('button');
        searchButton.className = 'search-popup-button search';
        searchButton.textContent = 'بحث';
        buttonsContainer.appendChild(searchButton);
        
        // Create the engine button (orange button)
        const engineBtn = document.createElement('button');
        engineBtn.className = 'search-popup-button engine';
        engineBtn.textContent = 'محرك البحث';
        buttonsContainer.appendChild(engineBtn);

        // Show the popup
        searchPopupOverlay.style.display = 'flex';
        setTimeout(() => {
            searchPopup.classList.add('active');
            searchInput.focus();
        }, 10);

        // Add event listeners
        // Close popup when clicking on overlay
        searchPopupOverlay.addEventListener('click', function(e) {
            if (e.target === searchPopupOverlay) {
                searchPopup.classList.remove('active');
                setTimeout(() => {
                    searchPopupOverlay.style.display = 'none';
                }, 300);
            }
        });
        
        // Handle search form submission
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        // Handle engine button click
        engineBtn.addEventListener('click', function() {
            window.location.href = './pages/general-search-engine.html';
        });
        
        // Handle input field enter key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Search function
    function performSearch() {
        const searchQuery = document.querySelector('.search-popup-input').value.trim();
        if (searchQuery) {
            console.log('Performing search for:', searchQuery);
            // Implement actual search functionality here
            // For now, just close the popup
            closePopup();
        }
    }
    
    // Close popup function
    function closePopup() {
        const searchPopup = document.querySelector('.search-popup');
        const searchPopupOverlay = document.getElementById('searchPopupOverlay');
        
        if (searchPopup && searchPopupOverlay) {
            searchPopup.classList.remove('active');
            setTimeout(() => {
                searchPopupOverlay.style.display = 'none';
            }, 300);
        }
    }
});
