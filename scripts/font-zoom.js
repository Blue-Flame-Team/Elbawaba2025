// تهيئة وظيفة تكبير وتصغير النصوص
console.log('بدء تحميل ملف font-zoom.js');

// المتغيرات الأساسية
let currentScale = 1;
const MIN_SCALE = 0.7;
const MAX_SCALE = 1.5;
const STEP = 0.1;

// دالة تغيير حجم النصوص
function changeFontSize(change) {
    console.log('تم استدعاء changeFontSize مع القيمة:', change);
    
    // تحديد العناصر النصية
    const textElements = document.querySelectorAll('.text-content, p, h1, h2, h3, h4, h5, h6, span, div, a, button, input, textarea, label, li, td, th');
    
    // حساب المقياس الجديد
    if (change > 0 && currentScale < MAX_SCALE) {
        currentScale += STEP;
    } else if (change < 0 && currentScale > MIN_SCALE) {
        currentScale -= STEP;
    }
    
    console.log('المقياس الجديد:', currentScale);
    
    // تطبيق المقياس الجديد
    textElements.forEach(element => {
        // تجاهل العناصر المستثناة
        if (element.closest('.icon-btn') || 
            element.closest('.logo') || 
            element.closest('.settings-toggle-btn') ||
            element.closest('.hamburger-menu') ||
            element.closest('.mobile-menu-overlay') ||
            element.closest('.zoom-group') ||
            element.tagName.toLowerCase() === 'img' ||
            element.tagName.toLowerCase() === 'svg') {
            return;
        }

        try {
            element.style.transform = `scale(${currentScale})`;
            element.style.transformOrigin = 'right top';
            element.style.display = 'inline-block';
            console.log('تم تغيير مقياس العنصر:', element.tagName);
        } catch (error) {
            console.error('خطأ في تغيير مقياس العنصر:', error);
        }
    });
}

// تصدير الدالة للنافذة
window.changeFontSize = changeFontSize;

document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة، بدء تهيئة وظيفة تكبير النصوص');

    // إضافة مستمعات الأحداث للأزرار
    const zoomInButtons = document.querySelectorAll('.zoom-in-btn, [onclick*="changeFontSize(10)"]');
    const zoomOutButtons = document.querySelectorAll('.zoom-out-btn, [onclick*="changeFontSize(-10)"]');

    console.log('عدد أزرار التكبير:', zoomInButtons.length);
    console.log('عدد أزرار التصغير:', zoomOutButtons.length);

    zoomInButtons.forEach((button, index) => {
        console.log('تهيئة زر التكبير رقم:', index + 1);
        button.removeAttribute('onclick');
        button.addEventListener('click', function(e) {
            console.log('تم النقر على زر التكبير');
            e.preventDefault();
            e.stopPropagation();
            changeFontSize(10);
        });
    });

    zoomOutButtons.forEach((button, index) => {
        console.log('تهيئة زر التصغير رقم:', index + 1);
        button.removeAttribute('onclick');
        button.addEventListener('click', function(e) {
            console.log('تم النقر على زر التصغير');
            e.preventDefault();
            e.stopPropagation();
            changeFontSize(-10);
        });
    });

    console.log('✅ اكتملت تهيئة وظيفة تكبير وتصغير النصوص');
}); 