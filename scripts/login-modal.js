// ملف نافذة تسجيل الدخول - النسخة الأصلية
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔓 Login Modal Script Loaded');

    const loginBtns = document.querySelectorAll('.login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    let forgotPasswordModal = document.getElementById('forgot-password-modal');

    // فتح نافذة تسجيل الدخول
    loginBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            console.log('🖱️ Login Modal Trigger Clicked');
            e.preventDefault();
            if (loginModal) {
                loginModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // إغلاق نافذة تسجيل الدخول
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (loginModal) {
                loginModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
    
    // إغلاق النافذة عند النقر خارجها
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // تحميل نافذة نسيت كلمة المرور إذا لم تكن موجودة
    function loadForgotPasswordModal() {
        if (!forgotPasswordModal) {
            const modalPath = window.location.pathname.includes('/pages/') ? '../includes/forgot-password-modal.html' : 'includes/forgot-password-modal.html';
            
            return fetch(modalPath)
                .then(response => response.text())
                .then(html => {
                    document.body.insertAdjacentHTML('beforeend', html);
                    forgotPasswordModal = document.getElementById('forgot-password-modal');
                    setupForgotPasswordEvents();
                })
                .catch(error => {
                    console.error('خطأ في تحميل نافذة نسيت كلمة المرور:', error);
                });
        }
        return Promise.resolve();
    }

    // إعداد أحداث نافذة نسيت كلمة المرور
    function setupForgotPasswordEvents() {
        if (!forgotPasswordModal) return;

        const closeBtn = forgotPasswordModal.querySelector('.close-forgot-modal');
        const submitBtn = forgotPasswordModal.querySelector('.forgot-password-submit-btn');
        const usernameInput = forgotPasswordModal.querySelector('.forgot-password-input');

        // إغلاق النافذة
        if (closeBtn && !closeBtn.hasAttribute('data-close-setup')) {
            closeBtn.addEventListener('click', closeForgotPasswordModal);
            closeBtn.setAttribute('data-close-setup', 'true');
        }

        // إغلاق النافذة عند النقر خارجها
        forgotPasswordModal.addEventListener('click', function(e) {
            if (e.target === forgotPasswordModal) {
                closeForgotPasswordModal();
            }
        });

        // معالجة تقديم النموذج
        if (submitBtn && !submitBtn.hasAttribute('data-forgot-submit-setup')) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (!usernameInput.value) {
                    alert('الرجاء إدخال اسم المستخدم');
                    return;
                }
                // هنا يمكن إضافة كود إرسال طلب استعادة كلمة المرور
                alert('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني');
                closeForgotPasswordModal();
            });
            submitBtn.setAttribute('data-forgot-submit-setup', 'true');
        }
    }

    // فتح نافذة نسيت كلمة المرور
    function showForgotPasswordModal() {
        loadForgotPasswordModal().then(() => {
            if (forgotPasswordModal) {
                loginModal.classList.remove('show');
                forgotPasswordModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // إغلاق نافذة نسيت كلمة المرور
    function closeForgotPasswordModal() {
        if (forgotPasswordModal) {
            forgotPasswordModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // ربط رابط نسيت كلمة المرور
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showForgotPasswordModal();
        });
    }
});

// إعادة تهيئة القائمة المنسدلة عند فتح النافذة
function openLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('فتح النافذة');
        
        // إعادة تهيئة محددي الدول
        if (typeof initializeCountrySelectors === 'function') {
            initializeCountrySelectors();
        }
    }
}

// معالجة فتح النافذة المنبثقة
const loginTriggers = document.querySelectorAll('[href="#login-modal"], .login-btn, #mobile-login-btn');
loginTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        console.log('🖱️ Login Modal Trigger Clicked');
        
        // محاولة العثور على النافذة المنبثقة
        const loginModal = document.getElementById('login-modal') || 
                           document.querySelector('.login-modal');
        
        if (loginModal) {
            console.log('✅ Login Modal Found');
            
            // محاولة تهيئة محدد الدولة
            const countrySelectors = loginModal.querySelectorAll('.country-code-select');
            console.log(`🌍 Country Selectors in Modal: ${countrySelectors.length}`);
            
            countrySelectors.forEach((selector, index) => {
                console.log(`🔢 Examining Selector ${index + 1}`);
                console.log('Selector Details:', {
                    initialized: selector.dataset.initialized,
                    children: selector.children.length,
                    hasSelectedCountry: !!selector.querySelector('.selected-country')
                });
            });
        } else {
            console.error('❌ Login Modal Not Found');
        }
    });
});
