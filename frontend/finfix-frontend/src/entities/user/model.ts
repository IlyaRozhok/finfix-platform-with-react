export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  isOnboarded: boolean;
  baseCurrency?: string;
}
