/**
 * نظام إدارة النوافذ المنبثقة المحسن
 * يدعم تحميل النوافذ من ملفات منفصلة لتنظيم أفضل
 */

const ModalManager = (function() {
    // قائمة النوافذ المنبثقة مع مسارات ملفاتها
    const MODAL_FILES = {
        'login-modal': 'includes/login-modal.html',
        'forgot-password-modal': 'includes/forgot-password-modal.html',
        'user-dashboard-modal': 'includes/user-dashboard-modal.html',
        'password-change-modal': 'includes/password-change-modal.html'
    };
    
    let loadedModals = new Set();
    let isInitialized = false;

    /**
     * تهيئة نظام إدارة النوافذ المنبثقة
     */
    function init() {
        if (isInitialized) {
            console.log('🔄 Modal Manager مُهيأ مسبقاً');
            return;
        }

        console.log('🚀 تهيئة Modal Manager...');
        
        // تحميل النوافذ الأساسية مسبقاً
        preloadEssentialModals();
        
        // ربط أحداث إغلاق عامة
        setupGlobalEventListeners();
        
        isInitialized = true;
        console.log('✅ Modal Manager جاهز للعمل');
    }

    /**
     * تحميل النوافذ الأساسية مسبقاً
     */
    function preloadEssentialModals() {
        // تحميل نوافذ تسجيل الدخول واستعادة كلمة المرور مسبقاً
        const essentials = ['login-modal', 'forgot-password-modal'];
        essentials.forEach(modalId => {
            loadModalFile(modalId).catch(error => {
                console.warn(`⚠️ فشل في تحميل النافذة الأساسية ${modalId}:`, error);
            });
        });
    }

    /**
     * تحميل ملف النافذة المنبثقة
     */
    async function loadModalFile(modalId) {
        if (loadedModals.has(modalId)) {
            console.log(`📋 النافذة ${modalId} محملة مسبقاً`);
            return true;
        }

        const filePath = MODAL_FILES[modalId];
        if (!filePath) {
            throw new Error(`لا يوجد ملف محدد للنافذة: ${modalId}`);
        }

        try {
            console.log(`📥 تحميل النافذة ${modalId} من ${filePath}...`);
            
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const html = await response.text();
            
            // إزالة النافذة القديمة إن وجدت
            const existingModal = document.getElementById(modalId);
            if (existingModal) {
                existingModal.remove();
            }

            // إضافة النافذة الجديدة
            document.body.insertAdjacentHTML('beforeend', html);
            
            // تسجيل النافذة كمحملة
            loadedModals.add(modalId);
            
            console.log(`✅ تم تحميل النافذة ${modalId} بنجاح`);
            return true;

        } catch (error) {
            console.error(`❌ فشل في تحميل النافذة ${modalId}:`, error);
            throw error;
        }
    }

    /**
     * إظهار النافذة المنبثقة
     */
    async function showModal(modalId) {
        try {
            console.log(`🔓 فتح النافذة: ${modalId}`);

            // تحميل النافذة إذا لم تكن محملة
            await loadModalFile(modalId);

            const modal = document.getElementById(modalId);
            if (!modal) {
                throw new Error(`لم يتم العثور على النافذة: ${modalId}`);
            }

            // إخفاء جميع النوافذ الأخرى
            hideAllModals();

            // إظهار النافذة المطلوبة
            modal.style.display = 'block';
            modal.classList.add('show');
            
            // منع التمرير في الخلفية
            document.body.style.overflow = 'hidden';

            // ربط أحداث النافذة
            setupModalEvents(modalId, modal);

            console.log(`✅ تم فتح النافذة ${modalId} بنجاح`);
            return true;

        } catch (error) {
            console.error(`❌ فشل في فتح النافذة ${modalId}:`, error);
            return false;
        }
    }

    /**
     * إخفاء النافذة المنبثقة
     */
    function hideModal(modalId) {
        console.log(`🔒 إغلاق النافذة: ${modalId}`);

        const modal = document.getElementById(modalId);
        if (!modal) {
            console.warn(`⚠️ النافذة ${modalId} غير موجودة`);
            return false;
        }

        modal.style.display = 'none';
        modal.classList.remove('show');
        
        // إعادة التمرير إذا لم تعد هناك نوافذ مفتوحة
        if (!hasVisibleModals()) {
            document.body.style.overflow = '';
        }

        console.log(`✅ تم إغلاق النافذة ${modalId}`);
        return true;
    }

    /**
     * إخفاء جميع النوافذ المنبثقة
     */
    function hideAllModals() {
        const allModals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]');
        allModals.forEach(modal => {
            if (modal.style) {
                modal.style.display = 'none';
                modal.classList.remove('show');
            }
        });
        
        document.body.style.overflow = '';
        console.log('🔒 تم إغلاق جميع النوافذ المنبثقة');
    }

    /**
     * التحقق من وجود نوافذ مرئية
     */
    function hasVisibleModals() {
        const allModals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]');
        return Array.from(allModals).some(modal => 
            modal.style.display === 'block' || modal.classList.contains('show')
        );
    }

    /**
     * ربط أحداث النافذة المنبثقة
     */
    function setupModalEvents(modalId, modal) {
        // منع ربط الأحداث مرة أخرى
        if (modal.hasAttribute('data-events-bound')) {
            return;
        }

        // زر الإغلاق (X)
        const closeBtn = modal.querySelector('.close-modal, .close-forgot-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                hideModal(modalId);
            });
        }

        // إغلاق عند النقر خارج النافذة
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modalId);
            }
        });

        // أحداث خاصة بكل نافذة
        if (modalId === 'user-dashboard-modal') {
            setupUserDashboardEvents(modal);
        } else if (modalId === 'password-change-modal') {
            setupPasswordChangeEvents(modal);
        }

        modal.setAttribute('data-events-bound', 'true');
    }

    /**
     * ربط أحداث قائمة الملف الشخصي
     */
    function setupUserDashboardEvents(modal) {
        // تحديث اسم المستخدم
        const userNameElement = modal.querySelector('.user-name');
        if (userNameElement && typeof AuthSystem !== 'undefined') {
            const currentUser = AuthSystem.getCurrentUser();
            if (currentUser) {
                userNameElement.textContent = currentUser.name;
            }
        }

        // زر تسجيل الخروج
        const logoutBtn = modal.querySelector('.logout-btn');
        if (logoutBtn && !logoutBtn.hasAttribute('data-logout-bound')) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
                    hideModal('user-dashboard-modal');
                    if (typeof AuthSystem !== 'undefined') {
                        AuthSystem.logout();
                    }
                }
            });
            logoutBtn.setAttribute('data-logout-bound', 'true');
        }
    }

    /**
     * ربط أحداث نافذة تعديل كلمة المرور
     */
    function setupPasswordChangeEvents(modal) {
        const form = modal.querySelector('form');
        if (form && !form.hasAttribute('data-password-bound')) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                handlePasswordSubmit(e);
            });
            form.setAttribute('data-password-bound', 'true');
        }
    }

    /**
     * ربط أحداث عامة
     */
    function setupGlobalEventListeners() {
        // إغلاق النوافذ بمفتاح Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const visibleModals = Array.from(document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]'))
                    .filter(modal => modal.style.display === 'block' || modal.classList.contains('show'));
                
                if (visibleModals.length > 0) {
                    const lastModal = visibleModals[visibleModals.length - 1];
                    const modalId = lastModal.id;
                    if (modalId) {
                        hideModal(modalId);
                    }
                }
            }
        });
    }

    /**
     * التحقق من حالة النافذة
     */
    function isModalVisible(modalId) {
        const modal = document.getElementById(modalId);
        return modal && (modal.style.display === 'block' || modal.classList.contains('show'));
    }

    /**
     * الحصول على قائمة النوافذ المحملة
     */
    function getLoadedModals() {
        return Array.from(loadedModals);
    }

    // الوظائف العامة
    return {
        init,
        showModal,
        hideModal,
        hideAllModals,
        isModalVisible,
        getLoadedModals
    };
})();

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    ModalManager.init();
});

// جعل النظام متاحاً عالمياً
window.ModalManager = ModalManager; 