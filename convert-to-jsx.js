const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

async function* walk(dir) {
  const files = await readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);
    
    if (stats.isDirectory()) {
      yield* walk(filePath);
    } else {
      yield filePath;
    }
  }
}

async function convertFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) {
    return;
  }

  try {
    // Read the file content
    const content = await readFile(filePath, 'utf8');
    
    // Remove TypeScript specific syntax
    let newContent = content
      // Remove type annotations
      .replace(/:\s*[\w\[\]{}|<>]+(?=,|;|\s*=|\s*[),]|\s*;?$)/g, '')
      // Remove interface and type declarations
      .replace(/\b(interface|type)\s+\w+\s*({[^}]*}|=.*?;|\n)/g, '')
      // Remove as Type assertions
      .replace(/\sas\s+[\w\[\]{}|<>]+/g, '')
      // Remove import type statements
      .replace(/import\s+type\s+\{([^}]*)\}\s+from\s+['"][^'"]+['"];?/g, '')
      // Remove type parameters from function and component definitions
      .replace(/<[\w\s,]+>(?=\s*[=()])/g, '')
      // Remove type imports but keep the rest
      .replace(/import\s*\{([^}]*?)\}\s*from\s*['"][^'"]+['"]/g, (match, p1) => {
        // Remove type imports but keep regular imports
        const imports = p1.split(',')
          .map(s => s.trim())
          .filter(s => !s.startsWith('type '))
          .join(', ');
        return `import { ${imports} }`;
      });

    // Remove empty import statements
    newContent = newContent.replace(/import\s*\{\s*}\s*from\s*['"][^'"]+['"];?\n?/g, '');
    
    // Create new file path with .jsx extension
    const newFilePath = filePath.endsWith('.tsx') 
      ? filePath.replace(/\.tsx$/, '.jsx')
      : filePath.replace(/\.ts$/, '.js');

    // Write the new file
    await writeFile(newFilePath, newContent);
    console.log(`Converted: ${filePath} -> ${newFilePath}`);
    
    // Remove the old file
    await unlink(filePath);
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function main() {
  const srcDir = path.join(__dirname, 'src');
  
  // Process all files in the src directory
  for await (const filePath of walk(srcDir)) {
    await convertFile(filePath);
  }
  
  console.log('Conversion complete!');
}

main().catch(console.error);
