import fs from 'fs';
import path from 'path';

const baseDir = '../site/src';

const UI_MAP = {
    'Back': 'Terug',
    'Your Calm Toolkit': 'Je Kalmte Toolkit',
    'Calming Exercises': 'Kalmerende Oefeningen',
    'Preparation Checklists': 'Voorbereidingschecklists',
    'Interactive checklist': 'Interactieve checklist',
    'Audio': 'Audio',
    'Video': 'Video',
    'Get Started': 'Aan de slag',
    'Next': 'Volgende',
    'Previous': 'Vorige',
    'Finish': 'Klaar',
    'Reset': 'Opnieuw',
    'Continue': 'Doorgaan',
    'What to do next': 'Wat nu te doen',
    'Estimated read': 'Geschatte leestijd',
    'minutes': 'minuten',
    'minute': 'minuut',
    'Emergency Resources': 'Noodbronnen',
    'Need urgent help?': 'Hulp bij nood?',
    'Call': 'Bel',
    'Menu': 'Menu',
    'Timeline': 'Tijdlijn',
    'Tools': 'Hulpmiddelen',
    'Checklists': 'Checklists',
    'Guide': 'Gids'
}

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk(baseDir, (filePath) => {
    if (filePath.endsWith('.astro') || filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let originalContent = content;
        
        for (const [en, nl] of Object.entries(UI_MAP)) {
            // Match text between tags, in quotes, or as simple identifiers
            // This is a naive but aggressive replacement for this specific small project
            const escapedEn = en.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            
            // 1. Between tags: >Text<
            const tagRegex = new RegExp(`>\\s*${escapedEn}\\s*<`, 'g');
            content = content.replace(tagRegex, `>${nl}<`);
            
            // 2. Attribute values and labels in JS/TS: "Text" or 'Text'
            // We use lookarounds to avoid variable names if possible, but for this app we'll be careful
            const quoteRegex = new RegExp(`(['"])\\s*${escapedEn}\\s*(['"])`, 'g');
            content = content.replace(quoteRegex, `$1${nl}$2`);
        }
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Localized: ${filePath}`);
        }
    }
});
