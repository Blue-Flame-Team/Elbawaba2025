/**
 * سكريبت زر الملف الشخصي المستقل
 * يعمل بشكل مستقل عن جميع السكربتات الأخرى
 */

(function() {
    'use strict';
    
    console.log('🎯 تحميل سكريبت زر الملف الشخصي المستقل...');
    
    let profileButton = null;
    let profileModal = null;
    let isInitialized = false;
    
    // دالة اختبار للتأكد من أن السكريبت يعمل
    function testScript() {
        console.log('🧪 اختبار السكريبت...');
        console.log('🔍 البحث عن زر الملف الشخصي...');
        
        const testButton = document.querySelector('.profile-icon-btn');
        if (testButton) {
            console.log('✅ تم العثور على زر الملف الشخصي:', testButton);
            console.log('👁️ حالة الزر الحالية:', testButton.style.display);
            
            // إظهار الزر للاختبار
            testButton.style.display = 'block';
            testButton.style.border = '2px solid red';
            testButton.title = 'زر الملف الشخصي - جاهز للاختبار';
            
            console.log('🔴 تم إظهار الزر بحدود حمراء للاختبار');
            return true;
        } else {
            console.error('❌ لم يتم العثور على زر الملف الشخصي');
            return false;
        }
    }
    
    /**
     * تهيئة النظام
     */
    function init() {
        if (isInitialized) {
            console.log('✅ زر الملف الشخصي مُهيأ مسبقاً');
            return;
        }
        
        console.log('🚀 تهيئة زر الملف الشخصي...');
        
        // اختبار أولي
        testScript();
        
        // البحث عن العناصر
        findElements();
        
        // ربط الأحداث
        bindEvents();
        
        // التحقق من حالة تسجيل الدخول
        checkLoginStatus();
        
        isInitialized = true;
        console.log('✅ تم تهيئة زر الملف الشخصي بنجاح');
    }
    
    /**
     * البحث عن العناصر المطلوبة
     */
    function findElements() {
        console.log('🔍 البحث عن عناصر الصفحة...');
        
        // البحث عن زر الملف الشخصي
        profileButton = document.querySelector('.profile-icon-btn');
        if (!profileButton) {
            console.warn('⚠️ لم يتم العثور على زر الملف الشخصي');
            
            // محاولة البحث بطرق أخرى
            profileButton = document.querySelector('[class*="profile"]');
            if (profileButton) {
                console.log('✅ تم العثور على زر يحتوي على كلمة profile:', profileButton);
            }
        } else {
            console.log('✅ تم العثور على زر الملف الشخصي:', profileButton);
            console.log('📊 معلومات الزر:');
            console.log('  - الفئة:', profileButton.className);
            console.log('  - الحالة:', profileButton.style.display);
            console.log('  - المحتوى:', profileButton.innerHTML);
        }
    }
    
    /**
     * ربط الأحداث
     */
    function bindEvents() {
        if (!profileButton) {
            console.warn('⚠️ لا يمكن ربط الأحداث - الزر غير موجود');
            return;
        }
        
        console.log('🔗 ربط أحداث زر الملف الشخصي...');
        
        // إزالة أي أحداث سابقة
        const newButton = profileButton.cloneNode(true);
        profileButton.parentNode.replaceChild(newButton, profileButton);
        profileButton = newButton;
        
        // ربط حدث النقر
        profileButton.addEventListener('click', handleProfileClick, true);
        
        // ربط حدث hover للاختبار
        profileButton.addEventListener('mouseenter', function() {
            console.log('🖱️ مرور الماوس فوق زر الملف الشخصي');
        });
        
        // منع التداخل مع سكربتات أخرى
        profileButton.setAttribute('data-profile-isolated', 'true');
        
        console.log('✅ تم ربط أحداث زر الملف الشخصي بنجاح');
    }
    
    /**
     * معالج حدث النقر على زر الملف الشخصي
     */
    function handleProfileClick(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        console.log('🔍 تم النقر على زر الملف الشخصي!');
        console.log('🎯 معلومات الحدث:', e);
        
        // التحقق من حالة تسجيل الدخول
        const isLoggedIn = isUserLoggedIn();
        console.log('🔒 حالة تسجيل الدخول:', isLoggedIn);
        
        if (!isLoggedIn) {
            console.warn('⚠️ المستخدم غير مسجل الدخول');
            
            // للاختبار: السماح بفتح النافذة مع تحذير
            const allowTest = confirm('أنت غير مسجل دخول.\nهل تريد فتح النافذة للاختبار؟\n\n(سيتم إنشاء بيانات وهمية)');
            
            if (allowTest) {
                console.log('🧪 فتح النافذة في وضع الاختبار...');
                // إنشاء بيانات وهمية للاختبار
                localStorage.setItem('currentUser', JSON.stringify({
                    username: 'test-user',
                    name: 'مستخدم اختبار',
                    isLoggedIn: true
                }));
            } else {
                console.log('❌ المستخدم رفض فتح النافذة');
                return false;
            }
        }
        
        // فتح نافذة الملف الشخصي
        try {
            console.log('🚀 فتح نافذة الملف الشخصي...');
            showProfileModal();
            console.log('✅ تم تنفيذ أمر فتح النافذة');
        } catch (error) {
            console.error('❌ خطأ في فتح النافذة:', error);
            alert('حدث خطأ في فتح نافذة الملف الشخصي');
        }
        
        return false;
    }
    
    /**
     * إظهار نافذة الملف الشخصي
     */
    function showProfileModal() {
        console.log('🔓 فتح نافذة الملف الشخصي...');
        
        // تحديد النافذة إذا لم تكن محددة مسبقاً
        if (!profileModal) {
            profileModal = document.getElementById('user-dashboard-modal');
            
            // إذا لم توجد النافذة، نحاول تحميلها
            if (!profileModal) {
                console.log('📥 النافذة غير موجودة، جاري التحميل...');
                loadProfileModal();
                return;
            } else {
                console.log('✅ تم العثور على النافذة في DOM');
            }
        }
        
        try {
            // إخفاء جميع النوافذ الأخرى
            hideAllModals();
            
            // إظهار النافذة
            profileModal.style.display = 'flex';
            profileModal.style.alignItems = 'center';
            profileModal.style.justifyContent = 'center';
            profileModal.style.position = 'fixed';
            profileModal.style.zIndex = '99999';
            profileModal.style.left = '0';
            profileModal.style.top = '0';
            profileModal.style.width = '100%';
            profileModal.style.height = '100%';
            profileModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            profileModal.classList.add('show');
            
            // منع التمرير في الخلفية
            document.body.style.overflow = 'hidden';
            
            console.log('✅ تم إظهار النافذة بنجاح');
            
            // تحديث محتوى النافذة
            updateModalContent();
            
            // ربط أحداث النافذة
            bindModalEvents();
            
            console.log('🎉 تم فتح نافذة الملف الشخصي بنجاح');
            
        } catch (error) {
            console.error('❌ خطأ في إظهار النافذة:', error);
            alert('حدث خطأ في فتح نافذة الملف الشخصي');
        }
    }
    
    /**
     * تحميل نافذة الملف الشخصي
     */
    function loadProfileModal() {
        console.log('📥 تحميل نافذة الملف الشخصي...');
        
        fetch('includes/user-dashboard-modal.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('فشل في تحميل النافذة');
                }
                return response.text();
            })
            .then(html => {
                // إضافة النافذة للصفحة
                document.body.insertAdjacentHTML('beforeend', html);
                profileModal = document.getElementById('user-dashboard-modal');
                
                console.log('✅ تم تحميل نافذة الملف الشخصي');
                
                // فتح النافذة الآن
                showProfileModal();
            })
            .catch(error => {
                console.error('❌ فشل في تحميل نافذة الملف الشخصي:', error);
                // إنشاء نافذة بسيطة كبديل
                createFallbackModal();
            });
    }
    
    /**
     * إنشاء نافذة بديلة بسيطة
     */
    function createFallbackModal() {
        const modalHTML = \`
            <div id="user-dashboard-modal" class="modal" style="display: none;">
                <div class="modal-content" style="
                    background: white;
                    margin: 50px auto;
                    padding: 20px;
                    width: 90%;
                    max-width: 500px;
                    border-radius: 10px;
                    position: relative;
                    text-align: center;
                    font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                ">
                    <span class="close-modal" style="
                        position: absolute;
                        right: 15px;
                        top: 10px;
                        font-size: 28px;
                        font-weight: bold;
                        cursor: pointer;
                        color: #aaa;
                    ">&times;</span>
                    
                    <h2 style="color: #00a19a; margin-bottom: 20px;">مرحبا <span class="user-name"></span></h2>
                    
                    <div class="dashboard-buttons" style="display: flex; flex-direction: column; gap: 15px;">
                        <button class="dashboard-btn" onclick="alert('طلب خدمة الأسانيد')" style="
                            padding: 15px;
                            background: #f8f9fa;
                            border: 1px solid #e0e0e0;
                            border-radius: 8px;
                            cursor: pointer;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                            font-size: 16px;
                            text-align: right;
                        ">
                            <span>طلب خدمة الأسانيد</span>
                        </button>
                        
                        <button class="dashboard-btn" onclick="alert('عدل بياناتك')" style="
                            padding: 15px;
                            background: #f8f9fa;
                            border: 1px solid #e0e0e0;
                            border-radius: 8px;
                            cursor: pointer;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                            font-size: 16px;
                            text-align: right;
                        ">
                            <span>عدل بياناتك</span>
                        </button>
                        
                        <button class="dashboard-btn" onclick="alert('خدمة العملاء')" style="
                            padding: 15px;
                            background: #f8f9fa;
                            border: 1px solid #e0e0e0;
                            border-radius: 8px;
                            cursor: pointer;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                            font-size: 16px;
                            text-align: right;
                        ">
                            <span>خدمة العملاء</span>
                        </button>
                        
                        <button class="logout-btn" style="
                            padding: 15px;
                            background: #dc3545;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                            font-size: 16px;
                        ">
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </div>
            </div>
        \`;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        profileModal = document.getElementById('user-dashboard-modal');
        
        console.log('✅ تم إنشاء نافذة الملف الشخصي البديلة');
        
        // فتح النافذة الآن
        showProfileModal();
    }
    
    /**
     * تحديث محتوى النافذة
     */
    function updateModalContent() {
        if (!profileModal) return;
        
        // تحديث اسم المستخدم
        const userNameElement = profileModal.querySelector('.user-name');
        if (userNameElement) {
            const userData = getCurrentUserData();
            if (userData && userData.name) {
                userNameElement.textContent = userData.name;
                console.log('👤 تم تحديث اسم المستخدم:', userData.name);
            } else {
                userNameElement.textContent = 'المستخدم';
            }
        }
    }
    
    /**
     * ربط أحداث النافذة
     */
    function bindModalEvents() {
        if (!profileModal) return;
        
        // زر الإغلاق
        const closeBtn = profileModal.querySelector('.close-modal');
        if (closeBtn && !closeBtn.hasAttribute('data-profile-bound')) {
            closeBtn.addEventListener('click', hideProfileModal);
            closeBtn.setAttribute('data-profile-bound', 'true');
        }
        
        // النقر خارج النافذة
        profileModal.addEventListener('click', function(e) {
            if (e.target === profileModal) {
                hideProfileModal();
            }
        });
        
        // زر تسجيل الخروج
        const logoutBtn = profileModal.querySelector('.logout-btn');
        if (logoutBtn && !logoutBtn.hasAttribute('data-profile-bound')) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
                    logout();
                }
            });
            logoutBtn.setAttribute('data-profile-bound', 'true');
        }
        
        // إغلاق بمفتاح Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && profileModal.style.display === 'block') {
                hideProfileModal();
            }
        });
    }
    
    /**
     * إخفاء نافذة الملف الشخصي
     */
    function hideProfileModal() {
        if (!profileModal) return;
        
        profileModal.style.display = 'none';
        profileModal.classList.remove('show');
        document.body.style.overflow = '';
        
        console.log('✅ تم إغلاق نافذة الملف الشخصي');
    }
    
    /**
     * إخفاء جميع النوافذ
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
    }
    
    /**
     * التحقق من حالة تسجيل الدخول
     */
    function isUserLoggedIn() {
        // التحقق من localStorage
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                return user && user.isLoggedIn === true;
            } catch (e) {
                return false;
            }
        }
        
        // التحقق من AuthSystem إذا كان متوفراً
        if (typeof AuthSystem !== 'undefined' && AuthSystem.isLoggedIn) {
            return AuthSystem.isLoggedIn();
        }
        
        return false;
    }
    
    /**
     * الحصول على بيانات المستخدم الحالي
     */
    function getCurrentUserData() {
        // من localStorage
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch (e) {
                // تجاهل الأخطاء
            }
        }
        
        // من AuthSystem إذا كان متوفراً
        if (typeof AuthSystem !== 'undefined' && AuthSystem.getCurrentUser) {
            return AuthSystem.getCurrentUser();
        }
        
        return null;
    }
    
    /**
     * تسجيل الخروج
     */
    function logout() {
        console.log('🔐 تسجيل الخروج...');
        
        // مسح localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userLoginTime');
        
        // إخفاء زر الملف الشخصي
        showProfileButton(false);
        
        // إخفاء النافذة
        hideProfileModal();
        
        // إظهار أزرار تسجيل الدخول
        const loginBtns = document.querySelectorAll('.login-btn');
        loginBtns.forEach(btn => {
            btn.style.display = 'block';
        });
        
        // استدعاء logout من AuthSystem إذا كان متوفراً
        if (typeof AuthSystem !== 'undefined' && AuthSystem.logout) {
            AuthSystem.logout();
        }
        
        console.log('✅ تم تسجيل الخروج بنجاح');
    }
    
    /**
     * التحقق من حالة تسجيل الدخول وإظهار/إخفاء الزر
     */
    function checkLoginStatus() {
        const isLoggedIn = isUserLoggedIn();
        showProfileButton(isLoggedIn);
        
        console.log('🔍 حالة تسجيل الدخول:', isLoggedIn ? 'مسجل' : 'غير مسجل');
    }
    
    /**
     * إظهار أو إخفاء زر الملف الشخصي
     */
    function showProfileButton(show) {
        if (!profileButton) return;
        
        profileButton.style.display = show ? 'block' : 'none';
        
        if (show) {
            console.log('✅ تم إظهار زر الملف الشخصي');
        } else {
            console.log('✅ تم إخفاء زر الملف الشخصي');
        }
    }
    
    /**
     * مراقب للتغييرات في حالة تسجيل الدخول
     */
    function watchLoginStatus() {
        // مراقبة تغييرات localStorage
        setInterval(checkLoginStatus, 1000);
        
        // مراقبة تغييرات في DOM
        const observer = new MutationObserver(function() {
            // إعادة تهيئة إذا اختفى الزر
            if (!document.querySelector('.profile-icon-btn[data-profile-isolated]')) {
                setTimeout(init, 100);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // التهيئة عند تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // بدء مراقبة حالة تسجيل الدخول
    setTimeout(watchLoginStatus, 1000);
    
    // إتاحة الوظائف عالمياً للاختبار
    window.ProfileButtonManager = {
        init: init,
        showModal: showProfileModal,
        hideModal: hideProfileModal,
        checkLogin: checkLoginStatus,
        showButton: showProfileButton,
        test: testScript,
        forceShowModal: function() {
            console.log('🔧 فتح النافذة قسرياً للاختبار...');
            // إنشاء بيانات مستخدم وهمية للاختبار
            localStorage.setItem('currentUser', JSON.stringify({
                username: 'test',
                name: 'مستخدم اختبار',
                isLoggedIn: true
            }));
            showProfileModal();
        },
        makeButtonVisible: function() {
            console.log('👁️ إظهار الزر قسرياً للاختبار...');
            const btn = document.querySelector('.profile-icon-btn');
            if (btn) {
                btn.style.display = 'block';
                btn.style.border = '3px solid green';
                btn.style.borderRadius = '5px';
                console.log('✅ تم إظهار الزر بحدود خضراء');
                return true;
            }
            return false;
        },
        simulateLogin: function() {
            console.log('🎭 محاكاة تسجيل دخول للاختبار...');
            localStorage.setItem('currentUser', JSON.stringify({
                username: 'test',
                name: 'المستخدم التجريبي',
                isLoggedIn: true
            }));
            checkLoginStatus();
            console.log('✅ تم محاكاة تسجيل الدخول');
        }
    };
    
    console.log('🎯 تم تحميل سكريبت زر الملف الشخصي المستقل');
    console.log('🛠️ للاختبار، استخدم:');
    console.log('  ProfileButtonManager.test() - اختبار السكريبت');
    console.log('  ProfileButtonManager.makeButtonVisible() - إظهار الزر');
    console.log('  ProfileButtonManager.simulateLogin() - محاكاة تسجيل دخول');
    console.log('  ProfileButtonManager.forceShowModal() - فتح النافذة قسرياً');
    
})(); 