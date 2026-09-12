import fs from 'fs';

export class FileWriter {
    static writeToFile(filePath: string, data: string): void {
        fs.writeFileSync(filePath, data, 'utf8');
    }

    static appendToFile(filePath: string, data: string): void {
        fs.appendFileSync(filePath, data, 'utf8');
    }

    static writeJSONToFile(filePath: string, jsonData: any): void {
        const data = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync(filePath, data, 'utf8');
    }

}