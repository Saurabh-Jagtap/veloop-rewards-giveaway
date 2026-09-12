import {
    FiArrowRight,
    FiFileText,
    FiShield,
    FiUsers,
} from "react-icons/fi";

import Button from "../../components/common/Button/Button";
import Navbar from "../../components/common/Navbar/Navbar";

import heroGiveaway from "../../assets/giveaway/hero-giveaway.png";
import styles from "./GiveawayHome.module.css";
import iphone15Pro from "../../assets/giveaway/iphone-15-pro.png";
import appleWatch from "../../assets/giveaway/apple-watch.png";
import airpodsPro2 from "../../assets/giveaway/airpods-pro-2.png";
import amazon2000 from "../../assets/giveaway/amazon-2000.png";

function GiveawayHome() {
    return (
        <>
            <Navbar />

            <main className={styles.page}>
                <section className={styles.hero}>
                    <div className={styles.heroContainer}>
                        <div className={styles.heroContent}>
                            <div className={styles.heroCopy}>
                                <div className={styles.heroBadge}>
                                    <span className={styles.heroBadgeStar}>
                                        ★
                                    </span>

                                    <span>EXCLUSIVE GIVEAWAYS</span>
                                </div>

                                <h1 className={styles.heroTitle}>
                                    Win Rewards
                                    <br />
                                    Worth Getting
                                    <br />
                                    <span>Excited</span> About!
                                </h1>

                                <p className={styles.heroDescription}>
                                    Join exciting giveaways, complete simple
                                    tasks,
                                    <br className={styles.desktopBreak} />
                                    and win premium rewards from VELOOP
                                    Rewards.
                                </p>

                                <div className={styles.heroActions}>
                                    <Button
                                        size="lg"
                                        className={styles.exploreButton}
                                    >
                                        <span>Explore Giveaways</span>
                                        <FiArrowRight
                                            size={19}
                                            strokeWidth={2}
                                        />
                                    </Button>

                                    <button
                                        type="button"
                                        className={styles.learnButton}
                                    >
                                        <span>Learn how it works</span>

                                        <FiArrowRight
                                            size={18}
                                            strokeWidth={2}
                                        />
                                    </button>
                                </div>

                                <div className={styles.trustRow}>
                                    <div className={styles.trustItem}>
                                        <div
                                            className={`${styles.trustIcon} ${styles.secureIcon}`}
                                        >
                                            <FiShield
                                                size={20}
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <div className={styles.trustCopy}>
                                            <strong>100% Secure</strong>
                                            <span>Your data is protected</span>
                                        </div>
                                    </div>

                                    <div className={styles.trustDivider} />

                                    <div className={styles.trustItem}>
                                        <div
                                            className={`${styles.trustIcon} ${styles.fairIcon}`}
                                        >
                                            <FiFileText
                                                size={20}
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <div className={styles.trustCopy}>
                                            <strong>
                                                Fair &amp; Transparent
                                            </strong>
                                            <span>
                                                Winners selected fairly
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.trustDivider} />

                                    <div className={styles.trustItem}>
                                        <div
                                            className={`${styles.trustIcon} ${styles.trustedIcon}`}
                                        >
                                            <FiUsers
                                                size={20}
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <div className={styles.trustCopy}>
                                            <strong>
                                                Trusted by 10K+ Users
                                            </strong>
                                            <span>
                                                Join our growing community
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.heroVisual}>
                                <div className={styles.heroGlow} />

                                <img
                                    src={heroGiveaway}
                                    alt="Giveaway ticket held by a hand"
                                    className={styles.heroImage}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.featuredSection}>
                    <div className={styles.featuredContainer}>
                        <div className={styles.featuredCard}>
                            <div className={styles.featuredHeader}>
                                <div className={styles.featuredTitleBlock}>
                                    <div className={styles.featuredTitle}>
                                        <span className={styles.featuredStar}>★</span>
                                        <h2>Featured Giveaways</h2>
                                    </div>

                                    <p>
                                        Handpicked giveaways with amazing rewards just for you.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={styles.viewAllButton}
                                >
                                    <span>View All Giveaways</span>
                                    <FiArrowRight size={20} strokeWidth={2} />
                                </button>
                            </div>

                            <div className={styles.featuredGrid}>
                                {/* Card 1 */}
                                <article className={`${styles.giveawayCard} ${styles.purpleCard}`}>
                                    <div className={styles.prizeBadge}>
                                        1st Prize
                                    </div>

                                    <div className={styles.prizeImage}>
                                        <img
                                            src={iphone15Pro}
                                            alt="iPhone 15 Pro"
                                        />
                                    </div>

                                    <div className={styles.giveawayInfo}>
                                        <h3>iPhone 15 Pro</h3>

                                        <p>Latest iPhone 15 Pro 128GB</p>
                                    </div>

                                    <div className={styles.giveawayMeta}>
                                        <div className={styles.metaItem}>
                                            <FiUsers size={18} />
                                            <div>
                                                <strong>2.3K+</strong>
                                                <span>Participants</span>
                                            </div>
                                        </div>

                                        <div className={styles.metaDivider} />

                                        <div className={styles.metaItem}>
                                            <span className={styles.clockIcon}>◷</span>
                                            <div>
                                                <strong>12d : 08h : 45m</strong>
                                                <span>left</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.joinButton}
                                    >
                                        <span>Join Now</span>
                                        <FiArrowRight size={19} strokeWidth={2} />
                                    </button>
                                </article>

                                {/* Card 2 */}
                                <article className={`${styles.giveawayCard} ${styles.blueCard}`}>
                                    <div className={styles.prizeBadge}>
                                        2nd Prize
                                    </div>

                                    <div className={styles.prizeImage}>
                                        <img
                                            src={appleWatch}
                                            alt="Apple Watch Series 9"
                                        />
                                    </div>

                                    <div className={styles.giveawayInfo}>
                                        <h3>Apple Watch Series 9</h3>

                                        <p>Latest Apple Watch Series 9</p>
                                    </div>

                                    <div className={styles.giveawayMeta}>
                                        <div className={styles.metaItem}>
                                            <FiUsers size={18} />
                                            <div>
                                                <strong>1.8K+</strong>
                                                <span>Participants</span>
                                            </div>
                                        </div>

                                        <div className={styles.metaDivider} />

                                        <div className={styles.metaItem}>
                                            <span className={styles.clockIcon}>◷</span>
                                            <div>
                                                <strong>9d : 06h : 30m</strong>
                                                <span>left</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.joinButton}
                                    >
                                        <span>Join Now</span>
                                        <FiArrowRight size={19} strokeWidth={2} />
                                    </button>
                                </article>

                                {/* Card 3 */}
                                <article className={`${styles.giveawayCard} ${styles.greenCard}`}>
                                    <div className={styles.prizeBadge}>
                                        3rd Prize
                                    </div>

                                    <div className={styles.prizeImage}>
                                        <img
                                            src={airpodsPro2}
                                            alt="AirPods Pro 2"
                                        />
                                    </div>

                                    <div className={styles.giveawayInfo}>
                                        <h3>AirPods Pro 2</h3>

                                        <p>Active Noise Cancellation</p>
                                    </div>

                                    <div className={styles.giveawayMeta}>
                                        <div className={styles.metaItem}>
                                            <FiUsers size={18} />
                                            <div>
                                                <strong>3.1K+</strong>
                                                <span>Participants</span>
                                            </div>
                                        </div>

                                        <div className={styles.metaDivider} />

                                        <div className={styles.metaItem}>
                                            <span className={styles.clockIcon}>◷</span>
                                            <div>
                                                <strong>7d : 06h : 20m</strong>
                                                <span>left</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.joinButton}
                                    >
                                        <span>Join Now</span>
                                        <FiArrowRight size={19} strokeWidth={2} />
                                    </button>
                                </article>

                                {/* Card 4 */}
                                <article className={`${styles.giveawayCard} ${styles.orangeCard}`}>
                                    <div className={styles.prizeBadge}>
                                        Lucky Draw
                                    </div>

                                    <div className={styles.prizeImage}>
                                        <img
                                            src={amazon2000}
                                            alt="₹2,000 Amazon Gift Card"
                                        />
                                    </div>

                                    <div className={styles.giveawayInfo}>
                                        <h3>Amazon Gift Card</h3>

                                        <p>₹2,000 Amazon Gift Card</p>
                                    </div>

                                    <div className={styles.giveawayMeta}>
                                        <div className={styles.metaItem}>
                                            <FiUsers size={18} />
                                            <div>
                                                <strong>1.3K+</strong>
                                                <span>Participants</span>
                                            </div>
                                        </div>

                                        <div className={styles.metaDivider} />

                                        <div className={styles.metaItem}>
                                            <span className={styles.clockIcon}>◷</span>
                                            <div>
                                                <strong>5d : 02h : 15m</strong>
                                                <span>left</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.joinButton}
                                    >
                                        <span>Join Now</span>
                                        <FiArrowRight size={19} strokeWidth={2} />
                                    </button>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default GiveawayHome;