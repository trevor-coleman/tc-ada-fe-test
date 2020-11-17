interface ObjectWithId {
  id: string,
  [key: string]: any
}

interface NormalizedObject {
  [key: string]: ObjectWithId
}

/**
 * Takes an array of objects with an `id` property, and normalizes them.
 *
 * Example: [{id: 1, val: 'a'}, {id: 2, val: 'b'}]
 * Returns {  1: {id: 1, val: 'a'},
 *            2: {id: 2, val: 'b'} }
 *
 * @param {ObjectWithId[]} payload
 * @return {NormalizedObject}
 */
export function normalizePayload(payload:ObjectWithId[]):NormalizedObject{
  return payload.reduce((prev: NormalizedObject, curr: ObjectWithId) => (
      {
        ...prev,
        [curr.id]: curr,
      }), {});
}
