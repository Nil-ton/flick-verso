import { FaStar } from "react-icons/fa";

type props = {
    note: {
        note: string;
    }[]
}
export function NoteReview({ note }: props) {
    return <div>
        <hr className="mb-3" />
        <div className="flex items-end gap-2">
            <div className="flex items-center text-[22px] font-bold gap-2 uppercase">
                <div>
                    Nota do crítica
                </div>
                {note?.[0].note && [1, 2, 3, 4, 5].map((value) => (
                    <FaStar
                        key={value}
                        className={`${value <= Number(note?.[0].note) ? 'text-yellow-400' : 'text-gray-400'}`}
                    />
                ))}
            </div>
            <div className="text-[16px]">
                {Number(note?.[0].note) === 1 && 'Horrível'}
                {Number(note?.[0].note) === 2 && 'Ruim'}
                {Number(note?.[0].note) === 3 && 'Bom'}
                {Number(note?.[0].note) === 4 && 'Otimo'}
                {Number(note?.[0].note) === 5 && 'Excelente'}
            </div>
        </div>
        <hr className="mt-3" />
    </div>
}