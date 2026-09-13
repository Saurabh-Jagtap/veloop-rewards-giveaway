import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import GiveawayFooter from "../../components/giveaway/GiveawayFooter/GiveawayFooter";
import styles from "./GiveawayDetails.module.css";
import { getGiveawayById } from "../../services/giveaway.services";
import GiveawayDetailsHero from "../../components/giveaway/GiveawayDetailsHero/GiveawayDetailsHero";
import GiveawayStats from "../../components/giveaway/GiveawayStats/GiveawayStats";
import AboutPrize from "../../components/giveaway/AboutPrize/AboutPrize";
import HowThisGiveawayWorks from "../../components/giveaway/HowThisGiveawayWorks/HowThisGiveawayWorks";
import ImportantInformation from "../../components/giveaway/ImportantInformation/ImportantInformation";
import { GiveawayRules } from "../../components/giveaway/GiveawayRules/GiveawayRules";
import { GiveawayDetailsFAQ } from "../../components/giveaway/GiveawayDetailsFAQ/GiveawayDetailsFAQ";

const GiveawayDetails = () => {
    const { id } = useParams<{ id: string }>();

    const giveaway = id ? getGiveawayById(id) : undefined;

    if (!giveaway) {
        return (
            <div className={styles.page}>
                <Navbar />

                <main className={styles.errorState}>
                    <div className={styles.errorContent}>
                        <span>Giveaway Not Found</span>

                        <h1>We couldn&apos;t find this giveaway.</h1>

                        <p>
                            The giveaway you&apos;re looking for may no longer be available.
                        </p>

                        <a href="/giveaway" className={styles.backButton}>
                            Back to Giveaways
                        </a>
                    </div>
                </main>

                <GiveawayFooter />
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <Navbar />

            <main className={styles.main}>
                {/* Giveaway Details Hero */}
                <GiveawayDetailsHero giveaway={giveaway} />

                <GiveawayStats giveaway={giveaway} />

                <AboutPrize giveaway={giveaway} />

                <HowThisGiveawayWorks giveaway={giveaway} />

                <ImportantInformation giveaway={giveaway} />

                <GiveawayRules giveaway={giveaway} />

                <GiveawayDetailsFAQ giveaway={giveaway} />
                
            </main>

            <GiveawayFooter />
        </div>
    );
};

export default GiveawayDetails;