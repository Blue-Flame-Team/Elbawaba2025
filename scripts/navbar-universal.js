// ============================================
// مكتبة الناف بار الموحدة - لجميع الصفحات
// تحتوي على: نوافذ تسجيل الدخول، البحث، الإعدادات، إلخ...
// ============================================

// 1. إنشاء النوافذ المنبثقة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 تحميل مكتبة الناف بار الموحدة');
    createAllModals();
    initializeNavbarFunctions();
});

function createAllModals() {
    createLoginModal();
    createSearchPopup();
    createForgotPasswordModal();
    createPasswordChangeModal();
}

// ============================================
// نافذة تسجيل الدخول
// ============================================
function createLoginModal() {
    if (document.getElementById('login-modal')) return; // تجنب التكرار
    
    const modalHTML = `
    <div class="login-modal" id="login-modal">
        <div class="login-modal-content">
            <div class="login-modal-header">
                <span class="close-modal">&times;</span>
            </div>
            <div class="login-modal-body">
                <h2 class="login-title">الوصول السريع</h2>
                
                <div class="phone-login-section">
                    <div class="phone-input-row">
                        <div class="country-code-select">
                            <div class="country-flag">
                                <img src="assets/icons/flag-for-flag-egypt-svgrepo-com 1.png" alt="مصر" class="flag-img">
                            </div>
                            <span class="code">+20</span>
                        </div>
                        <div class="phone-field">
                            <input type="tel" placeholder="رقم الهاتف" class="login-input">
                        </div>
                    </div>
                    
                    <button class="send-code-btn">ارسل رمز التحقق</button>
                    <p class="error-msg">يجب إدخال رقم الهاتف</p>
                </div>
                
                <div class="separator">
                    <span>أو يمكنك تسجيل الدخول باسم المستخدم وكلمة المرور</span>
                </div>
                
                <div class="credentials-login-section">
                    <input type="text" placeholder="اسم المستخدم" class="login-input">
                    <div class="password-field">
                        <input type="password" placeholder="كلمة المرور" class="login-input">
                        <button class="toggle-password">
                            <img src="assets/icons/eye.png" alt="إظهار" class="eye-icon">
                        </button>
                    </div>
                    <button class="login-submit-btn">دخول</button>
                    <a href="#" class="forgot-password">هل نسيت كلمة السر؟</a>
                </div>
                
                <div class="help-section">
                    <a href="#" class="help-btn customer-service">
                        <span>خدمة العملاء</span>
                        <img src="assets/icons/support.png" alt="خدمة" class="help-icon">
                    </a>
                    <a href="#" class="help-btn self-help">
                        <span>المساعدة الذاتية</span>
                        <img src="assets/icons/message-search.png" alt="مساعدة" class="help-icon">
                    </a>
                </div>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('✅ تم إنشاء نافذة تسجيل الدخول');
}

// ============================================
// نافذة البحث المنبثقة
// ============================================
function createSearchPopup() {
    if (document.getElementById('search-popup')) return; // تجنب التكرار
    
    const searchHTML = `
    <div class="search-popup" id="search-popup">
        <div class="search-popup-content">
            <div class="search-popup-header">
                <h3>البحث في الموقع</h3>
                <span class="close-search">&times;</span>
            </div>
            <div class="search-popup-body">
                <div class="search-input-container">
                    <input type="text" placeholder="ابحث عن..." class="search-input" id="search-input">
                    <button class="search-submit-btn" id="search-submit">بحث</button>
                </div>
                <div class="search-suggestions">
                    <h4>اقتراحات البحث:</h4>
                    <ul>
                        <li><a href="#">الأنظمة السارية</a></li>
                        <li><a href="#">الأحكام القضائية</a></li>
                        <li><a href="#">الفتاوى الشرعية</a></li>
                        <li><a href="#">جريدة أم القرى</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', searchHTML);
    console.log('✅ تم إنشاء نافذة البحث');
}

// ============================================
// نافذة استرداد كلمة المرور
// ============================================
function createForgotPasswordModal() {
    if (document.getElementById('forgot-password-modal')) return; // تجنب التكرار
    
    const forgotHTML = `
    <div class="forgot-password-modal" id="forgot-password-modal">
        <div class="forgot-password-modal-content">
            <div class="forgot-password-header">
                <h3>استرداد كلمة المرور</h3>
                <span class="close-forgot">&times;</span>
            </div>
            <div class="forgot-password-body">
                <p>أدخل اسم المستخدم الخاص بك وسنرسل لك رابط استرداد كلمة المرور</p>
                <input type="text" placeholder="اسم المستخدم" class="forgot-password-input">
                <button class="forgot-password-submit-btn">إرسال</button>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', forgotHTML);
    console.log('✅ تم إنشاء نافذة استرداد كلمة المرور');
}

// ============================================
// نافذة تعديل كلمة المرور
// ============================================
function createPasswordChangeModal() {
    if (document.getElementById('password-change-modal')) return; // تجنب التكرار
    
    const passwordHTML = `
    <div id="password-change-modal" style="
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 99999;
        align-items: center;
        justify-content: center;
    ">
        <div style="
            background: white;
            border-radius: 15px;
            padding: 30px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            position: relative;
        ">
            <span onclick="closePasswordModal()" style="
                position: absolute;
                top: 10px;
                left: 15px;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                font-weight: bold;
            ">&times;</span>
            
            <h2 style="
                text-align: center;
                margin-bottom: 20px;
                color: #333;
                font-family: 'Droid Arabic Kufi', Arial, sans-serif;
            ">تعديل كلمة المرور</h2>
            
            <form onsubmit="handlePasswordSubmit(event)">
                <div style="margin-bottom: 15px;">
                    <input type="password" id="currentPassword" placeholder="كلمة المرور الحالية" style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                        font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                        font-size: 16px;
                        background-color: #f8f9fa;
                        margin: 0;
                    " required>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <input type="password" id="newPassword" placeholder="كلمة المرور الجديدة" style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                        font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                        font-size: 16px;
                        background-color: #f8f9fa;
                        margin: 0;
                    " required>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <input type="password" id="confirmPassword" placeholder="تأكيد كلمة المرور الجديدة" style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                        font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                        font-size: 16px;
                        background-color: #f8f9fa;
                        margin: 0;
                    " required>
                </div>
                
                <button type="submit" id="submitPasswordChange" style="
                    width: 100%;
                    height: 50px;
                    background-color: #00a19a;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    margin: 15px 0 0 0;
                ">أرسل</button>
            </form>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', passwordHTML);
    console.log('✅ تم إنشاء نافذة تعديل كلمة المرور');
}

// ============================================
// نافذة لوحة المستخدم
// ============================================
function createUserDashboardModal() {
    if (document.getElementById('user-dashboard-modal')) return; // تجنب التكرار
    
    const dashboardHTML = `
    <div id="user-dashboard-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>لوحة المستخدم</h3>
                <span class="close-modal">×</span>
            </div>
            <div class="modal-body">
                <div class="user-info">
                    <h4>معلومات المستخدم</h4>
                    <p>مرحباً بك في لوحة المستخدم</p>
                </div>
                <div class="user-actions">
                    <button class="dashboard-btn profile-edit-btn">تعديل الملف الشخصي</button>
                    <button class="dashboard-btn profile-password-btn">تغيير كلمة المرور</button>
                    <button class="dashboard-btn logout-btn">تسجيل الخروج</button>
                </div>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', dashboardHTML);
    console.log('✅ تم إنشاء نافذة لوحة المستخدم');
}

// ============================================
// تفعيل جميع دوال الناف بار
// ============================================
function initializeNavbarFunctions() {
    console.log('⚙️ تفعيل دوال الناف بار...');
    
    // تفعيل أزرار تسجيل الدخول
    setupLoginButtons();
    
    // تفعيل أزرار البحث  
    setupSearchButtons();
    
    // تفعيل أزرار الإعدادات
    setupSettingsButtons();
    
    // تفعيل أزرار الهامبرغر
    setupHamburgerMenu();
    
    // تفعيل أزرار الزوم
    setupZoomButtons();
    
    // تفعيل النوافذ المنبثقة
    setupModalEvents();
    
    correctAssetPaths();
    
    console.log('✅ تم تفعيل جميع دوال الناف بار');
}

// ============================================
// تفعيل أزرار تسجيل الدخول
// ============================================
function setupLoginButtons() {
    const loginButtons = document.querySelectorAll('.login-btn, #login-btn, #mobile-login-btn, [href="#login-modal"]');
    
    loginButtons.forEach(btn => {
        if (!btn.hasAttribute('data-login-setup')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showLoginModal();
            });
            btn.setAttribute('data-login-setup', 'true');
        }
    });
}

// ============================================
// تفعيل أزرار البحث
// ============================================
function setupSearchButtons() {
    const searchButtons = document.querySelectorAll('.search-btn, .icon-btn img[src*="search"]');
    
    searchButtons.forEach(btn => {
        const button = btn.tagName === 'IMG' ? btn.parentElement : btn;
        if (!button.hasAttribute('data-search-setup')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showSearchPopup();
            });
            button.setAttribute('data-search-setup', 'true');
        }
    });
}

// ============================================
// تفعيل أزرار الإعدادات
// ============================================
function setupSettingsButtons() {
    const settingsButtons = document.querySelectorAll('.settings-toggle-btn, .icon-btn img[src*="setting"]');
    
    settingsButtons.forEach(btn => {
        const button = btn.tagName === 'IMG' ? btn.parentElement : btn;
        if (!button.hasAttribute('data-settings-setup')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                toggleSettingsMenu(this);
            });
            button.setAttribute('data-settings-setup', 'true');
        }
    });
}

// ============================================
// تفعيل قائمة الهامبرغر
// ============================================
function setupHamburgerMenu() {
    const hamburgerMenus = document.querySelectorAll('.hamburger-menu');
    
    hamburgerMenus.forEach(menu => {
        if (!menu.hasAttribute('data-hamburger-setup')) {
            menu.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMobileMenu();
            });
            menu.setAttribute('data-hamburger-setup', 'true');
        }
    });
}

// ============================================
// تفعيل أزرار الزوم
// ============================================
function setupZoomButtons() {
    const zoomInButtons = document.querySelectorAll('.zoom-in-btn, button[onclick*="changeFontSize(10)"]');
    const zoomOutButtons = document.querySelectorAll('.zoom-out-btn, button[onclick*="changeFontSize(-10)"]');
    
    zoomInButtons.forEach(btn => {
        if (!btn.hasAttribute('data-zoom-setup')) {
            btn.removeAttribute('onclick');
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                changeFontSize(10);
            });
            btn.setAttribute('data-zoom-setup', 'true');
        }
    });
    
    zoomOutButtons.forEach(btn => {
        if (!btn.hasAttribute('data-zoom-setup')) {
            btn.removeAttribute('onclick');
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                changeFontSize(-10);
            });
            btn.setAttribute('data-zoom-setup', 'true');
        }
    });
}

// ============================================
// دوال عرض النوافذ
// ============================================
function showLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.position = 'fixed';
        modal.style.zIndex = '99999';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        document.body.style.overflow = 'hidden';
    }
}

function showSearchPopup() {
    const popup = document.getElementById('search-popup');
    if (popup) {
        popup.style.display = 'flex';
        popup.style.alignItems = 'center';
        popup.style.justifyContent = 'center';
        popup.style.position = 'fixed';
        popup.style.zIndex = '99999';
        popup.style.left = '0';
        popup.style.top = '0';
        popup.style.width = '100%';
        popup.style.height = '100%';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.focus();
        }, 100);
    }
}

function toggleSettingsMenu(button) {
    const settingsMenu = button.parentElement.querySelector('.settings-menu');
    if (settingsMenu) {
        const isVisible = settingsMenu.style.display === 'block';
        settingsMenu.style.display = isVisible ? 'none' : 'block';
    }
}

function toggleMobileMenu() {
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
        const isVisible = overlay.style.display === 'block';
        overlay.style.display = isVisible ? 'none' : 'block';
        document.body.style.overflow = isVisible ? 'auto' : 'hidden';
    }
}

// ============================================
// دالة تغيير حجم الخط
// ============================================
function changeFontSize(change) {
    const elementsToResize = document.querySelectorAll('[data-original-font-size]');
    
    elementsToResize.forEach(element => {
        const currentSize = parseInt(window.getComputedStyle(element).fontSize);
        const newSize = currentSize + change;
        
        if (newSize >= 10 && newSize <= 30) {
            element.style.fontSize = newSize + 'px';
        }
    });
    
    console.log(`تم تغيير حجم الخط بـ ${change}px`);
}

// ============================================
// تفعيل أحداث النوافذ المنبثقة
// ============================================
function setupModalEvents() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('close-modal') || 
            e.target.classList.contains('close-search') || 
            e.target.classList.contains('close-forgot')) {
            closeAllModals();
        }
        
        if (e.target.classList.contains('login-modal') || 
            e.target.classList.contains('search-popup') || 
            e.target.classList.contains('forgot-password-modal') ||
            e.target.id === 'password-change-modal') {
            closeAllModals();
        }
        
        if (e.target.classList.contains('forgot-password')) {
            e.preventDefault();
            showForgotPasswordModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// ============================================
// دالة إغلاق جميع النوافذ
// ============================================
function closeAllModals() {
    const modals = document.querySelectorAll(
        '#login-modal, #search-popup, #forgot-password-modal, #password-change-modal, .mobile-menu-overlay'
    );
    
    modals.forEach(modal => {
        if (modal) {
            modal.style.display = 'none';
        }
    });
    
    document.body.style.overflow = 'auto';
}

// ============================================
// دوال تعديل كلمة المرور
// ============================================
function showPasswordChangeModal() {
    const modal = document.getElementById('password-change-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            const firstInput = document.getElementById('currentPassword');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function closePasswordModal() {
    const modal = document.getElementById('password-change-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        ['currentPassword', 'newPassword', 'confirmPassword'].forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = '';
        });
    }
}

function handlePasswordSubmit(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('كلمة المرور الجديدة وتأكيدها غير متطابقتين');
        return;
    }
    
    const submitBtn = document.getElementById('submitPasswordChange');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'جاري الحفظ...';
    submitBtn.style.backgroundColor = '#666';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('تم تعديل كلمة المرور بنجاح!');
        closePasswordModal();
        
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '#00a19a';
        submitBtn.disabled = false;
    }, 1500);
}

function showForgotPasswordModal() {
    closeAllModals();
    const modal = document.getElementById('forgot-password-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.position = 'fixed';
        modal.style.zIndex = '99999';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        document.body.style.overflow = 'hidden';
    }
}

// ============================================
// تصحيح المسارات للصفحات الفرعية
// ============================================
function correctAssetPaths() {
    const currentPath = window.location.pathname;
    const isSubpage = currentPath.includes('/pages/');
    
    if (isSubpage) {
        const images = document.querySelectorAll('#login-modal img, #search-popup img, #forgot-password-modal img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('../') && !src.startsWith('http')) {
                img.setAttribute('src', '../' + src);
            }
        });
    }
}

console.log('🎯 مكتبة الناف بار الموحدة جاهزة للاستخدام!'); 