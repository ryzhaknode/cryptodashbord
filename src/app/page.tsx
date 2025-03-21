"use client";
import useSWR from "swr";
import { getTopCryptos } from "@/app/actions";
import CryptoList from "@components/CryptoList/CryptoList";
import Spinner from "@/features/Spinner/Spinner";
import styles from "@styles/pages/Page.module.scss";
import { fetchCountries } from "@/lib/api/getCountries";
import CountriesList from "@components/CountriesList/CountriesList";
import client from "@/lib/apollo/apollo-client";
import { gql, useQuery } from "@apollo/client";
import LaunchList from "@components/LaunchList/LaunchList";


const GET_LAUNCHES = gql`
  query {
    launchesPast(limit: 5) {
      mission_name
      launch_date_utc
      rocket {
        rocket_name
      }
    }
  }
`;


export default function HomePage() {
    const { loading: launchesLoading, error: launchesError, data: launches } = useQuery(GET_LAUNCHES, { client });
    const { data: cryptos, error: cryptoError, isLoading: isCryptoLoading } = useSWR("top-cryptos", getTopCryptos);
    const { data: countries, error: countryError, isLoading: isCountryLoading } = useSWR("countries", fetchCountries);

    console.log(launches)

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
            <section>
                <LaunchList data={launches}/>
            </section>
        </div>
    );
}
