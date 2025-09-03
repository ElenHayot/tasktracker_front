// Composant permettnt d'afficher correctement une liste

export function showOneListInLine(data) {
    return data && data.length > 0 ? `[${data.join(', ')}]` : '[]';
}