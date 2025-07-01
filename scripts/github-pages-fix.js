/**
 * GitHub Pages Fix Script
 * يتحقق من تحميل جميع الموارد وإصلاح المشاكل المحتملة
 */

(function() {
    'use strict';
    
    console.log('🚀 بدء فحص GitHub Pages...');
    
    // 1. فحص تحميل الخطوط
    function checkFonts() {
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        console.log('📝 عدد روابط الخطوط:', fontLinks.length);
        
        fontLinks.forEach((link, index) => {
            link.addEventListener('load', () => {
                console.log(`✅ تم تحميل الخط ${index + 1}`);
            });
            link.addEventListener('error', () => {
                console.error(`❌ فشل تحميل الخط ${index + 1}:`, link.href);
            });
        });
    }
    
    // 2. فحص تحميل CSS
    function checkCSS() {
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]:not([href*="googleapis.com"])');
        console.log('🎨 عدد ملفات CSS:', cssLinks.length);
        
        cssLinks.forEach((link, index) => {
            if (link.sheet) {
                console.log(`✅ CSS ${index + 1}: ${link.href}`);
            } else {
                console.error(`❌ فشل CSS ${index + 1}: ${link.href}`);
            }
        });
    }
    
    // 3. فحص تحميل الصور
    function checkImages() {
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        let failedImages = 0;
        
        images.forEach((img, index) => {
            if (img.complete && img.naturalWidth > 0) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    console.log(`✅ صورة ${index + 1}: ${img.src}`);
                });
                img.addEventListener('error', () => {
                    failedImages++;
                    console.error(`❌ فشل صورة ${index + 1}: ${img.src}`);
                });
            }
        });
        
        console.log(`🖼️ الصور: ${images.length} إجمالي`);
        setTimeout(() => {
            console.log(`📊 النتائج: ${loadedImages} محملة، ${failedImages} فاشلة`);
        }, 3000);
    }
    
    // 4. فحص تحميل JavaScript
    function checkScripts() {
        const scripts = document.querySelectorAll('script[src]');
        console.log('📜 عدد ملفات JavaScript:', scripts.length);
        
        scripts.forEach((script, index) => {
            script.addEventListener('load', () => {
                console.log(`✅ JS ${index + 1}: ${script.src}`);
            });
            script.addEventListener('error', () => {
                console.error(`❌ فشل JS ${index + 1}: ${script.src}`);
            });
        });
    }
    
    // 5. فحص الاتصال بالإنترنت
    function checkConnection() {
        if (navigator.onLine) {
            console.log('🌐 متصل بالإنترنت');
        } else {
            console.warn('⚠️ غير متصل بالإنترنت');
        }
    }
    
    // 6. تشغيل جميع الفحوصات
    function runAllChecks() {
        console.log('🔍 بدء الفحص الشامل...');
        checkConnection();
        checkFonts();
        checkCSS();
        checkImages();
        checkScripts();
        
        // فحص إضافي بعد 5 ثوان
        setTimeout(() => {
            console.log('🔄 فحص إضافي بعد 5 ثوان...');
            const missingElements = [];
            
            // فحص عناصر مهمة
            const importantSelectors = [
                '.header',
                '.navbar', 
                '.hero-section',
                '.services-section',
                '.footer'
            ];
            
            importantSelectors.forEach(selector => {
                const element = document.querySelector(selector);
                if (!element) {
                    missingElements.push(selector);
                }
            });
            
            if (missingElements.length > 0) {
                console.error('❌ عناصر مفقودة:', missingElements);
            } else {
                console.log('✅ جميع العناصر المهمة موجودة');
            }
        }, 5000);
    }
    
    // 7. بدء التشغيل عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllChecks);
    } else {
        runAllChecks();
    }
    
    // 8. إضافة معلومات للنافذة العامة للتشخيص
    window.GitHubPagesDiagnostics = {
        checkFonts,
        checkCSS,
        checkImages,
        checkScripts,
        checkConnection,
        runAllChecks
    };
    
})(); 