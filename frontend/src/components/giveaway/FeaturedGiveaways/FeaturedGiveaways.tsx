import {
    FiArrowRight,
    FiUsers,
} from "react-icons/fi";

import iphone15Pro from "../../../assets/giveaway/iphone-15-pro.png";
import appleWatch from "../../../assets/giveaway/apple-watch.png";
import airpodsPro2 from "../../../assets/giveaway/airpods-pro-2.png";
import amazon2000 from "../../../assets/giveaway/amazon-2000.png";

import styles from "./FeaturedGiveaways.module.css";

interface GiveawayCardData {
    title: string;
    description: string;
    participants: string;
    timeLeft: string;
    badge: string;
    image: string;
    imageAlt: string;
    theme: "purple" | "blue" | "green" | "orange";
}

const giveaways: GiveawayCardData[] = [
    {
        title: "iPhone 15 Pro",
        description: "Latest iPhone 15 Pro 128GB",
        participants: "2.3K+",
        timeLeft: "12d : 08h : 45m",
        badge: "1st Prize",
        image: iphone15Pro,
        imageAlt: "iPhone 15 Pro",
        theme: "purple",
    },
    {
        title: "Apple Watch Series 9",
        description: "Latest Apple Watch Series 9",
        participants: "1.8K+",
        timeLeft: "9d : 06h : 30m",
        badge: "2nd Prize",
        image: appleWatch,
        imageAlt: "Apple Watch Series 9",
        theme: "blue",
    },
    {
        title: "AirPods Pro 2",
        description: "Active Noise Cancellation",
        participants: "3.1K+",
        timeLeft: "7d : 06h : 20m",
        badge: "3rd Prize",
        image: airpodsPro2,
        imageAlt: "AirPods Pro 2",
        theme: "green",
    },
    {
        title: "Amazon Gift Card",
        description: "₹2,000 Amazon Gift Card",
        participants: "1.3K+",
        timeLeft: "5d : 02h : 15m",
        badge: "Lucky Draw",
        image: amazon2000,
        imageAlt: "₹2,000 Amazon Gift Card",
        theme: "orange",
    },
];

function FeaturedGiveaways() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.titleBlock}>
                            <div className={styles.title}>
                                <span className={styles.star}>★</span>

                                <h2>Featured Giveaways</h2>
                            </div>

                            <p>
                                Handpicked giveaways with amazing rewards
                                just for you.
                            </p>
                        </div>

                        <button
                            type="button"
                            className={styles.viewAllButton}
                        >
                            <span>View All Giveaways</span>

                            <FiArrowRight
                                size={20}
                                strokeWidth={2}
                            />
                        </button>
                    </div>

                    <div className={styles.grid}>
                        {giveaways.map((giveaway) => (
                            <article
                                key={giveaway.title}
                                className={`${styles.giveawayCard} ${styles[giveaway.theme]
                                    }`}
                            >
                                <div className={styles.prizeBadge}>
                                    {giveaway.badge}
                                </div>

                                <div className={styles.prizeImage}>
                                    <img
                                        src={giveaway.image}
                                        alt={giveaway.imageAlt}
                                    />
                                </div>

                                <div className={styles.giveawayInfo}>
                                    <h3>{giveaway.title}</h3>

                                    <p>{giveaway.description}</p>
                                </div>

                                <div className={styles.giveawayMeta}>
                                    <div className={styles.metaItem}>
                                        <FiUsers size={18} />

                                        <div>
                                            <strong>
                                                {giveaway.participants}
                                            </strong>

                                            <span>
                                                Participants
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={styles.metaDivider}
                                    />

                                    <div className={styles.metaItem}>
                                        <span
                                            className={styles.clockIcon}
                                        >
                                            ◷
                                        </span>

                                        <div>
                                            <strong>
                                                {giveaway.timeLeft}
                                            </strong>

                                            <span>left</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className={styles.joinButton}
                                >
                                    <span>Join Now</span>

                                    <FiArrowRight
                                        size={19}
                                        strokeWidth={2}
                                    />
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedGiveaways;