// Outil permettant de parse le userId récupére en base 10

export default function parseToInt(data){
    const parsed = parseInt(data, 10);
    if (isNaN(parsed)) { 
        throw new Error("Invalid data (waiting for an Integer)");
    }
    return parsed;
}