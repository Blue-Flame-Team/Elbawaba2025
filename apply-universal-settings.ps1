# Get all HTML files in the pages directory
$htmlFiles = Get-ChildItem -Path "pages" -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Check if the universal settings menu CSS is already included
    if ($content -notmatch 'universal-settings-menu\.css') {
        # Find the last CSS link in the head section
        $lastCssLink = [regex]::Match($content, '<link[^>]*\.css[^>]*>(?!.*<link[^>]*\.css[^>]*>)').Value
        
        if ($lastCssLink) {
            # Add the universal settings menu CSS after the last CSS link
            $newCssLink = '<link rel="stylesheet" href="../styles/shared/universal-settings-menu.css">'
            $content = $content -replace [regex]::Escape($lastCssLink), ($lastCssLink + "`n    " + $newCssLink)
            
            # Save the changes
            $content | Set-Content $file.FullName -Force
            Write-Host "Added universal settings menu CSS to $($file.Name)"
        }
    } else {
        Write-Host "Universal settings menu CSS already exists in $($file.Name)"
    }
} 