import { useState } from "react";
import {
  FiAlertCircle,
  FiChevronDown,
  FiClock,
  FiGift,
  FiInfo,
  FiShield,
  FiUserCheck,
} from "react-icons/fi";

import type { Giveaway } from "../../../data/types";
import styles from "./GiveawayRules.module.css";

interface GiveawayRulesProps {
  giveaway: Giveaway;
}

interface RuleSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
  variant: "purple" | "blue" | "green" | "orange" | "red";
}

const formatCurrency = (currency: Giveaway["entryFee"]["currency"]) => {
  const labels = {
    VE: "VEs",
    SVE: "SVEs",
    TOKEN: "Tokens",
  };

  return labels[currency];
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const getRuleSections = (giveaway: Giveaway): RuleSection[] => [
  {
    id: "eligibility",
    title: "Eligibility",
    description: "Who can participate in this giveaway.",
    icon: <FiUserCheck />,
    variant: "purple",
    items: [
      giveaway.eligibility.accountRequired
        ? "A registered VELOOP account is required to participate."
        : "An account is not required to participate.",
      ...(giveaway.eligibility.minimumAge
        ? [`Participants must be ${giveaway.eligibility.minimumAge} years or older.`]
        : []),
      ...(giveaway.eligibility.additionalRequirements ?? []),
    ],
  },
  {
    id: "entry",
    title: "Entry & Participation",
    description: "The requirements for joining this giveaway.",
    icon: <FiGift />,
    variant: "blue",
    items: [
      `This giveaway requires ${giveaway.entryFee.amount.toLocaleString(
        "en-IN"
      )} ${formatCurrency(giveaway.entryFee.currency)} to enter.`,
      "You must meet the eligibility requirements before participating.",
      "Your participation is recorded once the entry process is successfully completed.",
      "Additional entries or re-entry are subject to the applicable giveaway rules.",
    ],
  },
  {
    id: "duration",
    title: "Giveaway Duration",
    description: "When this giveaway starts and ends.",
    icon: <FiClock />,
    variant: "green",
    items: [
      `The giveaway starts on ${formatDate(giveaway.startsAt)}.`,
      `The giveaway ends on ${formatDate(giveaway.endsAt)}.`,
      "Entries must be completed before the giveaway ends.",
      "Once the giveaway has ended, new participation is no longer accepted.",
    ],
  },
  {
    id: "winner",
    title: "Winner Selection",
    description: "How winners are determined and announced.",
    icon: <FiShield />,
    variant: "purple",
    items: [
      `A total of ${giveaway.winnerCount} winner${
        giveaway.winnerCount === 1 ? "" : "s"
      } will be selected.`,
      "Winner selection takes place after the giveaway ends.",
      "Winners will be announced through the applicable VELOOP giveaway experience.",
      "Winner status is determined by the platform and is subject to the applicable giveaway rules.",
    ],
  },
  {
    id: "claim",
    title: "Prize Claim",
    description: "What happens when you win.",
    icon: <FiInfo />,
    variant: "blue",
    items: [
      `Winners must claim their prize within ${giveaway.claim.claimDeadlineDays} days of the winner announcement.`,
      ...giveaway.claim.requirements,
      "Failure to complete the claim process within the applicable deadline may result in loss of the prize.",
    ],
  },
  {
    id: "disqualification",
    title: "Disqualification",
    description: "Actions that may invalidate participation.",
    icon: <FiAlertCircle />,
    variant: "red",
    items: [
      "Participation may be disqualified if eligibility requirements are not met.",
      "Fraudulent, abusive, manipulated, or otherwise prohibited activity may result in disqualification.",
      "VELOOP may invalidate participation that violates applicable platform rules.",
      "Disqualified participation is not eligible for winner selection.",
    ],
  },
];

export function GiveawayRules({ giveaway }: GiveawayRulesProps) {
  const [openSection, setOpenSection] = useState<string | null>("eligibility");

  const ruleSections = getRuleSections(giveaway);

  const toggleSection = (id: string) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>RULES & TRANSPARENCY</span>

          <h2 className={styles.title}>Giveaway Rules & Terms</h2>

          <p className={styles.description}>
            Please review the rules carefully before participating. By joining
            this giveaway, you agree to follow the applicable participation and
            platform requirements.
          </p>
        </div>

        <div className={styles.rulesCard}>
          <div className={styles.rulesHeader}>
            <div>
              <h3>Participation Rules</h3>
              <p>
                Everything you need to know before entering this giveaway.
              </p>
            </div>

            <span className={styles.rulesBadge}>
              {ruleSections.length} sections
            </span>
          </div>

          <div className={styles.rulesList}>
            {ruleSections.map((section) => {
              const isOpen = openSection === section.id;

              return (
                <div
                  key={section.id}
                  className={`${styles.ruleItem} ${
                    isOpen ? styles.open : ""
                  }`}
                >
                  <button
                    type="button"
                    className={styles.ruleTrigger}
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${section.id}-content`}
                  >
                    <div
                      className={`${styles.icon} ${
                        styles[`icon${capitalize(section.variant)}`]
                      }`}
                    >
                      {section.icon}
                    </div>

                    <div className={styles.ruleHeading}>
                      <span>{section.title}</span>
                      <small>{section.description}</small>
                    </div>

                    <FiChevronDown
                      className={`${styles.chevron} ${
                        isOpen ? styles.chevronOpen : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`${section.id}-content`}
                    className={styles.ruleContent}
                    hidden={!isOpen}
                  >
                    <ul>
                      {section.items.map((item, index) => (
                        <li key={`${section.id}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.policyNote}>
            <FiInfo aria-hidden="true" />

            <p>
              <strong>Entry & refund policy:</strong> Final policy wording
              should be provided by the business/product team. This interface
              intentionally does not assume or invent a refund policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function capitalize(value: RuleSection["variant"]) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}