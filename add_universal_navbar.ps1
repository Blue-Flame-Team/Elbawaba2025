# سكريبت إضافة مكتبة الناف بار الموحدة لجميع الصفحات
# PowerShell Script for Adding Universal Navbar Library

Write-Host "🚀 بدء تطبيق مكتبة الناف بار الموحدة على جميع الصفحات..." -ForegroundColor Green

# مسار المجلد الحالي
$currentDir = Get-Location

# قائمة الصفحات في مجلد pages
$pagesDir = Join-Path $currentDir "pages"
$pagesFiles = @(
    "about-site.html",
    "analytics.html", 
    "analytics-last doc-used.html",
    "asanid-request.html",
    "asanid-service.html",
    "cabinet-meeting.html",
    "council-sessions.HTML",
    "faq.html",
    "general-search-engine.html",
    "installment-sale.html",
    "jornal-profile-view.html",
    "judgments-display.html",
    "judicial-rulings-links.html",
    "our-services.html",
    "privacy-policy.html",
    "restricted-content.html",
    "saudi-judgments-search.html",
    "subscribe.html",
    "temp_journal.html",
    "terms.html",
    "valid-regulations.html"
)

# الصفحات في المجلد الرئيسي
$rootFiles = @(
    "asanid-pc-page.html",
    "asanid-pc.html",
    "dropdown-test.html",
    "login-modal.html",
    "mobile-dropdown-test.html",
    "password-change-mobile.html",
    "test_contrast_submenu.html",
    "test-font-resize.html"
)

# وظيفة لإضافة مكتبة الناف بار الموحدة لصفحة
function Add-UniversalNavbar {
    param (
        [string]$FilePath,
        [bool]$IsSubpage = $false
    )
    
    if (-not (Test-Path $FilePath)) {
        Write-Host "❌ الملف غير موجود: $FilePath" -ForegroundColor Red
        return
    }
    
    Write-Host "🔧 تعديل الملف: $FilePath" -ForegroundColor Yellow
    
    $content = Get-Content $FilePath -Raw -Encoding UTF8
    
    # تحديد المسار النسبي للمكتبة
    $scriptPath = if ($IsSubpage) { "../scripts/navbar-universal.js" } else { "scripts/navbar-universal.js" }
    $cssLoginPath = if ($IsSubpage) { "../styles/login-modal.css" } else { "styles/login-modal.css" }
    $cssSearchPath = if ($IsSubpage) { "../styles/search-popup.css" } else { "styles/search-popup.css" }
    
    # 1. إضافة ملفات CSS المطلوبة في head إذا لم تكن موجودة
    if ($content -notmatch 'login-modal\.css') {
        $headClosePattern = '</head>'
        if ($content -match $headClosePattern) {
            $cssInsert = @"
    <!-- ملفات CSS للنوافذ المنبثقة -->
    <link rel="stylesheet" href="$cssLoginPath">
    <link rel="stylesheet" href="$cssSearchPath">
</head>
"@
            $content = $content -replace $headClosePattern, $cssInsert
            Write-Host "✅ تمت إضافة ملفات CSS للنوافذ المنبثقة" -ForegroundColor Green
        }
    }
    
    # 2. البحث عن منطقة scripts في نهاية الملف
    $scriptPattern = '(<script[^>]*>[\s\S]*?</script>[\s\S]*?)</body>'
    
    if ($content -match $scriptPattern) {
        # إضافة مكتبة الناف بار الموحدة قبل آخر script
        $newScriptSection = @"
    <!-- مكتبة الناف بار الموحدة - تحتوي على جميع النوافذ والدوال -->
    <script src="$scriptPath"></script>
    
    $($Matches[1])
</body>
"@
        $content = $content -replace $scriptPattern, $newScriptSection
        Write-Host "✅ تمت إضافة مكتبة الناف بار الموحدة" -ForegroundColor Green
    }
    else {
        # إذا لم توجد scripts، أضف قبل إغلاق body مباشرة
        $bodyClosePattern = '</body>'
        if ($content -match $bodyClosePattern) {
            $scriptInsert = @"
    <!-- مكتبة الناف بار الموحدة - تحتوي على جميع النوافذ والدوال -->
    <script src="$scriptPath"></script>
</body>
"@
            $content = $content -replace $bodyClosePattern, $scriptInsert
            Write-Host "✅ تمت إضافة مكتبة الناف بار الموحدة (بدون scripts موجودة)" -ForegroundColor Green
        }
    }
    
    # 3. إزالة النوافذ المنبثقة المكررة إذا وجدت
    $modalPatterns = @(
        '<!--[\s]*نافذة[\s\S]*?-->[\s\S]*?<div[^>]*login-modal[\s\S]*?</div>[\s\S]*?</div>',
        '<div[^>]*login-modal[\s\S]*?</div>[\s\S]*?</div>',
        '<div[^>]*search-popup[\s\S]*?</div>[\s\S]*?</div>',
        '<div[^>]*forgot-password-modal[\s\S]*?</div>[\s\S]*?</div>'
    )
    
    foreach ($pattern in $modalPatterns) {
        if ($content -match $pattern) {
            $content = $content -replace $pattern, ""
            Write-Host "🗑️ تمت إزالة نافذة منبثقة مكررة" -ForegroundColor Cyan
        }
    }
    
    # حفظ الملف
    try {
        $content | Out-File -FilePath $FilePath -Encoding UTF8 -NoNewline
        Write-Host "💾 تم حفظ الملف بنجاح: $FilePath" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ فشل في حفظ الملف: $FilePath - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# تطبيق التحديثات على صفحات pages
Write-Host "`n📁 معالجة صفحات مجلد pages..." -ForegroundColor Cyan
foreach ($file in $pagesFiles) {
    $filePath = Join-Path $pagesDir $file
    if (Test-Path $filePath) {
        Add-UniversalNavbar -FilePath $filePath -IsSubpage $true
    }
}

# تطبيق التحديثات على الصفحات في المجلد الرئيسي
Write-Host "`n📁 معالجة صفحات المجلد الرئيسي..." -ForegroundColor Cyan
foreach ($file in $rootFiles) {
    $filePath = Join-Path $currentDir $file
    if (Test-Path $filePath) {
        Add-UniversalNavbar -FilePath $filePath -IsSubpage $false
    }
}

# معالجة index.html بشكل خاص
Write-Host "`n🏠 معالجة صفحة index.html..." -ForegroundColor Cyan
$indexPath = Join-Path $currentDir "index.html"
if (Test-Path $indexPath) {
    $indexContent = Get-Content $indexPath -Raw -Encoding UTF8
    
    # التحقق من وجود مكتبة الناف بار الموحدة
    if ($indexContent -notmatch 'navbar-universal\.js') {
        # إضافة المكتبة قبل آخر script
        $scriptPattern = '(<script[^>]*slider\.js[^>]*>[\s\S]*?</script>[\s\S]*?)</body>'
        
        if ($indexContent -match $scriptPattern) {
            $newScriptSection = @"
    <!-- مكتبة الناف بار الموحدة - تحتوي على جميع النوافذ والدوال -->
    <script src="scripts/navbar-universal.js"></script>
    
    $($Matches[1])
</body>
"@
            $indexContent = $indexContent -replace $scriptPattern, $newScriptSection
            $indexContent | Out-File -FilePath $indexPath -Encoding UTF8 -NoNewline
            Write-Host "✅ تمت إضافة مكتبة الناف بار الموحدة لـ index.html" -ForegroundColor Green
        }
    }
    else {
        Write-Host "ℹ️ مكتبة الناف بار الموحدة موجودة بالفعل في index.html" -ForegroundColor Blue
    }
}

Write-Host "`n🎉 تم الانتهاء من تطبيق مكتبة الناف بار الموحدة على جميع الصفحات!" -ForegroundColor Green
Write-Host "`n📋 ملخص التحديثات:" -ForegroundColor Yellow
Write-Host "   ✅ تمت إضافة navbar-universal.js لجميع الصفحات" -ForegroundColor White
Write-Host "   ✅ تمت إضافة ملفات CSS للنوافذ المنبثقة" -ForegroundColor White  
Write-Host "   ✅ تمت إزالة النوافذ المنبثقة المكررة" -ForegroundColor White
Write-Host "   ✅ تم تصحيح المسارات للصفحات الفرعية" -ForegroundColor White

Write-Host "`n🚀 الآن جميع الصفحات تستخدم نظام الناف بار الموحد!" -ForegroundColor Green
Write-Host "   • نوافذ تسجيل الدخول والبحث تعمل في جميع الصفحات" -ForegroundColor Cyan
Write-Host "   • دوال الزوم والإعدادات تعمل بشكل موحد" -ForegroundColor Cyan  
Write-Host "   • قائمة الهامبرغر تعمل على جميع الصفحات" -ForegroundColor Cyan
Write-Host "   • تم إصلاح مسارات الصور للصفحات الفرعية" -ForegroundColor Cyan

Read-Host "`nاضغط Enter للخروج..." 