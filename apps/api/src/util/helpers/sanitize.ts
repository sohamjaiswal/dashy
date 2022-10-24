/**
 * take an object and remove all the values which are falsy and return a new
 * object which is clean and sanitized of all the satanic JS null-like bullshit
 *
 * @param {Record<string, unknown>} obj
 * @returns Record<string, unknown>
 */
export function sanitizeObject(
    obj: Record<string, unknown>
): Record<string, unknown> {
    const sanitizedObject = {} as Record<string, unknown>;
    for (const key of Object.keys(obj)) {
        if (obj[key]) sanitizedObject[key] = obj[key];
    }
    return sanitizedObject;
}
