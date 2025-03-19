"use server";

export type Crypto = {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    price_change_percentage_24h: number;
}

export async function getTopCryptos(): Promise<Crypto[]> {
    const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
        { next: { revalidate: 120 } }
    );
    console.log("new Fetch")
    if (!res.ok) {
        throw new Error(`Failed to fetch cryptocurrency data. Status: ${res.status}`);
    }

    const data: Crypto[] = await res.json();
    return data;
}

