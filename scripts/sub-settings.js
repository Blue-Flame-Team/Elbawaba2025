document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 فحص أيقونة البروفايل...');
    
    // فحص بيانات تسجيل الدخول الموجودة بطرق متعددة
    const currentLoginStatus = localStorage.getItem('isLoggedIn');
    const authSystemUser = localStorage.getItem('currentUser');
    console.log('📊 حالة تسجيل الدخول الحالية:', currentLoginStatus);
    console.log('📊 بيانات المستخدم:', authSystemUser);
    
    // فحص إضافي للمستخدم المسجل من auth-system
    let isUserLoggedIn = false;
    try {
        if (authSystemUser) {
            const userData = JSON.parse(authSystemUser);
            isUserLoggedIn = userData && (userData.isLoggedIn === true || userData.name);
            console.log('📊 المستخدم مسجل دخول حسب auth-system:', isUserLoggedIn);
        }
    } catch (e) {
        console.log('⚠️ خطأ في قراءة بيانات المستخدم:', e);
    }
    
    // تنظيف localStorage من أي بيانات قديمة أو مُفسدة
    try {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn && isLoggedIn !== 'true' && isLoggedIn !== 'false') {
            localStorage.removeItem('isLoggedIn');
            console.log('🧹 تم تنظيف بيانات تسجيل الدخول المُفسدة');
        }
        
        // إزالة أي تسجيل دخول تجريبي متبقي
        if (isLoggedIn === 'true') {
            const currentUser = localStorage.getItem('currentUser');
            try {
                const user = JSON.parse(currentUser);
                if (user && user.username === 'test') {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                    console.log('🧹 تم إزالة تسجيل الدخول التجريبي');
                }
            } catch (e) {
                // إذا كان هناك خطأ في البيانات، احذفها
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
                console.log('🧹 تم تنظيف بيانات مُفسدة');
            }
        }
    } catch (e) {
        console.log('⚠️ خطأ في قراءة localStorage:', e);
    }
    
    // البحث عن أيقونات البروفايل
    const desktopProfileBtn = document.querySelector('.profile-icon-btn');
    const mobileProfileBtn = document.querySelector('#mobile-profile-btn');
    
    console.log('Desktop Profile Button:', desktopProfileBtn);
    console.log('Mobile Profile Button:', mobileProfileBtn);
    
    // إجبار إخفاء الأيقونات بقوة
    if (desktopProfileBtn) {
        desktopProfileBtn.classList.remove('show');
        desktopProfileBtn.style.setProperty('display', 'none', 'important');
        desktopProfileBtn.style.setProperty('visibility', 'hidden', 'important');
        desktopProfileBtn.style.setProperty('opacity', '0', 'important');
        desktopProfileBtn.removeAttribute('data-profile-setup');
    }
    if (mobileProfileBtn) {
        mobileProfileBtn.classList.remove('show');
        mobileProfileBtn.style.setProperty('display', 'none', 'important');
        mobileProfileBtn.style.setProperty('visibility', 'hidden', 'important');
        mobileProfileBtn.style.setProperty('opacity', '0', 'important');
        mobileProfileBtn.removeAttribute('data-profile-setup');
    }
    console.log('🔒 تم إخفاء أيقونات البروفايل بقوة');
    
    // فحص حالة تسجيل الدخول بطرق متعددة
    const isLoggedInFlag = localStorage.getItem('isLoggedIn') === 'true';
    const isLoggedIn = isLoggedInFlag || isUserLoggedIn;
    console.log('حالة تسجيل الدخول:', isLoggedIn);
    
    // إظهار الأيقونات إذا كان المستخدم مسجل دخول
    if (isLoggedIn) {
        if (desktopProfileBtn) {
            desktopProfileBtn.classList.add('show');
            console.log('✅ تم إظهار أيقونة البروفايل في الديسك توب');
        }
        if (mobileProfileBtn) {
            mobileProfileBtn.classList.add('show');
            console.log('✅ تم إظهار أيقونة البروفايل في الموبايل');
        }
    } else {
        // إخفاء الأيقونات إذا لم يكن مسجل دخول
        if (desktopProfileBtn) {
            desktopProfileBtn.classList.remove('show');
            console.log('🔒 تم إخفاء أيقونة البروفايل في الديسك توب');
        }
        if (mobileProfileBtn) {
            mobileProfileBtn.classList.remove('show');
            console.log('🔒 تم إخفاء أيقونة البروفايل في الموبايل');
        }
    }
    
    // إضافة event listeners للأيقونات
    if (desktopProfileBtn) {
        desktopProfileBtn.addEventListener('click', function() {
            console.log('تم النقر على أيقونة البروفايل (ديسك توب)');
            // يمكن إضافة وظيفة فتح قائمة البروفايل هنا
        });
    }
    
    if (mobileProfileBtn) {
        mobileProfileBtn.addEventListener('click', function() {
            console.log('تم النقر على أيقونة البروفايل (موبايل)');
            // يمكن إضافة وظيفة فتح قائمة البروفايل هنا
        });
    }
});

// دالة اختبار تسجيل الدخول (يمكن استدعاؤها من الكونسول)
function testLoginNow() {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({
        username: 'test',
        email: 'test@example.com'
    }));
    console.log('✅ تم تسجيل دخول اختباري - ستظهر الأيقونات خلال نصف ثانية');
}

// دالة اختبار تسجيل الخروج (يمكن استدعاؤها من الكونسول)
function testLogoutNow() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    console.log('🔓 تم تسجيل خروج اختباري - ستختفي الأيقونات خلال نصف ثانية');
}

// إتاحة الدوال للاستخدام من الكونسول
window.testLoginNow = testLoginNow;
window.testLogoutNow = testLogoutNow;
window.forceShowProfileIcons = forceShowProfileIcons;

// حل مؤقت لمشكلة عدم ظهور الأيقونة بعد تسجيل الدخول
function forceShowProfileIcons() {
    const desktopBtn = document.querySelector('.profile-icon-btn');
    const mobileBtn = document.querySelector('#mobile-profile-btn');
    
    if (desktopBtn) {
        desktopBtn.classList.add('show');
        desktopBtn.style.setProperty('display', 'block', 'important');
        desktopBtn.style.setProperty('visibility', 'visible', 'important');
        desktopBtn.style.setProperty('opacity', '1', 'important');
        desktopBtn.style.setProperty('pointer-events', 'auto', 'important');
        desktopBtn.style.setProperty('position', 'relative', 'important');
        desktopBtn.style.setProperty('left', 'auto', 'important');
        console.log('💪 تم إجبار إظهار أيقونة الديسك توب');
    }
    
    if (mobileBtn) {
        mobileBtn.classList.add('show');
        mobileBtn.style.setProperty('display', 'block', 'important');
        mobileBtn.style.setProperty('visibility', 'visible', 'important');
        mobileBtn.style.setProperty('opacity', '1', 'important');
        mobileBtn.style.setProperty('pointer-events', 'auto', 'important');
        mobileBtn.style.setProperty('position', 'relative', 'important');
        mobileBtn.style.setProperty('left', 'auto', 'important');
        console.log('💪 تم إجبار إظهار أيقونة الموبايل');
    }
}

// مراقبة تغييرات localStorage لإظهار الأيقونة عند تسجيل الدخول
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    
    if (key === 'isLoggedIn' && value === 'true') {
        setTimeout(forceShowProfileIcons, 100);
        console.log('🔍 تم رصد تسجيل دخول (isLoggedIn) - سيتم إظهار الأيقونات');
    }
    
    if (key === 'currentUser') {
        try {
            const userData = JSON.parse(value);
            if (userData && (userData.isLoggedIn === true || userData.name)) {
                setTimeout(forceShowProfileIcons, 100);
                console.log('🔍 تم رصد تسجيل دخول (currentUser) - سيتم إظهار الأيقونات');
            }
        } catch (e) {
            // تجاهل الأخطاء
        }
    }
};

// فحص إضافي بعد 3 ثوان
setTimeout(function() {
    console.log('🔍 فحص إضافي للأيقونات...');
    
    const desktopProfileBtn = document.querySelector('.profile-icon-btn');
    const mobileProfileBtn = document.querySelector('#mobile-profile-btn');
    
    if (desktopProfileBtn) {
        const computedStyle = window.getComputedStyle(desktopProfileBtn);
        console.log('Desktop Profile Button computed style:');
        console.log('- display:', computedStyle.display);
        console.log('- visibility:', computedStyle.visibility);
        console.log('- opacity:', computedStyle.opacity);
        console.log('- position:', computedStyle.position);
        console.log('- z-index:', computedStyle.zIndex);
        console.log('- width:', computedStyle.width);
        console.log('- height:', computedStyle.height);
        
        // فحص حالة تسجيل الدخول وإظهار الأيقونة إذا لزم الأمر
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            desktopProfileBtn.classList.add('show');
            console.log('✅ تم إظهار أيقونة البروفايل للديسك توب بنجاح');
        } else {
            console.log('🔒 أيقونة البروفايل مخفية - لم يتم تسجيل الدخول');
        }
    }
    
    if (mobileProfileBtn) {
        const computedStyle = window.getComputedStyle(mobileProfileBtn);
        console.log('Mobile Profile Button computed style:');
        console.log('- display:', computedStyle.display);
        console.log('- visibility:', computedStyle.visibility);
        console.log('- opacity:', computedStyle.opacity);
        console.log('- position:', computedStyle.position);
        console.log('- z-index:', computedStyle.zIndex);
        console.log('- width:', computedStyle.width);
        console.log('- height:', computedStyle.height);
        
        // فحص حالة تسجيل الدخول وإظهار الأيقونة إذا لزم الأمر
        const isLoggedInMobile = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedInMobile) {
            mobileProfileBtn.classList.add('show');
            console.log('✅ تم إظهار أيقونة البروفايل للموبايل بنجاح');
        } else {
            console.log('🔒 أيقونة البروفايل مخفية - لم يتم تسجيل الدخول');
        }
    }
    
    // إضافة CSS للتصميم الصحيح
    const profileCSS = document.createElement('style');
    profileCSS.textContent = `
        /* تصميم أيقونة البروفايل مثل باقي الأيقونات */
        .profile-icon-btn,
        #mobile-profile-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        }
        
        .profile-icon-btn:hover,
        #mobile-profile-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .profile-icon-btn img,
        #mobile-profile-btn img {
            width: 24px;
            height: 24px;
            filter: brightness(0) invert(1);
        }
        
        /* إخفاء افتراضي - مهم جداً */
        .profile-icon-btn,
        #mobile-profile-btn {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            left: -9999px !important;
        }
        
        /* إخفاء حتى لو كان له data-profile-setup */
        .profile-icon-btn[data-profile-setup],
        #mobile-profile-btn[data-profile-setup] {
            display: none !important;
            visibility: hidden !important;
        }
        
        /* إظهار عند تسجيل الدخول */
        .profile-icon-btn.show,
        #mobile-profile-btn.show {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            position: relative !important;
            left: auto !important;
        }
    `;
    document.head.appendChild(profileCSS);
    console.log('🎨 تم إضافة تصميم أيقونة البروفايل');
    
    // مراقبة مستمرة للأيقونات حسب حالة تسجيل الدخول
    setInterval(function() {
        const desktopBtn = document.querySelector('.profile-icon-btn');
        const mobileBtn = document.querySelector('#mobile-profile-btn');
        
        // فحص حالة تسجيل الدخول بطرق متعددة
        const isLoggedInFlag = localStorage.getItem('isLoggedIn') === 'true';
        let isUserLoggedIn = false;
        try {
            const authSystemUser = localStorage.getItem('currentUser');
            if (authSystemUser) {
                const userData = JSON.parse(authSystemUser);
                isUserLoggedIn = userData && (userData.isLoggedIn === true || userData.name);
            }
        } catch (e) {
            // تجاهل الأخطاء
        }
        const isLoggedIn = isLoggedInFlag || isUserLoggedIn;
        
        if (isLoggedIn) {
            // إظهار الأيقونات عند تسجيل الدخول
            if (desktopBtn && !desktopBtn.classList.contains('show')) {
                desktopBtn.classList.add('show');
                desktopBtn.style.setProperty('display', 'block', 'important');
                desktopBtn.style.setProperty('visibility', 'visible', 'important');
                desktopBtn.style.setProperty('opacity', '1', 'important');
                desktopBtn.style.setProperty('pointer-events', 'auto', 'important');
                desktopBtn.style.setProperty('position', 'relative', 'important');
                desktopBtn.style.setProperty('left', 'auto', 'important');
                console.log('✅ تم إظهار أيقونة الديسك توب بعد تسجيل الدخول');
            }
            if (mobileBtn && !mobileBtn.classList.contains('show')) {
                mobileBtn.classList.add('show');
                mobileBtn.style.setProperty('display', 'block', 'important');
                mobileBtn.style.setProperty('visibility', 'visible', 'important');
                mobileBtn.style.setProperty('opacity', '1', 'important');
                mobileBtn.style.setProperty('pointer-events', 'auto', 'important');
                mobileBtn.style.setProperty('position', 'relative', 'important');
                mobileBtn.style.setProperty('left', 'auto', 'important');
                console.log('✅ تم إظهار أيقونة الموبايل بعد تسجيل الدخول');
            }
        } else {
            // إخفاء الأيقونات عند عدم تسجيل الدخول
            if (desktopBtn && desktopBtn.classList.contains('show')) {
                desktopBtn.classList.remove('show');
                desktopBtn.style.setProperty('display', 'none', 'important');
                desktopBtn.style.setProperty('visibility', 'hidden', 'important');
                desktopBtn.style.setProperty('opacity', '0', 'important');
                console.log('🔒 تم إخفاء أيقونة الديسك توب بعد تسجيل الخروج');
            }
            if (mobileBtn && mobileBtn.classList.contains('show')) {
                mobileBtn.classList.remove('show');
                mobileBtn.style.setProperty('display', 'none', 'important');
                mobileBtn.style.setProperty('visibility', 'hidden', 'important');
                mobileBtn.style.setProperty('opacity', '0', 'important');
                console.log('🔒 تم إخفاء أيقونة الموبايل بعد تسجيل الخروج');
            }
        }
    }, 500); // فحص كل نصف ثانية
    
    // فحص جميع العناصر التي قد تخفي الأيقونة
    const topBar = document.querySelector('.top-bar');
    const iconsGroup = document.querySelector('.main-icons-group');
    const mobileIcons = document.querySelector('.mobile-icons');
    
    console.log('Top Bar:', topBar);
    console.log('Icons Group:', iconsGroup);
    console.log('Mobile Icons:', mobileIcons);
    
    // فحص جميع أزرار البروفايل في الصفحة
    const allProfileBtns = document.querySelectorAll('[class*="profile"], [id*="profile"]');
    console.log('جميع عناصر البروفايل في الصفحة:', allProfileBtns);
    
    allProfileBtns.forEach((btn, index) => {
        console.log(`عنصر ${index + 1}:`, btn);
        console.log('- Classes:', btn.className);
        console.log('- ID:', btn.id);
        console.log('- Display:', window.getComputedStyle(btn).display);
    });
    
}, 3000);

// تهيئة زر البروفايل للموبايل
function initializeMobileProfileButton() {
    const mobileProfileBtn = document.getElementById('mobile-profile-btn');
    
    if (mobileProfileBtn) {
        // إزالة جميع الأنماط المخفية
        mobileProfileBtn.style.display = '';
        mobileProfileBtn.style.visibility = '';
        mobileProfileBtn.style.opacity = '';
        
        // إضافة الأنماط الأساسية
        mobileProfileBtn.style.fontFamily = '"Droid Arabic Kufi", sans-serif';
        
        // تحديث حالة العرض عند تغيير حجم النافذة
        function updateProfileButtonVisibility() {
            const isMobile = window.innerWidth <= 768;
            mobileProfileBtn.style.display = isMobile ? 'block' : 'none';
        }
        
        // تحديث حالة العرض عند التحميل
        updateProfileButtonVisibility();
        
        // تحديث حالة العرض عند تغيير حجم النافذة
        window.addEventListener('resize', updateProfileButtonVisibility);
    }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileProfileButton();
});