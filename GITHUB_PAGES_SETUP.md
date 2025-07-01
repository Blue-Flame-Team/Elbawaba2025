# دليل إعداد GitHub Pages - الباوابة

## الخطوات المطلوبة لتشغيل الموقع على GitHub Pages:

### 1. تأكد من رفع جميع الملفات
```
git add .
git commit -m "تحديث ملفات الموقع لـ GitHub Pages"
git push origin main
```

### 2. تفعيل GitHub Pages
1. اذهب إلى Settings في مستودع GitHub
2. اختر Pages من القائمة الجانبية
3. في Source، اختر "Deploy from a branch"
4. اختر Branch: main
5. اختر Folder: / (root)
6. اضغط Save

### 3. انتظر حتى يتم النشر
- يستغرق 5-10 دقائق عادة
- ستظهر رسالة خضراء عند اكتمال النشر
- الرابط سيكون: `https://your-username.github.io/repository-name`

### 4. استكشاف الأخطاء
إذا لم يعمل الموقع:

#### أ) افتح Developer Console في المتصفح (F12)
- ابحث عن أخطاء حمراء
- شاهد رسائل التشخيص من `github-pages-fix.js`

#### ب) تحقق من المسارات
- تأكد أن جميع الصور في `assets/`
- تأكد أن جميع الـ CSS في `styles/`
- تأكد أن جميع الـ JS في `scripts/`

#### ج) مشاكل شائعة وحلولها:

**المشكلة:** الصور لا تظهر
**الحل:** 
```html
<!-- بدلاً من -->
<img src="Assets/Icons/logo.png">
<!-- استخدم -->
<img src="assets/icons/logo.png">
```

**المشكلة:** CSS لا يعمل
**الحل:**
```html
<!-- تأكد من المسار الصحيح -->
<link rel="stylesheet" href="styles/global.css">
```

**المشكلة:** JavaScript لا يعمل
**الحل:**
```html
<!-- تأكد من ترتيب التحميل -->
<script src="scripts/main.js"></script>
```

### 5. فحص التشخيص
افتح Console في المتصفح واكتب:
```javascript
GitHubPagesDiagnostics.runAllChecks()
```

### 6. روابط مفيدة
- [دليل GitHub Pages الرسمي](https://docs.github.com/en/pages)
- [استكشاف أخطاء GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/troubleshooting-jekyll-build-errors-for-github-pages-sites)

## ملاحظات مهمة:
- GitHub Pages يدعم HTTPS فقط
- حساس للأحرف الكبيرة والصغيرة
- لا يدعم PHP أو خوادم backend
- يستغرق وقت للتحديث بعد كل push 