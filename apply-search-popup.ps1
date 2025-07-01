# Get all HTML files that need the search popup
$files = @(
    "pages/valid-regulations.html",
    "pages/our-services.html",
    "pages/general-search-engine.html"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # Add CSS file reference
    $cssLink = '<link rel="stylesheet" href="../styles/shared/unified-search-popup.css">'
    if ($content -notmatch [regex]::Escape($cssLink)) {
        $content = $content -replace '(</head>)', "$cssLink`n`$1"
    }
    
    # Add JavaScript file reference
    $jsScript = '<script src="../scripts/unified-search-popup.js"></script>'
    if ($content -notmatch [regex]::Escape($jsScript)) {
        $content = $content -replace '(</body>)', "$jsScript`n`$1"
    }
    
    # Save the changes
    $content | Set-Content $file -Encoding UTF8
}

Write-Host "Search popup has been added to all required pages." 