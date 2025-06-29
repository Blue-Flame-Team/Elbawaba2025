/**
 * وظائف نافذة تعديل كلمة المرور
 * يدير جميع وظائف تعديل كلمة المرور للمستخدمين
 */

const PasswordChangeManager = (function() {
    
    /**
     * فتح نافذة تعديل كلمة المرور
     */
    function showPasswordChangeModal() {
        console.log('🔒 فتح نافذة تعديل كلمة المرور');
        
        // استخدام Modal Manager
        if (typeof ModalManager !== 'undefined') {
            ModalManager.showModal('password-change-modal');
            
            // تركيز على أول حقل بعد فتح النافذة
            setTimeout(() => {
                const firstInput = document.getElementById('currentPassword');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        } else {
            console.error('❌ Modal Manager غير متوفر');
        }
    }
    
    /**
     * إغلاق نافذة تعديل كلمة المرور
     */
    function closePasswordModal() {
        console.log('🔒 إغلاق نافذة تعديل كلمة المرور');
        
        // استخدام Modal Manager
        if (typeof ModalManager !== 'undefined') {
            ModalManager.hideModal('password-change-modal');
        }
        
        // مسح الحقول
        clearPasswordFields();
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