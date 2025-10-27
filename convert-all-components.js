const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// Source and destination directories
const SRC_DIR = path.join(__dirname, 'src', 'components');
const DEST_DIR = path.join(__dirname, 'src-js', 'components');

// Patterns to remove TypeScript types
const TYPE_PATTERNS = [
  // Remove type imports
  /import\s+type\s+\{[^}]*\}\s+from\s+['"][^'"]+['"];?\n?/g,
  // Remove type exports
  /export\s+type\s+\{[^}]*\}(?:\s+from\s+['"][^'"]+['"])?;?\n?/g,
  // Remove type annotations
  /:\s*[\w\[\]\{\}\|&<>]+(?=\s*[=,;\)\}\]]|$)/g,
  // Remove interface declarations
  /export\s+interface\s+\w+\s*\{[^}]*\}\n?/g,
  // Remove type literals
  /:\s*\{[^}]*\}(?=\s*[=,;\)\}\]]|$)/g,
  // Remove generic type parameters
  /<[\w\s,]+>(?=\s*[=({])/g,
  // Remove 'as' type assertions
  /\s+as\s+[\w\[\]\{\}\|&<>]+/g,
];

// Process a single file
async function processFile(filePath, relativePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    let result = content;

    // Apply all type removal patterns
    TYPE_PATTERNS.forEach(pattern => {
      result = result.replace(pattern, '');
    });

    // Convert .tsx imports to .jsx
    result = result.replace(/\.tsx(['"])/g, '.jsx$1');
    
    // Remove any remaining empty lines with just whitespace
    result = result.replace(/^\s*\n/gm, '');
    
    // Ensure consistent line endings
    result = result.replace(/\r?\n/g, '\n');

    // Create destination path
    const destPath = path.join(DEST_DIR, relativePath).replace(/\.tsx$/, '.jsx');
    const destDir = path.dirname(destPath);
    
    if (!fs.existsSync(destDir)) {
      await mkdir(destDir, { recursive: true });
    }

    // Write the processed file
    await writeFile(destPath, result, 'utf8');
    console.log(`Converted: ${filePath} -> ${destPath}`);
    
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Recursively process all .tsx files in a directory
async function processDirectory(dir, relativePath = '') {
  try {
    const files = await readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const fileStat = await stat(filePath);
      const newRelativePath = path.join(relativePath, file);
      
      if (fileStat.isDirectory()) {
        await processDirectory(filePath, newRelativePath);
      } else if (file.endsWith('.tsx')) {
        await processFile(filePath, newRelativePath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
}

// Run the conversion
async function main() {
  console.log('Starting TypeScript to JavaScript conversion...');
  
  // Ensure destination directory exists
  if (!fs.existsSync(DEST_DIR)) {
    await mkdir(DEST_DIR, { recursive: true });
  }
  
  await processDirectory(SRC_DIR);
  console.log('Conversion completed!');
}

// Run the script
main().catch(console.error);
