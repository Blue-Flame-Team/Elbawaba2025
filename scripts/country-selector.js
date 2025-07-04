document.addEventListener('DOMContentLoaded', function() {
    // قائمة الدول المدعومة
    const COUNTRIES = [
        { name: 'مصر', code: '+20', flag: 'assets/icons/egypt-flag.svg' },
        { name: 'السعودية', code: '+966', flag: 'assets/icons/saudi-flag.svg' },
        { name: 'الإمارات', code: '+971', flag: 'assets/icons/uae-flag.svg' }
    ];

    // دالة إنشاء وإعداد محدد الدولة
    function setupCountryDropdown(container) {
        // التأكد من وجود العناصر الأساسية
        const flagImg = container.querySelector('.flag-img');
        const codeSpan = container.querySelector('.code');
        
        if (!flagImg || !codeSpan) return;

        // إنشاء القائمة المنسدلة
        let dropdown = container.querySelector('.country-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
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
            container.appendChild(dropdown);
        }

        // مسح المحتوى الحالي للقائمة
        dropdown.innerHTML = '';

        // إضافة عناصر الدول للقائمة
        COUNTRIES.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.style.cssText = `
                display: flex;
                align-items: center;
                padding: 10px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;

            countryItem.innerHTML = `
                <img src="${country.flag}" alt="${country.name}" style="width: 24px; height: 18px; margin-left: 10px; object-fit: cover;">
                <span style="flex-grow: 1;">${country.name}</span>
                <span>${country.code}</span>
            `;

            // معالجة اختيار الدولة
            countryItem.addEventListener('click', (e) => {
                e.stopPropagation();
                flagImg.src = country.flag;
                flagImg.alt = country.name;
                codeSpan.textContent = country.code;
    dropdown.style.display = 'none';
                container.classList.remove('dropdown-open');
            });

            // تأثيرات التحويم
            countryItem.addEventListener('mouseenter', () => {
                countryItem.style.backgroundColor = '#f0f0f0';
            });
            countryItem.addEventListener('mouseleave', () => {
                countryItem.style.backgroundColor = 'transparent';
            });

            dropdown.appendChild(countryItem);
        });

        // تأكيد الموضع النسبي للحاوية
        container.style.position = 'relative';

        // دالة تبديل ظهور القائمة
        const toggleDropdown = (e) => {
            e.stopPropagation();
            
            // إغلاق جميع القوائم الأخرى
            document.querySelectorAll('.country-dropdown').forEach(dd => {
                if (dd !== dropdown) {
                    dd.style.display = 'none';
                    dd.closest('.country-code-select').classList.remove('dropdown-open');
                }
            });

            // فتح/إغلاق القائمة الحالية
            if (dropdown.style.display === 'none') {
                dropdown.style.display = 'block';
                container.classList.add('dropdown-open');
            } else {
                dropdown.style.display = 'none';
                container.classList.remove('dropdown-open');
            }
        };

        // إزالة المستمعين السابقين لتجنب التكرار
        container.removeEventListener('click', toggleDropdown);
        
        // إضافة معالج للنقر على الحاوية
        container.addEventListener('click', toggleDropdown);

        // إغلاق القائمة عند النقر خارجها
        const closeDropdownHandler = (e) => {
            if (!container.contains(e.target)) {
        dropdown.style.display = 'none';
                container.classList.remove('dropdown-open');
            }
        };

        // إزالة المستمع السابق
        document.removeEventListener('click', closeDropdownHandler);
        
        // إضافة مستمع جديد
        document.addEventListener('click', closeDropdownHandler);
    }

    // تهيئة جميع محددات الدول
    function initializeCountrySelectors() {
        const countrySelectors = document.querySelectorAll('.country-code-select');
        countrySelectors.forEach(setupCountryDropdown);
    }

    // تهيئة أولية
    initializeCountrySelectors();

    // إعادة التهيئة عند فتح النوافذ المنبثقة
    const loginTriggers = [
        '[href="#login-modal"]', 
        '.login-btn', 
        '#mobile-login-btn', 
        '.login-modal-trigger'
    ];

    document.addEventListener('click', function(e) {
        loginTriggers.forEach(trigger => {
            if (e.target.matches(trigger)) {
                setTimeout(initializeCountrySelectors, 300);
            }
        });
    });

    // دعم إعادة التهيئة للعناصر المضافة ديناميكيًا
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                initializeCountrySelectors();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}); 