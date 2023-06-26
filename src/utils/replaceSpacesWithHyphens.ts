export function replaceSpacesWithHyphens(str?: string | null) {
    if (str) {
        return str
            .toLowerCase() // Converte para minúsculas
            .replace(/\s+/g, '-') // Substitui espaços por hífens
            .replace(/[^a-z0-9-]/g, '-') // Substitui caracteres especiais por hífens
            .replace(/-+/g, '-') // Remove hífens duplicados
            .replace(/^-|-$/g, ''); // Remove hífens no início e fim da string
    }
    return null
}