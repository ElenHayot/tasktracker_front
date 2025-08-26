// Composant permettnt d'afficher correctement une liste

export default function ShowOneListInLine(data) {
    return data && data.length > 0 ? `[${data.join(', ')}]` : '[]';
}