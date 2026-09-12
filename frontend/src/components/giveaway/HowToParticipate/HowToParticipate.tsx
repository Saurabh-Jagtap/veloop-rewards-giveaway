import {
    FiGift,
    FiTarget,
    FiAward,
    FiUser,
} from "react-icons/fi";

import styles from "./HowToParticipate.module.css";

interface Step {
    number: number;
    title: string;
    description: string;
    icon: typeof FiUser;
    theme: "purple" | "blue" | "green" | "orange";
}

const steps: Step[] = [
    {
        number: 1,
        title: "Sign Up / Login",
        description: "Create your account or login to get started.",
        icon: FiUser,
        theme: "purple",
    },
    {
        number: 2,
        title: "Complete Tasks",
        description: "Complete simple tasks and earn more entries.",
        icon: FiTarget,
        theme: "blue",
    },
    {
        number: 3,
        title: "Get Entries",
        description: "Each task gives you entries for the giveaway.",
        icon: FiGift,
        theme: "green",
    },
    {
        number: 4,
        title: "Win Rewards",
        description: "Winners are selected randomly after it ends.",
        icon: FiAward,
        theme: "orange",
    },
];

function HowToParticipate() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <header className={styles.header}>
                        <h2>How to Participate?</h2>

                        <p>
                            Follow these simple steps to join and win
                            exciting rewards.
                        </p>
                    </header>

                    <div className={styles.steps}>
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    className={styles.stepWrapper}
                                >
                                    <article
                                        className={`${styles.step} ${styles[step.theme]}`}
                                    >
                                        <div className={styles.iconWrapper}>
                                            <Icon
                                                size={48}
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <span className={styles.stepNumber}>
                                            {step.number}
                                        </span>

                                        <h3>{step.title}</h3>

                                        <p>{step.description}</p>
                                    </article>

                                    {index < steps.length - 1 && (
                                        <div
                                            className={`${styles.connector} ${styles[`connector${index + 1}`]
                                                }`}
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowToParticipate;