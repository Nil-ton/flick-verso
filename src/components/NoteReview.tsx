import { FaStar } from "react-icons/fa";

type props = {
    note: {
        note: string;
    }[]
}
export function NoteReview({ note }: props) {
    return <div className="flex items-center mt-3">
        {note?.[0]?.note && [1, 2, 3, 4, 5].map((value) => (
            <FaStar
                key={value}
                className={`${value <= Number(note?.[0].note) ? 'text-yellow-400' : 'text-gray-400'}`}
            />
        ))}
        <div className="text-[16px]">
            {Number(note?.[0].note) === 1 && 'Ruim'}
            {Number(note?.[0].note) === 2 && 'Regular'}
            {Number(note?.[0].note) === 3 && 'Bom'}
            {Number(note?.[0].note) === 4 && 'Ótimo'}
            {Number(note?.[0].note) === 5 && 'Excelente'}
        </div>
    </div>
}