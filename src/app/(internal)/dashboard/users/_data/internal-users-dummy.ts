/**
 * Demo users for internal dashboard — replace with directory API.
 */

export type InternalUserPlatform = "ios" | "android" | "web";

export type InternalUserRow = {
  id: string;
  displayName: string;
  email: string;
  phone: string;
  initials: string;
  state: string;
  city: string;
  country: string;
  online: boolean;
  lastActiveWithin24h: boolean;
  /** Joined in the last 7 days (demo flag) */
  isNewSignup: boolean;
  lastActiveLabel: string;
  signedUpLabel: string;
  sessions7d: number;
  platform: InternalUserPlatform;
  appVersion: string;
  verifiedEmail: boolean;
};

const STATES = [
  "Lagos",
  "FCT",
  "Rivers",
  "Oyo",
  "Kano",
  "Delta",
  "Enugu",
  "Edo",
  "Plateau",
  "Kwara",
  "Anambra",
  "Ogun",
  "Imo",
  "Bauchi",
  "Abia",
  "Osun",
  "Niger",
  "Adamawa",
  "Akwa Ibom",
  "Bayelsa",
] as const;

const FIRST = [
  "Ada",
  "Chidi",
  "Ibrahim",
  "Ngozi",
  "Yusuf",
  "Funmi",
  "Emeka",
  "Amaka",
  "Tunde",
  "Halima",
  "Zainab",
  "Obi",
  "Ife",
  "Sade",
  "Gbenga",
  "Ronke",
  "Kemi",
  "Sanusi",
  "Efe",
  "Uche",
] as const;

const LAST = [
  "Okafor",
  "Bello",
  "Adeyemi",
  "Okonkwo",
  "Ibrahim",
  "Nwosu",
  "Lawal",
  "Balogun",
  "Eze",
  "Ahmed",
  "Igwe",
  "Olawale",
  "Yusuf",
  "Danjuma",
  "Raji",
  "Peters",
  "Garba",
  "Mendy",
  "Hassan",
  "Smith",
] as const;

function seedBool(i: number, salt: number, percent: number): boolean {
  return ((i * 37 + salt * 17) % 100) < percent;
}

function initialsFor(first: string, last: string): string {
  return `${first[0] ?? "?"}${last[0] ?? "?"}`.toUpperCase();
}

export const INTERNAL_USERS: InternalUserRow[] = Array.from({ length: 47 }, (_, i) => {
  const first = FIRST[i % FIRST.length];
  const last = LAST[(i * 3 + 5) % LAST.length];
  const state = STATES[i % STATES.length];
  const online = seedBool(i, 11, 22);
  const isNewSignup = seedBool(i, 19, 26);
  const lastActiveWithin24h = seedBool(i, 3, 44) || online;
  const sessions7d = 1 + ((i * 13) % 48) + (online ? 8 : 0) + (isNewSignup ? 2 : 0);
  const platform: InternalUserPlatform =
    (i % 7 === 0 ? "web" : i % 5 === 0 ? "android" : "ios") as InternalUserPlatform;
  const slug = `${first.toLowerCase()}.${i}.${last.toLowerCase()}`.replace(/[^a-z0-9.]/g, "");

  return {
    id: `usr-demo-${1000 + i}`,
    displayName: `${first} ${last}`,
    email: `${slug}@demo.resq`,
    phone: `+234 800 ${String(200 + (i % 800)).padStart(3, "0")} ${String(1000 + i).slice(-4)}`,
    initials: initialsFor(first, last),
    state,
    city: `${state} metro`,
    country: "Nigeria",
    online,
    lastActiveWithin24h,
    isNewSignup,
    lastActiveLabel: online
      ? "Active now"
      : lastActiveWithin24h
        ? `${2 + (i % 20)}h ago`
        : `${1 + (i % 9)}d ago`,
    signedUpLabel: isNewSignup ? `${i % 6}d ago` : `${3 + (i % 400)}d ago`,
    sessions7d,
    platform,
    appVersion: `2.${(i % 4) + 1}.${(i % 20)}`,
    verifiedEmail: seedBool(i, 7, 78),
  };
});

export type InternalUsersSummary = {
  total: number;
  onlineNow: number;
  newSignups7d: number;
  activeLast24h: number;
};

export function getInternalUsersSummary(users: readonly InternalUserRow[]): InternalUsersSummary {
  return {
    total: users.length,
    onlineNow: users.filter((u) => u.online).length,
    newSignups7d: users.filter((u) => u.isNewSignup).length,
    activeLast24h: users.filter((u) => u.lastActiveWithin24h).length,
  };
}

export type InternalUserDemographyRow = {
  state: string;
  userCount: number;
  onlineCount: number;
  /** Weighted activity score for ranking */
  activityScore: number;
};

export function getInternalUsersDemography(
  users: readonly InternalUserRow[]
): InternalUserDemographyRow[] {
  const map = new Map<string, { userCount: number; onlineCount: number; activityScore: number }>();
  for (const u of users) {
    const cur = map.get(u.state) ?? { userCount: 0, onlineCount: 0, activityScore: 0 };
    cur.userCount += 1;
    if (u.online) cur.onlineCount += 1;
    cur.activityScore += u.sessions7d + (u.online ? 12 : 0) + (u.lastActiveWithin24h ? 4 : 0);
    map.set(u.state, cur);
  }
  return [...map.entries()]
    .map(([state, v]) => ({ state, ...v }))
    .sort((a, b) => b.activityScore - a.activityScore);
}
