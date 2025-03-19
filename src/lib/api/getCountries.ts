export interface Country {
    code: string;
    name: string;
    emoji: string;
}

export interface CountriesResponse {
    data: {
        countries: Country[];
    };
}

export async function fetchCountries(): Promise<Country[]> {
    const query = `
    query GetCountries {
      countries {
        code
        name
        emoji
      }
    }
  `;

    const response = await fetch("https://countries.trevorblades.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 }
    });

    console.log(response)

    if (!response.ok) {
        throw new Error("Failed to fetch countries");
    }

    const result: CountriesResponse = await response.json();
    return result.data.countries;
}
