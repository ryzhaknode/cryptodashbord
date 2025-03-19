import React from 'react';
import { Country } from '@/lib/api/getCountries';
import styles from './CountriesList.module.scss';

interface CountriesListProps {
  countries: Country[];
}

const CountriesList = ({ countries }: CountriesListProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Countries</h2>
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {countries.map((country) => (
            <li key={country.code} className={styles.item}>
              <div className={styles.emoji}>{country.emoji}</div>
              <div className={styles.text}>
                <h2 className={styles.name}>
                  {country.name} ({country.code})
                </h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CountriesList;
