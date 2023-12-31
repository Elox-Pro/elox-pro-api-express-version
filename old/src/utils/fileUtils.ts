import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
/**
 * Read a JSON file and parse its content into a JavaScript object.
 *
 * @param {string} filePath - Path to the JSON file to be read.
 * @param {string} fileName - Name of the JSON file to be read.
 * @returns {Object|null} - Parsed JavaScript object representing the file content, or null if there is an error.
 */
export function fileToJson<T>(fileName: string): T {
    try {

        const filePath = resolve(cwd(), fileName);
        const data = JSON.parse(readFileSync(filePath, 'utf-8'));
        return data as T;

    } catch (error) {
        console.error('🚨 Error loading file', error);
        throw error;
    }
}