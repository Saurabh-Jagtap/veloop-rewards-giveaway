import { FiArrowRight, FiAward, FiShield, FiZap } from "react-icons/fi";
import Button from "../../common/Button/Button";
import styles from "./YourNextReward.module.css";
import rewardGift from "../../../assets/giveaway/reward-gift.png";

const YourNextReward = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.content}>
                        <h2>Your Next Reward is Waiting!</h2>

                        <p>
                            Don&apos;t miss out on amazing giveaways and exciting rewards.
                        </p>

                        <Button
                            variant="primary"
                            size="md"
                            className={styles.exploreButton}
                        >
                            Explore Giveaways Now
                            <FiArrowRight aria-hidden="true" />
                        </Button>
                    </div>


                    <div className={styles.benefits}>
                        <div className={styles.benefit}>
                            <div className={`${styles.benefitIcon} ${styles.purple}`}>
                                <FiAward aria-hidden="true" />
                            </div>

                            <div>
                                <span>Premium Rewards</span>
                                <small>Worth winning</small>
                            </div>
                        </div>

                        <div className={styles.benefit}>
                            <div className={`${styles.benefitIcon} ${styles.blue}`}>
                                <FiZap aria-hidden="true" />
                            </div>

                            <div>
                                <span>Simple Participation</span>
                                <small>Easy to get started</small>
                            </div>
                        </div>

                        <div className={styles.benefit}>
                            <div className={`${styles.benefitIcon} ${styles.green}`}>
                                <FiShield aria-hidden="true" />
                            </div>

                            <div>
                                <span>Fair &amp; Secure</span>
                                <small>Built on trust</small>
                            </div>
                        </div>
                    </div>


                    <div className={styles.visual} aria-hidden="true">
                        <img src={rewardGift} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default YourNextReward;