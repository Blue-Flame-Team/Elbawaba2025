# تحديث قائمة الإعدادات في جميع الصفحات
$settingsMenu = @"
<div class="settings-menu">
    <a href="#" class="settings-option contrast-option">
        <img src="../assets/icons/Eye off.svg" alt="تباين">
        <span>تباين</span>
    </a>
    <div class="contrast-submenu">
        <a href="#" class="settings-option contrast-light">
            <img src="../assets/icons/Eye off.svg" alt="تباين فاتح">
            <span>تباين فاتح</span>
        </a>
        <a href="#" class="settings-option contrast-dark">
            <img src="../assets/icons/Eye off-dark.svg" alt="تباين داكن">
            <span>تباين داكن</span>
        </a>
    </div>
    <a href="../pages/analytics.html" class="settings-option stats-option">
        <img src="../assets/icons/status-up.svg" alt="الاحصائيات">
        <span>الاحصائيات</span>
    </a>
    <a href="#" class="settings-option logout-option">
        <img src="../assets/icons/logout.svg" alt="تسجيل الخروج">
        <span>خروج</span>
    </a>
</div>
"@

# الحصول على قائمة جميع ملفات HTML في مجلد pages
$htmlFiles = Get-ChildItem -Path "pages" -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # البحث عن قائمة الإعدادات الحالية واستبدالها
    $pattern = '<div class="settings-menu">.*?</div>\s*</div>\s*</div>'
    $newContent = $content -replace $pattern, "$settingsMenu</div></div>" -replace "(?s)<div class=`"settings-menu`".*?</div>\s*</div>", "$settingsMenu</div>"
    
    # حفظ التغييرات
    $newContent | Set-Content $file.FullName -Encoding UTF8
    Write-Host "تم تحديث قائمة الإعدادات في $($file.Name)"
}

Write-Host "تم تحديث جميع الصفحات بنجاح"
