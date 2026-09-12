export interface MockUser {
  id: string;
  isAuthenticated: boolean;

  balances: {
    VE: number;
    SVE: number;
    TOKEN: number;
  };

  participatingGiveawayIds: string[];
}

export const mockUser: MockUser = {
  id: "user-001",

  isAuthenticated: true,

  balances: {
    VE: 750,
    SVE: 350,
    TOKEN: 5000,
  },

  participatingGiveawayIds: [],
};