$pages = Get-ChildItem -Path "pages" -Filter "*.html"

foreach ($page in $pages) {
    $filePath = $page.FullName
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    if ($content -match '<button[^>]*class="[^"]*settings-toggle-btn[^"]*"') {
        Write-Host "Settings button already exists in $($page.Name)" -ForegroundColor Yellow
        continue
    }
    
    $settingsButton = '                            <button class="icon-btn settings-toggle-btn" data-original-font-size="16">
                                <img src="../assets/icons/setting-2.png" alt="الإعدادات">
                            </button>
                            <div class="settings-menu">
                                <a href="#" class="settings-option contrast-option" data-original-font-size="16">
                                    <span>تباين</span>
                                    <img src="../assets/icons/Eye off.svg" alt="تباين">
                                </a>
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
                            </div>'

    if ($content -match '(<div class="main-icons-group">.*?)(</div>)') {
        $newContent = $content -replace '(<div class="main-icons-group">.*?)(</div>)', ('$1' + $settingsButton + "`n                        " + '$2')
        Set-Content $filePath $newContent -Encoding UTF8
        Write-Host "Added settings button to $($page.Name)" -ForegroundColor Green
    }
    elseif ($content -match '(<button[^>]*class="[^"]*icon-btn[^"]*"[^>]*>.*?</button>)(.*?</div>)') {
        $newContent = $content -replace '(<button[^>]*class="[^"]*icon-btn[^"]*"[^>]*>.*?</button>)(.*?</div>)', ('$1' + "`n" + $settingsButton + '$2')
        Set-Content $filePath $newContent -Encoding UTF8
        Write-Host "Added settings button to $($page.Name)" -ForegroundColor Green
    }
    else {
        Write-Host "Could not find suitable location for settings button in $($page.Name)" -ForegroundColor Red
    }
}

Write-Host "Finished processing all pages" -ForegroundColor Cyan 