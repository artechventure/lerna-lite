import log from 'npmlog';

/**
 * From a dot (.) notation path, find and delete a property within an object if found given a complex object path
 * @param {Object} object - object to search from
 * @param {String} path - complex object path to find descendant property from, must be a string with dot (.) notation
 * @param {String} [sourceName] - source name of which object name to delete the field from.
 */
export function deleteComplexObjectProp(object: any, path: string, sourceName?: string) {
  if (!object || !path) {
    return object;
  }
  const props = path.split('.');
  const lastProp = props.slice(-1).pop();

  return props.reduce((obj, prop) => {
    if (lastProp !== undefined && obj?.[prop] !== undefined && prop === lastProp) {
      delete obj[prop];
      log.verbose('mutation', `Removed "${path}" field from ${sourceName || 'n/a'}.`);
    } else {
      return obj?.[prop];
    }
  }, object);
}

/**
 * From a dot (.) notation path, find and return a property within an object given a complex object path
 * Note that the object path does should not include the parent itself
 * for example if we want to get `address.zip` from `user` object, we would call `getComplexObjectValue(user, 'address.zip')`
 * @param object - object to search from
 * @param path - complex object path to find descendant property from, must be a string with dot (.) notation
 * @returns outputValue - the object property value found if any
 */
export function getComplexObjectValue<T>(object: any, path: string): T {
  if (!object || !path) {
    return object;
  }
  return path.split('.').reduce((obj, prop) => obj?.[prop], object);
}
