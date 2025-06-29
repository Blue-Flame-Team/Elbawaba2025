// ملف نافذة تسجيل الدخول - النسخة الأصلية
document.addEventListener('DOMContentLoaded', function() {
    const loginBtns = document.querySelectorAll('.login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');

    // فتح نافذة تسجيل الدخول
    loginBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
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
    
    console.log('تم تحميل نظام نافذة تسجيل الدخول');
});
