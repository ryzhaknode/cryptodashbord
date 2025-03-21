import React from "react";
import styles from "./LaunchList.module.scss";

type Launch = {
    mission_name: string;
    launch_date_utc: string;
    rocket: { rocket_name: string };
};

type LaunchListProps = {
    data: { launchesPast: Launch[] };
};

const LaunchList: React.FC<LaunchListProps> = ({ data }) => {
    if (!data?.launchesPast?.length) {
        return <p className={styles.empty}>Немає даних про запуски</p>;
    }

    return (
        <div className={styles.list}>
            {data.launchesPast.map((launch, index) => (
                <div key={index} className={styles.card}>
                    <h3 className={styles.mission}>{launch.mission_name}</h3>
                    <p className={styles.rocket}>🚀 {launch.rocket.rocket_name}</p>
                    <p className={styles.date}>{new Date(launch.launch_date_utc).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default LaunchList;
