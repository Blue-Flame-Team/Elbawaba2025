# PowerShell script to apply profile icon universal fix to all subpages
# نطبق الحل الشامل على جميع الصفحات الفرعية

Write-Host "🚀 بدء تطبيق الحل الشامل لأيقونات البروفايل على جميع الصفحات..." -ForegroundColor Green

# قائمة الصفحات الفرعية
$pages = @(
    "pages/about-site.html",
    "pages/analytics.html", 
    "pages/analytics-last doc-used.html",
    "pages/asanid-request.html",
    "pages/asanid-service.html",
    "pages/cabinet-meeting.html",
    "pages/council-sessions.HTML",
    "pages/faq.html",
    "pages/general-search-engine.html",
    "pages/installment-sale.html",
    "pages/judgments-display.html",
    "pages/judicial-rulings-links.html",
    "pages/our-services.html",
    "pages/privacy-policy.html",
    "pages/restricted-content.html",
    "pages/saudi-judgments-search.html",
    "pages/subscribe.html",
    "pages/temp_journal.html",
    "pages/terms.html",
    "pages/valid-regulations.html"
)

# 1. إضافة الأيقونة لكل صفحة
Write-Host "📝 إضافة أيقونة البروفايل للديسكتوب في كل صفحة..." -ForegroundColor Yellow

foreach ($page in $pages) {
    if (Test-Path $page) {
        Write-Host "🔧 معالجة: $page" -ForegroundColor Cyan
        
        # قراءة محتوى الملف
        $content = Get-Content $page -Raw -Encoding UTF8
        
        # البحث عن settings button وإضافة profile button بعده
        $settingsButtonPattern = '(\s*<button class="icon-btn settings-toggle-btn"[^>]*>\s*<img src="[^"]*setting-2\.png"[^>]*>\s*</button>)'
        $profileButton = @"
                        <button class="icon-btn profile-btn profile-icon-btn" style="display: none;" data-original-font-size="16" data-profile-setup="true">
                            <img src="../assets/icons/profile-circle.svg" alt="الملف الشخصي">
                        </button>
"@
        
        if ($content -match $settingsButtonPattern) {
            # التحقق من عدم وجود الأيقونة بالفعل
            if ($content -notmatch 'profile-icon-btn') {
                $content = $content -replace $settingsButtonPattern, ('$1' + $profileButton)
                Write-Host "✅ تم إضافة أيقونة البروفايل للديسكتوب" -ForegroundColor Green
            } else {
                Write-Host "⚠️ أيقونة البروفايل موجودة بالفعل" -ForegroundColor Yellow
            }
        } else {
            Write-Host "❌ لم يتم العثور على زر الإعدادات" -ForegroundColor Red
        }
        
        # 2. إضافة سكريبت الحل الشامل
        $scriptPattern = '(<script src="[^"]*auth-system\.js"></script>)'
        $universalScript = @"
<!-- الحل الشامل لأيقونات البروفايل - يجب أن يكون قبل باقي ملفات JS -->
<script src="../scripts/profile-icons-universal-fix.js"></script>

"@
        
        if ($content -match $scriptPattern) {
            # التحقق من عدم وجود السكريبت بالفعل
            if ($content -notmatch 'profile-icons-universal-fix\.js') {
                $content = $content -replace $scriptPattern, ($universalScript + '$1')
                Write-Host "✅ تم إضافة سكريبت الحل الشامل" -ForegroundColor Green
            } else {
                Write-Host "⚠️ سكريبت الحل الشامل موجود بالفعل" -ForegroundColor Yellow
            }
        } else {
            Write-Host "❌ لم يتم العثور على مكان إدراج السكريبت" -ForegroundColor Red
        }
        
        # كتابة التغييرات
        $content | Out-File -FilePath $page -Encoding UTF8 -NoNewline
        Write-Host "💾 تم حفظ التغييرات في: $page" -ForegroundColor Green
        Write-Host "----------------------------------------" -ForegroundColor Gray
    } else {
        Write-Host "❌ الملف غير موجود: $page" -ForegroundColor Red
    }
}

Write-Host "🎯 تم الانتهاء من تطبيق الحل الشامل على جميع الصفحات!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 ملخص العملية:" -ForegroundColor Cyan
Write-Host "✅ تم إضافة أيقونة البروفايل للديسكتوب في جميع الصفحات" -ForegroundColor Green
Write-Host "✅ تم إضافة سكريبت الحل الشامل لجميع الصفحات" -ForegroundColor Green
Write-Host "✅ السكريبت سيحمل نافذة الملف الشخصي تلقائياً" -ForegroundColor Green
Write-Host "✅ الحل سيعمل تلقائياً في جميع الصفحات بنفس الطريقة المطورة في index.html" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 الميزات المضافة:" -ForegroundColor Yellow
Write-Host "- أيقونة البروفايل تظهر على الديسكتوب عند تسجيل الدخول" -ForegroundColor White
Write-Host "- أيقونة الموبايل مخفية تماماً على الديسكتوب" -ForegroundColor White
Write-Host "- نافذة الملف الشخصي تُحمل تلقائياً عند النقر" -ForegroundColor White
Write-Host "- إذا فشل تحميل النافذة، يتم إنشاء نافذة بديلة" -ForegroundColor White
Write-Host "- وظيفة تسجيل خروج مدمجة" -ForegroundColor White
Write-Host ""
Write-Host "🧪 دوال الاختبار المتاحة في جميع الصفحات:" -ForegroundColor Yellow
Write-Host "- testUniversalIcons() : للاختبار مع علامات بصرية" -ForegroundColor White
Write-Host "- simulateLogin() : لمحاكاة تسجيل الدخول" -ForegroundColor White
Write-Host "- handleLogout() : لتسجيل الخروج" -ForegroundColor White
Write-Host ""
Write-Host "🎉 الآن جميع الصفحات تحتوي على نفس الحل المتقدم مع نافذة الملف الشخصي!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 الملفات المُنشأة:" -ForegroundColor Cyan
Write-Host "- scripts/profile-icons-universal-fix.js : الحل الشامل" -ForegroundColor White
Write-Host "- includes/user-dashboard-modal.html : نافذة الملف الشخصي" -ForegroundColor White

# تحديث جميع صفحات HTML لإضافة نافذة تعديل الملف الشخصي

# الحصول على مسار المجلد الحالي
$currentPath = Get-Location

# قائمة بجميع ملفات HTML في المجلد الحالي والمجلدات الفرعية
$htmlFiles = Get-ChildItem -Path $currentPath -Filter "*.html" -Recurse

# تحديث كل ملف
foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..."
    
    # قراءة محتوى الملف
    $content = Get-Content -Path $file.FullName -Raw
    
    # التحقق من وجود ملف edit-profile-modal.js
    if ($content -notmatch 'edit-profile-modal\.js') {
        # إضافة script tag قبل نهاية body
        $content = $content -replace '</body>', '    <script src="../scripts/edit-profile-modal.js"></script>`n</body>'
        
        # حفظ التغييرات
        $content | Set-Content -Path $file.FullName -Force
        Write-Host "✅ Added edit-profile-modal.js to $($file.Name)"
    } else {
        Write-Host "⏭️ Script already exists in $($file.Name)"
    }
}

Write-Host "`n✅ All files have been updated successfully!" 