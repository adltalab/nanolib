import {logger} from './common';
import {parseJson} from './json';
import {readFile, readFileSync} from './read-file';

import type {Dictionary, MaybePromise} from '@alwatr/type-helper';

/**
 * Enhanced read json file (async).
 *
 * @param path - file path
 * @returns json object
 * @example
 * ```typescript
 * const fileContent = await readJson('./file.json');
 * ```
 */
export function readJson<T extends Dictionary>(path: string): Promise<T>;
/**
 * Enhanced read json file (sync).
 *
 * @param path - file path
 * @param sync - sync mode
 * @returns json object
 * @example
 * ```typescript
 * const fileContent = readJson('./file.json', true);
 * ```
 */
export function readJson<T extends Dictionary>(path: string, sync: true): T;
/**
 * Enhanced read json file.
 *
 * @param path - file path
 * @param sync - sync mode
 * @returns json object
 * @example
 * ```typescript
 * const fileContent = await readJson('./file.json', sync);
 * ```
 */
export function readJson<T extends Dictionary>(path: string, sync: boolean): MaybePromise<T>;
/**
 * Enhanced read json file.
 *
 * @param path - file path
 * @param sync - sync mode
 * @returns json object
 * @example
 * ```typescript
 * const fileContent = await readJson('./file.json');
 * ```
 */
export function readJson<T extends Dictionary>(path: string, sync = false): MaybePromise<T> {
  logger.logMethodArgs?.('readJson', {path: path.slice(-32), sync});
  if (sync === true) {
    return parseJson<T>(readFileSync(path));
  }
  else {
    return readFile(path).then((content) => parseJson<T>(content));
  }
}
