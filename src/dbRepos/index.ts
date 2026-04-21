import fs from "node:fs";
import csv from "csv-parser";

/**
 * This assignment uses csv-parser
 * Use csv as mock DB services
 *
 * In actual implementation, replace this with a real database service
 *
 * @param filePath
 * @returns
 */

const readCsvToArray = async <T = Record<string, string>>(filePath: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: T) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err: Error) => reject(err));
  });
};

export { readCsvToArray };
