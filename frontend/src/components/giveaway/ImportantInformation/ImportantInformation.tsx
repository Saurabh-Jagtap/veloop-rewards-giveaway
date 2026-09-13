import { useState } from "react";
import {
    FiAlertTriangle,
    FiAward,
    FiChevronDown,
    FiClock,
    FiCreditCard,
    FiGift,
    FiShield,
    FiUserCheck,
} from "react-icons/fi";

import type { Giveaway } from "../../../data/types";
import styles from "./ImportantInformation.module.css";

interface ImportantInformationProps {
    giveaway: Giveaway;
}

const ImportantInformation = ({
    giveaway,
}: ImportantInformationProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { entryFee, prize, eligibility, claim } = giveaway;

    const currencyLabel = {
        VE: "VEs",
        SVE: "SVEs",
        TOKEN: "Tokens",
    }[entryFee.currency];

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    const information = [
        {
            icon: FiCreditCard,
            label: "Entry Currency",
            value: currencyLabel,
            variant: "purple",
        },
        {
            icon: FiCreditCard,
            label: "Entry Amount",
            value: `${entryFee.amount.toLocaleString()} ${currencyLabel}`,
            variant: "blue",
        },
        {
            icon: FiClock,
            label: "Giveaway Duration",
            value: `${formatDate(giveaway.startsAt)} – ${formatDate(
                giveaway.endsAt
            )}`,
            variant: "indigo",
        },
        {
            icon: FiAward,
            label: "Number of Winners",
            value: `${giveaway.winnerCount} ${giveaway.winnerCount === 1 ? "Winner" : "Winners"
                }`,
            variant: "gold",
        },
        {
            icon: FiGift,
            label: "Prize Details",
            value: prize.name,
            variant: "pink",
        },
        {
            icon: FiUserCheck,
            label: "Account Eligibility",
            value: eligibility.accountRequired
                ? "VELOOP account required"
                : "Account not required",
            variant: "green",
        },
        {
            icon: FiShield,
            label: "Claim Requirements",
            value: `${claim.claimDeadlineDays} days after announcement`,
            variant: "cyan",
        },
        {
            icon: FiAward,
            label: "Winner Selection",
            value: "Selected after the giveaway ends",
            variant: "orange",
        },
        {
            icon: FiShield,
            label: "Fraud Prevention",
            value: "Suspicious or abusive activity may be reviewed",
            variant: "red",
        },
        {
            icon: FiAlertTriangle,
            label: "Platform Rules",
            value: "Participation is subject to giveaway rules",
            variant: "slate",
        },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <button
                        type="button"
                        className={styles.header}
                        onClick={() => setIsOpen((previous) => !previous)}
                        aria-expanded={isOpen}
                        aria-controls="important-information-content"
                    >
                        <div className={styles.headerContent}>
                            <div className={styles.headerIcon}>
                                <FiShield aria-hidden="true" />
                            </div>

                            <div>
                                <h2>Important Information</h2>
                                <p>
                                    Please review the giveaway rules and participation
                                    requirements carefully before joining.
                                </p>
                            </div>
                        </div>

                        <span
                            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""
                                }`}
                            aria-hidden="true"
                        >
                            <FiChevronDown />
                        </span>
                    </button>

                    <div
                        id="important-information-content"
                        className={`${styles.content} ${isOpen ? styles.contentOpen : ""
                            }`}
                        hidden={!isOpen}
                    >
                        <div className={styles.grid}>
                            {information.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div className={styles.item} key={item.label}>
                                        <div
                                            className={`${styles.itemIcon} ${styles[item.variant]
                                                }`}
                                        >
                                            <Icon aria-hidden="true" />
                                        </div>

                                        <div className={styles.itemContent}>
                                            <span>{item.label}</span>
                                            <strong>{item.value}</strong>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.note}>
                            <FiAlertTriangle aria-hidden="true" />

                            <p>
                                Giveaway participation is subject to eligibility,
                                platform rules and applicable giveaway terms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImportantInformation;