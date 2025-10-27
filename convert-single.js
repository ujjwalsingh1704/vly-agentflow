const fs = require('fs');
const path = require('path');

// Function to convert a single file
function convertFile(sourcePath) {
  try {
    // Read the source file
    let content = fs.readFileSync(sourcePath, 'utf8');
    
    // Remove TypeScript specific syntax
    content = content
      // Remove type annotations
      .replace(/:\s*[\w\[\]\{\}\|<>\?]+(?=[,);\n\r\s>]|$)/g, '')
      // Remove interface declarations
      .replace(/export\s+interface\s+\w+\s*\{[^}]*\}\n?/g, '')
      // Remove type imports
      .replace(/import\s+type\s+\{[^}]*\}\s+from\s+['"][^'"]+['"];?\n?/g, '')
      // Remove type exports
      .replace(/export\s+type\s+\{[^}]*\}(?:\s+from\s+['"][^'"]+['"])?;?\n?/g, '')
      // Convert .tsx imports to .jsx
      .replace(/\.tsx(['"])/g, '.jsx$1')
      // Convert .ts imports to .js
      .replace(/\.ts(['"])/g, '.js$1')
      // Remove generic type parameters
      .replace(/<[^>]+>(?=\s*[=({])/g, '')
      // Clean up any double spaces
      .replace(/\s{2,}/g, ' ')
      // Clean up empty lines
      .replace(/\n{3,}/g, '\n\n');

    // Create destination path
    const destPath = sourcePath
      .replace('/src/', '/src-js/')
      .replace(/\.tsx?$/, '.jsx');
    
    // Create directory if it doesn't exist
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Write the converted file
    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`Converted: ${sourcePath} -> ${destPath}`);
    return true;
  } catch (error) {
    console.error(`Error converting ${sourcePath}:`, error);
    return false;
  }
}

// Get the source file from command line argument
const sourceFile = process.argv[2];
if (!sourceFile) {
  console.error('Please provide a source file path');
  process.exit(1);
}

// Convert the file
convertFile(sourceFile);
