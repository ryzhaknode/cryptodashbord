import React from 'react';
import { Crypto } from "@/app/actions";
import styles from './CryptoList.module.scss';

interface CryptoListProps {
    cryptos: Crypto[];
}

const CryptoList = ({ cryptos }: CryptoListProps) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>TOP 100 IN COINGECKO</h2>
            <div className={styles.listWrapper}>
                <ul className={styles.list}>
                    {cryptos.map((crypto) => (
                        <li key={crypto.id} className={styles.item}>
                            <img src={crypto.image} alt={crypto.name} className={styles.img} />
                            <div className={styles.text}>
                                <h2 className={styles.name}>
                                    {crypto.market_cap_rank}. {crypto.name} ({crypto.symbol.toUpperCase()})
                                </h2>
                                <p className={styles.price}>
                                    ${crypto.current_price.toFixed(2)} |
                                    {crypto.price_change_percentage_24h >= 0 ? (
                                        <span className={styles.positive}>
                      +{crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                                    ) : (
                                        <span className={styles.negative}>
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                                    )}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CryptoList;
