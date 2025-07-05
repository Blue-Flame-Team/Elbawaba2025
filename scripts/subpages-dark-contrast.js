// نظام التباين الأسود للصفحات الفرعية - متوافق مع unified-icons.js
document.addEventListener('DOMContentLoaded', function() {
    
    // متغير لمنع التداخل مع unified-icons.js
    let isProcessingThemeChange = false;
    
    // دالة تطبيق تأثيرات الأيقونات المتقدمة
    function applyIconContrastEffects() {
        
        // خريطة الأيقونات وما يقابلها من النسخة السوداء
        const iconMappings = {
            // ملفات PNG
            'timer.png': 'timer-black.svg',
            'close-square.png': 'close-square-black.svg', 
            'book.png': 'book-black.svg',
            'bank.png': 'bank-black.svg',
            'mosq.png': 'mosq-black.svg',
            'Mask group.png': 'Mask group-black.svg',
            'support.png': 'support-black.svg',
            'tick-square.png': 'tick-square-black.svg',
            'minus-square.png': 'minus-square-black.svg',
            'canceld.png': 'canceld-black.svg',
            'message-question.png': 'message-question-black.png',
            
            // ملفات SVG - الأهم!
            'support.svg': 'support-black.svg',
            'tick-square.svg': 'tick-square-black.svg',
            'minus-square.svg': 'minus-square-black.svg',
            'canceld.svg': 'canceld-black.svg',
            'close-square.svg': 'close-square-black.svg',
            'timer.svg': 'timer-black.svg',
            'book.svg': 'book-black.svg',
            'bank.svg': 'bank-black.svg',
            'mosq.svg': 'mosq-black.svg',
            'book2.svg': 'book2-black.svg',
            'fb-soc.svg': 'fb-soc-black.svg',
            'in-sco.svg': 'in-sco-black.svg',
            'ln-soc.svg': 'ln-soc-black.svg',
            'x-soc.svg': 'x-soc-black.svg',
            'Mask group.svg': 'Mask group-black.svg'
        };

        // البحث عن جميع الصور في الصفحة
        const images = document.querySelectorAll('img');
        let changedCount = 0;

        images.forEach(img => {
            const currentSrc = img.src;
            const fileName = currentSrc.split('/').pop();
            
            
            // التحقق من وجود الأيقونة في الخريطة
            if (iconMappings[fileName]) {
                
                // حفظ المسار الأصلي
                if (!img.dataset.originalSrc) {
                    img.dataset.originalSrc = currentSrc;
                }
                
                // إنشاء المسار الجديد
                let newSrc;
                if (currentSrc.includes('/our-services/')) {
                    // للأيقونات في مجلد our-services - نقلها للمجلد الرئيسي
                    newSrc = currentSrc.replace('/our-services/' + fileName, '/' + iconMappings[fileName]);
                } else {
                    // للأيقونات في المجلد الرئيسي
                    newSrc = currentSrc.replace(fileName, iconMappings[fileName]);
                }
                
                img.src = newSrc;
                changedCount++;
            } else {
            }
        });

    }

    // دالة إزالة تأثيرات الأيقونات
    function removeIconContrastEffects() {
        
        const images = document.querySelectorAll('img[data-original-src]');
        let restoredCount = 0;

        images.forEach(img => {
            if (img.dataset.originalSrc) {
                img.src = img.dataset.originalSrc;
                delete img.dataset.originalSrc;
                restoredCount++;
            }
        });

    }
    
    // دالة تطبيق تأثيرات النصوص
    function applyTextContrastEffects() {
        
        // تحسين النصوص للتباين العالي
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, li, td, th');
        textElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            if (computedStyle.color === 'rgb(255, 255, 255)' || 
                computedStyle.color === 'white' || 
                computedStyle.color === '#ffffff' ||
                computedStyle.color === '#fff') {
                element.style.fontWeight = 'bold';
                element.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
            }
        });
        
        // إصلاح هوفر القوائم المنسدلة
        applyDropdownHoverFix();
        
        // إصلاح هوفر الكروت
        applyCardHoverFix();
        
        // إصلاح زر "كل الخدمات"
        applyServiceTabFix();
    }
    
    // دالة إصلاح هوفر القوائم المنسدلة
    function applyDropdownHoverFix() {
        
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            // حفظ الألوان الأصلية
            if (!link.dataset.originalColor) {
                link.dataset.originalColor = link.style.color || '';
                link.dataset.originalBg = link.style.backgroundColor || '';
            }
            
            // إضافة أحداث الهوفر
            link.addEventListener('mouseenter', function() {
                if (document.body.classList.contains('dark-mode')) {
                    this.style.backgroundColor = '#28a745';
                    this.style.color = '#ffffff';
                    this.style.fontWeight = 'bold';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (document.body.classList.contains('dark-mode')) {
                    this.style.backgroundColor = 'transparent';
                    this.style.color = '#333333';
                    this.style.fontWeight = 'normal';
                }
            });
        });
    }
    
    // دالة إصلاح هوفر الكروت
    function applyCardHoverFix() {
        
        // البحث عن جميع الكروت التي تحتوي على hover-overlay
        const serviceCards = document.querySelectorAll('div[style*="background-color: white"]');
        let cardCount = 0;
        
        serviceCards.forEach(card => {
            const hoverOverlay = card.querySelector('.hover-overlay');
            if (hoverOverlay) {
                cardCount++;
                
                // حفظ الأحداث الأصلية
                if (!card.dataset.originalMouseover) {
                    card.dataset.originalMouseover = card.getAttribute('onmouseover') || '';
                    card.dataset.originalMouseout = card.getAttribute('onmouseout') || '';
                }
                
                // إعادة تعريف الأحداث لتشمل اللون الأخضر في التباين الأسود
                const originalOverHandler = card.getAttribute('onmouseover');
                const originalOutHandler = card.getAttribute('onmouseout');
                
                // تعديل onmouseover
                card.setAttribute('onmouseover', `
                    ${originalOverHandler}
                    if (document.body.classList.contains('dark-mode')) {
                        this.querySelector('.hover-overlay').style.backgroundColor = '#000000';
                    }
                `);
                
                // تعديل onmouseout  
                card.setAttribute('onmouseout', `
                    ${originalOutHandler}
                    if (document.body.classList.contains('dark-mode')) {
                        this.querySelector('.hover-overlay').style.backgroundColor = '#000000';
                    }
                `);
                
                // تطبيق فوري للألوان على hover-overlay
                hoverOverlay.style.setProperty('background-color', '#000000', 'important');
                
                // إصلاح ألوان النصوص للتباين الأسود
                const overlayTexts = hoverOverlay.querySelectorAll('h3, p');
                overlayTexts.forEach(text => {
                    text.style.setProperty('color', '#ffffff', 'important');
                    // ظل أبيض فاتح للتباين الأسود
                    text.style.setProperty('text-shadow', '1px 1px 2px rgba(255,255,255,0.3)', 'important');
                });
                
                const overlayButtons = hoverOverlay.querySelectorAll('a');
                overlayButtons.forEach(button => {
                    button.style.setProperty('background-color', '#ff6b35', 'important');
                    button.style.setProperty('color', '#ffffff', 'important');
                });
            }
        });
        
    }
    
    // دالة إصلاح زر "كل الخدمات"
    function applyServiceTabFix() {
        
        const serviceTabs = document.querySelectorAll('.service-tab.active, button.service-tab.active');
        serviceTabs.forEach(tab => {
            // حفظ الألوان الأصلية من computed styles أو القيم الافتراضية
            if (!tab.dataset.originalBg) {
                const computedStyle = window.getComputedStyle(tab);
                // حفظ القيم الأصلية الصحيحة للتباين الفاتح
                tab.dataset.originalBg = '#00a19a'; // اللون الأخضر الأصلي
                tab.dataset.originalColor = 'white'; // النص الأبيض الأصلي
                tab.dataset.originalBorder = 'none'; // بدون حدود في الأصل
                
            }
            
            // تطبيق التنسيق الأسود
            tab.style.setProperty('background-color', '#000000', 'important');
            tab.style.setProperty('color', '#ffffff', 'important');
            tab.style.setProperty('border', '2px solid #ffffff', 'important');
        });
        
    }

    // دالة إزالة تأثيرات النصوص
    function removeTextContrastEffects() {
        
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, li, td, th');
        textElements.forEach(element => {
            element.style.fontWeight = '';
            element.style.textShadow = '';
        });
        
        // إزالة إصلاح هوفر القوائم المنسدلة
        removeDropdownHoverFix();
        
        // إزالة إصلاح هوفر الكروت
        removeCardHoverFix();
        
        // إزالة إصلاح زر "كل الخدمات"
        removeServiceTabFix();
    }
    
    // دالة إزالة إصلاح هوفر القوائم المنسدلة
    function removeDropdownHoverFix() {
        
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            // استعادة الألوان الأصلية
            if (link.dataset.originalColor !== undefined) {
                link.style.color = link.dataset.originalColor;
                link.style.backgroundColor = link.dataset.originalBg;
                link.style.fontWeight = '';
                
                delete link.dataset.originalColor;
                delete link.dataset.originalBg;
            }
        });
    }
    
    // دالة إزالة إصلاح هوفر الكروت
    function removeCardHoverFix() {
        
        const serviceCards = document.querySelectorAll('div[style*="background-color: white"]');
        let cardCount = 0;
        
        serviceCards.forEach(card => {
            const hoverOverlay = card.querySelector('.hover-overlay');
            if (hoverOverlay) {
                cardCount++;
                
                // استعادة الأحداث الأصلية
                if (card.dataset.originalMouseover !== undefined) {
                    card.setAttribute('onmouseover', card.dataset.originalMouseover);
                    card.setAttribute('onmouseout', card.dataset.originalMouseout);
                    
                    delete card.dataset.originalMouseover;
                    delete card.dataset.originalMouseout;
                }
                
                // إعادة تعيين لون hover-overlay للون الأخضر الأصلي
                hoverOverlay.style.backgroundColor = '#00a19a'; // اللون الأخضر الأصلي
                
                // إعادة النصوص للوضع الفاتح (بيضاء مع ظل أسود)
                const overlayTexts = hoverOverlay.querySelectorAll('h3, p');
                overlayTexts.forEach(text => {
                    text.style.setProperty('color', '#ffffff', 'important');
                    // ظل أسود للوضع الفاتح (الأصلي)
                    text.style.setProperty('text-shadow', '1px 1px 2px rgba(0,0,0,0.8)', 'important');
                });
                
                // إزالة التنسيقات من الأزرار
                const overlayButtons = hoverOverlay.querySelectorAll('a');
                overlayButtons.forEach(button => {
                    button.style.removeProperty('background-color');
                    button.style.removeProperty('color');
                });
            }
        });
        
    }
    
    // دالة إزالة إصلاح زر "كل الخدمات"
    function removeServiceTabFix() {
        
        const serviceTabs = document.querySelectorAll('.service-tab.active, button.service-tab.active');
        serviceTabs.forEach(tab => {
            // إزالة جميع inline styles بطريقة شاملة
            tab.removeAttribute('style');
            
            // بديل: إزالة خصائص محددة إذا لم تعمل removeAttribute
            tab.style.removeProperty('background-color');
            tab.style.removeProperty('color'); 
            tab.style.removeProperty('border');
            
            // إعادة تطبيق class CSS الأصلي بالقوة
            tab.classList.remove('active');
            tab.classList.add('active');
            
            // تنظيف البيانات المحفوظة
            if (tab.dataset.originalBg !== undefined) {
                delete tab.dataset.originalBg;
                delete tab.dataset.originalColor;
                delete tab.dataset.originalBorder;
            }
            
        });
        
        // فرض إعادة رسم العناصر
        document.body.classList.remove('force-refresh');
        document.body.offsetHeight; // trigger reflow
        document.body.classList.add('force-refresh');
        
        
        // فرض إعادة تعيين كامل لجميع service tabs
        forceResetServiceTabs();
    }
    
    // دالة فرض إعادة تعيين service tabs بالكامل
    function forceResetServiceTabs() {
        
        const serviceTabs = document.querySelectorAll('.service-tab');
        serviceTabs.forEach(tab => {
            // إزالة جميع inline styles والمعرفات
            tab.removeAttribute('style');
            tab.removeAttribute('data-original-bg');
            tab.removeAttribute('data-original-color');
            tab.removeAttribute('data-original-border');
            
            // فرض إعادة تطبيق CSS
            if (tab.classList.contains('active')) {
                const originalHTML = tab.outerHTML;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = originalHTML.replace(/style="[^"]*"/g, '');
                const newTab = tempDiv.firstChild;
                tab.parentNode.replaceChild(newTab, tab);
            }
        });
    }

    // دالة تطبيق تأثيرات الفوتر
    function applyFooterContrastEffects() {
        
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.borderTop = '3px solid #ffffff';
            footer.style.boxShadow = '0 -5px 15px rgba(255,255,255,0.1)';
        }

        // تحسين روابط الفوتر
        const footerLinks = document.querySelectorAll('footer a');
        footerLinks.forEach(link => {
            link.style.fontWeight = 'bold';
            link.style.textDecoration = 'underline';
        });
    }

    // دالة إزالة تأثيرات الفوتر
    function removeFooterContrastEffects() {
        
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.borderTop = '';
            footer.style.boxShadow = '';
        }

        const footerLinks = document.querySelectorAll('footer a');
        footerLinks.forEach(link => {
            link.style.fontWeight = '';
            link.style.textDecoration = '';
        });
    }

    // دالة تطبيق التباين الكامل
    function applyDarkContrast() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        
        // تطبيق جميع التأثيرات
        applyTextContrastEffects();
        applyIconContrastEffects();
        applyFooterContrastEffects();
        applyCardHoverFix();
        applyServiceTabFix();
    }

    // دالة إزالة التباين الكامل
    function removeDarkContrast() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        
        // إزالة جميع التأثيرات
        removeTextContrastEffects();
        removeIconContrastEffects();
        removeFooterContrastEffects();
        removeCardHoverFix();
        removeServiceTabFix();
    }

    // مراقبة تغييرات التباين مع منع التداخل
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // تجنب التداخل إذا كان النظام يعالج تغيير الثيم
                if (isProcessingThemeChange) {
                    return;
                }
                
                isProcessingThemeChange = true;
                
                // تأخير قصير لتجنب التداخل مع unified-icons.js
                    setTimeout(() => {
                    const currentTheme = localStorage.getItem('theme');
                    const hasDarkMode = document.body.classList.contains('dark-mode');
                    
                    
                    // التأكد من أن الحالة متناسقة
                    if (currentTheme === 'light' && hasDarkMode) {
                        document.body.classList.remove('dark-mode');
                        return;
                    }
                    
                    if (hasDarkMode) {
                        applyTextContrastEffects();
                        applyIconContrastEffects();
                        applyFooterContrastEffects();
                        applyCardHoverFix();
                        applyServiceTabFix();
                    } else {
                        removeTextContrastEffects();
                        removeIconContrastEffects();
                        removeFooterContrastEffects();
                        removeCardHoverFix();
                        removeServiceTabFix();
                    }
                    
                    isProcessingThemeChange = false;
                }, 50); // تأخير 50ms لضمان عدم التداخل
            }
        });
    });

    // بدء مراقبة التغييرات
        observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });

    // مراقبة تغييرات localStorage
    window.addEventListener('storage', function(e) {
        if (e.key === 'theme') {
            setTimeout(() => {
                if (e.newValue === 'dark') {
                    document.body.classList.add('dark-mode');
                } else if (e.newValue === 'light') {
                    document.body.classList.remove('dark-mode');
                }
            }, 10);
        }
    });

    // التحقق من الحالة المحفوظة عند التحميل مع تأخير لتجنب التداخل
    setTimeout(() => {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
        }
        
        // تطبيق التأثيرات حسب الحالة النهائية
        if (document.body.classList.contains('dark-mode')) {
            applyTextContrastEffects();
            applyIconContrastEffects();
            applyFooterContrastEffects();
            applyCardHoverFix();
            applyServiceTabFix();
        }
    }, 100); // تأخير 100ms للسماح لجميع scripts بالتحميل

    // دالة debugging لمساعدة المستخدم
    function debugThemeStatus() {
        
        const serviceTabs = document.querySelectorAll('.service-tab.active');
        serviceTabs.forEach((tab, index) => {
            const computedStyle = window.getComputedStyle(tab);
        });
    }

    // إتاحة الدوال عبر النافذة للاستخدام الخارجي
    window.subpagesContrast = {
        apply: applyDarkContrast,
        remove: removeDarkContrast,
        applyIcons: applyIconContrastEffects,
        removeIcons: removeIconContrastEffects,
        debug: debugThemeStatus
    };
    
    // دالة لإضافة فئات CSS للنصوص المحددة
    function addDarkModeClasses() {
        // البحث عن النصوص وإضافة فئات مناسبة
        const elementsToClassify = [
            { text: 'تقييم المحتوى', className: 'content-rating-text' },
            { text: 'آخر تعديل 19 ذو القعدة 1444', className: 'last-modified-text' },
            { text: 'عدد الأصوات:', className: 'votes-count-text' },
            { text: 'طلب الاشتراك', className: 'subscription-request-title' }
        ];

        elementsToClassify.forEach(item => {
            // البحث عن العناصر التي تحتوي على النص المحدد
            const elements = document.querySelectorAll('span, h1, h2');
            elements.forEach(element => {
                if (element.textContent.includes(item.text)) {
                    element.classList.add(item.className);
                    console.log(`تم إضافة فئة ${item.className} للنص: ${item.text}`);
                }
            });
        });
    }

    // دالة لتطبيق التباين الأسود على النصوص المحددة
    function applyDarkModeToSpecificTexts() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            // استهداف النصوص بلون #158885 وتغييرها للأسود
            const coloredElements = document.querySelectorAll('[style*="color: #158885"], [style*="color:#158885"]');
            coloredElements.forEach(element => {
                element.style.setProperty('color', '#000000', 'important');
                console.log('تم تغيير لون النص إلى الأسود:', element.textContent.trim());
            });

            // استهداف عناوين الاشتراك
            const subscriptionTitles = document.querySelectorAll('.subscribe-title, h1:contains("طلب الاشتراك"), h2:contains("طلب الاشتراك")');
            subscriptionTitles.forEach(title => {
                title.style.setProperty('color', '#000000', 'important');
                console.log('تم تغيير لون عنوان الاشتراك إلى الأسود');
            });
        } else {
            // إعادة الألوان الأصلية
            const coloredElements = document.querySelectorAll('.content-rating-text, .last-modified-text, .votes-count-text, .subscription-request-title');
            coloredElements.forEach(element => {
                element.style.removeProperty('color');
            });
        }
    }

    // تشغيل الدوال عند التحميل
    addDarkModeClasses();
    applyDarkModeToSpecificTexts();

    // مراقبة تغييرات وضع التباين
    const darkModeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target === document.body) {
                    applyDarkModeToSpecificTexts();
                }
            }
        });
    });

    darkModeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });

    // إضافة مستمعين لأزرار التباين
    const contrastButtons = document.querySelectorAll('.contrast-dark, .contrast-light, .dark-mode-toggle, .contrast-toggle');
    contrastButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(applyDarkModeToSpecificTexts, 100);
        });
    });

    console.log('🌙 نظام التباين الأسود للصفحات الفرعية جاهز');
}); 