const fs = require('fs');
const path = require('path');

const directories = [
    { folder: 'images/sclera', source: 'sclera' },
    { folder: 'images/openmoji', source: 'openmoji' }
];

const outputFile = 'iconen.json';
let allIcons = [];

directories.forEach(dir => {
    const fullPath = path.join(__dirname, dir.folder);
    
    // Controleer of de map bestaat
    if (fs.existsSync(fullPath)) {
        const files = fs.readdirSync(fullPath);
        
        files.forEach(file => {
            if (file.endsWith('.png') || file.endsWith('.svg')) {
                // Maak de bestandsnaam leesbaar (verwijder extensie, vervang underscores)
                let displayName = file.replace(/\.[^/.]+$/, "").replace(/_/g, ' ');
                // Hoofdletter voor de eerste letter
                displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
                
                allIcons.push({
                    displayName: displayName,
                    fileName: file,
                    source: dir.source
                });
            }
        });
        console.log(`✅ ${dir.source}: ${files.length} iconen gevonden.`);
    } else {
        console.log(`⚠️ Map niet gevonden: ${dir.folder}`);
    }
});

// Schrijf alles naar een JSON bestand
fs.writeFileSync(outputFile, JSON.stringify(allIcons, null, 2));
console.log(`\n🚀 Klaar! ${allIcons.length} iconen opgeslagen in ${outputFile}`);