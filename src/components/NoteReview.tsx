type props = {
    note: {
        note: string;
    }[]
}
export function NoteReview({ note }: props) {
    return <div className="text-[16px]">
        {Number(note?.[0].note) === 1 && 'Ruim'}
        {Number(note?.[0].note) === 2 && 'Regular'}
        {Number(note?.[0].note) === 3 && 'Bom'}
        {Number(note?.[0].note) === 4 && 'Ótimo'}
        {Number(note?.[0].note) === 5 && 'Excelente'}
    </div>
}