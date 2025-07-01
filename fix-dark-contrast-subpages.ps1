# سكريبت إصلاح التباين الأسود في الصفحات الفرعية
# Fix Dark Contrast for Subpages Script

Write-Host "🎨 بدء إصلاح التباين الأسود في الصفحات الفرعية..." -ForegroundColor Green

# الحصول على جميع ملفات HTML في مجلد pages
$htmlFiles = Get-ChildItem -Path ".\pages\*.html" -ErrorAction SilentlyContinue

if ($htmlFiles.Count -eq 0) {
    Write-Host "❌ لم يتم العثور على ملفات HTML في مجلد pages" -ForegroundColor Red
    exit 1
}

Write-Host "📁 تم العثور على $($htmlFiles.Count) ملف HTML" -ForegroundColor Yellow

foreach ($file in $htmlFiles) {
    Write-Host "🔧 معالجة الملف: $($file.Name)" -ForegroundColor Cyan
    
    try {
        # قراءة محتوى الملف
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        $originalContent = $content
        $changed = $false
        
        # 1. تفعيل ملف CSS التباين الأسود إذا كان معطلاً
        if ($content -match '<!-- <link rel="stylesheet" href="\.\./styles/shared/dark-contrast-subpages\.css"> -->') {
            $content = $content -replace '<!-- <link rel="stylesheet" href="\.\./styles/shared/dark-contrast-subpages\.css"> -->', '<link rel="stylesheet" href="../styles/shared/dark-contrast-subpages.css">'
            Write-Host "  ✅ تم تفعيل ملف CSS التباين الأسود" -ForegroundColor Green
            $changed = $true
        }
        # إضافة ملف CSS التباين إذا لم يكن موجوداً
        elseif ($content -notmatch 'dark-contrast-subpages\.css') {
            # البحث عن مكان إدراج CSS (بعد global.css)
            if ($content -match '(<link rel="stylesheet" href="\.\./styles/global\.css">)') {
                $content = $content -replace '(<link rel="stylesheet" href="\.\./styles/global\.css">)', '$1' + "`n" + '    <link rel="stylesheet" href="../styles/shared/dark-contrast-subpages.css">'
                Write-Host "  ✅ تم إضافة ملف CSS التباين الأسود" -ForegroundColor Green
                $changed = $true
            }
        }
        
        # 2. تفعيل ملف JavaScript التباين إذا كان معطلاً
        if ($content -match '<!-- <script src="\.\./scripts/subpages-dark-contrast\.js"></script> -->') {
            $content = $content -replace '<!-- <script src="\.\./scripts/subpages-dark-contrast\.js"></script> -->', '<script src="../scripts/subpages-dark-contrast.js"></script>'
            Write-Host "  ✅ تم تفعيل ملف JavaScript التباين الأسود" -ForegroundColor Green
            $changed = $true
        }
        # إضافة ملف JavaScript التباين إذا لم يكن موجوداً
        elseif ($content -notmatch 'subpages-dark-contrast\.js') {
            # البحث عن مكان إدراج JavaScript (قبل إغلاق body)
            if ($content -match '(</body>)') {
                $content = $content -replace '(</body>)', '    <script src="../scripts/subpages-dark-contrast.js"></script>' + "`n" + '$1'
                Write-Host "  ✅ تم إضافة ملف JavaScript التباين الأسود" -ForegroundColor Green
                $changed = $true
            }
        }
        
        # 3. التأكد من وجود ملف CSS الإعدادات الموحدة
        if ($content -notmatch 'universal-settings-menu\.css') {
            # البحث عن مكان إدراج CSS (بعد dark-contrast-subpages.css)
            if ($content -match '(<link rel="stylesheet" href="\.\./styles/shared/dark-contrast-subpages\.css">)') {
                $content = $content -replace '(<link rel="stylesheet" href="\.\./styles/shared/dark-contrast-subpages\.css">)', '$1' + "`n" + '    <link rel="stylesheet" href="../styles/shared/universal-settings-menu.css">'
                Write-Host "  ✅ تم إضافة ملف CSS الإعدادات الموحدة" -ForegroundColor Green
                $changed = $true
            }
        }
        
        # حفظ الملف إذا تم تغييره
        if ($changed) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
            Write-Host "  💾 تم حفظ التغييرات في $($file.Name)" -ForegroundColor Green
        }
        else {
            Write-Host "  ⏭️ لا توجد تغييرات مطلوبة في $($file.Name)" -ForegroundColor Gray
        }
        
    }
    catch {
        Write-Host "  ❌ خطأ في معالجة $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n🎨 تم إكمال إصلاح التباين الأسود في الصفحات الفرعية!" -ForegroundColor Green
Write-Host "📝 ملاحظة: تأكد من تشغيل الصفحات في المتصفح لاختبار التباين الأسود" -ForegroundColor Yellow 