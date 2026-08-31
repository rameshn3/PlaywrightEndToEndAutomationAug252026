import fs from 'fs';
import {parse} from 'csv-parse/sync';

export function readCSVData<T>(filePath: string): T[] {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    return parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
    }) as T[];
}