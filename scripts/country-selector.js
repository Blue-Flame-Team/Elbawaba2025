console.log('🚀 تم تحميل ملف country-selector.js - الإصدار 1.1');

// قائمة الدول وأكواد الهاتف
const countries = [
    { name: 'المملكة العربية السعودية', code: '+966', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'مصر', code: '+20', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'الإمارات العربية المتحدة', code: '+971', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'الكويت', code: '+965', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'البحرين', code: '+973', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'سلطنة عمان', code: '+968', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'قطر', code: '+974', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'الأردن', code: '+962', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'العراق', code: '+964', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'لبنان', code: '+961', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'سوريا', code: '+963', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'فلسطين', code: '+970', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'المغرب', code: '+212', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'تونس', code: '+216', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'الجزائر', code: '+213', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'ليبيا', code: '+218', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'السودان', code: '+249', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
    { name: 'اليمن', code: '+967', flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
];

// اختبار وجود العناصر
function testCountrySelector() {
    console.log('🧪 اختبار قائمة الدول...');
    
    const selectors = document.querySelectorAll('.country-code-select');
    console.log('عدد العناصر الموجودة:', selectors.length);
    
    if (selectors.length > 0) {
        console.log('✅ تم العثور على العناصر');
        selectors.forEach((selector, index) => {
            console.log(`العنصر ${index + 1}:`, selector);
        });
    } else {
        console.log('❌ لم يتم العثور على أي عناصر');
    }
    
    const dropdown = document.querySelector('.country-dropdown');
    if (dropdown) {
        console.log('✅ القائمة المنسدلة موجودة');
    } else {
        console.log('❌ القائمة المنسدلة غير موجودة');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌍 بدء تهيئة قوائم اختيار الدول');
    
    // اختبار العناصر
    setTimeout(testCountrySelector, 1000);
    
    // البحث عن جميع عناصر اختيار الدولة
    const countrySelectors = document.querySelectorAll('.country-code-select');
    console.log(`🔍 تم العثور على ${countrySelectors.length} عنصر`);
    console.log('العناصر الموجودة:', countrySelectors);

    if (countrySelectors.length === 0) {
        console.warn('⚠️ لم يتم العثور على أي عناصر country-code-select');
        return;
    }

    // إضافة القائمة المنسدلة إلى body
    const dropdown = document.createElement('div');
    dropdown.className = 'country-dropdown';
    dropdown.style.display = 'none';
    dropdown.style.position = 'absolute';
    dropdown.style.zIndex = '10000';
    document.body.appendChild(dropdown);
    console.log('✅ تم إنشاء القائمة المنسدلة');

    // إضافة الدول للقائمة
    countries.forEach(country => {
        const item = document.createElement('div');
        item.className = 'country-item';
        item.innerHTML = `
            <img src="${country.flag}" alt="${country.name}" class="flag-img">
            <span class="country-name">${country.name}</span>
            <span class="country-code">${country.code}</span>
        `;
        dropdown.appendChild(item);
    });
    console.log(`✅ تم إضافة ${countries.length} دولة للقائمة`);

    countrySelectors.forEach((selector, index) => {
        console.log(`🎯 تهيئة العنصر رقم ${index + 1}:`, selector);
        
        // إضافة مستمع الحدث للنقر
        selector.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ تم النقر على العنصر:', this);
            
            const rect = this.getBoundingClientRect();
            console.log('📍 موقع العنصر:', rect);
            
            // تحديد موقع القائمة
            const dropdown = document.querySelector('.country-dropdown');
            if (dropdown) {
                dropdown.style.top = `${rect.bottom + window.scrollY + 5}px`;
                dropdown.style.left = `${rect.left + window.scrollX}px`;
                dropdown.style.width = `${Math.max(rect.width, 200)}px`;
            }
            
            toggleDropdown(this);
        });

        // إضافة مستمعات الأحداث للعناصر في القائمة
        dropdown.querySelectorAll('.country-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎯 تم النقر على دولة:', this);
                
                const countryName = this.querySelector('.country-name').textContent;
                const country = countries.find(c => c.name === countryName);
                
                if (country) {
                    console.log(`🎉 تم اختيار ${country.name}`);
                    updateSelectedCountry(selector, country);
                }
            });
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.country-code-select') && !e.target.closest('.country-dropdown')) {
            console.log('📍 النقر خارج القائمة');
            closeAllDropdowns();
        }
    });
    
    console.log('🎉 تم الانتهاء من تهيئة قوائم الدول');
});

function toggleDropdown(selector) {
    const dropdown = document.querySelector('.country-dropdown');
    if (!dropdown) {
        console.error('❌ لم يتم العثور على القائمة المنسدلة');
        return;
    }
    
    const isVisible = dropdown.style.display === 'block';
    console.log(`🔄 تبديل حالة القائمة: ${isVisible ? 'إغلاق' : 'فتح'}`);
    console.log('حالة القائمة الحالية:', dropdown.style.display);
    
    if (isVisible) {
        closeAllDropdowns();
    } else {
        // إغلاق جميع القوائم الأخرى أولاً
        closeAllDropdowns();
        
        // إظهار القائمة
        dropdown.style.display = 'block';
        dropdown.style.visibility = 'visible';
        dropdown.style.opacity = '1';
        selector.classList.add('active');
        
        console.log('✅ تم فتح القائمة');
        console.log('حالة القائمة بعد الفتح:', dropdown.style.display);
    }
}

function closeAllDropdowns() {
    console.log('🔒 إغلاق جميع القوائم');
    const dropdown = document.querySelector('.country-dropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
        dropdown.style.visibility = 'hidden';
        dropdown.style.opacity = '0';
    }
    document.querySelectorAll('.country-code-select').forEach(selector => {
        selector.classList.remove('active');
    });
}

function updateSelectedCountry(selector, country) {
    console.log('✨ تحديث الدولة المختارة:', country.name);
    
    const flagImg = selector.querySelector('.flag-img');
    const codeSpan = selector.querySelector('.code');
    
    if (flagImg) {
        flagImg.src = country.flag;
        flagImg.alt = country.name;
    } else {
        console.warn('⚠️ لم يتم العثور على عنصر العلم');
    }
    
    if (codeSpan) {
        codeSpan.textContent = country.code;
    } else {
        console.warn('⚠️ لم يتم العثور على عنصر الكود');
    }
    
    closeAllDropdowns();
    
    // إطلاق حدث التغيير
    const event = new CustomEvent('countryChange', {
        detail: { country: country }
    });
    selector.dispatchEvent(event);
} 