import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, '../../content');
const destDir = path.resolve(__dirname, '../src/content');

console.log(`Syncing content from ${sourceDir} to ${destDir}...`);

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    if (fs.existsSync(sourceDir)) {
        copyDir(sourceDir, destDir);
        console.log('Content sync completed successfully.');
    } else {
        console.warn(`Source directory ${sourceDir} not found. Skipping content sync.`);
    }
} catch (err) {
    console.error('Error syncing content:', err);
    process.exit(1);
}
