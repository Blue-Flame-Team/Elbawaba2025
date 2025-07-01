/**
 * وظائف نافذة تعديل كلمة المرور
 * يدير جميع وظائف تعديل كلمة المرور للمستخدمين
 */

const PasswordChangeManager = (function() {
    
    /**
     * فتح نافذة تعديل كلمة المرور
     */
    function showPasswordChangeModal() {
        console.log('🔍 محاولة فتح نافذة تغيير كلمة المرور...');
        
        // التحقق من وجود النافذة
        let passwordModal = document.getElementById('password-change-modal');
        
        if (!passwordModal) {
            console.log('⚠️ نافذة تغيير كلمة المرور غير موجودة، جاري التحميل...');
            const modalPath = window.location.pathname.includes('/pages/') ? '../includes/password-change-modal.html' : 'includes/password-change-modal.html';
            
            fetch(modalPath)
                .then(response => {
                    console.log('✅ تم تحميل نافذة تغيير كلمة المرور:', response.status);
                    return response.text();
                })
                .then(html => {
                    document.body.insertAdjacentHTML('beforeend', html);
                    passwordModal = document.getElementById('password-change-modal');
                    setupPasswordModalEvents();
                    showPasswordModal();
                })
                .catch(error => {
                    console.error('❌ خطأ في تحميل نافذة تغيير كلمة المرور:', error);
                    alert('حدث خطأ في تحميل نافذة تغيير كلمة المرور');
                });
        } else {
            console.log('✅ نافذة تغيير كلمة المرور موجودة، جاري فتحها...');
            showPasswordModal();
        }
    }
    
    /**
     * إغلاق نافذة تعديل كلمة المرور
     */
    function closePasswordModal() {
        const modal = document.getElementById('password-change-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('✅ تم إغلاق نافذة تغيير كلمة المرور');
        }
    }
    
    /**
     * مسح حقول كلمة المرور
     */
    function clearPasswordFields() {
        const fields = ['currentPassword', 'newPassword', 'confirmPassword'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = '';
            }
        });
    }
    
    /**
     * معالجة إرسال نموذج تعديل كلمة المرور
     */
    function handlePasswordSubmit(event) {
        event.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword')?.value;
        const newPassword = document.getElementById('newPassword')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;
        
        console.log('🔒 محاولة تعديل كلمة المرور');
        
        // التحقق من ملء جميع الحقول
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('يرجى ملء جميع الحقول');
            return;
        }
        
        // التحقق من طول كلمة المرور الجديدة
        if (newPassword.length < 6) {
            alert('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
            return;
        }
        
        // التحقق من تطابق كلمة المرور الجديدة مع التأكيد
        if (newPassword !== confirmPassword) {
            alert('كلمة المرور الجديدة وتأكيدها غير متطابقتين');
            return;
        }
        
        // التحقق من أن كلمة المرور الجديدة مختلفة عن الحالية
        if (currentPassword === newPassword) {
            alert('كلمة المرور الجديدة يجب أن تكون مختلفة عن الحالية');
            return;
        }
        
        // تأثير بصري أثناء الحفظ
        const submitBtn = document.getElementById('submitPasswordChange');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'جاري الحفظ...';
            submitBtn.style.backgroundColor = '#666';
            submitBtn.disabled = true;
            
            // محاكاة عملية الحفظ
            setTimeout(() => {
                alert('تم تعديل كلمة المرور بنجاح!');
                closePasswordModal();
                
                // إعادة تعيين الزر
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '#00a19a';
                submitBtn.disabled = false;
            }, 1500);
        }
    }
    
    /**
     * تهيئة نظام تعديل كلمة المرور
     */
    function init() {
        console.log('🔒 إعداد نظام تعديل كلمة المرور');
        console.log('✅ نظام تعديل كلمة المرور جاهز للعمل');
    }
    
    // جعل الوظائف متاحة عالمياً للاستخدام في HTML
    window.showPasswordChangeModal = showPasswordChangeModal;
    window.closePasswordModal = closePasswordModal;
    window.handlePasswordSubmit = handlePasswordSubmit;
    
    // إرجاع الوظائف العامة
    return {
        init,
        showPasswordChangeModal,
        closePasswordModal,
        handlePasswordSubmit
    };
})();

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    PasswordChangeManager.init();
});

// جعل النظام متاحاً عالمياً
window.PasswordChangeManager = PasswordChangeManager;

// دالة لإعداد أحداث نافذة تغيير كلمة المرور
function setupPasswordModalEvents() {
    const modal = document.getElementById('password-change-modal');
    if (!modal) return;
    
    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePasswordModal();
        }
    });
    
    // معالجة تقديم النموذج
    window.handlePasswordSubmit = function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // التحقق من تطابق كلمات المرور
        if (newPassword !== confirmPassword) {
            alert('كلمة المرور الجديدة وتأكيدها غير متطابقين');
            return;
        }
        
        // التحقق من طول كلمة المرور
        if (newPassword.length < 6) {
            alert('يجب أن تكون كلمة المرور الجديدة 6 أحرف على الأقل');
            return;
        }
        
        // محاكاة تغيير كلمة المرور (يمكن تعديل هذا الجزء لاحقاً)
        console.log('✅ تم تغيير كلمة المرور بنجاح');
        alert('تم تغيير كلمة المرور بنجاح');
        closePasswordModal();
        
        // إعادة تعيين النموذج
        e.target.reset();
    };
}

// تحميل الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // محاولة إعداد الأحداث إذا كانت النافذة موجودة
    setupPasswordModalEvents();
}); 