import type { Giveaway } from "./types";

export const giveaways: Giveaway[] = [
    {
        id: "iphone-15-pro",
        slug: "iphone-15-pro",

        title: "Win iPhone 15 Pro",
        shortDescription:
            "Enter for a chance to win the iPhone 15 Pro.",

        description:
            "A premium smartphone giveaway for VELOOP Rewards members.",

        status: "active",

        startsAt: "2026-09-01T00:00:00Z",
        endsAt: "2026-09-30T23:59:59Z",

        entryFee: {
            amount: 250,
            currency: "VE",
        },

        prize: {
            id: "iphone-15-pro",
            name: "iPhone 15 Pro",
            description:
                "Experience the powerful performance and premium design of the iPhone 15 Pro.",
            image: "/assets/prizes/iphone-15-pro.png",
            type: "physical",
        },

        winnerCount: 1,
        participantCount: 1248,

        eligibility: {
            accountRequired: true,
        },

        rules: [
            "You must have an eligible VELOOP Rewards account.",
            "You must have sufficient VEs to participate.",
            "Participation is recorded after successful confirmation.",
            "The winner is selected after the giveaway ends.",
        ],

        howItWorks: [
            "Review the giveaway and prize details.",
            "Check your eligibility and available VEs.",
            "Pay the required entry amount.",
            "Your participation is recorded.",
            "Wait until the giveaway ends.",
            "The winner is selected.",
            "The winner claims the prize.",
        ],

        claim: {
            claimDeadlineDays: 7,
            requirements: [
                "Full Name",
                "Phone Number",
                "Complete Address",
                "City",
                "State",
                "PIN Code",
            ],
        },
    },

    {
        id: "apple-watch",
        slug: "apple-watch",

        title: "Win Apple Watch",
        shortDescription:
            "Enter for a chance to win an Apple Watch.",

        description:
            "A premium wearable giveaway for VELOOP Rewards members.",

        status: "active",

        startsAt: "2026-09-01T00:00:00Z",
        endsAt: "2026-09-30T23:59:59Z",

        entryFee: {
            amount: 200,
            currency: "VE",
        },

        prize: {
            id: "apple-watch",
            name: "Apple Watch",
            description:
                "Stay connected, active, and informed with an Apple Watch.",
            image: "/assets/prizes/apple-watch.png",
            type: "physical",
        },

        winnerCount: 1,
        participantCount: 936,

        eligibility: {
            accountRequired: true,
        },

        rules: [
            "You must have an eligible VELOOP Rewards account.",
            "You must have sufficient VEs to participate.",
            "Participation is recorded after successful confirmation.",
            "The winner is selected after the giveaway ends.",
        ],

        howItWorks: [
            "Review the giveaway and prize details.",
            "Check your eligibility and available VEs.",
            "Pay the required entry amount.",
            "Your participation is recorded.",
            "Wait until the giveaway ends.",
            "The winner is selected.",
            "The winner claims the prize.",
        ],

        claim: {
            claimDeadlineDays: 7,
            requirements: [
                "Full Name",
                "Phone Number",
                "Complete Address",
                "City",
                "State",
                "PIN Code",
            ],
        },
    },

    {
        id: "airpods",
        slug: "airpods",

        title: "Win AirPods",
        shortDescription:
            "Enter for a chance to win AirPods.",

        description:
            "A premium audio giveaway for VELOOP Rewards members.",

        status: "active",

        startsAt: "2026-09-01T00:00:00Z",
        endsAt: "2026-09-30T23:59:59Z",

        entryFee: {
            amount: 500,
            currency: "SVE",
        },

        prize: {
            id: "airpods",
            name: "AirPods",
            description:
                "Enjoy an immersive wireless audio experience with AirPods.",
            image: "/assets/prizes/airpods.png",
            type: "physical",
        },

        winnerCount: 1,
        participantCount: 742,

        eligibility: {
            accountRequired: true,
        },

        rules: [
            "You must have an eligible VELOOP Rewards account.",
            "You must have sufficient SVEs to participate.",
            "Participation is recorded after successful confirmation.",
            "The winner is selected after the giveaway ends.",
        ],

        howItWorks: [
            "Review the giveaway and prize details.",
            "Check your eligibility and available SVEs.",
            "Pay the required entry amount.",
            "Your participation is recorded.",
            "Wait until the giveaway ends.",
            "The winner is selected.",
            "The winner claims the prize.",
        ],

        claim: {
            claimDeadlineDays: 7,
            requirements: [
                "Full Name",
                "Phone Number",
                "Complete Address",
                "City",
                "State",
                "PIN Code",
            ],
        },
    },

    {
        id: "amazon-2000",
        slug: "amazon-2000",

        title: "Win ₹2,000 Amazon Voucher",
        shortDescription:
            "Enter for a chance to win a ₹2,000 Amazon Voucher.",

        description:
            "Get a chance to win a ₹2,000 Amazon Voucher.",

        status: "active",

        startsAt: "2026-09-01T00:00:00Z",
        endsAt: "2026-09-30T23:59:59Z",

        entryFee: {
            amount: 500,
            currency: "VE",
        },

        prize: {
            id: "amazon-2000",
            name: "₹2,000 Amazon Voucher",
            description: "A ₹2,000 Amazon Voucher for your next purchase.",
            image: "/assets/prizes/amazon-voucher.png",
            type: "gift-card",
            value: 2000,
            valueCurrency: "INR",
        },

        winnerCount: 1,
        participantCount: 1532,

        eligibility: {
            accountRequired: true,
        },

        rules: [
            "You must have an eligible VELOOP Rewards account.",
            "You must have sufficient VEs to participate.",
            "Participation is recorded after successful confirmation.",
            "The winner is selected after the giveaway ends.",
        ],

        howItWorks: [
            "Review the giveaway and prize details.",
            "Check your eligibility and available VEs.",
            "Pay the required entry amount.",
            "Your participation is recorded.",
            "Wait until the giveaway ends.",
            "The winner is selected.",
            "The winner claims the prize.",
        ],

        claim: {
            claimDeadlineDays: 7,
            requirements: ["Email Address"],
        },
    },

    {
        id: "amazon-500",
        slug: "amazon-500",

        title: "Win ₹500 Amazon Voucher",
        shortDescription: "Enter for a chance to win a ₹500 Amazon Voucher.",

        description: "Get a chance to win a ₹500 Amazon Voucher.",

        status: "active",

        startsAt: "2026-09-01T00:00:00Z",
        endsAt: "2026-09-30T23:59:59Z",

        entryFee: {
            amount: 300,
            currency: "VE",
        },

        prize: {
            id: "amazon-500",
            name: "₹500 Amazon Voucher",
            description: "A ₹500 Amazon Voucher for your next purchase.",
            image: "/assets/prizes/amazon-voucher.png",
            type: "gift-card",
            value: 500,
            valueCurrency: "INR",
        },

        winnerCount: 1,
        participantCount: 1894,

        eligibility: {
            accountRequired: true,
        },

        rules: [
            "You must have an eligible VELOOP Rewards account.",
            "You must have sufficient VEs to participate.",
            "Participation is recorded after successful confirmation.",
            "The winner is selected after the giveaway ends.",
        ],

        howItWorks: [
            "Review the giveaway and prize details.",
            "Check your eligibility and available VEs.",
            "Pay the required entry amount.",
            "Your participation is recorded.",
            "Wait until the giveaway ends.",
            "The winner is selected.",
            "The winner claims the prize.",
        ],

        claim: {
            claimDeadlineDays: 7,
            requirements: ["Email Address"],
        },
    },

    {
        id: "amazon-20",
        slug: "amazon-20",

        title: "Win ₹20 Voucher",
        shortDescription: "Enter for a chance to win a ₹20 Voucher.",

        description: "A small reward giveaway using Tokens.",

        status: "active",

        startsAt: "2026-09-01T00:00:00Z",
        endsAt: "2026-09-30T23:59:59Z",

        entryFee: {
            amount: 2000,
            currency: "TOKEN",
        },

        prize: {
            id: "amazon-20",
            name: "₹20 Voucher",
            description: "A ₹20 voucher that can be claimed by the selected winner.",
            image: "/assets/prizes/amazon-voucher.png",
            type: "gift-card",
            value: 20,
            valueCurrency: "INR",
        },

        winnerCount: 1,
        participantCount: 2145,

        eligibility: {
            accountRequired: true,
        },

        rules: [
            "You must have an eligible VELOOP Rewards account.",
            "You must have sufficient Tokens to participate.",
            "Participation is recorded after successful confirmation.",
            "The winner is selected after the giveaway ends.",
        ],

        howItWorks: [
            "Review the giveaway and prize details.",
            "Check your eligibility and available Tokens.",
            "Pay the required entry amount.",
            "Your participation is recorded.",
            "Wait until the giveaway ends.",
            "The winner is selected.",
            "The winner claims the prize.",
        ],

        claim: {
            claimDeadlineDays: 7,
            requirements: ["Email Address"],
        },
    },
];