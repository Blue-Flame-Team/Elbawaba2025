# Get all HTML files
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $modified = $false
    
    # Remove old zoom scripts
    if ($content -match '(zoom-text|zoom-functionality|simple-zoom)\.js') {
        $content = $content -replace '<script[^>]*?(zoom-text|zoom-functionality|simple-zoom)\.js[^>]*?></script>\s*', ''
        $modified = $true
    }
    
    # Remove old zoom styles
    if ($content -match '(zoom-text|zoom-functionality|simple-zoom|font-zoom)\.css') {
        $content = $content -replace '<link[^>]*?(zoom-text|zoom-functionality|simple-zoom|font-zoom)\.css[^>]*?>\s*', ''
        $modified = $true
    }
    
    # Add new zoom files before </head>
    if ($file.DirectoryName -match 'pages') {
        # For files in pages directory
        if ($content -notmatch 'zoom-styles\.css') {
            $content = $content -replace '</head>', '    <link rel="stylesheet" href="../styles/shared/zoom-styles.css">`n</head>'
            $modified = $true
        }
        if ($content -notmatch 'font-zoom\.js') {
            $content = $content -replace '</head>', '    <script src="../scripts/font-zoom.js"></script>`n</head>'
            $modified = $true
        }
    } else {
        # For files in root directory
        if ($content -notmatch 'zoom-styles\.css') {
            $content = $content -replace '</head>', '    <link rel="stylesheet" href="styles/shared/zoom-styles.css">`n</head>'
            $modified = $true
        }
        if ($content -notmatch 'font-zoom\.js') {
            $content = $content -replace '</head>', '    <script src="scripts/font-zoom.js"></script>`n</head>'
            $modified = $true
        }
    }
    
    # Save changes if modified
    if ($modified) {
        $content | Set-Content $file.FullName -Force
        Write-Host "Updated zoom functionality in $($file.Name)"
    }
} 