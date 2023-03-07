export const Calculus = {
  deg2rad: (deg: number): number => deg * (Math.PI / 180),
  rad2deg: (rad: number): number => rad * (180 / Math.PI),
  fireRate2tearDelay: (fireRate: number): number => 30 / fireRate - 1,
  tearDelay2fireRate: (tearDelay: number): number => 30 / (tearDelay + 1),
} as const;
