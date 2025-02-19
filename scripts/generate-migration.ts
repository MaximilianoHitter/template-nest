import * as fs from 'fs';
import * as path from 'path';

// Obtiene el nombre del archivo desde los argumentos de la CLI
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('❌ Debes proporcionar un nombre para la migración.');
    process.exit(1);
}

const migrationName = args[0].replace(/\s+/g, '_'); // Reemplazar espacios por guiones bajos
const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, '') // Eliminar caracteres no deseados
    .slice(0, 12); // Tomar hasta AñoMesDíaHoraMinuto

const fileName = `${timestamp}_${migrationName}.sql`;
const filePath = path.join(__dirname, '../migrations', fileName);

// Crear el archivo vacío
fs.writeFileSync(filePath, '');

console.log(`✅ Migración creada: ${filePath}`);