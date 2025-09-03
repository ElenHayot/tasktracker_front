// Permet de nettoyer toutes les données vides de l'objet avant de l'envoyer à l'API (BUT: laisser l'API gérer les valeurs par défaut)
export function cleanObject(obj) {
  const cleaned = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== "" && value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}