"use client";

import { useEffect, useState } from "react";

interface Crypto {
    id: string;
    name: string;
    image: string;
    current_price: number;
}

export default function CryptoStream() {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);

    useEffect(() => {
        const fetchStream = async () => {
            const response = await fetch("/api/crypto/stream");
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let newCryptos: Crypto[] = [];

            while (reader) {
                const { value, done } = await reader.read();
                if (done) break;

                const text = decoder.decode(value);
                const items = text.trim().split("\n").map(JSON.parse);
                newCryptos = [...newCryptos, ...items];

                setCryptos([...newCryptos]);
            }
        };

        fetchStream();
    }, []);

    return (
        <section>
            <h2>Live Crypto Prices</h2>
            <ul>
                {cryptos.map((crypto) => (
                    <li key={crypto.id}>
                        <img src={crypto.image} alt={crypto.name} width={32} height={32} />
                        {crypto.name} - ${crypto.current_price ? crypto.current_price.toFixed(2) : "N/A"}
                    </li>
                ))}
            </ul>
        </section>
    );
}
