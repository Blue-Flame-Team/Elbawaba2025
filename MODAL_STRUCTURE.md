# هيكل النوافذ المنبثقة الجديد

تم فصل جميع النوافذ المنبثقة إلى ملفات منفصلة لتحسين التنظيم وسهولة الصيانة.

## الملفات المنفصلة

### 1. نوافذ HTML
```
includes/
├── login-modal.html          # نافذة تسجيل الدخول
├── forgot-password-modal.html # نافذة استرداد كلمة المرور  
├── user-dashboard-modal.html  # قائمة الملف الشخصي
├── password-change-modal.html # نافذة تعديل كلمة المرور
└── modals.html               # ملف فارغ مع توضيح التنظيم الجديد
```

### 2. ملفات JavaScript
```
scripts/
├── modal-manager.js          # نظام إدارة النوافذ المنبثقة المحسن
├── password-change-modal.js  # وظائف نافذة تعديل كلمة المرور
├── auth-system.js           # نظام المصادقة الرئيسي
└── login-modal-fix.js       # إصلاحات نافذة تسجيل الدخول
```

## نظام Modal Manager الجديد

### المميزات
- **تحميل ديناميكي**: النوافذ تُحمل عند الحاجة فقط
- **إدارة ذكية**: ربط الأحداث التلقائي
- **دعم متعدد**: يدعم جميع أنواع النوافذ
- **أداء محسن**: تحميل أساسي للنوافذ المهمة

### الاستخدام
```javascript
// فتح نافذة
ModalManager.showModal('login-modal');

// إغلاق نافذة
ModalManager.hideModal('login-modal');

// إغلاق جميع النوافذ
ModalManager.hideAllModals();

// فحص حالة النافذة
ModalManager.isModalVisible('login-modal');
```

## ربط النوافذ

### في HTML
```html
<!-- استخدام Modal Manager -->
<button onclick="ModalManager.showModal('login-modal')">تسجيل الدخول</button>
```

### في JavaScript
```javascript
// استخدام مباشر
ModalManager.showModal('user-dashboard-modal');

// استخدام مع Password Manager
PasswordChangeManager.showPasswordChangeModal();
```

## النوافذ المتوفرة

### 1. نافذة تسجيل الدخول (login-modal)
- تسجيل دخول بالهاتف أو اسم المستخدم
- رابط استرداد كلمة المرور
- روابط المساعدة

### 2. نافذة استرداد كلمة المرور (forgot-password-modal)
- إدخال اسم المستخدم
- إرسال رابط الاسترداد

### 3. قائمة الملف الشخصي (user-dashboard-modal)
- عرض اسم المستخدم
- روابط الخدمات المختلفة
- زر تسجيل الخروج

### 4. نافذة تعديل كلمة المرور (password-change-modal)
- كلمة المرور الحالية
- كلمة المرور الجديدة + التأكيد
- التحقق من صحة البيانات

## التحديثات المطلوبة

### في الملفات الموجودة
1. **index.html**: 
   - تم إزالة النوافذ المدمجة
   - تم إضافة تحميل الملفات الجديدة

2. **includes/modals.html**:
   - تم تفريغ الملف
   - إضافة توضيح للهيكل الجديد

### ملفات JavaScript محدثة
- **modal-manager.js**: نظام إدارة محسن بالكامل
- **auth-system.js**: محدث ليعمل مع النظام الجديد
- **password-change-modal.js**: ملف جديد منفصل

## المزايا

### 1. تنظيم أفضل
- كل نافذة في ملف منفصل
- سهولة العثور على الكود
- فصل المحتوى عن المنطق

### 2. أداء محسن
- تحميل عند الحاجة فقط
- تقليل حجم الصفحة الأولي
- إدارة ذاكرة أفضل

### 3. صيانة أسهل
- تعديل نافذة واحدة لا يؤثر على الأخرى
- اختبار مستقل لكل نافذة
- إعادة استخدام في صفحات أخرى

### 4. قابلية التوسع
- إضافة نوافذ جديدة بسهولة
- تخصيص كل نافذة حسب الحاجة
- دعم أنماط مختلفة

## ملاحظات مهمة

### ترتيب تحميل الملفات
```html
<!-- يجب تحميل Modal Manager أولاً -->
<script src="scripts/modal-manager.js"></script>
<script src="scripts/password-change-modal.js"></script>
<script src="scripts/auth-system.js"></script>
<script src="scripts/login-modal.js"></script>
```

### التوافق مع النظام القديم
- النظام الجديد يدعم fallback للنظام القديم
- يمكن التشغيل بدون Modal Manager
- رسائل خطأ واضحة في حالة المشاكل

### الأمان
- جميع النوافذ تستخدم نفس نظام الأمان
- التحقق من صحة البيانات محفوظ
- لا تأثير على نظام المصادقة الأساسي 