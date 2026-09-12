import Container from "../../components/common/Container/Container";
import Button from "../../components/common/Button/Button";
import Badge from "../../components/common/Badge/Badge";

import styles from "./GiveawayHome.module.css";
import Navbar from "../../components/common/Navbar/Navbar";

function GiveawayHome() {
    return (
        <>
            <Navbar />

            <main>
                <section className={styles.hero}>
                    <Container>
                        <div className={styles.heroContent}>
                            <div className={styles.heroCopy}>
                                <Badge variant="primary">
                                    EXCLUSIVE GIVEAWAY
                                </Badge>

                                <h1 className={styles.heroTitle}>
                                    Rewards worth
                                    <span> winning.</span>
                                </h1>

                                <p className={styles.heroDescription}>
                                    Complete eligible activities, collect
                                    entries and get a chance to win exciting
                                    rewards.
                                </p>

                                <div className={styles.heroActions}>
                                    <Button size="lg">
                                        Explore Giveaways
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="lg"
                                    >
                                        How it works
                                    </Button>
                                </div>
                            </div>

                            <div className={styles.heroVisual}>
                                <div className={styles.rewardOrb}>
                                    <span>REWARDS</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                <section className={styles.placeholderSection}>
                    <Container>
                        <h2>Featured Rewards</h2>
                    </Container>
                </section>
            </main>
        </>
    );
}

export default GiveawayHome;