import fs from 'fs';

export function readTestData<T>(filePath:string): any {
   
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading test data from ${filePath}:`, error);
        throw error;
    }
}