# Get all HTML files that need the search input handler
$files = @(
    "pages/valid-regulations.html",
    "pages/our-services.html",
    "pages/general-search-engine.html",
    "index.html"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # Add JavaScript file reference
    $jsScript = '<script src="../scripts/search-input-handler.js"></script>'
    # Adjust path for index.html
    if ($file -eq "index.html") {
        $jsScript = '<script src="scripts/search-input-handler.js"></script>'
    }
    
    if ($content -notmatch [regex]::Escape($jsScript)) {
        $content = $content -replace '(</body>)', "$jsScript`n`$1"
    }
    
    # Save the changes
    $content | Set-Content $file -Encoding UTF8
}

Write-Host "Search input handler has been added to all required pages." 