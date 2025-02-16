import fs from 'fs';

const file = process.argv[2]
console.log(`Adding shebang to ${file}`);
fs.writeFileSync(file, '#!/usr/bin/env node\n' + fs.readFileSync(file).toString('utf-8'));
