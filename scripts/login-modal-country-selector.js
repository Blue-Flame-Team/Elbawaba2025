// محدد الدول للنموذج
document.addEventListener('DOMContentLoaded', function() {
    // قائمة الدول المدعومة
    const COUNTRIES = [
        { name: 'مصر', code: '+20', flag: '../assets/icons/egypt-flag.svg' },
        { name: 'السعودية', code: '+966', flag: '../assets/icons/saudi-flag.svg' },
        { name: 'الإمارات', code: '+971', flag: '../assets/icons/uae-flag.svg' }
    ];

    // دالة إعداد محددات الدول
    function setupCountrySelectors() {
        // اختيار جميع محددات الدول
        const selectors = document.querySelectorAll('.country-code-select');
        
        selectors.forEach(selector => {
            // تجنب إعادة التهيئة
            if (selector.dataset.initialized) return;
            selector.dataset.initialized = 'true';

            // العثور على العناصر الداخلية
            const flagImg = selector.querySelector('.flag-img');
            const codeSpan = selector.querySelector('.code');

            // التأكد من وجود العناصر
            if (!flagImg || !codeSpan) return;

            // إنشاء القائمة المنسدلة
            const dropdown = document.createElement('div');
            dropdown.className = 'country-dropdown';
            dropdown.style.cssText = `
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: calc(100% - 20px);
                background: white;
                border: 1px solid #ddd;
                border-radius: 12px;
                z-index: 1000;
                max-height: 200px;
                overflow-y: auto;
                margin: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            `;

            // إضافة الدول إلى القائمة
            COUNTRIES.forEach(country => {
                const item = document.createElement('div');
                item.style.cssText = `
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                `;

                item.innerHTML = `
                    <img src="${country.flag}" alt="${country.name}" style="width: 24px; height: 18px; margin-left: 10px; object-fit: cover;">
                    <span style="flex-grow: 1;">${country.name}</span>
                    <span>${country.code}</span>
                `;

                // معالجة اختيار الدولة
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    flagImg.src = country.flag;
                    flagImg.alt = country.name;
                    codeSpan.textContent = country.code;
                    dropdown.style.display = 'none';
                    selector.classList.remove('dropdown-open');
                });

                dropdown.appendChild(item);
            });

            // تأكيد الموضع النسبي
            selector.style.position = 'relative';

            // إضافة القائمة
            selector.appendChild(dropdown);

            // معالجة فتح/إغلاق القائمة
            selector.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // إغلاق جميع القوائم الأخرى
                document.querySelectorAll('.country-dropdown').forEach(dd => {
                    if (dd !== dropdown) {
                        dd.style.display = 'none';
                        dd.closest('.country-code-select').classList.remove('dropdown-open');
                    }
                });

                // تبديل القائمة الحالية
                if (dropdown.style.display === 'none') {
                    dropdown.style.display = 'block';
                    selector.classList.add('dropdown-open');
                } else {
                    dropdown.style.display = 'none';
                    selector.classList.remove('dropdown-open');
                }
            });
        });

        // إغلاق القوائم عند النقر خارج العناصر
        document.addEventListener('click', () => {
            document.querySelectorAll('.country-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
                dropdown.closest('.country-code-select').classList.remove('dropdown-open');
            });
        });
    }

    // تشغيل التهيئة عند تحميل المستند
    setupCountrySelectors();

    // إعادة التهيئة عند فتح النوافذ المنبثقة
    document.addEventListener('click', function(e) {
        // يمكنك تعديل هذه الشروط حسب طريقة فتح النوافذ المنبثقة في مشروعك
        if (e.target.matches('[href="#login-modal"], .login-btn')) {
            setTimeout(setupCountrySelectors, 100);
        }
    });

    // مراقبة التغييرات في DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                setupCountrySelectors();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    const countrySelectors = document.querySelectorAll('.country-code-select');

    countrySelectors.forEach(selector => {
        const selectedCountry = selector.querySelector('.selected-country');
        const dropdown = selector.querySelector('.country-dropdown');
        const countryItems = selector.querySelectorAll('.country-item');
        const flagImg = selector.querySelector('.flag-img');
        const codeSpan = selector.querySelector('.code');

        // معالجة النقر على محدد الدولة
        selectedCountry.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // إغلاق جميع القوائم الأخرى
            document.querySelectorAll('.country-code-select').forEach(otherSelector => {
                if (otherSelector !== selector) {
                    otherSelector.classList.remove('active');
                }
            });

            // تبديل القائمة الحالية
            selector.classList.toggle('active');
        });

        // معالجة اختيار دولة
        countryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();

                // تحديث العلم ورمز الدولة
                const newFlag = item.getAttribute('data-flag');
                const newCode = item.getAttribute('data-code');

                flagImg.src = newFlag;
                flagImg.alt = item.querySelector('span').textContent;
                codeSpan.textContent = newCode;

                // إغلاق القائمة
                selector.classList.remove('active');
            });
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function() {
            selector.classList.remove('active');
        });
    });
});

// إضافة الأنماط
const style = document.createElement('style');
style.textContent = `
.country-code-select {
    position: relative;
    cursor: pointer;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    transition: all 0.3s ease;
}

.country-code-select:hover {
    border-color: #007bff;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.country-code-select .flag-img {
    width: 24px;
    height: 18px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.country-code-select .code {
    font-size: 14px;
    color: #333;
    font-weight: 500;
}

.country-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    margin-top: 8px;
    max-height: 280px;
    min-width: 280px;
    overflow-y: auto;
    z-index: 1000;
}

.country-item {
    display: flex;
    align-items: center;
    padding: 12px 18px;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid #eee;
}

.country-item:last-child {
    border-bottom: none;
}

.country-item:hover {
    background: #f8f9fa;
    transform: translateX(-2px);
}

.country-item .flag-img {
    width: 24px;
    height: 18px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.country-item .country-name {
    flex: 1;
    font-size: 14px;
    color: #333;
}

.country-item .country-code {
    font-size: 14px;
    color: #666;
    background: #f8f9fa;
    padding: 2px 6px;
    border-radius: 4px;
}
`;

document.head.appendChild(style); 