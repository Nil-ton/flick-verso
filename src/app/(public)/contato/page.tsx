export default function Contato() {
    const email = 'flickverso@gmail.com';
    return <div className="flex justify-center items-center mt-5 bg-gray-100">
        <div className="max-w-md bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Entre em contato</h2>
            <p className="text-lg mb-4">Para entrar em contato, envie um e-mail para:</p>
            <a className="text-blue-500 hover:underline" href={`mailto:${email}`}>
                {email}
            </a>
        </div>
    </div>
}