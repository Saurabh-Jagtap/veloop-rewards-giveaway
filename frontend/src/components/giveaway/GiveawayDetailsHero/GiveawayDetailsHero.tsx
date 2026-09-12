import {
    FiArrowLeft,
    FiArrowRight,
    FiGift,
    FiStar,
} from "react-icons/fi";

import Button from "../../common/Button/Button";
import styles from "./GiveawayDetailsHero.module.css";

import type { Giveaway } from "../../../data/types";

interface GiveawayDetailsHeroProps {
    giveaway: Giveaway;
}

const GiveawayDetailsHero = ({
    giveaway,
}: GiveawayDetailsHeroProps) => {
    const { prize, entryFee } = giveaway;

    const currencyLabel = {
        VE: "VEs",
        SVE: "SVEs",
        TOKEN: "Tokens",
    }[entryFee.currency];

    const statusLabel = {
        upcoming: "GIVEAWAY UPCOMING",
        active: "GIVEAWAY LIVE",
        ended: "GIVEAWAY ENDED",
    }[giveaway.status];

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                {/* Back Navigation */}
                <a href="/giveaway" className={styles.backLink}>
                    <FiArrowLeft aria-hidden="true" />
                    <span>Giveaway Home</span>
                </a>

                <div className={styles.heroGrid}>
                    {/* --------------------------------
              Prize Visual
          -------------------------------- */}
                    <div className={styles.visualColumn}>
                        <div className={styles.decorativeGlow} />

                        <div className={styles.prizeVisual}>
                            <img
                                src={prize.image}
                                alt={prize.name}
                                className={styles.prizeImage}
                            />
                        </div>

                        <div className={styles.thumbnails}>
                            <button
                                type="button"
                                className={`${styles.thumbnail} ${styles.activeThumbnail}`}
                                aria-label={`View ${prize.name}`}
                            >
                                <img
                                    src={prize.image}
                                    alt=""
                                />
                            </button>

                            <button
                                type="button"
                                className={styles.thumbnail}
                                aria-label="Prize view 2"
                            >
                                <img
                                    src={prize.image}
                                    alt=""
                                />
                            </button>

                            <button
                                type="button"
                                className={styles.thumbnail}
                                aria-label="Prize view 3"
                            >
                                <img
                                    src={prize.image}
                                    alt=""
                                />
                            </button>

                            <button
                                type="button"
                                className={styles.thumbnail}
                                aria-label="Prize view 4"
                            >
                                <img
                                    src={prize.image}
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>

                    {/* --------------------------------
              Giveaway Information
          -------------------------------- */}
                    <div className={styles.content}>
                        <div className={styles.badge}>
                            <FiStar aria-hidden="true" />
                            <span>EXCLUSIVE GIVEAWAY</span>
                        </div>

                        <h1>{giveaway.title}</h1>

                        <p className={styles.description}>
                            {giveaway.shortDescription}
                        </p>

                        {/* Status + Countdown */}
                        <div className={styles.countdownCard}>
                            <div className={styles.status}>
                                <span
                                    className={`${styles.statusDot} ${styles[giveaway.status]
                                        }`}
                                />

                                <span>{statusLabel}</span>
                            </div>

                            <span className={styles.endsLabel}>
                                {giveaway.status === "upcoming"
                                    ? "Starts in"
                                    : giveaway.status === "ended"
                                        ? "Ended"
                                        : "Ends in"}
                            </span>

                            <div className={styles.countdown}>
                                <div className={styles.timeBlock}>
                                    <strong>12</strong>
                                    <span>Days</span>
                                </div>

                                <div className={styles.separator}>:</div>

                                <div className={styles.timeBlock}>
                                    <strong>08</strong>
                                    <span>Hours</span>
                                </div>

                                <div className={styles.separator}>:</div>

                                <div className={styles.timeBlock}>
                                    <strong>45</strong>
                                    <span>Minutes</span>
                                </div>

                                <div className={styles.separator}>:</div>

                                <div className={styles.timeBlock}>
                                    <strong>30</strong>
                                    <span>Seconds</span>
                                </div>
                            </div>
                        </div>

                        {/* Entry Information */}
                        <div className={styles.entryCard}>
                            <div className={styles.entryInfo}>
                                <div className={styles.entryIcon}>
                                    <FiGift aria-hidden="true" />
                                </div>

                                <div>
                                    <span className={styles.entryLabel}>
                                        Entry Fee
                                    </span>

                                    <strong>
                                        {entryFee.amount} {currencyLabel}
                                    </strong>
                                </div>
                            </div>

                            <div className={styles.balanceDivider} />

                            <div className={styles.balanceInfo}>
                                <div className={styles.balanceIcon}>
                                    <span>◎</span>
                                </div>

                                <div>
                                    <span className={styles.entryLabel}>
                                        Your Balance
                                    </span>

                                    <strong>850 VEs</strong>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="md"
                                className={styles.joinButton}
                            >
                                Join Giveaway — {entryFee.amount} {currencyLabel}
                                <FiArrowRight aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GiveawayDetailsHero;