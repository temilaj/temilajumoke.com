const fs = require('fs');
const path = require('path');

// Migration script to convert old CSV format to new format
// Old: timestamp,session_id,path,referrer,user_agent,browser,device_type,os,ip_hash
// New: timestamp,visitor_id,session_id,path,referrer,user_agent,browser,device_type,os,ip_hash

const csvPath = path.join(process.cwd(), 'analytics-log.csv');
const backupPath = path.join(process.cwd(), 'analytics-log.backup.csv');

try {
  fs.copyFileSync(csvPath, backupPath);
  console.log('✓ Created backup at analytics-log.backup.csv');

  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.split('\n');

  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (i === 0) {
      newLines.push('timestamp,visitor_id,session_id,path,referrer,user_agent,browser,device_type,os,ip_hash');
    } else {
      const values = [];
      let current = '';
      let inQuotes = false;

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          if (inQuotes && line[j + 1] === '"') {
            current += '"';
            j++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          values.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current);

      if (values.length === 9) {
        // Old format: duplicate session_id as visitor_id
        const [timestamp, sessionId, path, referrer, userAgent, browser, deviceType, os, ipHash] = values;

        const escapeCSV = value => {
          if (!value) return value;
          if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        };

        const newLine = [
          timestamp,
          sessionId,
          sessionId,
          path,
          escapeCSV(referrer),
          escapeCSV(userAgent),
          browser,
          deviceType,
          os,
          ipHash,
        ].join(',');

        newLines.push(newLine);
      } else {
        console.warn(`⚠ Skipping malformed line ${i + 1}: ${line.substring(0, 50)}...`);
      }
    }
  }

  fs.writeFileSync(csvPath, newLines.join('\n') + '\n', 'utf8');
  console.log(`✓ Migrated ${newLines.length - 1} rows`);
  console.log('✓ Migration complete!');
  console.log('\nOld backup saved as: analytics-log.backup.csv');
} catch (error) {
  console.error('✗ Migration failed:', error.message);

  if (fs.existsSync(backupPath)) {
    console.log('\nRestoring from backup...');
    fs.copyFileSync(backupPath, csvPath);
    console.log('✓ Restored original file');
  }

  process.exit(1);
}
