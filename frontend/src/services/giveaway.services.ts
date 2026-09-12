import { giveaways } from "../data/giveaways";
import { mockUser } from "../data/user";
import type { Giveaway } from "../data/types";

export function getGiveaways(): Giveaway[] {
    return giveaways;
}

export function getGiveawayById(id: string): Giveaway | undefined {
    return giveaways.find((giveaway) => giveaway.id === id);
}

export function getCurrentGiveaways(): Giveaway[] {
    return giveaways.filter(
        (giveaway) => giveaway.status === "active",
    );
}

export function getUserBalance(currency: "VE" | "SVE" | "TOKEN"): number {
    return mockUser.balances[currency];
}

export function hasJoinedGiveaway(giveawayId: string): boolean {
    return mockUser.participatingGiveawayIds.includes(
        giveawayId,
    );
}