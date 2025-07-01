# Get all HTML files in the pages directory
$htmlFiles = Get-ChildItem -Path "pages" -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Check if the zoom files are already included
    if ($content -notmatch 'zoom-styles\.css' -or $content -notmatch 'unified-zoom\.js') {
        # Find the last CSS link in the head section
        $lastCssLink = [regex]::Match($content, '<link[^>]*\.css[^>]*>(?!.*<link[^>]*\.css[^>]*>)').Value
        
        if ($lastCssLink) {
            # Add the zoom CSS and JS files after the last CSS link
            $newLinks = '<link rel="stylesheet" href="../styles/shared/zoom-styles.css">' + "`n    " + 
                       '<script src="../scripts/unified-zoom.js"></script>'
            
            $content = $content -replace [regex]::Escape($lastCssLink), ($lastCssLink + "`n    " + $newLinks)
            
            # Save the changes
            $content | Set-Content $file.FullName -Force
            Write-Host "Added zoom functionality files to $($file.Name)"
        }
    } else {
        Write-Host "Zoom functionality files already exist in $($file.Name)"
    }
} 