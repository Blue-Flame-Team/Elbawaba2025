// تم تعطيل هذا الملف لأنه يتداخل مع unified-icons.js
// يرجى استخدام unified-icons.js بدلاً منه

/*
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 بدء اختبار وظيفة قائمة الإعدادات...');
    
    // انتظار حتى يتم تحميل unified-icons.js
    setTimeout(function() {
        // البحث عن جميع أزرار الإعدادات
        const settingsButtons = document.querySelectorAll('.settings-toggle-btn');
        const settingsMenus = document.querySelectorAll('.settings-menu');
        
        console.log('تم العثور على أزرار الإعدادات:', settingsButtons.length);
        console.log('تم العثور على قوائم الإعدادات:', settingsMenus.length);
        
        // إضافة وظيفة مباشرة لكل زر إعدادات
        settingsButtons.forEach(function(btn, index) {
            console.log('إعداد زر الإعدادات رقم:', index + 1);
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('تم النقر على زر الإعدادات رقم:', index + 1);
                
                // البحث عن القائمة المناسبة
                let targetMenu = null;
                
                // البحث عن القائمة القريبة من الزر
                const parentContainer = btn.closest('.top-icons, .mobile-icons, .main-icons-group');
                if (parentContainer) {
                    targetMenu = parentContainer.querySelector('.settings-menu');
                }
                
                // إذا لم نجد قائمة قريبة، ابحث عن أي قائمة
                if (!targetMenu && settingsMenus.length > 0) {
                    targetMenu = settingsMenus[0];
                }
                
                if (targetMenu) {
                    console.log('سيتم فتح/إغلاق القائمة');
                    
                    // إغلاق جميع القوائم الأخرى
                    settingsMenus.forEach(menu => {
                        if (menu !== targetMenu) {
                            menu.classList.remove('show');
                        }
                    });
                    
                    // فتح/إغلاق القائمة المستهدفة
                    targetMenu.classList.toggle('show');
                    
                    // إضافة وظائف للخيارات
                    setupMenuOptions(targetMenu);
                } else {
                    console.error('لم يتم العثور على قائمة إعدادات للزر');
                }
            });
        });
        
        // دالة إعداد خيارات القائمة
        function setupMenuOptions(menu) {
            // خيار التباين
            const contrastOption = menu.querySelector('.contrast-option');
            const contrastSubmenu = menu.querySelector('.contrast-submenu');
            
            if (contrastOption && contrastSubmenu) {
                contrastOption.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    contrastSubmenu.classList.toggle('show');
                    console.log('تم النقر على خيار التباين');
                };
            }
            
            // التباين الفاتح
            const lightOption = menu.querySelector('.contrast-light');
            if (lightOption) {
                lightOption.onclick = function(e) {
                    e.preventDefault();
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('theme', 'light');
                    menu.classList.remove('show');
                    console.log('تم تطبيق التباين الفاتح');
                };
            }
            
            // التباين الداكن
            const darkOption = menu.querySelector('.contrast-dark');
            if (darkOption) {
                darkOption.onclick = function(e) {
                    e.preventDefault();
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('theme', 'dark');
                    menu.classList.remove('show');
                    console.log('تم تطبيق التباين الداكن');
                };
            }
            
            // خيار الإحصائيات
            const statsOption = menu.querySelector('.stats-option');
            if (statsOption) {
                statsOption.onclick = function(e) {
                    e.preventDefault();
                    window.location.href = './pages/analytics.html';
                };
            }
            
            // خيار تسجيل الخروج
            const logoutOption = menu.querySelector('.logout-option');
            if (logoutOption) {
                logoutOption.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('تم النقر على زر تسجيل الخروج من قائمة الإعدادات');
                    
                    // تأكيد تسجيل الخروج
                    if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
                        // إخفاء قائمة الإعدادات
                        menu.classList.remove('show');
                        
                        // إخفاء أيقونة الملف الشخصي في الموبايل
                        const mobileProfileBtn = document.getElementById('mobile-profile-btn');
                        if (mobileProfileBtn) {
                            mobileProfileBtn.style.display = 'none';
                            console.log('تم إخفاء أيقونة الملف الشخصي في الموبايل');
                        }
                        
                        // إخفاء أيقونة الملف الشخصي في الديسكتوب
                        const desktopProfileBtn = document.querySelector('.profile-icon-btn');
                        if (desktopProfileBtn) {
                            desktopProfileBtn.style.display = 'none';
                            console.log('تم إخفاء أيقونة الملف الشخصي في الديسكتوب');
                        }
                        
                        // إظهار أزرار تسجيل الدخول
                        const loginButtons = document.querySelectorAll('.login-btn');
                        loginButtons.forEach(btn => {
                            btn.style.display = 'block';
                            console.log('تم إظهار زر تسجيل الدخول');
                        });
                        
                        // إزالة class المستخدم المُسجل من body
                        document.body.classList.remove('user-logged-in');
                        
                        // مسح بيانات تسجيل الدخول من localStorage
                        localStorage.removeItem('currentUser');
                        localStorage.removeItem('userLoggedIn');
                        localStorage.removeItem('userLoginTime');
                        localStorage.removeItem('userProfile');
                        localStorage.removeItem('authToken');
                        
                        // إخفاء أي نوافذ مفتوحة للمستخدم
                        const userModals = document.querySelectorAll('#user-dashboard-modal, .profile-edit-modal');
                        userModals.forEach(modal => {
                            if (modal.style) {
                                modal.style.display = 'none';
                            }
                            modal.classList.remove('show');
                        });
                        
                        // رسالة تأكيد تسجيل الخروج
                        setTimeout(() => {
                            alert('تم تسجيل خروجك بنجاح. شكراً لاستخدام موقع البوابة!');
                        }, 100);
                        
                        console.log('✅ تم تسجيل الخروج بنجاح وإعادة تعيين حالة الموقع');
                    } else {
                        console.log('تم إلغاء عملية تسجيل الخروج');
                        menu.classList.remove('show');
                    }
                };
            }
        }
        
        // إغلاق القوائم عند النقر خارجها
        document.addEventListener('click', function(e) {
            let clickedOnButton = false;
            settingsButtons.forEach(btn => {
                if (btn.contains(e.target)) {
                    clickedOnButton = true;
                }
            });
            
            if (!clickedOnButton) {
                settingsMenus.forEach(menu => {
                    if (!menu.contains(e.target)) {
                        menu.classList.remove('show');
                    }
                });
            }
        });
        
        console.log('✅ تم إعداد وظائف قائمة الإعدادات بنجاح');
        
        // إعداد أيقونة البروفايل للعمل الفعلي
        console.log('👤 إعداد أيقونة البروفايل...');
        setupProfileIcon();
        
        // إعداد إضافي لجميع أزرار تسجيل الخروج في الموقع
        const allLogoutButtons = document.querySelectorAll('.logout-option, .logout-btn, a[href*="logout"], [onclick*="logout"]');
        allLogoutButtons.forEach((logoutBtn, index) => {
            console.log('إعداد زر تسجيل خروج إضافي رقم:', index + 1);
            
            // إزالة الأحداث القديمة
            const newLogoutBtn = logoutBtn.cloneNode(true);
            if (logoutBtn.parentNode) {
                logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
            }
            
            // إضافة وظيفة تسجيل الخروج الموحدة
            newLogoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                console.log('تم النقر على زر تسجيل خروج شامل رقم:', index + 1);
                performLogout();
                
                return false;
            }, true);
        });
        
        // دالة تسجيل الخروج الموحدة
        function performLogout() {
            console.log('🚪 بدء عملية تسجيل الخروج الشاملة...');
            
            // تأكيد تسجيل الخروج
            if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
                // إغلاق جميع القوائم والنوافذ
                const allMenus = document.querySelectorAll('.settings-menu, .mobile-settings-menu');
                allMenus.forEach(menu => menu.classList.remove('show'));
                
                const allModals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]');
                allModals.forEach(modal => {
                    if (modal.style) modal.style.display = 'none';
                    modal.classList.remove('show');
                });
                
                // إخفاء أيقونات الملف الشخصي
                const profileIcons = document.querySelectorAll('.profile-icon-btn, #mobile-profile-btn, .profile-btn');
                profileIcons.forEach(icon => {
                    icon.style.display = 'none';
                });
                
                // إظهار أزرار تسجيل الدخول
                const loginButtons = document.querySelectorAll('.login-btn');
                loginButtons.forEach(btn => {
                    btn.style.display = 'block';
                });
                
                // إزالة حالة المستخدم المُسجل
                document.body.classList.remove('user-logged-in');
                
                // مسح جميع بيانات المستخدم
                const keysToRemove = [
                    'currentUser', 'userLoggedIn', 'userLoginTime', 
                    'userProfile', 'authToken', 'userData', 'loginState'
                ];
                keysToRemove.forEach(key => localStorage.removeItem(key));
                
                // إعادة تعيين حالة الصفحة
                document.body.style.overflow = 'auto';
                
                // رسالة نجاح
                setTimeout(() => {
                    alert('تم تسجيل خروجك بنجاح. شكراً لاستخدام موقع البوابة!');
                }, 100);
                
                console.log('✅ تم تسجيل الخروج بنجاح');
                
                // إعادة تحميل الصفحة بعد 2 ثانية (اختياري)
                // setTimeout(() => {
                //     window.location.reload();
                // }, 2000);
                
            } else {
                console.log('تم إلغاء عملية تسجيل الخروج');
            }
                         }
         
         // دالة إعداد أيقونة البروفايل للعمل الفعلي
         function setupProfileIcon() {
             console.log('👤 إعداد أيقونة البروفايل للعمل الفعلي...');
             
             // البحث عن أيقونة البروفايل للموبايل والديسكتوب
             const mobileProfileBtn = document.getElementById('mobile-profile-btn');
             const desktopProfileBtn = document.querySelector('.profile-icon-btn');
             
             // التحقق من حالة تسجيل الدخول
             const isLoggedIn = checkUserLoginStatus();
             console.log('🔒 حالة تسجيل الدخول:', isLoggedIn);
             
             // إعداد أيقونة الموبايل
             if (mobileProfileBtn) {
                 if (isLoggedIn) {
                     mobileProfileBtn.style.display = 'block';
                     console.log('✅ تم إظهار أيقونة البروفايل للموبايل');
                 } else {
                     mobileProfileBtn.style.display = 'none';
                 }
                 
                 // ربط وظيفة فتح النافذة
                 if (!mobileProfileBtn.hasAttribute('data-profile-setup')) {
                     mobileProfileBtn.addEventListener('click', function(e) {
                         e.preventDefault();
                         e.stopPropagation();
                         
                         console.log('📱 تم النقر على أيقونة البروفايل للموبايل');
                         openProfileModal();
                     }, true);
                     
                     mobileProfileBtn.setAttribute('data-profile-setup', 'true');
                 }
             }
             
             // إعداد أيقونة الديسكتوب
             if (desktopProfileBtn) {
                 if (isLoggedIn) {
                     desktopProfileBtn.style.display = 'inline-block';
                     console.log('✅ تم إظهار أيقونة البروفايل للديسكتوب');
                 } else {
                     desktopProfileBtn.style.display = 'none';
                 }
                 
                 // ربط وظيفة فتح النافذة
                 if (!desktopProfileBtn.hasAttribute('data-profile-setup')) {
                     desktopProfileBtn.addEventListener('click', function(e) {
                         e.preventDefault();
                         e.stopPropagation();
                         
                         console.log('💻 تم النقر على أيقونة البروفايل للديسكتوب');
                         openProfileModal();
                     }, true);
                     
                     desktopProfileBtn.setAttribute('data-profile-setup', 'true');
                 }
             }
             
             // مراقبة تغييرات حالة تسجيل الدخول
             setupLoginStatusWatcher();
         }
         
         // دالة التحقق من حالة تسجيل الدخول
         function checkUserLoginStatus() {
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
             
             // التحقق من متغيرات أخرى
             if (localStorage.getItem('userLoggedIn') === 'true') {
                 return true;
             }
             
             // التحقق من body class
             if (document.body.classList.contains('user-logged-in')) {
                 return true;
             }
             
             return false;
         }
         
         // دالة فتح نافذة الملف الشخصي
         function openProfileModal() {
             console.log('🔓 فتح نافذة الملف الشخصي...');
             
             // محاولة استخدام ProfileButtonManager إذا كان متوفراً
             if (typeof ProfileButtonManager !== 'undefined' && ProfileButtonManager.showModal) {
                 console.log('🎯 استخدام ProfileButtonManager...');
                 ProfileButtonManager.showModal();
                 return;
             }
             
             // البحث عن النافذة الموجودة
             let profileModal = document.getElementById('user-dashboard-modal');
             
             if (profileModal) {
                 console.log('✅ تم العثور على النافذة، جاري الفتح...');
                 
                 // إخفاء جميع النوافذ الأخرى
                 const allModals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]');
                 allModals.forEach(modal => {
                     if (modal.style && modal !== profileModal) {
                         modal.style.display = 'none';
                         modal.classList.remove('show');
                     }
                 });
                 
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
                 
                 document.body.style.overflow = 'hidden';
                 
                 // تحديث اسم المستخدم
                 updateProfileModalContent(profileModal);
                 
                 console.log('✅ تم فتح نافذة الملف الشخصي بنجاح');
                 
             } else {
                 console.warn('⚠️ لم يتم العثور على نافذة الملف الشخصي');
                 // إنشاء نافذة ملف شخصي جديدة
                 createNewProfileModal();
             }
         }
         
         // دالة تحديث محتوى النافذة
         function updateProfileModalContent(modal) {
             if (!modal) return;
             
             // تحديث اسم المستخدم
             const userNameElement = modal.querySelector('.user-name');
             if (userNameElement) {
                 const userData = getCurrentUser();
                 if (userData && userData.name) {
                     userNameElement.textContent = userData.name;
                 } else if (userData && userData.username) {
                     userNameElement.textContent = userData.username;
                 } else {
                     userNameElement.textContent = 'المستخدم';
                 }
             }
         }
         
         // دالة الحصول على بيانات المستخدم الحالي
         function getCurrentUser() {
             const userData = localStorage.getItem('currentUser');
             if (userData) {
                 try {
                     return JSON.parse(userData);
                 } catch (e) {
                     return null;
                 }
             }
             return null;
         }
         
         // دالة إنشاء نافذة الملف الشخصي الجديدة
         function createNewProfileModal() {
             console.log('🆕 إنشاء نافذة ملف شخصي جديدة...');
             
             // إزالة أي نافذة موجودة مسبقاً
             const existingModal = document.getElementById('new-profile-modal');
             if (existingModal) {
                 existingModal.remove();
             }
             
             // الحصول على بيانات المستخدم
             const userData = getCurrentUser();
             const userName = (userData && userData.name) ? userData.name : (userData && userData.username) ? userData.username :'الوصول السريع';
             
             // إنشاء HTML للنافذة الجديدة
             const modalHTML = `
                 <div id="new-profile-modal" class="profile-modal-overlay" style="
                     position: fixed;
                     top: 0;
                     left: 0;
                     width: 100%;
                     height: 100%;
                     background: rgba(0, 0, 0, 0.5);
                     display: flex;
                     align-items: center;
                     justify-content: center;
                                  z-index: 99999;
     font-family: 'Droid Arabic Kufi';
                 ">
                                                   <div class="profile-modal-content" style="
                          background: white;
                          border-radius: 20px;
                          padding: 0;
                          width: 100%;
                          max-width: 800px;
                          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                          position: relative;
                          overflow: hidden;
                      ">
                                                           <!-- Header -->
                          <div style="
                              background: rgba(0, 0, 0, 0.05);
                              padding: 20px;
                              text-align: center;
                              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                              position: relative;
                          ">
                              <h3 style="
                                  color: #2D3748;
                                  margin: 0 0 5px 0;
                                  font-size: 20px;
                                  font-weight: 600;
                              ">${userName}</h3>
                              <p style="
                                  color: #718096;
                                  margin: 0;
                                  font-size: 14px;
                              ">مرحبا Manal Mohamed taha</p>
                              
                              <button class="close-profile-modal" style="
                                  position: absolute;
                                  top: 15px;
                                  right: 15px;
                                  background: none;
                                  border: none;
                                  color: #2D3748;
                                  font-size: 24px;
                                  cursor: pointer;
                                  width: 30px;
                                  height: 30px;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  border-radius: 50%;
                                  transition: background 0.3s;
                              " onmouseover="this.style.background='rgba(0,0,0,0.1)'" 
                                 onmouseout="this.style.background='none'">&times;</button>
                          </div>
                         
                         <!-- Content -->
                         <div style="padding: 30px 20px;">
                             <!-- Row 1 -->
                             <div style="
                                 display: grid;
                                 grid-template-columns: 1fr 1fr;
                                 gap: 15px;
                                 margin-bottom: 25px;
                                 justify-items: center;
                             ">

                                 <button class="profile-action-btn" data-action="edit-profile" style="
                                     // width: 342px;
                                     // height: 89px;
                                     justify-content: space-between;
                                     border-radius: 16px;
                                     padding-top: 22px;
                                     padding-right: 50px;
                                     padding-bottom: 22px;
                                     padding-left: 50px;
                                     background: #2D3748;
                                     color: white;
                                     border: none;
                                     font-family: 'Droid Arabic Kufi';
                                     font-size: 16px;
                                     font-weight: 500;
                                     cursor: pointer;
                                     display: flex;
                                     align-items: center;
                                     text-align: center;
                                     margin-bottom: 20px !important;
                                 ">
                                 عدل بياناتك
                                 <img src="../assets/icons/edit.png" alt="edit" style="width: 20px; height: 20px; margin-right: 8px;">
                                 </button>


                                 <button class="profile-action-btn" data-action="asanid-service" style="
                                    //  width: 342px;
                                    //  height: 89px;
                                     justify-content: space-between;
                                     border-radius: 16px;
                                     padding-top: 22px;
                                     padding-right: 50px;
                                     padding-bottom: 22px;
                                     padding-left: 50px;
                                     background: #2D3748;
                                     color: white;
                                     border: none;
                                     font-family: 'Droid Arabic Kufi';
                                     font-size: 16px;
                                     font-weight: 500;
                                     cursor: pointer;
                                     display: flex;
                                     align-items: center;
                                     text-align: center;
                                     margin-bottom: 20px !important;
                                 ">
                                     طلب خدمة الأسانيد
                                 </button>
                                 
                                
                             </div>
                             
                             <!-- Row 2 -->
                             <div style="
                                 display: grid;
                                 grid-template-columns: 1fr 1fr;
                                 gap: 15px;
                                 margin-bottom: 25px;
                                 justify-items: center;
                             ">

                                     <button class="profile-action-btn" data-action="customer-service" style="
                                     //  width: 342px;
                                     //  height: 89px;
                                     justify-content: space-between;
                                     border-radius: 16px;
                                     padding-top: 22px;
                                     padding-right: 50px;
                                     padding-bottom: 22px;
                                     padding-left: 50px;
                                     background: #2D3748;
                                     color: white;
                                     border: none;
                                     font-family: 'Droid Arabic Kufi';
                                     font-size: 16px;
                                     font-weight: 500;
                                     cursor: pointer;
                                     display: flex;
                                     align-items: center;
                                     text-align: center;
                                 ">
                                 خدمة العملاء
                                 <img src="../assets/icons/Mask group.svg" alt="customer service" style="width: 20px; height: 20px; margin-right: 8px;">
                                 </button>


                                 <button class="profile-action-btn" data-action="self-help" style="
                                     //  width: 342px;
                                     //  height: 89px;
                                     justify-content: space-between;
                                     border-radius: 16px;
                                     padding-top: 22px;
                                     padding-right: 50px;
                                     padding-bottom: 22px;
                                     padding-left: 50px;
                                     background: #2D3748;
                                     color: white;
                                     border: none;
                                     font-family: 'Droid Arabic Kufi';
                                     font-size: 16px;
                                     font-weight: 500;
                                     cursor: pointer;
                                     display: flex;
                                     align-items: center;
                                     text-align: center;
                                 ">
                                 المساعدة الذاتية
                                 <img src="../assets/icons/message-search.svg" alt="self help" style="width: 20px; height: 20px; margin-right: 8px;">
                                 </button>
                                 
                            
                             </div>
                             
                             <!-- Row 3 - Logout Button -->
                             <div style="margin-top: 30px; display: flex; justify-content: center;">
                                 <button class="profile-action-btn" data-action="logout" style="
                                     width: 342px;
                                     height: 89px;
                                     justify-content: center;
                                     align-items: center;
                                     text-align: center;
                                     border-radius: 16px;
                                     padding-top: 22px;
                                     padding-right: 50px;
                                     padding-bottom: 22px;
                                     padding-left: 50px;
                                     background: #D63327;
                                     color: white;
                                     border: none;
                                     font-family: 'Droid Arabic Kufi';
                                     font-size: 18px;
                                     font-weight: 600;
                                     cursor: pointer;
                                     display: flex;
                                     align-items: center;
                                     text-align: center;
                                 ">
                                     تسجيل الخروج
                                     <img src="../assets/icons/exit.svg" alt="exit" style="width: 20px; height: 20px; margin-right: 8px;">
                                 </button>
                             </div>
                         </div>
                     </div>
                 </div>
             `;
             
             // إضافة النافذة للصفحة
             document.body.insertAdjacentHTML('beforeend', modalHTML);
             document.body.style.overflow = 'hidden';
             
             // إعداد وظائف النافذة
             setupNewProfileModalEvents();
             
             console.log('✅ تم إنشاء نافذة الملف الشخصي الجديدة بنجاح');
         }
         
         // دالة إعداد أحداث النافذة الجديدة
         function setupNewProfileModalEvents() {
             const modal = document.getElementById('new-profile-modal');
             if (!modal) return;
             
             // إغلاق النافذة
             const closeBtn = modal.querySelector('.close-profile-modal');
             const overlay = modal;
             
             function closeModal() {
                 modal.remove();
                 document.body.style.overflow = 'auto';
             }
             
             closeBtn.addEventListener('click', closeModal);
             overlay.addEventListener('click', function(e) {
                 if (e.target === overlay) {
                     closeModal();
                 }
             });
             
             // إعداد أزرار الأكشن
             const actionButtons = modal.querySelectorAll('.profile-action-btn');
             actionButtons.forEach(btn => {
                 btn.addEventListener('click', function(e) {
                     e.preventDefault();
                     const action = this.getAttribute('data-action');
                     
                     switch(action) {
                         case 'asanid-service':
                             console.log('فتح خدمة الأسانيد من النافذة الجديدة');
                             closeModal();
                             // فتح نافذة الأسانيد
                             if (typeof showAsanidServicePopup === 'function') {
                                 showAsanidServicePopup();
                             } else {
                                 window.location.href = './pages/asanid-service.html';
                             }
                             break;
                             
                         case 'edit-profile':
                             console.log('فتح تعديل البيانات من النافذة الجديدة');
                             closeModal();
                             showEditProfileModal();
                             break;
                             
                         case 'self-help':
                             console.log('فتح المساعدة الذاتية من النافذة الجديدة');
                             closeModal();
                             window.location.href = './pages/self-help.html';
                             break;
                             
                         case 'customer-service':
                             console.log('فتح خدمة العملاء من النافذة الجديدة');
                             closeModal();
                             window.location.href = './pages/customer-service.html';
                             break;
                             
                         case 'logout':
                             console.log('تسجيل الخروج من النافذة الجديدة');
                             closeModal();
                             performLogout();
                             break;
                     }
                 });
             });
             
             // إضافة تأثيرات keyboard
             document.addEventListener('keydown', function(e) {
                 if (e.key === 'Escape' && document.getElementById('new-profile-modal')) {
                     closeModal();
                 }
             });
         }
         
         // دالة مراقبة تغييرات حالة تسجيل الدخول
         function setupLoginStatusWatcher() {
             // مراقبة تغييرات localStorage
             let lastLoginStatus = checkUserLoginStatus();
             
             setInterval(function() {
                 const currentLoginStatus = checkUserLoginStatus();
                 if (currentLoginStatus !== lastLoginStatus) {
                     console.log('🔄 تغييرت حالة تسجيل الدخول من', lastLoginStatus, 'إلى', currentLoginStatus);
                     
                     // تحديث إظهار/إخفاء الأيقونات
                     const mobileProfileBtn = document.getElementById('mobile-profile-btn');
                     const desktopProfileBtn = document.querySelector('.profile-icon-btn');
                     
                     if (mobileProfileBtn) {
                         mobileProfileBtn.style.display = currentLoginStatus ? 'block' : 'none';
                         console.log('📱 تحديث زر البروفايل للموبايل:', currentLoginStatus ? 'إظهار' : 'إخفاء');
                     }
                     
                     if (desktopProfileBtn) {
                         desktopProfileBtn.style.display = currentLoginStatus ? 'inline-block' : 'none';
                         console.log('💻 تحديث زر البروفايل للديسكتوب:', currentLoginStatus ? 'إظهار' : 'إخفاء');
                     }
                     
                     lastLoginStatus = currentLoginStatus;
                 }
             }, 1000);
         }
         
         // دالة إنشاء نافذة طلب خدمة الأسانيد
function showAsanidServicePopup() {
             console.log('🔖 فتح نافذة طلب خدمة الأسانيد...');
             
    // إزالة أي نافذة موجودة سابقاً
    const existingModal = document.getElementById('asanid-mobile-modal');
    if (existingModal) {
        existingModal.remove();
    }

             // إنشاء HTML النافذة المنبثقة
    const modalHTML = `
        <div id="asanid-mobile-modal" style="
            display: block;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            direction: rtl;
            overflow: auto;
                     padding: 80px 0 20px 0;
        ">
            <div style="
                background-color: white;
                margin: auto;
                width: 90%;
                max-width: 600px;
                border-radius: 20px;
                         padding: 20px;
                position: relative;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                margin-bottom: 40px;
                         max-height: 90vh;
                         overflow-y: auto;
            ">
                <span id="closeAsanidModal" style="
                    position: absolute;
                    left: 20px;
                    top: 15px;
                    font-size: 30px;
                    font-weight: bold;
                    cursor: pointer;
                    color: #aaa;
                ">&times;</span>
                
                <h2 style="
                             font-family: 'Droid Arabic Kufi';
                    font-weight: 700;
                    font-size: 21.99px;
                    line-height: 150%;
                    letter-spacing: 0%;
                    text-align: center;
                    color: #00a19a;
                    margin-bottom: 25px !important;
                ">خدمة الاسانيد القانونية</h2>
                
                <form id="asanidContactForm" style="
                             display: flex;
                             flex-direction: column;
                             gap: 12px;
                             width: 100%;
                ">
                    <!-- الاسم بالكامل -->
                    <div style="padding: 0 !important;">
                        <input type="text" id="fullName" placeholder="الاسم بالكامل" style="
                            width: 100%;
                            height: 45px;
                            border-radius: 10px;
                            border: 1px solid #e0e0e0;
                            padding: 0 15px;
                            text-align: right;
                                     font-family: 'Droid Arabic Kufi';
                            font-size: 14px;
                            box-sizing: border-box;
                            background-color: #f8f9fa;
                            margin: 0 !important;
                        ">
                    </div>
                    
                             <!-- البريد الإلكتروني -->
                    <div style="padding: 0 !important;">
                                 <input type="email" id="email" placeholder="البريد الالكتروني" style="
                            width: 100%;
                            height: 45px;
                            border-radius: 10px;
                            border: 1px solid #e0e0e0;
                            padding: 0 15px;
                            text-align: right;
                                     font-family: 'Droid Arabic Kufi';
                            font-size: 14px;
                            box-sizing: border-box;
                            background-color: #f8f9fa;
                            margin: 0 !important;
                        ">
                    </div>
                    
                             <!-- رقم الهاتف -->
                             <div style="
                                 padding: 0 !important; 
                                 display: flex; 
                                 gap: 8px; 
                            width: 100%;
                            box-sizing: border-box;
                             ">
                        <input type="tel" id="phone" placeholder="رقم الهاتف" style="
                            flex: 1;
                                     min-width: 0;
                            height: 45px;
                            border-radius: 10px;
                            border: 1px solid #e0e0e0;
                                     padding: 0 12px;
                            text-align: right;
                                     font-family: 'Droid Arabic Kufi';
                            font-size: 14px;
                            box-sizing: border-box;
                            background-color: #f8f9fa;
                            margin: 0 !important;
                        ">
                                 <div class="country-code-select" style="
                            width: 80px;
                            height: 45px;
                                     border-radius: 12px;
                                     border: 1px solid #ddd;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: #f8f9fa;
                                     gap: 3px;
                                     flex-shrink: 0;
                                     box-sizing: border-box;
                                     padding: 0 8px;
                        ">
                                   
                                     <img src="../assets/icons/call-arrow.svg" alt="Arrow" class="arrow-icon" style="width: 8px; height: 8px; opacity: 0.6;">
                                     <span class="code" style="font-family: 'Droid Arabic Kufi'; font-size: 12px; color: #666; font-weight: 500;">+20</span>
                        </div>
                    </div>
                    
                    <!-- الموضوع -->
                    <div style="padding: 0 !important;">
                        <textarea id="subject" placeholder="الموضوع" style="
                            width: 100%;
                            height: 120px;
                            border-radius: 10px;
                            border: 1px solid #e0e0e0;
                            padding: 15px;
                            text-align: right;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                            font-size: 14px;
                            box-sizing: border-box;
                            background-color: #f8f9fa;
                            resize: vertical;
                            min-height: 120px;
                            margin: 0 !important;
                        "></textarea>
                    </div>
                    
                    <!-- النص التوضيحي -->
                    <div style="padding: 0 !important; text-align: right;">
                        <h4 style="
                            font-family: Droid Arabic Kufi;
                            font-weight: 400;
                            font-size: 8.57px;
                            line-height: 150%;
                            letter-spacing: 0%;
                            text-align: right;
                            color: #00a19a;
                            margin: 0 0 5px 0 !important;
                        ">عزيزنا العميل:</h4>
                        <p style="
                            font-family: Droid Arabic Kufi;
                            font-weight: 400;
                            font-size: 7.35px;
                            line-height: 150%;
                            letter-spacing: 0%;
                            text-align: right;
                            color: #666;
                            margin: 0 !important;
                        ">شكرا لكم سوف يتم اعداد الاسانيد المطلوبة في اقرب وقت ممكن وسنقوم بارسالها لكم علي بريدكم الالكتروني</p>
                    </div>
                    
                    <!-- زر الإرسال -->
                    <button type="button" id="submitAsanidForm" style="
                        width: 100%;
                        height: 45px;
                        background-color: #00a19a;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                        margin: 0 !important;
                    ">إرسال</button>
                </form>
            </div>
        </div>
    `;

             // إضافة النافذة للصفحة
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // إضافة الأحداث
    const modal = document.getElementById('asanid-mobile-modal');
    const closeBtn = document.getElementById('closeAsanidModal');
    const submitBtn = document.getElementById('submitAsanidForm');

    // إغلاق النافذة
    const closeModal = () => {
        modal.remove();
                 document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // تأثير hover على الزر
    submitBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#008f89';
    });
    
    submitBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#00a19a';
    });

    // معالجة إرسال النموذج
    submitBtn.addEventListener('click', function() {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;

        // التحقق من ملء الحقول الأساسية
        if (!fullName || !email || !subject) {
            alert('يرجى ملء الحقول المطلوبة: الاسم بالكامل، البريد الإلكتروني، والموضوع');
            return;
        }

        // التحقق من صحة البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('يرجى إدخال بريد إلكتروني صحيح');
            return;
        }

        alert('تم إرسال طلبكم بنجاح! سنتواصل معكم قريباً على البريد الإلكتروني المذكور.');
        closeModal();
    });
             
             // منع التمرير في الخلفية
             document.body.style.overflow = 'hidden';
             
             console.log('✅ تم إنشاء نافذة خدمة الأسانيد بنجاح');
         }
         
         // دالة إنشاء نافذة تعديل البيانات
         function showEditProfileModal() {
             console.log('✏️ فتح نافذة تعديل البيانات...');
             
    // إزالة أي نافذة موجودة سابقاً
             const existingModal = document.getElementById('edit-profile-modal');
    if (existingModal) {
        existingModal.remove();
    }

             // الحصول على بيانات المستخدم الحالية
             const userData = getCurrentUser();
             const currentName = (userData && userData.name) ? userData.name : '';
             const currentEmail = (userData && userData.email) ? userData.email : '';
             const currentPhone = (userData && userData.phone) ? userData.phone : '';

             // إنشاء HTML النافذة المنبثقة
    const modalHTML = `
                 <div id="edit-profile-modal" style="
            display: block;
            position: fixed;
                     z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            direction: rtl;
            overflow: auto;
                     padding: 60px 0 20px 0;
        ">
            <div style="
                background-color: white;
                         margin: auto;
                         width: 85%;
                         max-width: 420px;
                         border-radius: 15px;
                         padding: 20px;
                position: relative;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            ">
                         <span id="closeEditProfileModal" style="
                    position: absolute;
                             left: 12px;
                             top: 12px;
                             font-size: 20px;
                    font-weight: bold;
                    cursor: pointer;
                             color: #999;
                ">&times;</span>
                
                <h2 style="
                    font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                    font-weight: 700;
                             font-size: 18px;
                    text-align: center;
                    color: #00a19a;
                             margin: 0 0 15px 0;
                         ">تعديل بيانات مستخدم</h2>
                
                         <form id="editProfileForm" style="
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                ">
                                                                  <!-- نوع المستخدم -->
                             <div style="position: relative;">
                                 <select id="userType" style="
                            width: 100%;
                                     height: 40px;
                            border-radius: 10px;
                                     border: 1px solid #ddd;
                                     padding: 0 15px 0 45px;
                            text-align: right;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                     font-size: 14px;
                            background-color: #f8f9fa;
                                     color: #999;
                            appearance: none;
                                     box-sizing: border-box;
                                 ">
                                     <option value="">نوع المستخدم</option>
                                     <option value="individual">فرد</option>
                                     <option value="company">شركة</option>
                                     <option value="organization">مؤسسة</option>
                                 </select>
                                 <div style="
                                     position: absolute;
                                     left: 15px;
                                     top: 50%;
                                     transform: translateY(-50%);
                                     width: 0;
                                     height: 0;
                                     border-left: 5px solid transparent;
                                     border-right: 5px solid transparent;
                                     border-top: 5px solid #999;
                                     pointer-events: none;
                                 "></div>
                    </div>
                    
                             <!-- البريد الإلكتروني -->
                             <input type="email" id="editEmail" value="${currentEmail}" placeholder="البريد الالكتروني" style="
                            width: 100%;
                                 height: 40px;
                            border-radius: 10px;
                                 border: 1px solid #ddd;
                            padding: 0 15px;
                            text-align: right;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                 font-size: 14px;
                                 background-color: #f8f9fa;
                                 color: #999;
                            box-sizing: border-box;
                             ">
                             
                             <!-- عنوان تفاصيل أخرى -->
                             <h3 style="
                                 font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                 font-weight: 600;
                                 font-size: 14px;
                                 text-align: center;
                                 color: #00a19a;
                                 margin: 10px 0 8px 0;
                             ">تفاصيل أخرى</h3>
                             
                             <!-- المدينة -->
                             <div style="position: relative;">
                                 <select id="city" style="
                                     width: 100%;
                                     height: 40px;
                                     border-radius: 10px;
                                     border: 1px solid #ddd;
                                     padding: 0 15px 0 45px;
                                     text-align: right;
                                     font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                     font-size: 14px;
                            background-color: #f8f9fa;
                                     color: #999;
                            appearance: none;
                                     box-sizing: border-box;
                                 ">
                                     <option value="">المدينة</option>
                                     <option value="riyadh">الرياض</option>
                                     <option value="jeddah">جدة</option>
                                     <option value="dammam">الدمام</option>
                                     <option value="mecca">مكة المكرمة</option>
                                     <option value="medina">المدينة المنورة</option>
                                 </select>
                                 <div style="
                                     position: absolute;
                                     left: 15px;
                                     top: 50%;
                                     transform: translateY(-50%);
                                     width: 0;
                                     height: 0;
                                     border-left: 5px solid transparent;
                                     border-right: 5px solid transparent;
                                     border-top: 5px solid #999;
                                     pointer-events: none;
                                 "></div>
                    </div>
                    
                             <!-- العنوان التفصيلي -->
                             <input type="text" id="detailedAddress" placeholder="العنوان التفصيلي" style="
                            width: 100%;
                                 height: 40px;
                            border-radius: 10px;
                                 border: 1px solid #ddd;
                            padding: 0 15px;
                            text-align: right;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                 font-size: 14px;
                                 background-color: #f8f9fa;
                                 color: #999;
                            box-sizing: border-box;
                             ">
                             
                             <!-- رقم الهاتف -->
                             <input type="tel" id="editPhone" value="${currentPhone}" placeholder="رقم الهاتف" style="
                                 width: 100%;
                                 height: 40px;
                                 border-radius: 10px;
                                 border: 1px solid #ddd;
                                 padding: 0 15px;
                                 text-align: right;
                                 font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                 font-size: 14px;
                            background-color: #f8f9fa;
                                 color: #999;
                                 box-sizing: border-box;
                             ">
                             
                             <!-- رقم الهاتف والجوال في صف واحد -->
                             <div style="display: flex; gap: 10px;">
                                 <input type="tel" id="mobilePhone" placeholder="الجوال" style="
                                     width: 100%;
                                     max-width: 351.11px;
                                     height: 40px;
                                     border-radius: 10px;
                                     border: 1px solid #ddd;
                                     padding: 0 15px;
                                     text-align: right;
                                     font-family: 'Droid Arabic Kufi';
                                     font-size: 14px;
                                     background-color: #f8f9fa;
                                     color: #999;
                                     box-sizing: border-box;
                                 ">
                                 <div style="
                                     width: 80px;
                                     height: 40px;
                                     border-radius: 12px;
                                     border: 1px solid #ddd;
                                     display: flex;
                                     align-items: center;
                                     justify-content: center;
                                     background-color: #f8f9fa;
                                     gap: 3px;
                                     padding: 0 8px;
                                 ">
                                 
                                     <span style="font-family: 'Droid Arabic Kufi', Arial, sans-serif; font-size: 12px; color: #666; font-weight: 500;">+20</span>
                                     <img src="../assets/icons/call-arrow.svg" alt="Arrow" style="width: 8px; height: 8px; opacity: 0.6;">
                                   <img src="../assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg" alt="Egypt Flag" style="width: 16px; height: 11px;">

                                 </div>
                    </div>
                    
                             <!-- الفاكس -->
                             <input type="tel" id="fax" placeholder="الفاكس" style="
                        width: 100%;
                                 height: 40px;
                                 border-radius: 10px;
                                 border: 1px solid #ddd;
                                 padding: 0 15px;
                                 text-align: right;
                                 font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                 font-size: 14px;
                                 background-color: #f8f9fa;
                                 color: #999;
                                 box-sizing: border-box;
                             ">
                             
                             <!-- صندوق البريد -->
                             <input type="text" id="poBox" placeholder="صندوق البريد" style="
                                 width: 100%;
                                 height: 40px;
                                 border-radius: 10px;
                                 border: 1px solid #ddd;
                                 padding: 0 15px;
                                 text-align: right;
                                 font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                 font-size: 14px;
                                 background-color: #f8f9fa;
                                 color: #999;
                                 box-sizing: border-box;
                             ">
                             
                             <!-- الرمز البريدي -->
                             <input type="text" id="postalCode" placeholder="الرمز البريدي" style="
                                 width: 100%;
                                 height: 40px;
                                 border-radius: 10px;
                                 border: 1px solid #ddd;
                                 padding: 0 15px;
                                 text-align: right;
                                 font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                 font-size: 14px;
                                 background-color: #f8f9fa;
                                 color: #999;
                                 box-sizing: border-box;
                             ">
                             
                             <!-- نص الاحتفاظ بالاشتراك -->
                             <div style="
                                 text-align: center;
                                 margin: 10px 0 5px 0;
                                 font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                 font-size: 14px;
                                 color: #00a19a;
                             ">
                                 <div style="font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                font-weight: 400;
                                font-size: 14px;
                                line-height: 150%;
                                letter-spacing: 0%;
                                text-align: right;
                                ">احتفظ بالاشتراك ساريا</div>
                                 <div style="font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                font-weight: 400;
                                font-size: 12px;
                                line-height: 150%;
                                letter-spacing: 0%;
                                text-align: right;
                                color: #2D3748 !important;
                                ">
                                     تنتهي صلاحية اشتراككم بتاريخ 31/12/2025
                                 </div>
                             </div>
                             
                             <!-- أزرار العمل -->
                             <div style="display: flex; gap: 10px; margin-top: 10px;">
                                 <button type="button" id="changePasswordBtn" style="
                                     flex: 1;
                                     height: 40px;
                                     background-color: #ff8c42;
                                     color: white;
                                     border: none;
                                     border-radius: 10px;
                                     font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                     font-size: 14px;
                                     font-weight: bold;
                                     cursor: pointer;
                                 ">تعديل كلمة المرور</button>
                                 
                                 <button type="button" id="saveEditProfile" style="
                                     flex: 1;
                                     height: 40px;
                        background-color: #00a19a;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                     font-size: 14px;
                        font-weight: bold;
                        cursor: pointer;
                                 ">تعديل بياناتي</button>
                             </div>
                </form>
            </div>
        </div>
    `;

             // إضافة النافذة للصفحة
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // إضافة الأحداث
             const modal = document.getElementById('edit-profile-modal');
             const closeBtn = document.getElementById('closeEditProfileModal');
             const changePasswordBtn = document.getElementById('changePasswordBtn');
             const saveBtn = document.getElementById('saveEditProfile');

    // إغلاق النافذة
    const closeModal = () => {
        modal.remove();
                 document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

             // زر تعديل كلمة المرور
             changePasswordBtn.addEventListener('click', function() {
                 console.log('🔒 النقر على زر تعديل كلمة المرور');
                 
                 // إغلاق نافذة تعديل البيانات أولاً
                 closeModal();
                 
                 // فتح نافذة تعديل كلمة المرور
                 if (typeof PasswordChangeManager !== 'undefined') {
                     PasswordChangeManager.showPasswordChangeModal();
                 } else if (typeof showPasswordChangeModal !== 'undefined') {
                     showPasswordChangeModal();
                 } else {
                     console.error('❌ نظام تعديل كلمة المرور غير متوفر');
                     alert('عذراً، نافذة تعديل كلمة المرور غير متوفرة حالياً');
                 }
             });

             // معالجة حفظ التغييرات
             saveBtn.addEventListener('click', function() {
                 const userType = document.getElementById('userType').value;
                 const email = document.getElementById('editEmail').value;
                 const city = document.getElementById('city').value;
                 const detailedAddress = document.getElementById('detailedAddress').value;
                 const phone = document.getElementById('editPhone').value;
                 const mobilePhone = document.getElementById('mobilePhone').value;
                 const fax = document.getElementById('fax').value;
                 const poBox = document.getElementById('poBox').value;
                 const postalCode = document.getElementById('postalCode').value;

                 // التحقق من ملء الحقول الأساسية
                 if (!email) {
                     alert('يرجى ملء البريد الإلكتروني');
            return;
        }

                 // التحقق من صحة البريد الإلكتروني
                 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                 if (!emailRegex.test(email)) {
                     alert('يرجى إدخال بريد إلكتروني صحيح');
            return;
        }

                 // حفظ البيانات في localStorage
                 const updatedUser = {
                     name: currentName,
                     email: email,
                     userType: userType,
                     city: city,
                     detailedAddress: detailedAddress,
                     phone: phone,
                     mobilePhone: mobilePhone,
                     fax: fax,
                     poBox: poBox,
                     postalCode: postalCode,
                     isLoggedIn: true,
                     lastUpdated: new Date().toISOString()
                 };

                 localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                 alert('تم حفظ التغييرات بنجاح!');
            closeModal();
             });
             
             // منع التمرير في الخلفية
             document.body.style.overflow = 'hidden';
             
             console.log('✅ تم إنشاء نافذة تعديل البيانات بالتصميم الجديد');
         }
         
         // دالة إظهار نافذة تعديل كلمة المرور
function showPasswordChangeModal() {
    console.log('🔒 فتح نافذة تعديل كلمة المرور');
    const modal = document.getElementById('password-change-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // تركيز على أول حقل
        setTimeout(() => {
            const firstInput = document.getElementById('currentPassword');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    } else {
        console.error('❌ لم يتم العثور على نافذة تعديل كلمة المرور');
    }
}

// دالة إغلاق نافذة تعديل كلمة المرور
function closePasswordModal() {
    console.log('🔒 إغلاق نافذة تعديل كلمة المرور');
    const modal = document.getElementById('password-change-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // مسح الحقول
                 const fields = ['currentPassword', 'newPassword', 'confirmPassword'];
                 fields.forEach(fieldId => {
                     const field = document.getElementById(fieldId);
                     if (field) {
                         field.value = '';
                     }
                 });
             }
         }
         
         // دالة معالجة إرسال نموذج تعديل كلمة المرور
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

         // إضافة أحداث النقر خارج النافذة لإغلاق نافذة تعديل كلمة المرور
document.addEventListener('click', function(e) {
    const modal = document.getElementById('password-change-modal');
             if (modal && e.target === modal) {
        closePasswordModal();
    }
});

         // إصلاح زر البروفايل للديسكتوب
         function fixDesktopProfileButton() {
             const desktopBtn = document.querySelector('.profile-icon-btn');
             
             if (desktopBtn) {
                 // التحقق من حالة تسجيل الدخول
                 const isLoggedIn = checkUserLoginStatus();
                 
                 if (isLoggedIn) {
                     // إظهار الزر
                     desktopBtn.style.display = 'inline-block';
                     desktopBtn.style.visibility = 'visible';
                 }
                 
                 // إزالة الأحداث القديمة وإضافة حدث جديد
                 const newBtn = desktopBtn.cloneNode(true);
                 desktopBtn.parentNode.replaceChild(newBtn, desktopBtn);
                 
                 // ربط الحدث الجديد
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                     openProfileModal();
                 });
             }
         }
         
         // تشغيل الإصلاح بعد تحميل الصفحة
    setTimeout(() => {
             fixDesktopProfileButton();
         }, 2000);
         

         
    }, 1000);
});
*/