'use client'
import React, { useEffect, useState } from 'react';

const LgpdForm = () => {
    const [accepted, setAccepted] = useState(true);

    const handleAccept = () => {
        setAccepted(true);
        if (typeof window !== "undefined") {
            localStorage.setItem('@lgpd', 'true')
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const lgpd = localStorage.getItem('@lgpd')
            setAccepted(lgpd ? true : false)
        }
    }, [accepted])

    return (
        <>
            {accepted && null}
            {!accepted && <div className="flex gap-[20px] items-center bg-gray-800 text-white py-2 px-4 fixed bottom-0 left-0 w-full fixed  z-[1000]">
                <p className="text-center">
                    Nós utilizamos cookies para melhorar sua experiência de usuário.
                    Para conferir detalhadamente todos os cookies utilizados, leia nosso
                    <a href="/politica-de-privacidade" className="underline ml-1">
                        Política de Privacidade
                    </a>
                </p>
                <button
                    onClick={handleAccept}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 mt-2 rounded"
                >
                    Aceitar
                </button>
            </div>}

        </>
    );
};

export default LgpdForm;
