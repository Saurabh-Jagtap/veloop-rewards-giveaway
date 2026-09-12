import {
    FiClock,
    FiGift,
    FiUsers,
    FiAward,
} from "react-icons/fi";

import type { Giveaway } from "../../../data/types";
import styles from "./GiveawayStats.module.css";

interface GiveawayStatsProps {
    giveaway: Giveaway;
}

const GiveawayStats = ({ giveaway }: GiveawayStatsProps) => {
    const stats = [
        {
            label: "Duration",
            value: "15 Days",
            description: "Aug 12 – Aug 27, 2026",
            icon: FiGift,
            variant: "purple",
        },
        {
            label: "Eligibility",
            value: "Eligible Users",
            description: "All VELOOP users",
            icon: FiUsers,
            variant: "blue",
        },
        {
            label: "Winners",
            value: `${giveaway.winnerCount} Winner${giveaway.winnerCount !== 1 ? "s" : ""
                }`,
            description: "Random selection",
            icon: FiAward,
            variant: "green",
        },
        {
            label: "Entry",
            value: `${giveaway.entryFee.amount} ${{
                    VE: "VEs",
                    SVE: "SVEs",
                    TOKEN: "Tokens",
                }[giveaway.entryFee.currency]
                }`,
            description: "Per entry",
            icon: FiClock,
            variant: "orange",
        },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                className={styles.statWrapper}
                                key={stat.label}
                            >
                                <div className={styles.stat}>
                                    <div
                                        className={`${styles.icon} ${styles[stat.variant]
                                            }`}
                                    >
                                        <Icon aria-hidden="true" />
                                    </div>

                                    <div className={styles.content}>
                                        <span className={styles.label}>
                                            {stat.label}
                                        </span>

                                        <strong className={styles.value}>
                                            {stat.value}
                                        </strong>

                                        <span className={styles.description}>
                                            {stat.description}
                                        </span>
                                    </div>
                                </div>

                                {index < stats.length - 1 && (
                                    <div className={styles.divider} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default GiveawayStats;