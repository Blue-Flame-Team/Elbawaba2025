# سكريبت لإضافة ملف الناف بار الفيروزي إلى جميع الصفحات الفرعية

# الحصول على جميع ملفات HTML في مجلد الصفحات
$htmlFiles = Get-ChildItem -Path ".\pages" -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "معالجة الملف: $($file.FullName)"
    
    # قراءة محتوى الملف
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # التحقق مما إذا كان الملف يحتوي بالفعل على ملف CSS الناف بار الفيروزي
    if (-not ($content -like "*subpages-navbar.css*")) {
        # البحث عن نهاية ملفات CSS وإضافة CSS الناف بار الفيروزي
        $content = $content -replace "(?<=<link rel=`"stylesheet`" href=`".*\.css`">)\s*</head>", @"

    <!-- ناف بار بالخلفية الفيروزية للصفحات الفرعية -->
    <link rel="stylesheet" href="../styles/subpages-navbar.css">
    <!-- إصلاح لقائمة الموبايل -->
    <link rel="stylesheet" href="../styles/mobile-menu.css">
    <link rel="stylesheet" href="../styles/hamburger-fix.css">
</head>
"@
        
        # كتابة المحتوى المحدث إلى الملف
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        
        Write-Host "تم تحديث الملف: $($file.FullName)" -ForegroundColor Green
    } else {
        Write-Host "الملف يحتوي بالفعل على أنماط الناف بار الفيروزي: $($file.FullName)" -ForegroundColor Yellow
    }
}

Write-Host "تم الانتهاء من تحديث جميع الصفحات!" -ForegroundColor Cyan
