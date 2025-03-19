"use client";
import useSWR from "swr";
import { getTopCryptos } from "@/app/actions";
import CryptoList from "@components/CryptoList/CryptoList";
import Spinner from "@/features/Spinner/Spinner";
import styles from "@styles/pages/Page.module.scss";
import { fetchCountries } from "@/lib/api/getCountries";
import CountriesList from "@components/CountriesList/CountriesList";

export default function HomePage() {
    // Запити через SWR
    const { data: cryptos, error: cryptoError, isLoading: isCryptoLoading } = useSWR("top-cryptos", getTopCryptos);
    const { data: countries, error: countryError, isLoading: isCountryLoading } = useSWR("countries", fetchCountries);

    return (
        <div className={styles.container}>
            <section >
                {isCryptoLoading ? (
                    <Spinner />
                ) : cryptoError ? (
                    <p>Failed to load cryptos</p>
                ) : cryptos?.length ? (
                    <CryptoList cryptos={cryptos} />
                ) : (
                    <p>No data available</p>
                )}
            </section>

            <section>
                {isCountryLoading ? (
                    <Spinner />
                ) : countryError ? (
                    <p>Failed to load countries</p>
                ) : (
                    <CountriesList countries={countries || []} />
                )}
            </section>
        </div>
    );
}
