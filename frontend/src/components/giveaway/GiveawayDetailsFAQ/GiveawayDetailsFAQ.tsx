import { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

import type { Giveaway } from "../../../data/types";
import styles from "./GiveawayDetailsFAQ.module.css";

interface GiveawayDetailsFAQProps {
    giveaway: Giveaway;
}

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const getFAQs = (giveaway: Giveaway): FAQItem[] => [
    {
        id: "multiple-entries",
        question: "Can I join this giveaway more than once?",
        answer:
            "Your participation is subject to the entry rules of this giveaway. Additional entries or re-entry are only available when explicitly allowed by the applicable giveaway rules.",
    },
    {
        id: "after-joining",
        question: "What happens after I join?",
        answer:
            "Once your entry is successfully completed, your participation is recorded. You can then wait for the giveaway to end while the winner selection process takes place.",
    },
    {
        id: "winner-notification",
        question: "How will I know if I win?",
        answer:
            "After the giveaway ends, winners are selected and announced through the applicable VELOOP giveaway experience. Your account status will indicate whether you have won.",
    },
    {
        id: "not-winning",
        question: "What happens if I don't win?",
        answer:
            "If you are not selected as a winner, your participation simply ends when the giveaway concludes. You can continue exploring other eligible giveaways available on VELOOP.",
    },
];

export function GiveawayDetailsFAQ({
    giveaway,
}: GiveawayDetailsFAQProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    const faqs = getFAQs(giveaway);

    const toggleFAQ = (id: string) => {
        setOpenId((current) => (current === id ? null : id));
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>NEED TO KNOW?</span>

                    <h2 className={styles.title}>Frequently Asked Questions</h2>

                    <p className={styles.description}>
                        Quick answers to common questions about participating in this
                        giveaway.
                    </p>
                </div>

                <div className={styles.faqCard}>
                    <div className={styles.faqHeader}>
                        <div className={styles.headerIcon}>
                            <FiHelpCircle aria-hidden="true" />
                        </div>

                        <div>
                            <h3>Got questions?</h3>
                            <p>
                                Here are some quick answers before you participate.
                            </p>
                        </div>
                    </div>

                    <div className={styles.faqList}>
                        {faqs.map((faq) => {
                            const isOpen = openId === faq.id;

                            return (
                                <div
                                    key={faq.id}
                                    className={`${styles.faqItem} ${isOpen ? styles.open : ""
                                        }`}
                                >
                                    <button
                                        type="button"
                                        className={styles.question}
                                        onClick={() => toggleFAQ(faq.id)}
                                        aria-expanded={isOpen}
                                        aria-controls={`${faq.id}-answer`}
                                    >
                                        <span>{faq.question}</span>

                                        <FiChevronDown
                                            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""
                                                }`}
                                            aria-hidden="true"
                                        />
                                    </button>

                                    <div
                                        id={`${faq.id}-answer`}
                                        className={styles.answerWrapper}
                                        hidden={!isOpen}
                                    >
                                        <p className={styles.answer}>{faq.answer}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}