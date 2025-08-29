export function getModifiedFields(initial, updates) {
  const modified = {};

  for (const key in updates) {
    if (updates[key] != initial[key]){
      modified[key] = updates[key]
    }
  }
  return modified;
}