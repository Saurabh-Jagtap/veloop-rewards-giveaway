import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import styles from "./FrequentlyAskedQuestions.module.css";

interface FAQ {
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        question: "How do I participate in a giveaway?",
        answer:
            "Choose a giveaway, review its requirements, and join using the required entry currency. You must be logged in to participate.",
    },
    {
        question: "What are VEs, SVEs, and Tokens?",
        answer:
            "These are the reward currencies used across VELOOP. Each giveaway specifies which currency and how much is required to participate.",
    },
    {
        question: "How are winners selected?",
        answer:
            "Winners are selected after the giveaway ends according to the giveaway's stated winner-selection rules.",
    },
    {
        question: "How will I know if I win?",
        answer:
            "Your giveaway status will show whether you are a winner. Winner announcements may also be displayed through the platform.",
    },
    {
        question: "What happens if I win a prize?",
        answer:
            "If you win, you will be able to access the claim process and provide the information required for your particular prize.",
    },
    {
        question: "Can I join a giveaway more than once?",
        answer:
            "Participation rules can vary by giveaway. Check the individual giveaway details before joining.",
    },
];

function FrequentlyAskedQuestions() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex((currentIndex) =>
            currentIndex === index ? null : index,
        );
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <header className={styles.header}>
                        <div className={styles.titleBlock}>
                            <span className={styles.eyebrow}>
                                NEED HELP?
                            </span>

                            <h2>Frequently Asked Questions</h2>

                            <p>
                                Everything you need to know about VELOOP
                                giveaways.
                            </p>
                        </div>
                    </header>

                    <div className={styles.faqList}>
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={faq.question}
                                    className={`${styles.faqItem} ${
                                        isOpen ? styles.open : ""
                                    }`}
                                >
                                    <button
                                        type="button"
                                        className={styles.question}
                                        onClick={() =>
                                            handleToggle(index)
                                        }
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-answer-${index}`}
                                    >
                                        <span>{faq.question}</span>

                                        <span
                                            className={styles.chevron}
                                            aria-hidden="true"
                                        >
                                            <FiChevronDown
                                                size={19}
                                                strokeWidth={2}
                                            />
                                        </span>
                                    </button>

                                    <div
                                        id={`faq-answer-${index}`}
                                        className={styles.answerWrapper}
                                        hidden={!isOpen}
                                    >
                                        <p className={styles.answer}>
                                            {faq.answer}
                                        </p>
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

export default FrequentlyAskedQuestions;