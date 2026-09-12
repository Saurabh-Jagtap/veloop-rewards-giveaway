import {
    FiFacebook,
    FiInstagram,
    FiMail,
    FiSend,
    FiTwitter,
    FiYoutube,
} from "react-icons/fi";
import styles from "./GiveawayFooter.module.css";

const quickLinks = [
    "Giveaways",
    "Winners",
    "How It Works",
    "Rules",
    "FAQ",
];

const legalLinks = [
    "Terms of Service",
    "Privacy Policy",
    "Refund Policy",
    "Responsible Play",
    "Cookie Policy",
];

const supportLinks = [
    "Help Center",
    "Contact Us",
    "Report an Issue",
    "Live Chat",
];

const GiveawayFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerGrid}>
                    {/* Brand */}
                    <div className={styles.brandColumn}>
                        <div className={styles.logo}>
                            <div className={styles.logoMark}>VR</div>

                            <div className={styles.logoText}>
                                <span>VELOOP</span>
                                <small>REWARDS</small>
                            </div>
                        </div>

                        <p className={styles.brandDescription}>
                            Premium rewards.
                            <br />
                            Real opportunities.
                            <br />
                            Endless excitement.
                        </p>

                        <div className={styles.socialLinks}>
                            <a
                                href="#"
                                aria-label="Facebook"
                                className={styles.socialLink}
                            >
                                <FiFacebook />
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                                className={styles.socialLink}
                            >
                                <FiTwitter />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className={styles.socialLink}
                            >
                                <FiInstagram />
                            </a>

                            <a
                                href="#"
                                aria-label="YouTube"
                                className={styles.socialLink}
                            >
                                <FiYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linkColumn}>
                        <h3>Quick Links</h3>

                        <nav aria-label="Quick links">
                            {quickLinks.map((link) => (
                                <a href="#" key={link}>
                                    {link}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Legal */}
                    <div className={styles.linkColumn}>
                        <h3>Legal</h3>

                        <nav aria-label="Legal links">
                            {legalLinks.map((link) => (
                                <a href="#" key={link}>
                                    {link}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Support */}
                    <div className={styles.linkColumn}>
                        <h3>Support</h3>

                        <nav aria-label="Support links">
                            {supportLinks.map((link) => (
                                <a href="#" key={link}>
                                    {link}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Newsletter */}
                    <div className={styles.newsletterColumn}>
                        <h3>Newsletter</h3>

                        <p>
                            Stay updated with our
                            <br />
                            giveaways and winners.
                        </p>

                        <form className={styles.newsletterForm}>
                            <label
                                htmlFor="newsletter-email"
                                className={styles.srOnly}
                            >
                                Email address
                            </label>

                            <div className={styles.inputWrapper}>
                                <FiMail aria-hidden="true" />

                                <input
                                    id="newsletter-email"
                                    type="email"
                                    placeholder="Enter your email"
                                />

                                <button
                                    type="submit"
                                    aria-label="Subscribe to newsletter"
                                >
                                    <FiSend aria-hidden="true" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <span>
                        © 2026 VELOOP Rewards. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default GiveawayFooter;