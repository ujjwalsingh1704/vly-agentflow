const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

async function* walk(dir) {
  const files = await readdir(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.next') continue;
    
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);
    
    if (stats.isDirectory()) {
      yield* walk(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      yield filePath;
    }
  }
}

async function convertFile(filePath) {
  try {
    // Read the file content
    let content = await readFile(filePath, 'utf8');
    
    // Create new file path with .jsx extension
    const newFilePath = filePath.endsWith('.tsx') 
      ? filePath.replace(/\.tsx$/, '.jsx')
      : filePath.replace(/\.ts$/, '.js');
    
    // Ensure the directory exists
    const dir = path.dirname(newFilePath);
    await mkdir(dir, { recursive: true });

    // Write the new file
    await writeFile(newFilePath, content);
    console.log(`Converted: ${filePath} -> ${newFilePath}`);
    
    // Remove the old file
    // await unlink(filePath);
    
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

async function main() {
  const srcDir = path.join(__dirname, 'src');
  let successCount = 0;
  let errorCount = 0;
  
  // Process all files in the src directory
  for await (const filePath of walk(srcDir)) {
    const success = await convertFile(filePath);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }
  
  // Also process root directory files
  const rootFiles = await readdir(__dirname);
  for (const file of rootFiles) {
    const filePath = path.join(__dirname, file);
    const stats = await stat(filePath);
    if (!stats.isDirectory() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
      const success = await convertFile(filePath);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    }
  }
  
  console.log(`\nConversion complete!`);
  console.log(`Successfully converted: ${successCount} files`);
  console.log(`Errors: ${errorCount} files`);
  
  if (errorCount === 0) {
    console.log('\nTo complete the migration, you can now:');
    console.log('1. Delete all .ts and .tsx files');
    console.log('2. Update package.json to remove TypeScript dependencies');
    console.log('3. Update import statements in your .jsx files if needed');
  }
}

main().catch(console.error);
