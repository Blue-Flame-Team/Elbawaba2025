# تعليمات تطبيق النظام الموحد على الصفحات الفرعية

## 📋 المطلوب تطبيقه على كل صفحة فرعية:

### 1. في قسم `<head>` أضف:
```html
<!-- الملفات المشتركة للفوتر الموحد ونظام التباين الأسود -->
<link rel="stylesheet" href="../styles/shared/unified-footer.css">
<link rel="stylesheet" href="../styles/shared/dark-contrast-subpages.css">
```

### 2. استبدال قسم المشاركة الاجتماعية (إذا وجد):
```html
<!-- Footer Social Section - Separate from Footer -->
<section class="social-share-section">
    <div style="display: flex; align-items: center; justify-content: space-between; background-color: rgb(245, 245, 245); border-radius: 143px; padding: 10px 20px; margin: 40px 0px 20px; width: 1200px; height: 91px; font-size: 12.8px;">
        <!-- Last Update - Right Side -->
        <div style="display: flex; align-items: center; color: #158885; font-size: 16px;">
            <img src="../assets/icons/clock.svg" alt="الساعة" width="16" height="16" style="margin-left: 5px;">
            <span style="color: #158885;">آخر تعديل 19 ذو القعدة 1444</span>
        </div>
        
        <!-- Rating - Middle -->
        <div style="display: flex; align-items: center; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 3px;">
                <span style="color: #158885;">تقييم المحتوى</span>
                <div style="display: flex; gap: 2px;">
                    <img src="../assets/icons/star.png" alt="نجمة غير مفعلة" width="16" height="16">
                    <img src="../assets/icons/star.png" alt="نجمة غير مفعلة" width="16" height="16">
                    <img src="../assets/icons/star.png" alt="نجمة غير مفعلة" width="16" height="16">
                    <img src="../assets/icons/star2.png" alt="نجمة مفعلة" width="16" height="16">
                    <img src="../assets/icons/star2.png" alt="نجمة مفعلة" width="16" height="16">
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 3px;">
                <span style="color: #158885;">عدد الأصوات:</span>
                <span style="color: #158885;">9130</span>
            </div>
        </div>
        
        <!-- Social Media Sharing - Left Side -->
        <div style="display: flex; align-items: center; gap: 5px;">
            <span style="margin-right: 5px; font-size: 14px; color: #00a19a;">شارك على</span>
            <a href="#" style="color: #00a19a;">
                <img src="../assets/icons/ln1.png" alt="لينكد إن" width="26" height="26">
            </a>
            <a href="#" style="color: #00a19a;">
                <img src="../assets/icons/x2.png" alt="تويتر" width="26" height="26">
            </a>
            <a href="#" style="color: #00a19a;">
                <img src="../assets/icons/in2.png" alt="انستغرام" width="26" height="26">
            </a>
            <a href="#" style="color: #00a19a;">                
                <img src="../assets/icons/f3.png" alt="فيسبوك" width="26" height="26">
            </a>
        </div>   
    </div>
</section>
```

### 3. استبدال الفوتر كاملاً:
```html
<!-- Footer -->
<footer class="main-footer">
    <div class="footer-content">
        <!-- عن محامو المملكة -->
        <div class="footer-column about-column">
            <h3 class="footer-title">عن محامو المملكة</h3>
            <p class="footer-text">
                البوابة القانونية الشاملة للمحامين<br>
                والمهتمين بالشأن القانوني في المملكة<br>
                العربية السعودية
            </p>
        </div>

        <!-- روابط سريعة -->
        <div class="footer-column links-column">
            <h3 class="footer-title">روابط سريعة</h3>
            <ul class="footer-links">
                <li><a href="../index.html">الرئيسية</a></li>
                <li><a href="about-site.html">عن الموقع</a></li>
                <li><a href="faq.html">الأسئلة الشائعة</a></li>
            </ul>
        </div>

        <!-- تواصل معنا -->
        <div class="footer-column contact-column">
            <h3 class="footer-title">تواصل معنا</h3>
            <p class="contact-item">info@mohamoon-ksa.com</p>
            <p class="contact-item">الهاتف: xxx xxxx 11 966+</p>
            <p class="contact-item">العنوان: الرياض، المملكة العربية السعودية</p>
        </div>

        <!-- التواصل الاجتماعي -->
        <div class="footer-column social-column">
            <h3 class="social-title">تابعنا</h3>
            <div class="social-icons">
                <a href="../index.html" class="social-icon">
                    <img src="../assets/icons/FB.svg" alt="facebook">
                </a>
                <a href="../index.html" class="social-icon">
                    <img src="../assets/icons/IN.svg" alt="instagram">
                </a>
                <a href="../index.html" class="social-icon">
                    <img src="../assets/icons/X.svg" alt="twitter">
                </a>
                <a href="../index.html" class="social-icon">
                    <img src="../assets/icons/LN.svg" alt="linkedin">
                </a>
            </div>
            <div class="contact-btn-container">
                <a href="../index.html#contact" class="contact-btn">
                    اتصل بنا
                    <img src="../assets/icons/call2.png" alt="اتصل" class="contact-btn-icon">
                </a>
            </div>
        </div>
    </div>

    <div class="copyright">
        <div class="copyright-content">
            <div class="copyright-row">
                <p class="copyright-text">جميع الحقوق محفوظة © 2024 محامو المملكة</p>
            </div>
            <div class="copyright-row">
                <div class="policy-links">
                    <a href="terms.html">الشروط والأحكام</a>
                    <span class="separator">|</span>
                    <a href="privacy-policy.html">سياسة الخصوصية</a>
                </div>
            </div>
        </div>
    </div>
</footer>
```

### 4. إضافة JavaScript قبل إغلاق `</body>`:
```html
<!-- نظام التباين الأسود الموحد للصفحات الفرعية -->
<script src="../scripts/subpages-dark-contrast.js"></script>
```

## ✅ ما يحققه هذا النظام:

### في حالة التباين الأسود:
- ✅ النصوص تصبح سوداء **بدون خلفية**
- ✅ أيقونات المشاركة الاجتماعية (ln1.png, x2.png, in2.png, f3.png) تصبح سوداء
- ✅ أيقونات التوب بار تبقى بيضاء (محمية)
- ✅ أيقونات الفوتر تبقى بألوانها الطبيعية (محمية)
- ✅ أيقونات النجوم والساعة تبقى بألوانها الطبيعية (محمية)

### الفوتر الموحد:
- ✅ يطابق تصميم index.html تماماً
- ✅ تصميم متجاوب
- ✅ أيقونات اجتماعية موحدة
- ✅ روابط صحيحة

## 📂 الملفات المطلوبة:
- `styles/shared/unified-footer.css` ✅
- `styles/shared/dark-contrast-subpages.css` ✅  
- `scripts/subpages-dark-contrast.js` ✅

## 🔧 تخصيص لكل صفحة:
- يمكن تعديل تاريخ آخر تحديث
- يمكن تعديل عدد الأصوات
- تأكد من صحة مسارات الملفات (../) حسب موقع الصفحة

## 📝 نموذج مطبق:
- تم تطبيقه بالفعل على: `pages/about-site.html` ✅

---
**ملاحظة:** هذا النظام يحافظ على جميع المتطلبات المحددة مع ضمان التجانس عبر جميع الصفحات. 