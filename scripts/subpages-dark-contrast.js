// نظام التباين الأسود للصفحات الفرعية - JavaScript موحد
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 إعداد نظام التباين الأسود للصفحات الفرعية');
    
    // دالة تطبيق التباين الأسود
    function applyDarkContrast() {
        console.log('⚫ تطبيق التباين الأسود للصفحة الفرعية');
        document.body.classList.add('dark-contrast');
        localStorage.setItem('darkContrast', 'true');
        
        // تطبيق تأثيرات إضافية للنصوص والأيقونات
        applyTextContrastEffects();
        applyIconContrastEffects();
        applyFooterContrastEffects();
    }
    
    // دالة إزالة التباين الأسود
    function removeDarkContrast() {
        console.log('⚪ إزالة التباين الأسود للصفحة الفرعية');
        document.body.classList.remove('dark-contrast');
        localStorage.setItem('darkContrast', 'false');
        
        // إزالة التأثيرات الإضافية
        removeTextContrastEffects();
        removeIconContrastEffects();
        removeFooterContrastEffects();
    }
    
    // دالة تطبيق تأثيرات النصوص
    function applyTextContrastEffects() {
        console.log('📝 تطبيق تأثيرات النصوص للتباين الأسود');
        
        // تطبيق اللون الأسود على جميع النصوص
        // const textElements = document.querySelectorAll(`
        //     p, span, div, a, h1, h2, h3, h4, h5, h6,
        //     .simple-text, .content-text, .article-text,
        //     .section-text, .description-text
        // `);
        
        // textElements.forEach(element => {
        //     element.style.setProperty('color', '#000000', 'important');
        //     element.style.setProperty('background', 'none', 'important');
        //     element.style.setProperty('background-color', 'transparent', 'important');
        // });
    }
    
    // دالة إزالة تأثيرات النصوص
    function removeTextContrastEffects() {
        console.log('📝 إزالة تأثيرات النصوص للتباين الأسود');
        
        const textElements = document.querySelectorAll(`
            p, span, div, a, h1, h2, h3, h4, h5, h6,
            .simple-text, .content-text, .article-text,
            .section-text, .description-text
        `);
        
        textElements.forEach(element => {
            element.style.removeProperty('color');
            element.style.removeProperty('background');
            element.style.removeProperty('background-color');
        });
    }
    
    // دالة تطبيق تأثيرات الفوتر
    // function applyFooterContrastEffects() {
    //     console.log('🦶 تطبيق تأثيرات الفوتر للتباين الأسود');
        
    //     // تغيير متغيرات CSS
    //     document.documentElement.style.setProperty('--footer-bottom-bg', '#090909', 'important');
    //     document.documentElement.style.setProperty('--footer-bg', '#090909', 'important');
        
    //     // العناصر التي يجب أن تصبح بلون #090909
    //     const footerElements = document.querySelectorAll(`
    //         footer,
    //         .main-footer,
    //         .footer-bottom,
    //         .footer-bottom .container,
    //         .footer-bottom .copyright-text,
    //         .footer-bottom .footer-bottom-links,
    //         .social-share-section
    //     `);
        
    //     footerElements.forEach(element => {
    //         element.style.setProperty('background-color', '#090909', 'important');
    //         element.style.setProperty('background', '#090909', 'important');
    //         element.style.setProperty('background-image', 'none', 'important');
    //     });
        
    //     // تطبيق اللون على العناصر الفرعية أيضاً
    //     const footerChildren = document.querySelectorAll(`
    //         footer *,
    //         .main-footer *,
    //         .footer-bottom *,
    //         .footer-bottom .container *,
    //         .copyright-text,
    //         .footer-bottom-links,
    //         .footer-bottom-links *,
    //         .footer-bottom-links a
    //     `);
        
    //     footerChildren.forEach(element => {
    //         // تجنب تطبيق اللون على العناصر الداخلية في social-share-section
    //         if (!element.closest('.social-share-section > div')) {
    //             element.style.setProperty('background-color', '#090909', 'important');
    //             element.style.setProperty('background', '#090909', 'important');
    //             element.style.setProperty('background-image', 'none', 'important');
    //         }
    //     });
        
    //     // استهداف مباشر للعناصر المحددة
    //     const specificElements = [
    //         'div.footer-bottom',
    //         'div.footer-bottom div.container', 
    //         'div.copyright-text',
    //         'div.footer-bottom-links'
    //     ];
        
    //     specificElements.forEach(selector => {
    //         const elements = document.querySelectorAll(selector);
    //         elements.forEach(element => {
    //             element.style.setProperty('background-color', '#090909', 'important');
    //             element.style.setProperty('background', '#090909', 'important');
    //             element.style.setProperty('background-image', 'none', 'important');
    //         });
    //     });
        
    //     // حماية العناصر الداخلية في social-share-section
    //     const socialShareInner = document.querySelectorAll('.social-share-section > div');
    //     socialShareInner.forEach(element => {
    //         element.style.setProperty('background-color', '#f5f5f5', 'important');
    //         element.style.setProperty('background', '#f5f5f5', 'important');
    //     });
        
    //     // إضافة CSS مباشر للتأكد المطلق
    //     const forceCSS = document.createElement('style');
    //     forceCSS.id = 'force-footer-contrast';
    //     forceCSS.innerHTML = `
    //         body.dark-contrast .footer-bottom,
    //         body.dark-contrast .footer-bottom .container,
    //         body.dark-contrast .footer-bottom .copyright-text,
    //         body.dark-contrast .footer-bottom .footer-bottom-links {
    //             background-color: #090909 !important;
    //             background: #090909 !important;
    //             background-image: none !important;
    //         }
    //     `;
        
    //     // إزالة CSS القديم إذا وجد
    //     const oldCSS = document.getElementById('force-footer-contrast');
    //     if (oldCSS) {
    //         oldCSS.remove();
    //     }
        
    //     document.head.appendChild(forceCSS);
    // }
    
    // دالة إزالة تأثيرات الفوتر
    function removeFooterContrastEffects() {
        console.log('🦶 إزالة تأثيرات الفوتر للتباين الأسود');
        
        // إعادة تعيين متغيرات CSS
        document.documentElement.style.removeProperty('--footer-bottom-bg');
        document.documentElement.style.removeProperty('--footer-bg');
        
        const footerElements = document.querySelectorAll(`
            footer, footer *,
            .main-footer, .main-footer *,
            .footer-bottom, .footer-bottom *,
            .social-share-section, .social-share-section *
        `);
        
        footerElements.forEach(element => {
            element.style.removeProperty('background-color');
            element.style.removeProperty('background');
            element.style.removeProperty('background-image');
        });
        
        // إزالة CSS المُضاف
        const forceCSS = document.getElementById('force-footer-contrast');
        if (forceCSS) {
            forceCSS.remove();
        }
    }
    
    // دالة تطبيق تأثيرات الأيقونات
    function applyIconContrastEffects() {
        console.log('🎨 تطبيق تأثيرات الأيقونات للتباين الأسود');
        
        // تبديل أيقونة الدعم للنسخة السوداء
        const supportIcons = document.querySelectorAll('.support-icon-fixed img[src*="support.svg"]');
        supportIcons.forEach(icon => {
            if (icon.src && icon.src.includes('support.svg')) {
                icon.setAttribute('data-original-src', icon.src);
                icon.src = icon.src.replace('support.svg', 'support-black.svg');
            }
        });
        
        // الأيقونات التي يجب أن تصبح سوداء
        const darkIcons = document.querySelectorAll(`
            img[src*="ln1.png"],
            img[src*="x2.png"], 
            img[src*="in2.png"],
            img[src*="f3.png"],
            img[src*="linkedin"],
            img[src*="twitter"],
            img[src*="instagram"],
            img[src*="facebook"],
            .social-share-section img:not([src*="clock"]):not([src*="star"])
        `);
        
        darkIcons.forEach(icon => {
            if (!icon.src.includes('clock') && !icon.src.includes('star')) {
                icon.style.setProperty('filter', 'brightness(0)', 'important');
                icon.style.setProperty('background', 'none', 'important');
                icon.style.setProperty('background-color', 'transparent', 'important');
            }
        });
        
        // حماية أيقونات التوب بار
        const protectedIcons = document.querySelectorAll(`
            .top-bar img,
            .top-icons img,
            .zoom-group img,
            .main-icons-group img,
            .mobile-icons img,
            .icon-btn img,
            img[src*="question.svg"],
            img[src*="search-zoom-out.svg"],
            img[src*="search-zoom-in.svg"],
            img[src*="search.png"],
            img[src*="location.png"],
            img[src*="call.png"],
            img[src*="setting-2.png"],
            img[src*="profile-circle.svg"],
            img[src*="logo.png"],
            .footer-content img,
            .social-icons img,
            .contact-btn img
        `);
        
        protectedIcons.forEach(icon => {
            icon.style.setProperty('filter', 'none', 'important');
            icon.style.setProperty('opacity', '1', 'important');
            icon.style.setProperty('brightness', '1', 'important');
        });
    }
    
    // دالة إزالة تأثيرات الأيقونات
    function removeIconContrastEffects() {
        console.log('🎨 إزالة تأثيرات الأيقونات للتباين الأسود');
        
        // إعادة أيقونة الدعم للنسخة العادية
        const supportIcons = document.querySelectorAll('.support-icon-fixed img[src*="support-black.svg"]');
        supportIcons.forEach(icon => {
            const originalSrc = icon.getAttribute('data-original-src');
            if (originalSrc) {
                icon.src = originalSrc;
            }
        });
        
        const allIcons = document.querySelectorAll('img');
        allIcons.forEach(icon => {
            icon.style.removeProperty('filter');
            icon.style.removeProperty('background');
            icon.style.removeProperty('background-color');
            icon.style.removeProperty('opacity');
            icon.style.removeProperty('brightness');
        });
    }
    
    // استرداد الحالة المحفوظة
    if (localStorage.getItem('darkContrast') === 'true') {
        applyDarkContrast();
    }
    
    // ربط الأزرار
    function setupContrastButtons() {
        // زر التباين الداكن
        const darkContrastBtns = document.querySelectorAll('.contrast-dark');
        darkContrastBtns.forEach(btn => {
            if (!btn.hasAttribute('data-contrast-setup')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('🎨 تم النقر على زر التباين الداكن في الصفحة الفرعية');
                    applyDarkContrast();
                });
                btn.setAttribute('data-contrast-setup', 'true');
            }
        });
        
        // زر التباين الفاتح
        const lightContrastBtns = document.querySelectorAll('.contrast-light');
        lightContrastBtns.forEach(btn => {
            if (!btn.hasAttribute('data-contrast-setup')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('🎨 تم النقر على زر التباين الفاتح في الصفحة الفرعية');
                    removeDarkContrast();
                });
                btn.setAttribute('data-contrast-setup', 'true');
            }
        });
    }
    
    // دالة مراقبة التغييرات في DOM
    function observePageChanges() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // إعادة تطبيق التباين عند إضافة عناصر جديدة
                if (document.body.classList.contains('dark-contrast')) {
                    setTimeout(() => {
                        applyTextContrastEffects();
                        applyIconContrastEffects();
                        applyFooterContrastEffects();
                    }, 100);
                }
                
                // إعادة ربط الأزرار الجديدة
                setupContrastButtons();
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // تشغيل الإعداد
    setTimeout(setupContrastButtons, 500);
    setTimeout(observePageChanges, 1000);
    
    // إعادة إعداد الأزرار عند الحاجة
    let retryCount = 0;
    const retryInterval = setInterval(() => {
        setupContrastButtons();
        retryCount++;
        
        if (retryCount >= 5) {
            clearInterval(retryInterval);
        }
    }, 1000);
    
    // تصدير الدوال للاستخدام الخارجي
    window.SubpagesDarkContrast = {
        apply: applyDarkContrast,
        remove: removeDarkContrast,
        setupButtons: setupContrastButtons
    };
    
    console.log('✅ تم إعداد نظام التباين الأسود للصفحات الفرعية بنجاح');
}); 