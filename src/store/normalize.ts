interface ObjectWithId {
  id: string,
  [key: string]: any
}

interface NormalizedObject {
  [key: string]: ObjectWithId
}

export function normalizePayload(payload:ObjectWithId[]):NormalizedObject{
  return payload.reduce((prev: NormalizedObject, curr: ObjectWithId) => (
      {
        ...prev,
        [curr.id]: curr,
      }), {});
}
