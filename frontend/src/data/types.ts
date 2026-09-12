export type GiveawayStatus =
  | "upcoming"
  | "active"
  | "ended";

export type GiveawayCurrency =
  | "VE"
  | "SVE"
  | "TOKEN";

export type PrizeType =
  | "physical"
  | "gift-card";

export interface EntryFee {
  amount: number;
  currency: GiveawayCurrency;
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  image: string;
  type: PrizeType;
  value?: number;
  valueCurrency?: string;
}

export interface Giveaway {
  id: string;
  slug: string;

  title: string;
  shortDescription: string;
  description: string;

  status: GiveawayStatus;

  startsAt: string;
  endsAt: string;

  entryFee: EntryFee;

  prize: Prize;

  winnerCount: number;
  participantCount: number;

  eligibility: {
    minimumAge?: number;
    accountRequired: boolean;
    additionalRequirements?: string[];
  };

  rules: string[];

  howItWorks: string[];

  claim: {
    claimDeadlineDays: number;
    requirements: string[];
  };
}