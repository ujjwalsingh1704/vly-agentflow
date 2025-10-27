const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const SRC_DIR = path.join(__dirname, 'src', 'components', 'ui');
const DEST_DIR = path.join(__dirname, 'src-js', 'components', 'ui');

// Patterns to remove TypeScript types and transform imports
const transformations = [
  // Remove type imports
  [/(import\s+)type\s+\{([^}]*)\}\s+from\s+['"]([^'"]+)['"]/g, 'import {$2} from "$3"'],
  // Remove type exports
  [/(export\s+)type\s+\{([^}]*)\}(?:\s+from\s+['"]([^'"]+)['"])?/g, 'export {$2}'],
  // Remove type annotations
  [/:\s*[\w\[\]\{\}\|&<>]+(?=\s*[=,;\)\}\]]|$)/g, ''],
  // Remove interface declarations
  [/export\s+interface\s+\w+\s*\{[^}]*\}\n?/g, ''],
  // Remove type literals
  [/:\s*\{[^}]*\}(?=\s*[=,;\)\}\]]|$)/g, ''],
  // Remove generic type parameters
  [/<[\w\s,]+>(?=\s*[=({])/g, ''],
  // Remove 'as' type assertions
  [/\s+as\s+[\w\[\]\{\}\|&<>]+/g, ''],
  // Convert .tsx imports to .jsx
  [/\.tsx(['"])/g, '.jsx$1'],
  // Convert .ts imports to .js
  [/\.ts(['"])/g, '.js$1']
];

async function convertFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    let result = content;

    // Apply all transformations
    for (const [pattern, replacement] of transformations) {
      result = result.replace(pattern, replacement);
    }

    // Create destination directory if it doesn't exist
    const relativePath = path.relative(SRC_DIR, filePath);
    const destPath = path.join(DEST_DIR, relativePath).replace(/\.tsx$/, '.jsx');
    const destDir = path.dirname(destPath);
    
    if (!fs.existsSync(destDir)) {
      await mkdir(destDir, { recursive: true });
    }

    // Write the converted file
    await writeFile(destPath, result, 'utf8');
    console.log(`Converted: ${filePath} -> ${destPath}`);
    return true;
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
    return false;
  }
}

async function processDirectory() {
  try {
    // Ensure destination directory exists
    if (!fs.existsSync(DEST_DIR)) {
      await mkdir(DEST_DIR, { recursive: true });
    }

    // Read all files in the source directory
    const files = await readdir(SRC_DIR, { withFileTypes: true });
    const tsxFiles = files
      .filter(file => file.isFile() && file.name.endsWith('.tsx'))
      .map(file => path.join(SRC_DIR, file.name));

    console.log(`Found ${tsxFiles.length} TypeScript components to convert...`);
    
    // Convert each file
    for (const file of tsxFiles) {
      await convertFile(file);
    }

    console.log('Conversion complete!');
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

// Run the conversion
processDirectory().catch(console.error);
