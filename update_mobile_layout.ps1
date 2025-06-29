# Update Mobile Layout Script for Header CSS Files
# This script updates all header.css files to display elements horizontally on mobile

$headerFiles = @(
    "styles/terms/header.css",
    "styles/analytics/header.css", 
    "styles/subscribe/header.css",
    "styles/about-site/header.css",
    "styles/our-services/header.css",
    "styles/asanid-service/header.css",
    "styles/privacy-policy/header.css",
    "styles/cabinet-meeting/header.css",
    "styles/council-sessions/header.css",
    "styles/general-search-engine/header.css",
    "styles/installment-sale/header.css",
    "styles/jornal-profile-view/header.css",
    "styles/judgments-display/header.css",
    "styles/judicial-rulings-links/header.css",
    "styles/restricted-content/header.css"
)

# Old mobile CSS patterns to replace
$oldPattern1 = "@media \(max-width: 768px\) \{[\s\S]*?\.top-bar-content \{[\s\S]*?flex-direction: column;[\s\S]*?\}"
$oldPattern2 = "\.top-actions \{[\s\S]*?margin-top: 10px;[\s\S]*?\}"

# New mobile CSS layout
$newMobileCSS = @"
@media (max-width: 768px) {
    .top-bar-content {
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: center !important;
        gap: 8px !important;
        flex-wrap: nowrap !important;
    }
    
    .hamburger-menu {
        order: 1;
        font-size: 20px;
        cursor: pointer;
        padding: 5px;
    }
    
    .logo {
        order: 2;
        flex-shrink: 0;
    }
    
    .logo-image {
        max-height: 28px !important;
        width: auto;
    }
    
    .top-elements {
        order: 3;
        flex-shrink: 0;
    }
    
    .top-icons {
        gap: 8px !important;
    }
    
    .icon-btn img {
        width: 16px !important;
        height: 16px !important;
    }
    
    .main-icons-group {
        gap: 6px !important;
    }
    
    .top-actions {
        order: 4;
        margin-top: 0 !important;
        gap: 6px !important;
    }
    
    .login-btn, .join-btn {
        padding: 6px 10px !important;
        font-size: 12px !important;
        width: auto !important;
        height: auto !important;
        min-width: auto !important;
    }
    
    .questions-text {
        font-size: 12px !important;
    }
    
    .question-mark {
        width: 18px !important;
        height: 18px !important;
        font-size: 12px !important;
    }
    
    .nav-menu {
        flex-wrap: wrap;
        gap: 10px;
    }
}

/* Mobile devices (480px and below) */
@media (max-width: 480px) {
    .top-bar-content {
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: center !important;
        gap: 5px !important;
        flex-wrap: nowrap !important;
        padding: 0 10px;
    }
    
    .hamburger-menu {
        order: 1;
        font-size: 18px;
        cursor: pointer;
        padding: 3px;
    }
    
    .logo {
        order: 2;
        flex-shrink: 0;
    }
    
    .logo-image {
        max-height: 24px !important;
        width: auto;
    }
    
    .top-elements {
        order: 3;
        flex-shrink: 0;
    }
    
    .top-icons {
        gap: 5px !important;
    }
    
    .icon-btn img {
        width: 14px !important;
        height: 14px !important;
    }
    
    .main-icons-group {
        gap: 4px !important;
    }
    
    .top-actions {
        order: 4;
        gap: 4px !important;
    }
    
    .login-btn, .join-btn {
        padding: 4px 8px !important;
        font-size: 10px !important;
        width: auto !important;
        height: auto !important;
    }
    
    .questions-text {
        font-size: 10px !important;
    }
    
    .question-mark {
        width: 16px !important;
        height: 16px !important;
        font-size: 10px !important;
    }
}
"@

foreach ($file in $headerFiles) {
    if (Test-Path $file) {
        Write-Host "Updating $file..." -ForegroundColor Green
        
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Replace the mobile media query section
        $content = $content -replace "@media \(max-width: 768px\) \{[^}]*\.top-bar-content \{[^}]*flex-direction: column;[^}]*\}[^}]*\.top-actions \{[^}]*margin-top: 10px;[^}]*\}[^}]*\.nav-menu \{[^}]*\}", $newMobileCSS
        
        # Write back to file
        Set-Content $file $content -Encoding UTF8
        
        Write-Host "✓ Updated $file" -ForegroundColor Green
    } else {
        Write-Host "⚠ File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "`nAll header files have been updated with the new mobile horizontal layout!" -ForegroundColor Cyan 