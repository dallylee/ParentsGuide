import fs from 'fs';
import path from 'path';

const monolithicPath = '../source/parent-guide.md';
const sectionsDir = '../content/sections';

const headers = [
    '**1. Begin Hier: Je Bent Niet Alleen**',
    '**2. Je Zorgen Begrijpen**',
    '**3. Je Toolkit om Kalm te Blijven**',
    '**4. Praten met Je Kind**',
    '**5. De Reis, Stap voor Stap: Voor het Ziekenhuis**',
    '**6. De Ziekenhuiservaring Navigeren**',
    '**7. Je Kind Naar Huis Brengen**',
    '**8. Je Dagelijkse Zelfzorgroutine**',
    '**9. Wanneer Je Extra Ondersteuning Nodig Hebt**',
    '**10. Samen Sterker Worden**'
];

const sectionFiles = [
    '01-start-here.md',
    '02-understanding-worries.md',
    '03-calm-toolkit.md',
    '04-talking-child.md',
    '05-timeline.md',
    '06-hospital-experience.md',
    '07-home-recovery.md',
    '08-self-care-routine.md',
    '09-extra-support.md',
    '10-growing-stronger.md'
];

const content = fs.readFileSync(monolithicPath, 'utf-8');
const lines = content.split('\n');

let currentSection = -1;
let sectionContents = headers.map(() => []);

for (let line of lines) {
    const foundHeaderIndex = headers.findIndex(h => line.trim() === h);
    if (foundHeaderIndex !== -1) {
        currentSection = foundHeaderIndex;
        // Convert header to H1 for the section file
        const cleanTitle = headers[currentSection].replace(/^\*\*(\d+\.\s+)?/, '').replace(/\*\*$/, '');
        sectionContents[currentSection].push('# ' + cleanTitle);
        continue;
    }
    if (currentSection !== -1) {
        sectionContents[currentSection].push(line);
    }
}

for (let i = 0; i < sectionFiles.length; i++) {
    const filePath = path.join(sectionsDir, sectionFiles[i]);
    const oldContent = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = oldContent.match(/^---\s*[\s\S]*?---\s*/);
    if (!frontmatterMatch) continue;
    
    let frontmatter = frontmatterMatch[0];
    const dutchTitle = headers[i].replace(/^\*\*(\d+\.\s+)?/, '').replace(/\*\*$/, '');
    
    // Simple replacement for title in frontmatter
    frontmatter = frontmatter.replace(/title: ".*?"/, 	itle: "");
    
    // Also update summary if we can map it (optional but good)
    // For now we just keep English summary or try to translate a few common ones
    // But most importantly, we replace the body.
    
    const body = sectionContents[i].join('\n').trim();
    // Add "What to do next" links at the end (Astro app specific)
    // We should probably try to keep the original footer links but they are relative
    // For simplicity, we'll keep the Dutch body as is.
    
    fs.writeFileSync(filePath, frontmatter + '\n' + body + '\n');
    console.log(Updated );
}
