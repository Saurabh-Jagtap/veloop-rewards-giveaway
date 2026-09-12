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
import HowToParticipate from "../../components/giveaway/HowToParticipate/HowToParticipate";
import FeaturedGiveaways from "../../components/giveaway/FeaturedGiveaways/FeaturedGiveaways";
import FrequentlyAskedQuestions from "../../components/giveaway/FrequentlyAskedQuestions/FrequentlyAskedQuestions";
import YourNextReward from "../../components/giveaway/YourNextReward/YourNextReward";
import GiveawayFooter from "../../components/giveaway/GiveawayFooter/GiveawayFooter";

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

                <FeaturedGiveaways />

                <HowToParticipate />

                <FrequentlyAskedQuestions />

                <YourNextReward />

                <GiveawayFooter />
            </main>
        </>
    );
}

export default GiveawayHome;