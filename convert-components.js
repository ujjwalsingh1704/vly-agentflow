const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const createDirectories = () => {
  const dirs = [
    'src-js/components',
    'src-js/components/ui',
    'src-js/lib',
    'src-js/hooks'
  ];
  
  dirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
    }
  });
};

// Convert a single file from TypeScript to JavaScript
const convertFile = (srcPath, destPath) => {
  try {
    let content = fs.readFileSync(srcPath, 'utf8');
    
    // Basic TypeScript to JavaScript conversions
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
      // Remove generic type parameters from React components
      .replace(/React\.FC<[^>]+>/g, '')
      .replace(/React\.ReactNode/g, '')
      // Clean up any double spaces that might have been created
      .replace(/\s{2,}/g, ' ')
      // Clean up empty lines
      .replace(/\n{3,}/g, '\n\n');

    // Write the converted file
    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`Converted: ${srcPath} -> ${destPath}`);
    return true;
  } catch (error) {
    console.error(`Error converting ${srcPath}:`, error);
    return false;
  }
};

// Process all TypeScript files in a directory
const processDirectory = (srcDir, destDir) => {
  if (!fs.existsSync(srcDir)) {
    console.log(`Source directory does not exist: ${srcDir}`);
    return;
  }

  const files = fs.readdirSync(srcDir);
  
  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file.replace(/\.tsx?$/, '.jsx'));
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      // Create corresponding directory in destination
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      processDirectory(srcPath, destPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      convertFile(srcPath, destPath);
    }
  });
};

// Main function
const main = () => {
  console.log('Starting TypeScript to JavaScript conversion...');
  
  // Create necessary directories
  createDirectories();
  
  // Convert components
  processDirectory(
    path.join(process.cwd(), 'src', 'components'),
    path.join(process.cwd(), 'src-js', 'components')
  );
  
  // Convert lib files if they exist
  if (fs.existsSync(path.join(process.cwd(), 'src', 'lib'))) {
    processDirectory(
      path.join(process.cwd(), 'src', 'lib'),
      path.join(process.cwd(), 'src-js', 'lib')
    );
  }
  
  // Convert hooks if they exist
  if (fs.existsSync(path.join(process.cwd(), 'src', 'hooks'))) {
    processDirectory(
      path.join(process.cwd(), 'src', 'hooks'),
      path.join(process.cwd(), 'src-js', 'hooks')
    );
  }
  
  console.log('Conversion completed!');};

// Run the script
main();
