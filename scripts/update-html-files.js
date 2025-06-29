// Script to add font-resize.js to all HTML files
const fs = require('fs');
const path = require('path');

// Root directory
const rootDir = __dirname.replace('\\scripts', '');
console.log('Root directory:', rootDir);

// Find all HTML files
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip node_modules or other irrelevant folders if needed
            if (file !== 'node_modules') {
                findHtmlFiles(filePath, fileList);
            }
        } else {
            // Check if file is HTML
            if (file.toLowerCase().endsWith('.html')) {
                fileList.push(filePath);
            }
        }
    });
    
    return fileList;
}

// Add font-resize.js script to HTML files
function addFontResizeScript(htmlFilePath) {
    try {
        let content = fs.readFileSync(htmlFilePath, 'utf8');
        const isRootFile = !htmlFilePath.includes('\\pages\\');
        
        // Determine the correct path to font-resize.js based on file location
        const scriptPath = isRootFile 
            ? '<script src="scripts/font-resize.js"></script>' 
            : '<script src="../scripts/font-resize.js"></script>';
        
        // Check if font-resize.js is already included
        if (!content.includes('font-resize.js')) {
            // Find the position to insert the script (before </body>)
            const bodyCloseIndex = content.lastIndexOf('</body>');
            
            if (bodyCloseIndex !== -1) {
                // Insert the script reference before </body>
                const updatedContent = content.slice(0, bodyCloseIndex) + 
                                      '\n    ' + scriptPath + '\n' + 
                                      content.slice(bodyCloseIndex);
                
                // Write the updated content back to the file
                fs.writeFileSync(htmlFilePath, updatedContent, 'utf8');
                console.log(`✅ Updated: ${htmlFilePath}`);
                return true;
            } else {
                console.log(`❌ Could not find </body> tag in: ${htmlFilePath}`);
                return false;
            }
        } else {
            console.log(`⏭️ Script already exists in: ${htmlFilePath}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error processing ${htmlFilePath}:`, error.message);
        return false;
    }
}

// Main function
function main() {
    console.log('Searching for HTML files...');
    const htmlFiles = findHtmlFiles(rootDir);
    console.log(`Found ${htmlFiles.length} HTML files.`);
    
    let updatedCount = 0;
    
    htmlFiles.forEach(file => {
        if (addFontResizeScript(file)) {
            updatedCount++;
        }
    });
    
    console.log(`\nSummary: Updated ${updatedCount} out of ${htmlFiles.length} HTML files.`);
}

// Run the script
main();

// قائمة الملفات التي يجب تحديثها
const pagesDir = path.join(__dirname, '..', 'pages');
const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

// التغييرات المطلوبة
const cssToAdd = `
    <!-- الملفات المشتركة للفوتر الموحد ونظام التباين الأسود -->
    <link rel="stylesheet" href="../styles/shared/unified-footer.css">
    <link rel="stylesheet" href="../styles/shared/dark-contrast-subpages.css">
`;

const jsToAdd = `
    <!-- نظام التباين الأسود الموحد للصفحات الفرعية -->
    <script src="../scripts/subpages-dark-contrast.js"></script>
`;

// تحديث كل ملف
files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // إضافة ملفات CSS إذا لم تكن موجودة
    if (!content.includes('dark-contrast-subpages.css')) {
        content = content.replace(
            '</head>',
            `${cssToAdd}\n</head>`
        );
    }

    // إضافة ملف JavaScript إذا لم يكن موجوداً
    if (!content.includes('dark-cons.js')) {
        content = content.replace(
            '<script src="../scripts/unified-navbar.js"></script>',
            `<script src="../scripts/unified-navbar.js"></script>${jsToAdd}`
        );
    }

    // حفظ التغييرات
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ تم تحديث الملف: ${file}`);
});

console.log('✨ تم تحديث جميع الملفات بنجاح!');
