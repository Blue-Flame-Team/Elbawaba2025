# سكريپت إضافة زر الإعدادات لكل الصفحات
$pages = Get-ChildItem -Path "pages" -Filter "*.html"

foreach ($page in $pages) {
    $filePath = $page.FullName
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # البحث عن زر الإعدادات الموجود
    if ($content -match '<button[^>]*class="[^"]*settings-toggle-btn[^"]*"') {
        Write-Host "زر الإعدادات موجود بالفعل في $($page.Name)" -ForegroundColor Yellow
        continue
    }
    
    # إضافة زر الإعدادات والقائمة بعد آخر زر في الأيقونات
    $settingsButton = @"
                            <button class="icon-btn settings-toggle-btn" data-original-font-size="16">
                                <img src="../assets/icons/setting-2.png" alt="الإعدادات">
                            </button>
                            <div class="settings-menu">
                                <a href="#" class="settings-option contrast-option" data-original-font-size="16">
                                    <span>تباين</span>
                                    <img src="../assets/icons/Eye off.svg" alt="تباين">
                                </a>
                                <!-- قائمة خيارات التباين الفرعية -->
                                <div class="contrast-submenu">
                                    <a href="#" class="settings-option contrast-light" data-original-font-size="16">
                                        <span>تباين فاتح</span>
                                        <img src="../assets/icons/Eye off.svg" alt="تباين فاتح">
                                    </a>
                                    <a href="#" class="settings-option contrast-dark" data-original-font-size="16">
                                        <span>تباين داكن</span>
                                        <img src="../assets/icons/Eye off-dark.svg" alt="تباين داكن">
                                    </a>
                                </div>
                                <a href="../pages/analytics.html" class="settings-option stats-option" data-original-font-size="16">
                                    <span>الاحصائيات</span>
                                    <img src="../assets/icons/status-up.svg" alt="الاحصائيات">
                                </a>
                                <a href="javascript:void(0);" class="settings-option logout-option" data-original-font-size="16">
                                    <span>خروج</span>
                                    <img src="../assets/icons/logout.svg" alt="تسجيل الخروج">
                                </a>
                            </div>
"@

    # البحث عن main-icons-group والإضافة قبل إغلاقها
    if ($content -match '(<div class="main-icons-group">.*?)(</div>)') {
        $newContent = $content -replace '(<div class="main-icons-group">.*?)(</div>)', "`$1$settingsButton`n                        `$2"
        Set-Content $filePath $newContent -Encoding UTF8
        Write-Host "تم إضافة زر الإعدادات إلى $($page.Name)" -ForegroundColor Green
    }
    # إذا لم توجد main-icons-group، ابحث عن أي مكان مناسب للإضافة
    elseif ($content -match '(<button[^>]*class="[^"]*icon-btn[^"]*"[^>]*>.*?</button>)(.*?</div>)') {
        $newContent = $content -replace '(<button[^>]*class="[^"]*icon-btn[^"]*"[^>]*>.*?</button>)(.*?</div>)', "`$1`n$settingsButton`$2"
        Set-Content $filePath $newContent -Encoding UTF8
        Write-Host "تم إضافة زر الإعدادات إلى $($page.Name)" -ForegroundColor Green
    }
    else {
        Write-Host "لم يتم العثور على مكان مناسب لإضافة زر الإعدادات في $($page.Name)" -ForegroundColor Red
    }
}

Write-Host "تم الانتهاء من معالجة جميع الصفحات" -ForegroundColor Cyan
 