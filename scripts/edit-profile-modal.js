// وظائف نافذة تعديل الملف الشخصي

// تعريف المتغيرات في النطاق العام
let editProfileModal;
let closeEditProfileModal;
let editProfileForm;
let changePasswordBtn;
let saveEditProfile;

// دالة إعداد زر تغيير كلمة المرور
function setupPasswordButton() {
    const btn = document.getElementById('changePasswordBtn');
    if (btn) {
        console.log('✅ تم العثور على زر تغيير كلمة المرور');
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🔍 تم النقر على زر تغيير كلمة المرور');
            
            // إخفاء نافذة تعديل البيانات
            if (editProfileModal) {
                editProfileModal.style.display = 'none';
            }
            
            // عرض نافذة تغيير كلمة المرور
            if (typeof window.showPasswordChangeModal === 'function') {
                window.showPasswordChangeModal();
            } else {
                console.error('❌ دالة showPasswordChangeModal غير معرفة');
                // محاولة تحميل الملف
                const script = document.createElement('script');
                script.src = window.location.pathname.includes('/pages/') ? '../scripts/profile-icons-universal-fix.js' : 'scripts/profile-icons-universal-fix.js';
                script.onload = function() {
                    if (typeof window.showPasswordChangeModal === 'function') {
                        window.showPasswordChangeModal();
                    }
                };
                document.head.appendChild(script);
            }
        };
        console.log('✅ تم ربط حدث النقر بزر تغيير كلمة المرور');
    } else {
        console.log('⚠️ لم يتم العثور على زر تغيير كلمة المرور');
    }
}

// تعريف الدالة في النطاق العام
window.showEditProfileModal = function() {
    console.log('🔍 محاولة فتح نافذة تعديل البيانات...');
    
    // إذا لم تكن النافذة موجودة، نحاول تحميلها من الملف
    if (!editProfileModal) {
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
                const newModal = tempDiv.querySelector('#edit-profile-modal');
                if (newModal) {
                    document.body.appendChild(newModal);
                    editProfileModal = newModal;
                    
                    // تحديث المراجع
                    closeEditProfileModal = document.getElementById('closeEditProfileModal');
                    editProfileForm = document.getElementById('editProfileForm');
                    changePasswordBtn = document.getElementById('changePasswordBtn');
                    saveEditProfile = document.getElementById('saveEditProfile');
                    
                    console.log('✅ Modal elements found:', {
                        closeBtn: !!closeEditProfileModal,
                        form: !!editProfileForm,
                        changePasswordBtn: !!changePasswordBtn,
                        saveBtn: !!saveEditProfile
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
                alert('حدث خطأ في تحميل نافذة تعديل البيانات');
            });
    } else {
        console.log('✅ النافذة موجودة، جاري فتحها...');
        showModal();
    }
};

// دالة لإظهار النافذة
function showModal() {
    if (editProfileModal) {
        editProfileModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        loadUserData();
        console.log('✅ تم فتح النافذة بنجاح');
    }
}

// دالة لإغلاق النافذة
function closeModal() {
    if (editProfileModal) {
        editProfileModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('✅ تم إغلاق النافذة');
    }
}

// دالة لربط الأحداث
function bindEvents() {
    console.log('🔄 جاري ربط الأحداث...');
    
    // إضافة مستمع حدث للزر إغلاق
    if (closeEditProfileModal) {
        closeEditProfileModal.addEventListener('click', closeModal);
    }

    // إغلاق النافذة عند النقر خارجها
    if (editProfileModal) {
        editProfileModal.addEventListener('click', function(e) {
            if (e.target === editProfileModal) {
                closeModal();
            }
        });
    }

    // معالجة حدث النقر على زر تغيير كلمة المرور
    setupPasswordButton();

    // معالجة حدث النقر على زر حفظ التغييرات
    if (saveEditProfile) {
        saveEditProfile.addEventListener('click', function(e) {
            e.preventDefault();
            
            // جمع البيانات من النموذج
            const formData = {
                userType: document.getElementById('userType').value,
                email: document.getElementById('editEmail').value,
                city: document.getElementById('city').value,
                address: document.getElementById('detailedAddress').value,
                phone: document.getElementById('editPhone').value,
                mobile: document.getElementById('mobilePhone').value,
                fax: document.getElementById('fax').value,
                poBox: document.getElementById('poBox').value,
                postalCode: document.getElementById('postalCode').value
            };

            // التحقق من صحة البيانات
            if (!formData.email) {
                alert('يرجى إدخال البريد الإلكتروني');
                return;
            }

            // تحديث بيانات المستخدم في localStorage
            try {
                const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
                const updatedUserData = { ...currentUserData, ...formData };
                localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
                
                // إغلاق النافذة وإظهار رسالة نجاح
                closeModal();
                alert('تم تحديث البيانات بنجاح');
            } catch (error) {
                console.error('❌ خطأ في حفظ البيانات:', error);
                alert('حدث خطأ أثناء حفظ البيانات');
            }
        });
    }
    
    console.log('✅ تم ربط جميع الأحداث بنجاح');
}

// تحميل بيانات المستخدم
function loadUserData() {
    console.log('📥 جاري تحميل بيانات المستخدم...');
    
    // محاولة استرجاع بيانات المستخدم من localStorage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            
            // ملء النموذج بالبيانات
            document.getElementById('userType').value = user.userType || '';
            document.getElementById('editEmail').value = user.email || '';
            document.getElementById('city').value = user.city || '';
            document.getElementById('detailedAddress').value = user.address || '';
            document.getElementById('editPhone').value = user.phone || '';
            document.getElementById('mobilePhone').value = user.mobile || '';
            document.getElementById('fax').value = user.fax || '';
            document.getElementById('poBox').value = user.poBox || '';
            document.getElementById('postalCode').value = user.postalCode || '';
            
            console.log('✅ تم تحميل البيانات بنجاح');
        } catch (error) {
            console.error('❌ خطأ في تحميل بيانات المستخدم:', error);
        }
    } else {
        console.log('ℹ️ لا توجد بيانات مستخدم محفوظة');
    }
}

// تحميل الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث المراجع
    editProfileModal = document.getElementById('edit-profile-modal');
    closeEditProfileModal = document.getElementById('closeEditProfileModal');
    editProfileForm = document.getElementById('editProfileForm');
    changePasswordBtn = document.getElementById('changePasswordBtn');
    saveEditProfile = document.getElementById('saveEditProfile');
    
    // ربط الأحداث
    bindEvents();
    
    // إعداد زر تغيير كلمة المرور
    setupPasswordButton();
    
    // محاولة ثانية بعد تأخير قصير
    setTimeout(setupPasswordButton, 1000);
}); 