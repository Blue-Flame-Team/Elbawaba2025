// وظائف نافذة خدمة الأسانيد
let asanidModal;
let closeAsanidModal;
let asanidContactForm;
let submitAsanidForm;

// دالة لفتح النافذة
window.showAsanidModal = function() {
    console.log('🔍 محاولة فتح نافذة خدمة الأسانيد...');
    
    // إذا لم تكن النافذة موجودة، نحاول تحميلها من الملف
    if (!asanidModal) {
        console.log('⚠️ النافذة غير موجودة، جاري التحميل...');
        const modalPath = window.location.pathname.includes('/pages/') ? '../includes/user-dashboard-modal.html' : 'includes/user-dashboard-modal.html';
        console.log('📂 Loading modal from:', modalPath);
        fetch(modalPath)
            .then(response => {
                console.log('✅ Modal fetch response:', response.status);
                return response.text();
            })
            .then(html => {
                console.log('✅ Modal HTML loaded');
                // إضافة النافذة للصفحة
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const newModal = tempDiv.querySelector('#asanid-mobile-modal');
                if (newModal) {
                    document.body.appendChild(newModal);
                    asanidModal = newModal;
                    
                    // تحديث المراجع
                    closeAsanidModal = document.getElementById('closeAsanidModal');
                    asanidContactForm = document.getElementById('asanidContactForm');
                    submitAsanidForm = document.getElementById('submitAsanidForm');
                    
                    console.log('✅ Modal elements found:', {
                        closeBtn: !!closeAsanidModal,
                        form: !!asanidContactForm,
                        submitBtn: !!submitAsanidForm
                    });
                    
                    // إعادة ربط الأحداث
                    bindEvents();
                    
                    // فتح النافذة
                    showModal();
                } else {
                    console.error('❌ لم يتم العثور على النافذة في الملف المحمل');
                    console.log('🔍 HTML content:', html.substring(0, 200) + '...');
                }
            })
            .catch(error => {
                console.error('❌ خطأ في تحميل النافذة:', error);
                console.log('📍 Current path:', window.location.pathname);
                console.log('🔍 Attempted modal path:', modalPath);
                alert('حدث خطأ في تحميل نافذة خدمة الأسانيد');
            });
    } else {
        console.log('✅ النافذة موجودة، جاري فتحها...');
        showModal();
    }
};

// دالة لإظهار النافذة
function showModal() {
    if (asanidModal) {
        asanidModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // ملء البيانات من localStorage إذا كانت موجودة
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                document.getElementById('fullName').value = user.name || '';
                document.getElementById('email').value = user.email || '';
                document.getElementById('phone').value = user.phone || '';
            } catch (error) {
                console.error('❌ خطأ في تحميل بيانات المستخدم:', error);
            }
        }
        
        console.log('✅ تم فتح النافذة بنجاح');
    }
}

// دالة لإغلاق النافذة
function closeModal() {
    if (asanidModal) {
        asanidModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('✅ تم إغلاق النافذة');
    }
}

// دالة لربط الأحداث
function bindEvents() {
    console.log('🔄 جاري ربط الأحداث...');
    
    // إضافة مستمع حدث للزر إغلاق
    if (closeAsanidModal) {
        closeAsanidModal.addEventListener('click', closeModal);
    }

    // إغلاق النافذة عند النقر خارجها
    if (asanidModal) {
        asanidModal.addEventListener('click', function(e) {
            if (e.target === asanidModal) {
                closeModal();
            }
        });
    }

    // معالجة حدث النقر على زر الإرسال
    if (submitAsanidForm) {
        submitAsanidForm.addEventListener('click', function(e) {
            e.preventDefault();
            
            // جمع البيانات من النموذج
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value
            };

            // التحقق من صحة البيانات
            if (!formData.fullName || !formData.email || !formData.phone || !formData.subject) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            // التحقق من صحة البريد الإلكتروني
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }

            // إرسال البيانات (يمكن تعديل هذا الجزء لإرسال البيانات إلى الخادم)
            console.log('📤 إرسال البيانات:', formData);
            
            // إظهار رسالة نجاح وإغلاق النافذة
            alert('تم إرسال طلبك بنجاح. سنقوم بالرد عليك في أقرب وقت ممكن.');
            closeModal();
        });
    }
    
    console.log('✅ تم ربط جميع الأحداث بنجاح');
}

// تحميل الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث المراجع
    asanidModal = document.getElementById('asanid-mobile-modal');
    closeAsanidModal = document.getElementById('closeAsanidModal');
    asanidContactForm = document.getElementById('asanidContactForm');
    submitAsanidForm = document.getElementById('submitAsanidForm');
    
    // ربط الأحداث
    bindEvents();
}); 