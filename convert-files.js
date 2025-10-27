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
    if (file === 'node_modules' || file === '.git') continue;
    
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
    let content = await readFile(filePath, 'utf8');
    
    // Create new file path with .jsx extension
    const newFilePath = filePath.endsWith('.tsx') 
      ? filePath.replace(/\.tsx$/, '.jsx')
      : filePath.replace(/\.ts$/, '.js');

    // Write the new file
    await writeFile(newFilePath, content);
    console.log(`Copied: ${filePath} -> ${newFilePath}`);
    
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
  
  // Also process root directory files
  const rootFiles = await readdir(__dirname);
  for (const file of rootFiles) {
    const filePath = path.join(__dirname, file);
    const stats = await stat(filePath);
    if (!stats.isDirectory() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
      await convertFile(filePath);
    }
  }
  
  console.log('File conversion complete!');
}

main().catch(console.error);
