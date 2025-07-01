/**
 * Universal Profile Icons Fix - All Pages
 * حل شامل لأيقونات البروفايل في جميع صفحات الموقع
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Universal Profile Icons Fix - Loading...');
    
    // إعداد زر تغيير كلمة المرور
    setupPasswordChangeButton();
    
    // Check login status function
    function checkUserLoginStatus() {
        const currentUser = localStorage.getItem('currentUser');
        const userLoggedIn = localStorage.getItem('userLoggedIn');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (currentUser) {
            try {
                if (currentUser.startsWith('{')) {
                    const user = JSON.parse(currentUser);
                    if (user && (user.isLoggedIn === true || user.name || user.username)) {
                        return true;
                    }
                } else {
                    if (currentUser.includes('مسجل') || currentUser.includes('logged')) {
                        return true;
                    }
                }
            } catch (e) {
                localStorage.removeItem('currentUser');
            }
        }
        
        if (userLoggedIn === 'true' || isLoggedIn === 'true') {
            return true;
        }
        
        if (document.body.classList.contains('user-logged-in')) {
            return true;
        }
        
        return false;
    }
    
    // Create universal CSS
    function createUniversalCSS() {
        if (document.getElementById('universal-profile-fix')) return;
        
        const css = document.createElement('style');
        css.id = 'universal-profile-fix';
        css.textContent = `
            /* Desktop Profile Icon */
            .profile-icon-btn[data-universal-fix="true"] {
                display: inline-block !important;
                visibility: visible !important;
                opacity: 0.8 !important;
                background: transparent !important;
                width: 24px !important;
                height: 24px !important;
                align-items: center !important;
                justify-content: center !important;
                transition: opacity 0.3s ease !important;
                margin: 0 !important;
                border: none !important;
                cursor: pointer !important;
                padding: 0 !important;
                position: relative !important;
                pointer-events: auto !important;
                z-index: 999 !important;
            }
            
            .profile-icon-btn[data-universal-fix="true"]:hover {
                opacity: 1 !important;
            }
            
            .profile-icon-btn[data-universal-fix="true"] img {
                width: 20px !important;
                height: 20px !important;
                object-fit: contain !important;
            }
            
            /* Mobile Profile Icon - Hide on Desktop */
            @media (min-width: 769px) {
                #mobile-profile-btn,
                #mobile-profile-btn[data-universal-fix="true"],
                button#mobile-profile-btn,
                .icon-btn#mobile-profile-btn {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    position: absolute !important;
                    left: -9999px !important;
                    width: 0 !important;
                    height: 0 !important;
                    pointer-events: none !important;
                }
            }
            
            /* Mobile Profile Icon - Show on Mobile Only */
            @media (max-width: 768px) {
                #mobile-profile-btn[data-universal-fix="true"] {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    position: relative !important;
                    left: auto !important;
                    pointer-events: auto !important;
                }
                
                .profile-icon-btn[data-universal-fix="true"] {
                    display: none !important;
                }
            }
            
            /* Basic Modal Styles */
            .modal {
                display: none;
                position: fixed;
                z-index: 999999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                justify-content: center;
                align-items: center;
                font-family: 'Droid Arabic Kufi', sans-serif !important;
            }
            
            .modal-content {
                background: white;
                padding: 0;
                border-radius: 10px;
                max-width: 90%;
                max-height: 90%;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 28px;
                font-weight: bold;
                color: #999;
                cursor: pointer;
                z-index: 1000;
            }
            
            .close-modal:hover {
                color: #000;
            }
        `;
        
        document.head.appendChild(css);
        console.log('✅ Universal CSS applied');
    }
    
    // Setup profile icons
    function setupProfileIcons() {
        const mobileBtn = document.getElementById('mobile-profile-btn');
        const desktopBtn = document.querySelector('.profile-icon-btn');
        const isLoggedIn = checkUserLoginStatus();
        
        console.log('🔍 Found Elements:');
        console.log('  - Mobile Button:', !!mobileBtn);
        console.log('  - Desktop Button:', !!desktopBtn);
        console.log('  - User Logged In:', isLoggedIn);
        
        if (!isLoggedIn) {
            console.log('❌ User not logged in - hiding icons');
            if (mobileBtn) mobileBtn.style.display = 'none';
            if (desktopBtn) desktopBtn.style.display = 'none';
            return;
        }
        
        // Create CSS
        createUniversalCSS();
        
        // Setup desktop icon
        if (desktopBtn) {
            desktopBtn.setAttribute('data-universal-fix', 'true');
            desktopBtn.style.setProperty('display', 'inline-block', 'important');
            desktopBtn.style.setProperty('visibility', 'visible', 'important');
            
            if (!desktopBtn.hasAttribute('data-click-setup')) {
                desktopBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openProfileModal();
                }, true);
                desktopBtn.setAttribute('data-click-setup', 'true');
            }
            
            console.log('✅ Desktop icon configured');
        }
        
        // Setup mobile icon
        if (mobileBtn) {
            const isDesktop = window.innerWidth > 768;
            
            if (isDesktop) {
                // Hide on desktop
                mobileBtn.style.setProperty('display', 'none', 'important');
                mobileBtn.style.setProperty('visibility', 'hidden', 'important');
                mobileBtn.style.setProperty('position', 'absolute', 'important');
                mobileBtn.style.setProperty('left', '-9999px', 'important');
                console.log('💻 Mobile icon hidden on desktop');
            } else {
                // Show on mobile
                mobileBtn.setAttribute('data-universal-fix', 'true');
                mobileBtn.style.setProperty('display', 'block', 'important');
                mobileBtn.style.setProperty('visibility', 'visible', 'important');
                
                if (!mobileBtn.hasAttribute('data-click-setup')) {
                    mobileBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        openProfileModal();
                    }, true);
                    mobileBtn.setAttribute('data-click-setup', 'true');
                }
                
                console.log('✅ Mobile icon configured');
            }
        }
        
        // Setup protection
        setupProtection(desktopBtn, mobileBtn);
    }
    
    // Protection against external interference
    function setupProtection(desktopBtn, mobileBtn) {
        const protect = () => {
            if (desktopBtn && desktopBtn.hasAttribute('data-universal-fix')) {
                const computed = window.getComputedStyle(desktopBtn);
                if (computed.display === 'none' || computed.visibility === 'hidden') {
                    desktopBtn.style.setProperty('display', 'inline-block', 'important');
                    desktopBtn.style.setProperty('visibility', 'visible', 'important');
                }
            }
            
            if (mobileBtn) {
                const isDesktop = window.innerWidth > 768;
                if (isDesktop) {
                    const computed = window.getComputedStyle(mobileBtn);
                    if (computed.display !== 'none') {
                        mobileBtn.style.setProperty('display', 'none', 'important');
                    }
                }
            }
        };
        
        setInterval(protect, 3000);
        
        // Resize handler
        window.addEventListener('resize', function() {
            if (mobileBtn) {
                const isDesktop = window.innerWidth > 768;
                if (isDesktop) {
                    mobileBtn.style.setProperty('display', 'none', 'important');
                } else {
                    mobileBtn.style.setProperty('display', 'block', 'important');
                    mobileBtn.style.setProperty('visibility', 'visible', 'important');
                }
            }
        });
    }
    
    // Load user dashboard modal if not exists
    function loadUserDashboardModal() {
        if (document.getElementById('user-dashboard-modal')) {
            console.log('✅ User dashboard modal already exists');
            return Promise.resolve();
        }
        
        console.log('📥 Loading user dashboard modal...');
        
        return fetch('../includes/user-dashboard-modal.html')
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                console.log('✅ User dashboard modal loaded successfully');
                
                // Setup modal close functionality
                setupModalCloseFunctionality();
            })
            .catch(error => {
                console.warn('⚠️ Failed to load user dashboard modal:', error);
                // Fallback: create a simple modal
                createFallbackModal();
            });
    }
    
    // Setup modal close functionality
    function setupModalCloseFunctionality() {
        const modal = document.getElementById('user-dashboard-modal');
        if (!modal) return;
        
        // Close button
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeProfileModal);
        }
        
        // Click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProfileModal();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeProfileModal();
            }
        });
    }
    
    // Create fallback modal if loading fails
    function createFallbackModal() {
        const modalHTML = `
            <div id="user-dashboard-modal" class="profile-modal-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: none;
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
                    max-width: 600px;
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
                        ">الوصول السريع</h3>
                        <p style="
                            color: #718096;
                            margin: 0;
                            font-size: 14px;
                        " id="dashboard-welcome-message">مرحبا مستخدم مسجل</p>
                        
                        <button class="close-modal" style="
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
                        ">×</button>
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
                            <button onclick="alert('ميزة تعديل البيانات قريباً')" style="
                                justify-content: space-between;
                                border-radius: 16px;
                                padding: 22px 30px;
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
                                transition: all 0.3s ease;
                                min-width: 180px;
                            ">
                                عدل بياناتك
                            </button>

                            <button onclick="alert('ميزة طلب الأسانيد قريباً')" style="
                                justify-content: space-between;
                                border-radius: 16px;
                                padding: 22px 30px;
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
                                transition: all 0.3s ease;
                                min-width: 180px;
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
                            <button onclick="alert('ميزة خدمة العملاء قريباً')" style="
                                justify-content: space-between;
                                border-radius: 16px;
                                padding: 22px 30px;
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
                                transition: all 0.3s ease;
                                min-width: 180px;
                            ">
                                خدمة العملاء
                            </button>

                            <button onclick="alert('ميزة المساعدة الذاتية قريباً')" style="
                                justify-content: space-between;
                                border-radius: 16px;
                                padding: 22px 30px;
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
                                transition: all 0.3s ease;
                                min-width: 180px;
                            ">
                                المساعدة الذاتية
                            </button>
                        </div>
                        
                        <!-- Row 3 - Logout Button -->
                        <div style="margin-top: 30px; display: flex; justify-content: center;">
                            <button onclick="handleLogout()" style="
                                width: 300px;
                                height: 70px;
                                justify-content: center;
                                align-items: center;
                                text-align: center;
                                border-radius: 16px;
                                padding: 22px 50px;
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
                                transition: all 0.3s ease;
                            ">
                                تسجيل الخروج
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        setupModalCloseFunctionality();
        console.log('✅ Fallback modal created');
    }
    
    // Open profile modal function
    function openProfileModal() {
        console.log('🔓 Opening profile modal...');
        
        // First ensure modal is loaded
        loadUserDashboardModal().then(() => {
            const modal = document.getElementById('user-dashboard-modal');
            if (modal) {
                // Update user info in modal
                updateModalUserInfo();
                
                modal.style.display = 'flex';
                modal.style.zIndex = '99999';
                document.body.style.overflow = 'hidden';
                console.log('✅ Profile modal opened');

                // Add click handler for edit profile button
                const editProfileBtn = modal.querySelector('[data-action="edit-profile"]');
                if (editProfileBtn) {
                    editProfileBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        // Close the dashboard modal
                        closeProfileModal();
                        // Show the edit profile modal
                        if (window.showEditProfileModal) {
                            console.log('✅ showEditProfileModal function found, calling it...');
                            window.showEditProfileModal();
                        } else {
                            console.log('⚠️ showEditProfileModal function not found, trying to load script...');
                            // Try to load the edit profile modal script
                            const script = document.createElement('script');
                            const scriptPath = window.location.pathname.includes('/pages/') ? '../scripts/edit-profile-modal.js' : 'scripts/edit-profile-modal.js';
                            console.log('📂 Loading script from:', scriptPath);
                            script.src = scriptPath;
                            script.onload = function() {
                                console.log('✅ Script loaded successfully');
                                if (window.showEditProfileModal) {
                                    console.log('✅ showEditProfileModal function found after loading script');
                                    window.showEditProfileModal();
                                } else {
                                    console.error('❌ showEditProfileModal function still not found after loading script');
                                }
                            };
                            script.onerror = function(error) {
                                console.error('❌ Failed to load edit-profile-modal.js:', error);
                                console.log('📍 Current path:', window.location.pathname);
                                console.log('🔍 Attempted script path:', scriptPath);
                            };
                            document.head.appendChild(script);
                        }
                    });
                }
            } else {
                console.error('❌ Failed to open profile modal');
                alert('حدث خطأ في فتح نافذة الملف الشخصي');
            }
        });
    }
    
    // Close profile modal function
    function closeProfileModal() {
        const modal = document.getElementById('user-dashboard-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('✅ Profile modal closed');
        }
    }
    
    // Update user info in modal
    function updateModalUserInfo() {
        const currentUser = localStorage.getItem('currentUser');
        let userName = 'مستخدم مسجل';
        
        if (currentUser) {
            try {
                if (currentUser.startsWith('{')) {
                    const user = JSON.parse(currentUser);
                    userName = user.name || user.username || 'مستخدم مسجل';
                } else {
                    userName = currentUser.includes('مسجل') ? 'مستخدم مسجل' : currentUser;
                }
            } catch (e) {
                console.warn('Error parsing user data:', e);
            }
        }
        
        // Update modal welcome message
        const welcomeElement = document.getElementById('dashboard-welcome-message');
        if (welcomeElement) {
            welcomeElement.textContent = `مرحبا ${userName}`;
        }
        
        console.log('✅ Updated modal user info:', userName);
    }
    
    // Handle logout function
    window.handleLogout = function() {
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            // Clear user data
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('isLoggedIn');
            
            // Close modal
            closeProfileModal();
            
            // Hide profile icons
            const desktopBtn = document.querySelector('.profile-icon-btn');
            const mobileBtn = document.getElementById('mobile-profile-btn');
            
            if (desktopBtn) desktopBtn.style.display = 'none';
            if (mobileBtn) mobileBtn.style.display = 'none';
            
            // Remove body class
            document.body.classList.remove('user-logged-in');
            
            alert('تم تسجيل الخروج بنجاح');
            
            // Refresh page or redirect to login
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };
    
    // Testing functions
    window.testUniversalIcons = function() {
        const desktop = document.querySelector('.profile-icon-btn');
        const mobile = document.getElementById('mobile-profile-btn');
        
        if (desktop) {
            desktop.style.setProperty('border', '3px solid red', 'important');
            desktop.style.setProperty('background', 'yellow', 'important');
        }
        if (mobile) {
            mobile.style.setProperty('border', '3px solid red', 'important');
            mobile.style.setProperty('background', 'yellow', 'important');
        }
        
        console.log('🎯 Look for yellow boxes with red borders');
    };
    
    window.simulateLogin = function() {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({
            username: 'test',
            isLoggedIn: true
        }));
        setupProfileIcons();
        console.log('✅ Login simulated');
    };
    
    // Initialize
    setupProfileIcons();
    console.log('🎯 Universal Profile Icons Fix - Complete');

    // مراقبة إضافة زر تغيير كلمة المرور بشكل ديناميكي
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.id === 'changePasswordBtn') {
                        setupPasswordChangeButton();
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// دالة لفتح نافذة خدمة الأسانيد
window.showAsanidModal = function() {
    // إغلاق نافذة البروفايل أولاً
    const profileModal = document.getElementById('user-dashboard-modal');
    if (profileModal) {
        profileModal.style.display = 'none';
    }

    // إذا كانت النافذة موجودة بالفعل، نتأكد من إزالتها
    const existingModal = document.getElementById('asanid-mobile-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // إنشاء النافذة المنبثقة
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
                ">×</span>
                
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

    // إضافة مستمعي الأحداث
    const modal = document.getElementById('asanid-mobile-modal');
    const closeBtn = document.getElementById('closeAsanidModal');
    const form = document.getElementById('asanidContactForm');
    const submitBtn = document.getElementById('submitAsanidForm');

    // إغلاق النافذة عند الضغط على زر الإغلاق
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // معالجة تقديم النموذج
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // التحقق من البيانات
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;

        if (!fullName || !email || !phone || !subject) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        // إرسال النموذج (يمكن إضافة الكود الخاص بالإرسال هنا)
        alert('تم إرسال طلبك بنجاح');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // منع التمرير في الخلفية
    document.body.style.overflow = 'hidden';
};

// دالة لفتح نافذة تغيير كلمة المرور
function setupPasswordChangeButton() {
    // البحث عن الزر بواسطة الـ ID
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        // إضافة مستمع الحدث
        changePasswordBtn.onclick = function() {
            showPasswordChangeModal();
        };
            console.log('✅ تم ربط زر تغيير كلمة المرور');
    } else {
        console.log('⚠️ لم يتم العثور على زر تغيير كلمة المرور');
    }
}

// دالة لفتح نافذة تغيير كلمة المرور
window.showPasswordChangeModal = function() {
    console.log('🔍 جاري فتح نافذة تغيير كلمة المرور...');

    // إغلاق أي نوافذ مفتوحة
    const openModals = document.querySelectorAll('.modal, #user-dashboard-modal, #edit-profile-modal');
    openModals.forEach(modal => {
        if (modal && modal.style) {
            modal.style.display = 'none';
        }
    });

    // إذا كانت النافذة موجودة بالفعل، نتأكد من إزالتها
    const existingModal = document.getElementById('password-change-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // إنشاء النافذة المنبثقة
    const modalHTML = `
        <div id="password-change-modal" style="
            display: block;
            position: fixed;
            z-index: 99999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            direction: rtl;
            overflow: auto;
            padding-top: 60px;
        " class="show" data-events-bound="true">
            <div style="
                background-color: white;
                margin: 20px auto;
                width: calc(100% - 40px);
                max-width: 600px;
                border-radius: 20px;
                padding: 25px;
                position: relative;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                margin-bottom: 40px;
            ">
                <span onclick="closePasswordModal()" style="
                    position: absolute;
                    left: 15px;
                    top: 10px;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                    color: #aaa;
                    line-height: 1;
                ">×</span>
                
                <h2 style="
                    font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                    font-weight: 700;
                    font-size: 21.99px;
                    line-height: 150%;
                    letter-spacing: 0%;
                    text-align: center;
                    color: #00a19a;
                    margin: 0 0 20px 0;
                    padding: 0 30px 0 0;
                ">تعديل كلمة المرور</h2>
                
                <form onsubmit="handlePasswordSubmit(event)" style="
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                " data-password-bound="true">
                    <!-- كلمة المرور الحالية -->
                    <div style="padding: 0; margin: 0 0 10px 0;">
                        <input type="password" id="currentPassword" placeholder="كلمة المرور الحالية" style="
                            width: 100%;
                            height: 50px;
                            border-radius: 10px;
                            border: 1px solid #e0e0e0;
                            padding: 0 15px;
                            text-align: right;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                            font-size: 16px;
                            box-sizing: border-box;
                            background-color: #f8f9fa;
                            margin: 0;
                        " required>
                    </div>
                    
                    <!-- كلمة المرور الجديدة -->
                    <div style="padding: 0; margin: 0 0 10px 0;">
                        <input type="password" id="newPassword" placeholder="كلمة المرور الجديدة" style="
                            width: 100%;
                            height: 50px;
                            border-radius: 10px;
                            border: 1px solid #e0e0e0;
                            padding: 0 15px;
                            text-align: right;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                            font-size: 16px;
                            box-sizing: border-box;
                            background-color: #f8f9fa;
                            margin: 0;
                        " required>
                    </div>
                    
                    <!-- تأكيد كلمة المرور الجديدة -->
                    <div style="padding: 0; margin: 0 0 10px 0;">
                        <input type="password" id="confirmPassword" placeholder="تأكيد كلمة المرور الجديدة" style="
                            width: 100%;
                            height: 50px;
                            border-radius: 10px;
                            border: 1px solid #e0e0e0;
                            padding: 0 15px;
                            text-align: right;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                            font-size: 16px;
                            box-sizing: border-box;
                            background-color: #f8f9fa;
                            margin: 0;
                        " required>
                    </div>
                    
                    <!-- زر الإرسال -->
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
        </div>
    `;

    // إضافة النافذة للصفحة
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // إضافة مستمعي الأحداث
    const modal = document.getElementById('password-change-modal');

    // دالة إغلاق النافذة
window.closePasswordModal = function() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        }
    };
    
    // معالجة تقديم النموذج
    window.handlePasswordSubmit = function(event) {
        event.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // التحقق من تطابق كلمتي المرور
        if (newPassword !== confirmPassword) {
            alert('كلمة المرور الجديدة غير متطابقة مع تأكيد كلمة المرور');
            return;
        }
        
        // التحقق من طول كلمة المرور
        if (newPassword.length < 6) {
            alert('يجب أن تكون كلمة المرور الجديدة 6 أحرف على الأقل');
            return;
        }
        
        // هنا يمكن إضافة كود لإرسال البيانات للخادم
        alert('تم تغيير كلمة المرور بنجاح');
        closePasswordModal();
    };

    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePasswordModal();
} 
    });

    // منع التمرير في الخلفية
    document.body.style.overflow = 'hidden';
}; 